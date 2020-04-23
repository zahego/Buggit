
var userCRUD = {}; // globally available object
userCRUD.UI=function (id) {
 var contentUserCRUD =
        `
    <div class="logOn">
    <h1>Enter new User Data</h1>
    <table >
    
        <tr id='webUserIdRow'>
            <td><input type="text"  id="webUserId" disabled="disabled" placeholder="Web User Id"/></td>
            <td ></td> 
        </tr>
        <tr>
            <td><input type="text"  id="userEmail" placeholder="Email Address"/></td>
            <td id="userEmailError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="password"  id="userPassword" placeholder="Password"/></td>
            <td id="userPasswordError" class="error"></td>
        </tr>
        <tr>
            <td><input type="password" id="userPassword2" placeholder="Retype Your Password"/></td>
            <td id="userPassword2Error" class="error"></td>
        </tr>
        <tr>
            <td><input type="text" id="membershipFee" placeholder="Membership Fee"/></td>
            <td id="membershipFeeError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="image" placeholder="Image"/></td>
            <td id="imageError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="birthday" placeholder="Birthday"/></td>
            <td id="birthdayError" class="error"></td> 
        </tr>
        <tr>
            <td>
                <select id="rolePickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                </select>
            </td>

            <td id="userRoleIdError" class="error"></td>
        </tr>
        <tr>
            <!-- see js/insertUser.js to see the insertUser function (make sure index.html referencesinvokes the js file) -->
            <td>
                <button id="insertSaveUserButton" onclick="userCRUD.insertSave()">Insert Save</button>
            </td>
            <td id="recordError" class="error"></td>
            <div class="stopFloat"></div>
            <td></td>
        </tr>
    </table>
    </div>

    `;
        document.getElementById(id).innerHTML = contentUserCRUD;   
        var insertTime=userCRUD.startInsert();
    };       
