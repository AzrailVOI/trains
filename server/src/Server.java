import org.neo4j.driver.Value;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.nio.channels.AsynchronousSocketChannel;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Server {
    private final static int BUFFER_SIZE = 256;
    private AsynchronousServerSocketChannel server;

    private final HttpHandler handler;

    public Server(HttpHandler handler) {
        this.handler = handler;
    }

    public void bootstrap(){
        try {
            server = AsynchronousServerSocketChannel.open();
            server.bind(new InetSocketAddress("localhost", 9999));

            GraphDB graphDB = new GraphDB("bolt://localhost:7687", "wlad", "12345678");



            while (true){
                Future<AsynchronousSocketChannel> future = server.accept();
                handleClient(future, graphDB);
            }
        } catch (IOException | ExecutionException | InterruptedException | TimeoutException | SQLException e) {
            throw new RuntimeException(e);
        }
    }
    private void handleClient(Future<AsynchronousSocketChannel> future, GraphDB graphDB) throws InterruptedException, ExecutionException, TimeoutException, IOException, SQLException {
        System.out.println("new client connection");

        AsynchronousSocketChannel clientChannel = future.get();

        HttpHandler fileHandler = new FolderHttpHandler("files", "index.html");

        while (clientChannel != null && clientChannel.isOpen()){
            ByteBuffer buffer = ByteBuffer.allocate(BUFFER_SIZE);

            StringBuilder builder = new StringBuilder();
            boolean keepReading = true;

            while (keepReading){
                int readResult = clientChannel.read(buffer).get();

                keepReading = readResult == BUFFER_SIZE;

                buffer.flip();

                CharBuffer charBuffer = StandardCharsets.UTF_8.decode(buffer);

                builder.append(charBuffer);
                buffer.clear();
            }

            HttpRequest request = new HttpRequest(builder.toString());
            HttpResponse response = new HttpResponse();


            if (handler != null) {
                try {
                    String body = this.handler.handle(request, response);

                    if (body != null && !body.isBlank()) {
                        response.getHeaders().putIfAbsent(HttpHeader.CONTENT_TYPE, ContentType.TEXT_HTML_UTF8);
                        response.setBody(body);
                    }
                } catch (Exception e) {
                    e.printStackTrace();

                    response.setStatusCode(500)
                            .setStatusMessage("Internal server error")
                            .addHeader(HttpHeader.CONTENT_TYPE, ContentType.TEXT_HTML_UTF8)
                            .setBody("<html><body><h1>Error happens</h1></body></html>");
                }
            } else {
                String[] isParams = request.getUrl().split("\\?");
                String from = "";
                String params = "";
                if(isParams.length > 1){
                    params = isParams[1];
                    from =  params.split("=")[1].split("&")[0];
                }
                if (!from.equals("app")) {
                    fileHandler.handle(request, response);
                }
                else {
                    String endpoint = request.getUrl().split("\\?")[0];
                    response.setStatusMessage("OK")
                            .setStatusCode(200)
                            .addHeader(HttpHeader.CONTENT_TYPE, ContentType.TEXT_PLAIN_UTF8);
                    switch (endpoint){
                        case "/cities":
                            String cities = graphDB.getCities();

                            response.setBody(urlEncode(cities));
                            break;
                        case "/tickets":
                        {
                            String fromCity = urlDecode(params.split("&")[1].split("=")[1]);
                            String toCity = urlDecode(params.split("&")[2].split("=")[1]);
                            String tickets = graphDB.getTickets(fromCity, toCity);
//                            System.out.println(cityId);
//                            String tickets = new Database().getTickets(connection, cityId);
//                            System.out.println(tickets);
                            response.setBody(urlEncode(tickets));
                            break;
                        }
                        case "/way":
                        {
                            String ticketId = urlDecode(params.split("&")[1].split("=")[1]);
                            String fromCity = urlDecode(params.split("&")[2].split("=")[1]);
                            String toCity = urlDecode(params.split("&")[3].split("=")[1]);

                            String way = graphDB.getWay(fromCity, toCity, ticketId);

//                            String way = new Database().getWay(connection, ticketId);

                            response.setBody(urlEncode(way));

//                            System.out.println(way);
                            break;
                        }
                        default:
                            response.setBody("not found");
                            response.setStatusCode(404);
                            response.setStatusMessage("Not found");
                            break;
                    }
                }

            }

            response.addHeader("Access-Control-Allow-Origin", "*");
            ByteBuffer resp = ByteBuffer.wrap(response.getBytes());

            clientChannel.write(resp);

            clientChannel.close();
        }
    }

    private static String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private static String urlDecode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }


}
