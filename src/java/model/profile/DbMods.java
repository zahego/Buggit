package model.profile;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {


    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);
        errorMsgs.nickname = ValidationUtils.stringValidationMsg(inputData.nickname, 45, true);
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 200, false);
        errorMsgs.createdDate = ValidationUtils.dateValidationMsg(inputData.createdDate, false);
        errorMsgs.pointEarn = ValidationUtils.integerValidationMsg(inputData.pointEarn, false);
        errorMsgs.departmentId = ValidationUtils.integerValidationMsg(inputData.departmentId, false);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else {
            String sql = "INSERT INTO profile (web_user_id, nickname, image, description, created_date, point_earn, department_id) "
                    + "values (?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setInt(1, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setString(2, inputData.nickname);
            pStatement.setString(3, inputData.image);
            pStatement.setString(4, inputData.description);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.createdDate));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.pointEarn));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.departmentId));
            

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid web user id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

public static StringData update2(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE profile SET web_user_id=?, nickname=?, image=?, description=?, "
                   + "created_date=?, point_earn=?, department_id=? WHERE profile_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setInt(1, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setString(2, inputData.nickname);
            pStatement.setString(3, inputData.image);
            pStatement.setString(4, inputData.description);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.createdDate));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.pointEarn));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.departmentId));
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.profileId));
            

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    public static String delete(String otherId, DbConn dbc) {

        if (otherId == null) {
            return "Error in model.profile.DbMods.delete: cannot delete web_user record because 'otherId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM profile WHERE profile_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, otherId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with profile_id " + otherId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.profile.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }

} // class