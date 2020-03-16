var usersView = {};

usersView.display = function (id) {
    
    console.log ("usersView.display function was called");

    var content = `  
        <style>
            /* override size of image from the clicksort.css */
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 40px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
        </style> 
        <h2 style='position:fixed; right:50%; top: 10%; font-size:25px; color: #F65893'>User Data</h2>
        <div id="listUserViewHere" class="clickSort"></div>
    `;
    
    
    ajaxCall("webAPIs/listUsersAPI.jsp", displayUser, displayUserError);

    function displayUser(httpRequest) {
        var obj = JSON.parse(httpRequest.responseText);
        if (obj.webUserList.length === 0) {
            document.getElementById(id).innerHTML = "There is nothing on the list";
        } else if (obj.webUserList[0].errorMsg.length > 0) {
            document.getElementById(id).innerHTML = "Error extracting the Web User from the database: "+obj.webUserList[0].errorMsg;
        } else {
            document.getElementById(id).innerHTML = content;
            var i=0;
            var userList = [];
            for(i=0;i<obj.webUserList.length; i++){
            userList[i] = {};
            // Don't show the id (no meaningful data)
            userList[i].webUserId =  obj.webUserList[i].webUserId;
            userList[i].userEmail = obj.webUserList[i].userEmail; // show this first
            //userList[i].userPassword = obj.webUserList[i].userPassword;// Don't show the password
            userList[i].birthday = obj.webUserList[i].birthday;
            userList[i].membershipFee = obj.webUserList[i].membershipFee;
            userList[i].role = obj.webUserList[i].userRoleId + " " + obj.webUserList[i].userRoleType;
            userList[i].errorMsg = obj.webUserList[i].errorMsg;
        }

        console.log("USER LIST");
        console.log(userList);

        // Making a DOM object, nothing shows yet... 
        MakeFilterSortableTable(userList, "listUserViewHere", "webUserId");
        }
        }

    function displayUserError(httpRequest) {
        this.innerHTML = "Error trying to make the API call: " + httpRequest.errorMsg;
    }

}