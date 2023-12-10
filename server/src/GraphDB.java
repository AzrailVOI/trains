import org.neo4j.driver.*;
import org.neo4j.driver.Record;
import org.neo4j.driver.types.Path;
import org.neo4j.driver.types.Relationship;

import java.util.*;

public class GraphDB implements AutoCloseable {
    private final Driver driver;

    public GraphDB(String uri, String user, String password) {
        this.driver = GraphDatabase.driver(uri, AuthTokens.basic(user, password));
    }

    @Override
    public void close() {
        this.driver.close();
    }

    public String getCities() {
        List<Value> cities = new ArrayList<>();
        try (var session = driver.session()) {
            //            System.out.println(greeting);
            cities = session.executeRead(tx -> {
                var query = new Query("MATCH (c:City) RETURN c.name AS cityName");
                var result = tx.run(query);
                return result.list().stream().map(r -> r.get("cityName")).toList();
            });
        }
        StringBuilder citiesBody = new StringBuilder();
        cities.forEach(city -> {
            citiesBody.append(city.asString()).append(";");
        });
        return citiesBody.toString();
    }

    public String getTickets(String from, String to) {
        List<String> tickets = new ArrayList<>();
        Set<String> uniqueTickets = new HashSet<>();
        try (var session = driver.session()) {
            tickets = session.executeRead(tx -> {
                var query = "MATCH p = (:City{name:\"" + from + "\"})-[*]->(:City{name:\"" + to + "\"})\n" +
                        "WHERE ALL(relationship IN relationships(p) WHERE relationship.ticket = relationships(p)[0].ticket)\n" +
                        "RETURN p";
                var result = tx.run(query);

                // Обработка результатов запроса и извлечение значений атрибутов
                List<Record> records = result.list();
                List<String> ticketValues = new ArrayList<>();
                if (records.isEmpty()) {
                    return ticketValues;
                }
                System.out.println(records.getFirst().get("p").asPath().start().get("name").asString());
                System.out.println(records.getFirst().get("p").asPath().end().get("name").asString());
                String startCity = records.getFirst().get("p").asPath().start().get("name").asString();
                String endCity = records.getFirst().get("p").asPath().end().get("name").asString();
                for (Record record : records) {
                    Path path = record.get("p").asPath();
                    String ticket = "";
                    String arrTime = "";
                    String trainName = "";
                    String trainType = "";
                    String depTime = "";
                    String numberOfCarriages = "";
                    String trainClass = "";
                    for (Relationship relationship : path.relationships()) {
                        ticket = String.valueOf(relationship.get("ticket").asInt());
                        arrTime = String.valueOf(relationship.get("dep_time").asZonedDateTime());


                        // Check if the ticket number is unique before adding
                        if (uniqueTickets.add(ticket)) {
                            trainName = relationship.get("train_name").asString();
                            trainType = String.valueOf(relationship.get("train_type").asInt());
                            depTime = String.valueOf(relationship.get("arr_time").asZonedDateTime());
                            numberOfCarriages = String.valueOf(relationship.get("number_of_carriages").asInt());
                            trainClass = String.valueOf(relationship.get("train_class").asInt());

                            // Пример формата вывода, можно адаптировать по вашему желанию
//                            String ticketInfo = String.format("Ticket: %s, Train: %s, Type: %s, Departure: %s, Arrival: %s, Carriages: %s, Class: %s",


                        }
                    }
                    String ticketInfo = String.format("%s,%s,%s,%s,%s,%s,%s,%s,%s",
                            ticket, trainName, trainType, depTime, arrTime, numberOfCarriages, trainClass, startCity, endCity);

                    ticketValues.add(ticketInfo);
                }
                return ticketValues;
            });
        }
        System.out.println(tickets);
        System.out.println((long) tickets.size());
        System.out.println(String.join(";", tickets));
        return String.join(";", tickets);
    }

    public String getWay(String from, String to, String t_num) {
        List<String> way = new ArrayList<>();
        Set<String> uniqueTickets = new HashSet<>();
        try (var session = driver.session()) {
            way = session.executeRead(tx -> {
                var query = "MATCH p = (:City{name:\"" + from + "\"})-[*]->(:City{name:\"" + to + "\"})\n" +
                        "WHERE ALL(relationship IN relationships(p) WHERE relationship.ticket = " + t_num + ")\n" +
                        "RETURN p";
                var result = tx.run(query);

                // Обработка результатов запроса и извлечение значений атрибутов
                List<Record> records = result.list();
                List<String> ticketValues = new ArrayList<>();
                if (records.isEmpty()) {
                    return ticketValues;
                }
                for (Record record : records) {
                    Path path = record.get("p").asPath();
                    System.out.println("LOL");
                    for (Path.Segment segment : path) {
                        String startCity = String.valueOf(segment.start().get("name").asString());
                        String endCity = String.valueOf(segment.end().get("name").asString());
                        String arrTime = String.valueOf(segment.relationship().get("dep_time").asZonedDateTime());
                        String depTime = String.valueOf(segment.relationship().get("arr_time").asZonedDateTime());
                        String ticketInfo = String.format("%s,%s,%s,%s",
                                depTime, startCity, arrTime, endCity
                        );
                        ticketValues.add(ticketInfo);

                    }



                }
                return ticketValues;
            });
        }
        System.out.println(way);
        System.out.println((long) way.size());
        System.out.println(String.join(";", way));
        return String.join(";", way);

    }
}
