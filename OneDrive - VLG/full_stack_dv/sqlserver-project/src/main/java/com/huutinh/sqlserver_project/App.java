package com.huutinh.sqlserver_project;



import java.math.BigDecimal;
import java.sql.*;

public class App {

  // ===== KẾT NỐI JDBC =====
  // Nếu bạn dùng default instance (không có tên) thì bỏ instanceName và có thể dùng :1433
  private static final String URL =
      "jdbc:sqlserver://localhost;"
    + "instanceName=MSSQLSERVER2;"
    + "databaseName=MotorbikeDB;"
    + "encrypt=true;trustServerCertificate=true;";

  // Dùng biến môi trường nếu có, không thì dùng mặc định
  private static final String USER = System.getenv().getOrDefault("DB_USER", "appuser");
  private static final String PASS = System.getenv().getOrDefault("DB_PASS", "Strong_Pa$$w0rd_123");

  public static void main(String[] args) {
    try {
      // Đảm bảo driver đã nạp (phòng trường hợp classpath không tự load)
      Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

      try (Connection c = DriverManager.getConnection(URL, USER, PASS)) {
        System.out.println("✅ Connected to SQL Server");

        printContext(c);     // in thông tin login/instance/DB
        ensureTable(c);      // tạo bảng nếu chưa có

        System.out.println("\n== BEFORE ==");
        listAll(c);

        int newId = insert(c, "NVX 155", "Yamaha", new BigDecimal("55500000"));
        System.out.println("Inserted id = " + newId);

        updatePrice(c, newId, new BigDecimal("56000000"));
        System.out.println("Updated price id = " + newId);

        System.out.println("\n== AFTER INSERT+UPDATE ==");
        listAll(c);

        deleteById(c, newId);
        System.out.println("Deleted id = " + newId);

        System.out.println("\n== FINAL ==");
        listAll(c);
      }
    } catch (Exception e) {
      // In lỗi gọn gàng khi có sự cố
      if (e instanceof SQLException) {
        SQLException se = (SQLException) e;
        System.err.printf("SQLState=%s, ErrorCode=%d, Message=%s%n",
            se.getSQLState(), se.getErrorCode(), se.getMessage());
      } else {
        e.printStackTrace();
      }
    }
  }

  // ===== Helpers =====

  private static void printContext(Connection c) throws SQLException {
    String sql = "SELECT SUSER_SNAME() AS LoginName, @@SERVICENAME AS InstanceName, DB_NAME() AS DbName";
    try (PreparedStatement ps = c.prepareStatement(sql);
         ResultSet rs = ps.executeQuery()) {
      if (rs.next()) {
        System.out.printf("Login=%s | Instance=%s | DB=%s%n",
            rs.getString("LoginName"),
            rs.getString("InstanceName"),
            rs.getString("DbName"));
      }
    }
  }

  private static void ensureTable(Connection c) throws SQLException {
    String sql =
      "IF OBJECT_ID('dbo.Motorbike','U') IS NULL BEGIN\n" +
      "  CREATE TABLE dbo.Motorbike(\n" +
      "    Id    INT IDENTITY PRIMARY KEY,\n" +
      "    Name  NVARCHAR(120) NOT NULL,\n" +
      "    Brand NVARCHAR(60)  NOT NULL,\n" +
      "    Price DECIMAL(12,2) NOT NULL\n" +
      "  );\n" +
      "END";
    try (PreparedStatement ps = c.prepareStatement(sql)) {
      ps.executeUpdate();
    }
  }

  private static int insert(Connection c, String name, String brand, BigDecimal price) throws SQLException {
    String sql = "INSERT INTO Motorbike(Name, Brand, Price) VALUES(?, ?, ?)";
    try (PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
      ps.setString(1, name);
      ps.setString(2, brand);
      ps.setBigDecimal(3, price);
      ps.executeUpdate();
      try (ResultSet keys = ps.getGeneratedKeys()) {
        return keys.next() ? keys.getInt(1) : -1;
      }
    }
  }

  private static void updatePrice(Connection c, int id, BigDecimal newPrice) throws SQLException {
    String sql = "UPDATE Motorbike SET Price=? WHERE Id=?";
    try (PreparedStatement ps = c.prepareStatement(sql)) {
      ps.setBigDecimal(1, newPrice);
      ps.setInt(2, id);
      ps.executeUpdate();
    }
  }

  private static void deleteById(Connection c, int id) throws SQLException {
    String sql = "DELETE FROM Motorbike WHERE Id=?";
    try (PreparedStatement ps = c.prepareStatement(sql)) {
      ps.setInt(1, id);
      ps.executeUpdate();
    }
  }

  private static void listAll(Connection c) throws SQLException {
    String sql = "SELECT Id, Name, Brand, Price FROM Motorbike ORDER BY Id";
    try (PreparedStatement ps = c.prepareStatement(sql);
         ResultSet rs = ps.executeQuery()) {
      while (rs.next()) {
        System.out.printf("%d | %s | %s | %,.2f%n",
            rs.getInt("Id"),
            rs.getString("Name"),
            rs.getString("Brand"),
            rs.getBigDecimal("Price"));
      }
    }
  }
}

