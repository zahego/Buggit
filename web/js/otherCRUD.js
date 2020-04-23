// 3308_6_7_8_AjaxCRUD (building from insertDelete good code).

var otherCRUD = {}; // globally available object
otherCRUD.UI=function (id) {
 var contentOtherCRUD =
        `
    <div class="logOn">
    <h1>Enter new Profile Data</h1>
    <table >
    
        <tr id='profileIdRow'>
            <td><input type="text"  id="profileId" disabled="disabled" placeholder="Profile Id"/></td>
            <td ></td> 
        </tr>
        <tr>
            <!--<td><input type="text"  id="webUserId" placeholder="Web User Id"/></td>
            <td id="webUserIdError" class="error"></td> -->
    
            <td>
                <select id="webUserPickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                </select>
            </td>

            <td id="webUserIdError" class="error"></td>
        </tr>
        <tr>
            <td><input type="nickname"  id="nickname" placeholder="Nickname"/></td>
            <td id="nicknameError" class="error"></td>
        </tr>
        <tr>
            <td><input type="text" id="image" placeholder="Image"/></td>
            <td id="imageError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="description" id="description" placeholder="Description"/></td>
            <td id="descriptionError" class="error"></td>
        </tr>
        <tr>
            <td><input type="text" id="pointEarn" placeholder="Point Earn"/></td>
            <td id="pointEarnError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="createdDate" placeholder="Created Date"/></td>
            <td id="createdDateError" class="error"></td> 
        </tr>
        <tr>
            <td>
                <select id="departmentPickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                </select>
            </td>

            <td id="departmentIdError" class="error"></td>
        </tr>
        <tr>
            <!-- see js/insertOther.js to see the insertUser function (make sure index.html referencesinvokes the js file) -->
            <td>
                <button id="insertSaveOtherUserButton" onclick="otherCRUD.insertSaveOther()">Insert Save</button>
            </td>
            <td id="recordOtherError" class="error"></td>
            <div class="stopFloat"></div>
            <td></td>
        </tr>
    </table>
    </div>

    `;
        document.getElementById(id).innerHTML = contentOtherCRUD;   
        var startThisUp=otherCRUD.startInsertOther();
    };       
