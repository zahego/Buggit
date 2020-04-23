package model.webUser;

import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringData findById(DbConn dbc, String id) {

        StringData sd = new StringData();
        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND web_user_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sd = new StringData(results);
            } else {
                sd.errorMsg = "The database has no Web User Record with id " + id;
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.webUser.DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
     public static StringData logonFind(String email, String pw, DbConn dbc) {
            StringData foundData = new StringData();
            if ((email == null) || (pw == null)) {
                foundData.errorMsg = "Programmer error in model.webUser.DbMods.logonFind: email and pw must be both non-null.";
                return foundData;
            }
            try {
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "
                        + "web_user.user_role_id, user_role_type "
                        + "FROM web_user, user_role "
                        + "WHERE web_user.user_role_id = user_role.user_role_id "
                        + "AND user_email = ? and user_password = ? ";
                PreparedStatement pStatement = dbc.getConn().prepareStatement(sql); // this compiles the SQL

                // Encode user supplied values into the ?s of the prepared statement.
                pStatement.setString(1, email); // replace 1st question mark
                pStatement.setString(2, pw);    // replace 2nd question mark

                ResultSet results = pStatement.executeQuery();  // Get the result set - expecting 1 or 0 records, 
                                                                // because user_email must be unique within the table.
                if (results.next()) {
                    // Record found in database, credentials are good.
                    return new StringData(results);
                } else {
                    // Returning null means that the username / pw were not found in the database
                    return null;
                }
            } catch (Exception e) {
                foundData.errorMsg = "Exception in model.webUser.DbMods.logonFind(): " + e.getMessage();
                System.out.println("******" + foundData.errorMsg);
                return foundData;
            }
        } // logonFind
     
      private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        errorMsgs.userEmail = ValidationUtils.stringValidationMsg(inputData.userEmail, 45, true);
        errorMsgs.userPassword = ValidationUtils.stringValidationMsg(inputData.userPassword, 45, true);

        if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
            errorMsgs.userPassword2 = "Both passwords must match";
        }
        errorMsgs.image = ValidationUtils.stringValidationMsg(inputData.image, 200, false);

        errorMsgs.membershipFee = ValidationUtils.decimalValidationMsg(inputData.membershipFee, false);
        errorMsgs.birthday = ValidationUtils.dateValidationMsg(inputData.birthday, false);
        errorMsgs.userRoleId = ValidationUtils.integerValidationMsg(inputData.userRoleId, true);

        return errorMsgs;
    } // validate 
     
      public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { 
            //String lessStrict="SET sql_mode=''";
            String sql = "INSERT INTO web_user (user_email, user_password, image, membership_fee, birthday, web_user.user_role_id) "
                    + "values (?,?,?,?,?,?)";
            //PrepStatement pStatement2 = new PrepStatement(dbc, lessStrict);
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            pStatement.setString(1, inputData.userEmail);
            pStatement.setString(2, inputData.userPassword);
            pStatement.setString(3, inputData.image);
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.membershipFee));
            
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.birthday));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.userRoleId));

            // here the SQL statement is actually executed
            //pStatement2.executeUpdate();
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messmembershipFees.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
      public static StringData update(StringData inputData, DbConn dbc) {

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
            String sql = "UPDATE web_user SET user_email=?, user_password=?, image=?, membership_fee=?, birthday=?, "
                    + "user_role_id=? WHERE web_user_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.userEmail); // string type is simple
            pStatement.setString(2, inputData.userPassword);
            pStatement.setString(3, inputData.image);
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.membershipFee));
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.birthday));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.userRoleId));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));

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
      public static String delete(String userId, DbConn dbc) {

        if (userId == null) {
            return "Error in modelwebUser.DbMods.delete: cannot delete web_user record because 'userId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM web_user WHERE web_user_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, userId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with web_user_id " + userId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
        }

        return result;
      }

    
} // class
