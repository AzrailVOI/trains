//import java.sql.*;
//
//public class Database {
//    private Connection dbConnection;
//    Connection createDatabaseConnection() throws SQLException {
//        String url = "jdbc:mysql://localhost:3306/trains";
//        String username = "1234";
//        String password = "1234";
//
//        return DriverManager.getConnection(url, username, password);
//    }
//
//    public String getCities(Connection dbConnection) {
//        try {
//            // Создание объекта Statement для выполнения SQL-запросов
//            Statement statement = dbConnection.createStatement();
//
//            // Пример выполнения SELECT-запроса
//            String sqlQuery = "SELECT * FROM cities";
//            ResultSet resultSet = statement.executeQuery(sqlQuery);
//
//            // Обработка результатов запроса
//            StringBuilder resultBuilder = new StringBuilder();
//            while (resultSet.next()) {
//                // Пример: получение значения из столбца "column_name"
//                String city_name = resultSet.getString("city_name");
//                resultBuilder.append(city_name).append(";");
//                String id = resultSet.getString("id");
//                resultBuilder.append(id).append("&");
//            }
//
//            // Закрытие ресурсов
//            resultSet.close();
//            statement.close();
//
//            // Используйте resultBuilder.toString() для работы с результатами запроса
//            String result = resultBuilder.toString();
//
//            return result;
//
//            // Далее обрабатывайте результат запроса в соответствии с вашими потребностями
//        } catch (SQLException e) {
//            e.printStackTrace();
//            // Обработка ошибок при выполнении запроса
//            return e.toString();
//        }
//    }
//
//    public String getTickets(Connection dbConnection, String cityId) {
//        try {
//            // Создание объекта Statement для выполнения SQL-запросов
//            Statement statement = dbConnection.createStatement();
//
//            // Пример выполнения SELECT-запроса
////            String sqlQuery = "with dep as (select id, city_name as DepCity from cities)\n" +
////                    "\n" +
////                    "SELECT \n" +
////                    "TrainName,\n" +
////                    "TrainType,\n" +
////                    "DepartureTime,\n" +
////                    "ArrivalTime,\n" +
////                    "NumberOfCarriages,\n" +
////                    "cities.city_name as ArCity,\n" +
////                    "DepCity\n" +
////                    "\n" +
////                    "FROM train_tickets\n" +
////                    "\n" +
////                    "join dep on DepartureCityID = dep.id\n" +
////                    "join cities on ArrivalCityID = cities.id\n" +
////                    "\n" +
////                    "having ArCity = '" + city + "'\n" +
////                    "\n" +
////                    "order by ArCity\n" +
////                    "\n";
//            String sqlQuery = "with dep as (select id as DepCityID, city_name as DepCity from cities),\n" +
//                    "\tarr as (select id as ArCityID, city_name as ArCity from cities)\n" +
//                    "                    SELECT\n" +
//                    "                    id as TicketId,\n" +
//                    "                    TrainName,\n" +
//                    "                    TrainType,\n" +
//                    "                    DepartureTime,\n" +
//                    "                    ArrivalTime,\n" +
//                    "                    NumberOfCarriages,\n" +
//                    "                    ArCity,\n" +
//                    "                    ArCityID,\n" +
//                    "                    DepCity,\n" +
//                    "                    DepCityID\n" +
//                    "                    \n" +
//                    "                    FROM train_tickets\n" +
//                    "                    \n" +
//                    "                    join dep on DepartureCityID = dep.DepCityID\n" +
//                    "                    join arr on ArrivalCityID = arr.ArCityID\n" +
//                    "                    \n" +
//                    "                    having ArCityID = " + cityId + " \n" +
//                    "                    \n" +
//                    "                    order by ArCity";
//            ResultSet resultSet = statement.executeQuery(sqlQuery);
//
//            // Обработка результатов запроса
//            StringBuilder resultBuilder = new StringBuilder();
//            while (resultSet.next()) {
//                String TicketId = resultSet.getString("TicketId");
//                resultBuilder.append(TicketId).append(";");
//                String TrainName = resultSet.getString("TrainName");
//                resultBuilder.append(TrainName).append(";");
//                String TrainType = resultSet.getString("TrainType");
//                resultBuilder.append(TrainType).append(";");
//                String DepartureTime = resultSet.getString("DepartureTime");
//                resultBuilder.append(DepartureTime).append(";");
//                String ArrivalTime = resultSet.getString("ArrivalTime");
//                resultBuilder.append(ArrivalTime).append(";");
//                String NumberOfCarriages = resultSet.getString("NumberOfCarriages");
//                resultBuilder.append(NumberOfCarriages).append(";");
//                String ArCity = resultSet.getString("ArCity");
//                resultBuilder.append(ArCity).append(";");
//                String ArCityID = resultSet.getString("ArCityID");
//                resultBuilder.append(ArCityID).append(";");
//                String DepCity = resultSet.getString("DepCity");
//                resultBuilder.append(DepCity).append(";");
//                String DepCityID = resultSet.getString("DepCityID");
//                resultBuilder.append(DepCityID);
//                resultBuilder.append("&");
//            }
//
//            // Закрытие ресурсов
//            resultSet.close();
//            statement.close();
//
//            // Используйте resultBuilder.toString() для работы с результатами запроса
//            String result = resultBuilder.toString();
//
//            return result;
//
//            // Далее обрабатывайте результат запроса в соответствии с вашими потребностями
//        } catch (SQLException e) {
//            e.printStackTrace();
//            // Обработка ошибок при выполнении запроса
//            return e.toString();
//        }
//    }
//
//    public String getWay(Connection dbConnection, String ticketId) {
//        try {
//            // Создание объекта Statement для выполнения SQL-запросов
//            Statement statement = dbConnection.createStatement();
//
//            // Пример выполнения SELECT-запроса
//            String sqlQuery = "SELECT intermediate_stations.id as Way_id, Ticket_id, ArrivalTime, DepartureTime, cities.id as City_id, city_name FROM intermediate_stations " +
//                    "JOIN cities ON cities.id = StationName " +
//                    "WHERE Ticket_id = " + ticketId;
//            ResultSet resultSet = statement.executeQuery(sqlQuery);
//
//            // Обработка результатов запроса
//            StringBuilder resultBuilder = new StringBuilder();
//            while (resultSet.next()) {
//                // Пример: получение значения из столбца "column_name"
//                String Way_id = resultSet.getString("Way_id");
//                resultBuilder.append(Way_id).append(";");
//                String Ticket_id = resultSet.getString("Ticket_id");
//                resultBuilder.append(Ticket_id).append(";");
//                String ArrivalTime = resultSet.getString("ArrivalTime");
//                resultBuilder.append(ArrivalTime).append(";");
//                String DepartureTime = resultSet.getString("DepartureTime");
//                resultBuilder.append(DepartureTime).append(";");
//                String City_id = resultSet.getString("City_id");
//                resultBuilder.append(City_id).append(";");
//                String city_name = resultSet.getString("city_name");
//                resultBuilder.append(city_name).append("&");
//            }
//
//            // Закрытие ресурсов
//            resultSet.close();
//            statement.close();
//
//            // Используйте resultBuilder.toString() для работы с результатами запроса
//            String result = resultBuilder.toString();
//
//            return result;
//
//            // Далее обрабатывайте результат запроса в соответствии с вашими потребностями
//        } catch (SQLException e) {
//            e.printStackTrace();
//            // Обработка ошибок при выполнении запроса
//            return e.toString();
//        }
//    }
//
//    public void closeDatabaseConnection(Connection connection) throws SQLException {
//        connection.close();
//    }
//
//}