otherCRUD.updateOTherUI=function (id, findId) {
 var contentOtherCRUD =
        `
    <div class="logOn">
    <h1>Enter new Profile Data</h1>
    <table >
    
        <tr id='profileIdRow'>
            <td><input type="text"  id="profileId" disabled="disabled" placeholder="Profile Id"/></td>
            <td ></td> 
        </tr>
        <tr>
            <!--<td><input type="text"  id="webUserId" placeholder="Web User Id"/></td>
            <td id="webUserIdError" class="error"></td> -->
    
            <td>
                <select id="webUserPickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                </select>
            </td>

            <td id="webUserIdError" class="error"></td>
        </tr>
        <tr>
            <td><input type="nickname"  id="nickname" placeholder="Nickname"/></td>
            <td id="nicknameError" class="error"></td>
        </tr>
        <tr>
            <td><input type="text" id="image" placeholder="Image"/></td>
            <td id="imageError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="description" id="description" placeholder="Description"/></td>
            <td id="descriptionError" class="error"></td>
        </tr>
        <tr>
            <td><input type="text" id="pointEarn" placeholder="Point Earn"/></td>
            <td id="pointEarnError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="createdDate" placeholder="Created Date"/></td>
            <td id="createdDateError" class="error"></td> 
        </tr>
        <tr>
            <td><input type="text" id="departmentId" placeholder="Department Id"/></td>

            <td id="departmentIdError" class="error"></td>
        </tr>
        <tr>
            <!-- see js/insertOther.js to see the insertUser function (make sure index.html referencesinvokes the js file) -->
            <td>
                <button id="updateSaveOtherButton" onclick="otherCRUD.updateOtherSave()">Update Save</button>
            </td>
            <td id="recordOtherError" class="error"></td>
            <div class="stopFloat"></div>
            <td></td>
        </tr>
    </table>
    </div>

    `;
        document.getElementById(id).innerHTML = contentOtherCRUD;   
        var updateTime=otherCRUD.startUpdate(findId);
    };
    
    otherCRUD.startInsertOther = function () {

            //document.getElementById("insertSaveOtherUserButton").style.display = "inline";
            document.getElementById("profileIdRow").style.display = "none";

            // Make ajax call to listOtherAPI. When that data's ready (and all went well), invoke 
            // function listUsersResponse passing the httpReq (response) as well 
            // as the desired target for that response. Otherwise (error making the http 
            // request), invoke the listUsersError function.
            // These functions are in the listUser.js file...
            ajax("webAPIs/getDepartmentAPI.jsp", setDepartmentPickList, "departmentIdError");
            //fundamentally this is wrong, this only allow existed user, need to create own getListWebUserAPI
            ajax("webAPIs/listOtherAPI.jsp", setWebUserPickList, "webUserIdError");

            function setDepartmentPickList(httpRequest) {

                console.log("setDepartmentPickList was called, see next line for object holding list of department");
                var jsonObj = httpRequest;
                console.log(jsonObj);

                if (jsonObj.dbError.length > 0) {
                    document.getElementById("departmentIdError").innerHTML = jsonObj.dbError;
                    return;
                }
                // function makePickList(list, keyProp, valueProp, selectListId) {
                makePickList(jsonObj.departmentList, "departmentId", "departmentName", "departmentPickList");
            }
            function setWebUserPickList(httpRequest) {

                console.log("setWebUserPickList was called, see next line for object holding list of web user");
                var jsonObj = httpRequest;
                console.log(jsonObj);

                if (jsonObj.dbError.length > 0) {
                    document.getElementById("webUserIdError").innerHTML = jsonObj.dbError;
                    return;
                }
                // function makePickList(list, keyProp, valueProp, selectListId) {
                makePickList(jsonObj.otherList, "webUserId", "userEmail", "webUserPickList");
            }
        
    };

    function getOtherDataFromUI(params) {
        if(params==="update"){
            var ddList2 = document.getElementById("webUserPickList");
        var otherInputObj = {
            "profileId": document.getElementById("profileId").value,
            "webUserId": ddList2.options[ddList2.selectedIndex].value,
            "userEmail": "",
            "nickname": document.getElementById("nickname").value,
            "image": document.getElementById("image").value,
            "description": document.getElementById("description").value,
            "createdDate": document.getElementById("createdDate").value,
            "pointEarn": document.getElementById("pointEarn").value,

            // Modification here for role pick list
            "departmentId": document.getElementById("departmentId").value,
            "errorMsg": ""
        };
        }
        else{

        var ddList3 = document.getElementById("departmentPickList");
        var ddList2 = document.getElementById("webUserPickList");

        // create a user object from the values that the user has typed into the ppointEarn.
        var otherInputObj = {
            "profileId": document.getElementById("profileId").value,
            "webUserId": ddList2.options[ddList2.selectedIndex].value,
            "userEmail": "",
            "nickname": document.getElementById("nickname").value,
            "image": document.getElementById("image").value,
            "description": document.getElementById("description").value,
            "createdDate": document.getElementById("createdDate").value,
            "pointEarn": document.getElementById("pointEarn").value,

            // Modification here for role pick list
            "departmentId": ddList3.options[ddList3.selectedIndex].value,

            "departmentName": "",
            "errorMsg": ""
        };}

        console.log("this is escape: "+(JSON.stringify(otherInputObj)));

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
         return encodeURIComponent(JSON.stringify(otherInputObj));
    }

    function writeErrorObjToUIOther(jsonObj) {
        console.log("here is JSON object (holds error message.");
        console.log(jsonObj);

        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
        document.getElementById("nicknameError").innerHTML = jsonObj.nickname;
        document.getElementById("imageError").innerHTML = jsonObj.image;
        document.getElementById("descriptionError").innerHTML = jsonObj.description;
        document.getElementById("createdDateError").innerHTML = jsonObj.createdDate;
        document.getElementById("pointEarnError").innerHTML = jsonObj.pointEarn;
        document.getElementById("departmentIdError").innerHTML = jsonObj.departmentId;
        document.getElementById("recordOtherError").innerHTML = jsonObj.errorMsg;
    }

    otherCRUD.insertSaveOther = function () {

        console.log("otherCRUD.insertSaveOther was called");

        // create a user object from the values that the user has typed into the ppointEarn.
        var myData = getOtherDataFromUI();
        var url = "webAPIs/insertOtherAPI.jsp?jsonDataOther=" + myData;
        ajax(url, processOther, "recordOtherError");

        function processOther(httpRequest) {
            console.log("processOther was called here is httpRequest.");
            console.log(httpRequest);

            // the server prints out a JSON string of an object that holds field level error 
            // message. The error messpointEarn object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
            var jsonObj = httpRequest; // convert from JSON to JS Object.

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            writeErrorObjToUIOther(jsonObj);
        }
    };

    otherCRUD.otherList = function (id) {

         document.getElementById(id).innerHTML = "";
        var dataListOther = document.createElement("div");
        dataListOther.id = "dataListOther"; // set the id so it matches CSS styling rule.
        dataListOther.innerHTML = "<h1 class='logOn' style='left: 45%; color: #003368'>Profile  <a href='#/otherInsert'><img style='position:relative; border: thick solid rgb(39,164,210)' src='icons/insert.png' /></a></h1>";
        dataListOther.innerHTML += "<h3 style='position: relative; top: 80px' id='listMsgOther' class='clickSort'></h3>";
        document.getElementById("content").appendChild(dataListOther);

        ajax('webAPIs/listOtherAPI.jsp', setListUIOther, 'listMsgOther');

        function setListUIOther(httpRequest) {

            console.log("starting otherCRUD.otherList (setListUIOther) with this httpRequest object (next line)");
            console.log(httpRequest);

            var obj = httpRequest;

            if (obj === null) {
                document.getElementById("listMsgOther").innerHTML = "otherCRUD.otherList Error: JSON string evaluated to null.";
                return;
            }

            for (var i = 0; i < obj.otherList.length; i++) {
                obj.otherList[i].image = "<img src="+obj.otherList[i].image+"   style='width: 100%' title="+obj.otherList[i].image+" />";
                obj.otherList[i].delete = "<img src='icons/delete.png'  onclick='otherCRUD.OtherDelete(" + obj.otherList[i].profileId + ",this)' style='width: 50%; height: 100%' />";

                obj.otherList[i].update = "<img onclick='setOTherUI("+obj.otherList[i].profileId+")' src='icons/update.png' style='width: 50%; height: 100%'/>";

                // add a property to each object in otherList - a span tag that when clicked 
                // invokes a JS function call that passes in the web user id that should be deleted
                // from the database and a reference to itself (the span tag that was clicked)
                var id = obj.otherList[i].profileId;

            }
            MakeFilterSortableTable(obj.otherList, "listMsgOther", "profileId");
        }
    };
    function setOTherUI(id){
        console.log(id);
        var setIt=otherCRUD.updateOTherUI("content", id);
    }
    otherCRUD.startUpdate = function (profileSearchId) {

        console.log("startUpdate");

            ajax("webAPIs/getOtherByIdAPI.jsp?profileId=" + profileSearchId, displayOther, "recordError");

            function displayOther(httpRequest) {
                
                var obj = httpRequest;
                console.log(obj);
                console.log(obj.otherList[0].userEmail);
                if (obj.otherList[0].errorMsg.length > 0) {
                    document.getElementById("recordError").innerHTML = "Database error: " +
                            obj.otherList.errorMsg;
                } else if (obj.otherList[0].profileId.length < 1) {
                    document.getElementById("recordError").innerHTML = "There is no user with id '" +
                            otherId + "' in the database";
                } else if (obj.dbError.length > 0) {
                    document.getElementById("recordError").innerHTML += "<br/>Error extracting the Role List options from the database: " +
                            obj.dbError;
                } else {
                    var userObj = obj.otherList[0];
                    document.getElementById("profileId").value = userObj.profileId;
                    //document.getElementById("otherListId").value = userObj.otherListId;
                    makePickList(obj.otherList, // list of key/value objects for role pick list
                            "webUserId", // key property name
                            "userEmail", // value property name
                            "webUserPickList", // id of dom element where to put role pick list
                            userObj.webUserId); // key to be selected (role id fk in web_user object)
                    
                    document.getElementById("nickname").value = userObj.nickname;
                    document.getElementById("image").value = userObj.image;
                    document.getElementById("description").value = userObj.description;
                    document.getElementById("pointEarn").value = userObj.pointEarn;
                    document.getElementById("createdDate").value = userObj.createdDate;
                    document.getElementById("departmentId").value = userObj.departmentId;
                    
                }
            }
        
    };

    otherCRUD.updateOtherSave = function () {

        console.log("otherCRUD.updateOtherSave was called");
        var myData = getOtherDataFromUI("update");
        console.log(myData);
        var url = "webAPIs/updateOtherAPI.jsp?jsonUpdateOtherData=" + myData;
        ajax(url, processUpdateOther, "recordError");

        function processUpdateOther(httpRequest) {
            console.log("processUpdateOther was called here is httpRequest.");
            console.log(httpRequest);
            console.log(httpRequest.responseText);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fields named exactly 
            // the same as the input data was named. 
            var jsonObj = httpRequest; // convert from JSON to JS Object.
            console.log("here is JSON object (holds error messages.");
            console.log(jsonObj);

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
                setTimeout(() => { var backToList=otherCRUD.otherList("content"); }, 5000);
            }

            writeErrorObjToUIOther(jsonObj);
            

        }
    };
    
    otherCRUD.OtherDelete = function (otherId, icon) {
        if (confirm("Do you really want to delete user " + otherId + "? ")) {

            // Calling the DELETE API. 
            var url = "webAPIs/deleteOtherAPI.jsp?deleteOtherId=" + otherId;
            ajax(url, success, "listMsgOther");

            function success(httpRequest) { // API was successfully called (doesnt mean delete worked)
               
                console.log(httpRequest);
                var obj = httpRequest;
                
                if (obj.errorMsg.length > 0) {
                    
                    alert("foreign key error. Delete connection from assoc table to continue. Full error is [" + obj.errorMsg + "]");
                    //document.getElementById("listMsgOther").innerHTML = obj.errorMsg;
                } else { // everything good, no error means record was deleted
                  
                    alert("id [" + otherId + "] is deleted");

                    // clear any possible previous error message
                    document.getElementById("listMsgOther").innerHTML = ""; 
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
                    var backToList=otherCRUD.otherList("content");
                    
                }
            }
        }
    };



    // remove commas and $ from user entered dollar amount.
    // private helper function, availble to any functions in the IIFE
    function stripDollar(dollar) {
        dollar = dollar.replace("$", ""); // replace $ with empty string
        dollar = dollar.replace(",", ""); // replace comma with empty string
        return dollar;
    }

  // the end of the IIFE

