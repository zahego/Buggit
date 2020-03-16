package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.other.*;

// classes in my project
import dbUtils.*;

public class OtherView {

    public static StringDataList allOtherAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT profile_id, profile.web_user_id, nickname, web_user.user_email, profile.image, description, created_date, "+
                    "point_earn, department_id "+
                    "FROM profile, web_user where web_user.web_user_id = profile.web_user_id " + 
                    "ORDER BY profile_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in OtherView.allOtherAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}