userCRUD.updateUI=function (id, findId) {
 var contentUserCRUD =
        `
    <div class="logOn">
    <h1>Enter new User Data</h1>
    <table >
    
        <tr id='webUserIdRow'>
            <td><input type="text"  id="webUserId" disabled="disabled" placeholder="Web User Id"/></td>
            <td ></td> 
        </tr>
        <tr>
            <td><input type="text"  id="userEmail" placeholder="Email Address"></input></td>
            <td id="userEmailError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="password"  id="userPassword" placeholder="Password"/></td>
            <td id="userPasswordError" class="error"></td>
        </tr>
        <tr>
            <td><input type="password" id="userPassword2" placeholder="Retype Your Password"/></td>
            <td id="userPassword2Error" class="error"></td>
        </tr>
        <tr>
            <td><input type="text" id="membershipFee" placeholder="Membership Fee"/></td>
            <td id="membershipFeeError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="image" placeholder="Image"/></td>
            <td id="imageError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="birthday" placeholder="Birthday"/></td>
            <td id="birthdayError" class="error"></td> 
        </tr>
        <tr>
            <td>
                <select id="rolePickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                </select>
            </td>

            <td id="userRoleIdError" class="error"></td>
        </tr>
        <tr>
            <!-- see js/insertUser.js to see the insertUser function (make sure index.html referencesinvokes the js file) -->
            <td>
                <button id="updateSaveUserButton" onclick="userCRUD.updateSave()">Update Save</button>
            </td>
            <td id="recordError" class="error"></td>
            <div class="stopFloat"></div>
            <td></td>
        </tr>
    </table>
    </div>

    `;
    
        document.getElementById(id).innerHTML = contentUserCRUD;   
        var updateTime=userCRUD.startUpdate(findId);
    }; 
    
    userCRUD.startInsert = function () {
            //document.getElementById("webUserIdRow").style.display = "none";

            // Make ajax call to listUsersAPI. When that data's ready (and all went well), invoke 
            // function listUsersResponse passing the httpReq (response) as well 
            // as the desired target for that response. Otherwise (error making the http 
            // request), invoke the listUsersError function.
            // These functions are in the listUser.js file...
            ajax("webAPIs/getRolesAPI.jsp", setRolePickList, "userRoleIdError");
            document.getElementById("updateSaveUserButton").style.display = "none";
            document.getElementById("webUserIdRow").style.display = "none";

            function setRolePickList(httpRequest) {

                console.log("setRolePickList was called, see next line for object holding list of roles");
                var jsonObj = httpRequest;
                console.log(jsonObj);

                if (jsonObj.dbError.length > 0) {
                    document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                    return;
                }


                // function makePickList(list, keyProp, valueProp, selectListId) {
                makePickList(jsonObj.roleList, "userRoleId", "userRoleType", "rolePickList");
            }
        
    };

    function getUserDataFromUI() {
        

        var ddList = document.getElementById("rolePickList");
        

        // strip $ and commas from dollar amount before trying to encode user data for update.
        var dollar = stripDollar(document.getElementById("membershipFee").value);
        // create a user object from the values that the user has typed into the pmembershipFee.
        var userInputObj = {
            "webUserId": document.getElementById("webUserId").value,
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "membershipFee": dollar,
            "image": document.getElementById("image").value,
            "birthday": document.getElementById("birthday").value,

            // Modification here for role pick list
            "userRoleId": ddList.options[ddList.selectedIndex].value,

            "userRoleType": "",
            "errorMsg": ""
        };
        console.log("this is escape: "+(JSON.stringify(userInputObj)));

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        return encodeURIComponent(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error message.");
        console.log(jsonObj);

        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("imageError").innerHTML = jsonObj.image;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    userCRUD.insertSave = function () {

        console.log("userCRUD.insertSave was called");

        // create a user object from the values that the user has typed into the pmembershipFee.
        var myData = getUserDataFromUI();
        var url = "webAPIs/insertUserAPI.jsp?jsonInsertData=" + myData;
        ajax(url, processInsert, "recordError");

        function processInsert(httpRequest) {
            console.log("processInsert was called here is httpRequest.");
            console.log(httpRequest);

            // the server prints out a JSON string of an object that holds field level error 
            // message. The error messmembershipFee object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
            var jsonObj = httpRequest; // convert from JSON to JS Object.

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
                setTimeout(() => { var backToList=userCRUD.list("content"); }, 5000);
            }

            writeErrorObjToUI(jsonObj);
            
            
        }
        
    };

    userCRUD.list = function (id) {

        document.getElementById(id).innerHTML = "";
        var dataList = document.createElement("div");
        dataList.id = "dataList"; // set the id so it matches CSS styling rule.
        dataList.innerHTML = "<h1 class='logOn' style='left: 45%; color: #003368'>Web Users<a href='#/userInsert'><img style='position:relative; border: thick solid rgb(39,164,210)' src='icons/insert.png' /></a></h1>";
        dataList.innerHTML += "<h3 style='position: relative; top: 80px' id='listMsg' class='clickSort'></h3>";
        document.getElementById("content").appendChild(dataList);

        ajax('webAPIs/listUsersAPI.jsp', setListUI, 'listMsg');

        function setListUI(httpRequest) {

            console.log("starting userCRUD.list (setListUI) with this httpRequest object (next line)");
            console.log(httpRequest);

            var obj = httpRequest;

            if (obj === null) {
                document.getElementById("listMsg").innerHTML = "userCRUD.list Error: JSON string evaluated to null.";
                return;
            }

            for (var i = 0; i < obj.webUserList.length; i++) {

                // add a property to each object in webUserList - a span tag that when clicked 
                // invokes a JS function call that passes in the web user id that should be deleted
                // from the database and a reference to itself (the span tag that was clicked)
                var id = obj.webUserList[i].webUserId;
                obj.webUserList[i].image = "<img src="+obj.webUserList[i].image+"   style='width: 100%' title="+obj.webUserList[i].image+" />";
                obj.webUserList[i].delete = "<img src='icons/delete.png'  onclick='userCRUD.delete(" + id + ",this)' style='width: 50%; height: 100%' />";
                obj.webUserList[i].update = "<img onclick='setUI("+id+")' src='icons/update.png' style='width: 50%; height: 100%'/>";

                // remove a property from each object in webUserList 
                delete obj.webUserList[i].userPassword2;
            }

            // buildTable Parameters: 
            // First:  array of objects that are to be built into an HTML table.
            // Second: string that is database error (if any) or empty string if all OK.
            // Third:  reference to DOM object where built table is to be stored. 
            MakeFilterSortableTable(obj.webUserList, "listMsg", "webUserId");
        }
    };
    function setUI(id){
        var setIt=userCRUD.updateUI("content", id);
    }
    userCRUD.startUpdate = function (userId) {

        console.log("startUpdate");

            ajax("webAPIs/getUserByIdAPI.jsp?updateId=" + userId, displayUser, "recordError");

            function displayUser(httpRequest) {
                
                var obj = httpRequest;
                console.log(obj.webUser.userEmail);
                if (obj.webUser.errorMsg.length > 0) {
                    document.getElementById("recordError").innerHTML = "Database error: " +
                            obj.webUser.errorMsg;
                } else if (obj.webUser.webUserId.length < 1) {
                    document.getElementById("recordError").innerHTML = "There is no user with id '" +
                            userId + "' in the database";
                } else if (obj.role.dbError.length > 0) {
                    document.getElementById("recordError").innerHTML += "<br/>Error extracting the Role List options from the database: " +
                            obj.role.dbError;
                } else {
                    var userObj = obj.webUser;
                    document.getElementById("webUserId").value = userObj.webUserId;
                    document.getElementById("userEmail").value = userObj.userEmail;
                    document.getElementById("userPassword").value = userObj.userPassword;
                    document.getElementById("userPassword").value = userObj.userPassword2;
                    document.getElementById("membershipFee").value = userObj.membershipFee;
                    document.getElementById("image").value = userObj.image;
                    document.getElementById("birthday").value = userObj.birthday;
                    makePickList(obj.role.roleList, // list of key/value objects for role pick list
                            "userRoleId", // key property name
                            "userRoleType", // value property name
                            "rolePickList", // id of dom element where to put role pick list
                            userObj.payerRoleId); // key to be selected (role id fk in web_user object)
                }
            }
        
    };

    userCRUD.updateSave = function () {

        console.log("userCRUD.updateSave was called");
        var myData = getUserDataFromUI();
        var url = "webAPIs/updateUserAPI.jsp?jsonUpdateUserData=" + myData;
        ajax(url, processUpdate, "recordError");

        function processUpdate(httpRequest) {
            console.log("processUpdate was called here is httpRequest.");
            console.log(httpRequest);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fields named exactly 
            // the same as the input data was named. 
            var jsonObj = httpRequest; // convert from JSON to JS Object.
            console.log("here is JSON object (holds error messages.");
            console.log(jsonObj);

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
                setTimeout(() => { var backToList=userCRUD.list("content"); }, 5000);
            }

            writeErrorObjToUI(jsonObj);
            

        }
    };
    
    userCRUD.delete = function (userId, icon) {
        if (confirm("Do you really want to delete user " + userId + "? ")) {

            // Calling the DELETE API. 
            var url = "webAPIs/deleteUserAPI.jsp?deleteId=" + userId;
            ajax(url, success, "listMsg");

            function success(httpRequest) { // API was successfully called (doesnt mean delete worked)
               
                console.log(httpRequest);
                var obj = httpRequest;
                
                if (obj.errorMsg.length > 0) {
                    
                    alert("foreign key error. Delete connection from assoc table to continue. Full error is [" + obj.errorMsg + "]");
                    //document.getElementById("listMsg").innerHTML = obj.errorMsg;
                } else { // everything good, no error means record was deleted
                  
                    alert("id [" + userId + "] is deleted");

                    // clear any possible previous error message
                    document.getElementById("listMsg").innerHTML = ""; 
                    // delete the <tr> (row) of the clicked icon from the HTML table
                    console.log("icon that was passed into JS function is printed on next line");
                    console.log(icon);

                    // icon's parent is cell whose parent is row 
                    var dataRow = icon.parentNode.parentNode;
                    console.log(dataRow);
                    var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                    var dataTable = dataRow.parentNode;
                    console.log(dataTable);
                    
                    dataTable.deleteRow(rowIndex);
                    var backToList=userCRUD.list("content");
                    
                }
            }
        }
    };


    function stripDollar(dollar) {
        dollar = dollar.replace("$", ""); // replace $ with empty string
        dollar = dollar.replace(",", ""); // replace comma with empty string
        return dollar;
    }

  // the end of the IIFE

