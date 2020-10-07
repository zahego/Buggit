package model.profile;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {
    public String profileId = "";
    public String webUserId = "";
    public String nickname = "";
    public String userEmail = "";
    public String image = "";
    public String description = "";
    public String createdDate = "";
    public String pointEarn = "";   // Foreign Key
    public String departmentId = ""; // getting it from joined user_role table.

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.profileId = FormatUtils.formatInteger(results.getObject("profile_id"));
            this.webUserId = FormatUtils.formatInteger(results.getObject("profile.web_user_id"));
            this.nickname = FormatUtils.formatString(results.getObject("nickname"));
            this.userEmail = FormatUtils.formatString(results.getObject("web_user.user_email"));
            this.image = FormatUtils.formatString(results.getObject("image"));
            this.description = FormatUtils.formatString(results.getObject("description"));
            this.createdDate = FormatUtils.formatDate(results.getObject("created_date"));
            this.pointEarn = FormatUtils.formatInteger(results.getObject("point_earn"));
            this.departmentId = FormatUtils.formatInteger(results.getObject("department_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.profile.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.profileId+this.webUserId + this.nickname +this.userEmail+ this.image + this.description
                + this.createdDate + this.pointEarn + this.departmentId;
        return s.length();
    }

    public String toString() {
        return "Profile Id:" + this.profileId
                +"Web User Id:" + this.webUserId
                + ", nickname: " + this.nickname
                + ", image: " + this.image
                + ", email" + this.userEmail
                + ", description: " + this.description
                + ", createdDate: " + this.createdDate
                + ", Point Earn: " + this.pointEarn
                + ", Department Id: " + this.departmentId;
    }
}
