package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.role.*;
import model.department.*;

// classes in my project
import dbUtils.*;

public class PickView {

    public static StringDataList allRolesAPI(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT user_role_id, user_role_type "+
                    "FROM user_role ORDER BY user_role_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in PickView.allRolesAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
    public static StringDataList1 allDepartmentAPI(DbConn dbc) {

        StringDataList1 sdl = new StringDataList1();
        try {
            String sql = "SELECT department_id, department_name "+
                    "FROM department ORDER BY department_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData1 sd = new StringData1();
            sd.errorMsg = "Exception thrown in PickView.allDepartmentAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}