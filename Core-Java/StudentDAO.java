import java.sql.*;

public class StudentDAO {

    Connection con;

    StudentDAO(Connection con) {
        this.con = con;
    }

    public void insertStudent(int id, String name)
            throws SQLException {

        String sql = "INSERT INTO students(id,name) VALUES(?,?)";

        PreparedStatement ps = con.prepareStatement(sql);

        ps.setInt(1, id);
        ps.setString(2, name);

        ps.executeUpdate();
    }

    public void updateStudent(int id, String name)
            throws SQLException {

        String sql = "UPDATE students SET name=? WHERE id=?";

        PreparedStatement ps = con.prepareStatement(sql);

        ps.setString(1, name);
        ps.setInt(2, id);

        ps.executeUpdate();
    }
}