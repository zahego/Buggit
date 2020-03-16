
var getProfile={};
getProfile.UI=function (id) {
 var content =
        `
   
    <div id="ProfileViewHere" class="clickSort"></div>
    </div>

    `;
        ajaxCall("webAPIs/getProfileAPI.jsp", displayProfile, displayUserError);

    function displayProfile(httpRequest) {
        var obj = JSON.parse(httpRequest.responseText);
        if (obj.webUserList.length === 0) {
            
            document.getElementById(id).innerHTML = "<p style ='color:rgb(246,88,147)'>you are not logged in, log in to show profile<p>";
            
        } 
        else {
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
        MakeFilterSortableTable(userList, "ProfileViewHere", "webUserId");
        }
        }

    function displayUserError(httpRequest) {
        this.innerHTML = "Error trying to make the API call: " + httpRequest.errorMsg;
    }  
    };       
 


