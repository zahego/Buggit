
var logOn={};
logOn.UI=function (id) {
 var contentLogOn =
        `
    <div class='logOn'>
    <h1>Enter your email and password</h1>
    <p style="color: rgb(226,211,225))"> sth like email= 123@ho.ho, pswd= 11<p>
    <br/>
    <form style="color: #27A4D2">
    <input type="text" id="logonEmailAddress" placeholder="Email Address"/>
    <br/>
    <input type="password" id="logonPassword" placeholder="Password"/>
    <br/>
    <button type="button" onclick="logOn.findUser('logonEmailAddress','logonPassword','msgArea')">Submit</button>
    <div class="stopFloat"></div>
    </form>
    <br/> <br/>
    <div id="msgArea" class="clickSort"></div>
    </div>

    `;
        document.getElementById(id).innerHTML = contentLogOn;   
    };       
 logOn.findUser=function (emailId, pwId, msgId) {       
 var target = document.getElementById(msgId);
 var emailUserInput = escape(document.getElementById(emailId).value);
 var pwUserInput = escape(document.getElementById(pwId).value); // escape cleans user input
 var URL = "webAPIs/logOnAPI.jsp?email=" + emailUserInput + "&password=" + pwUserInput;
 ajaxCall (URL, processLogon, processHttpError);
 


function processLogon(httpRequest) { // this function defined inside of logonFn, local to logonFn
 var obj = JSON.parse(httpRequest.responseText);
 console.log("this is objject:" +obj.webUserList[0]);
 target.innerHTML = "<br/>";
 if (obj.webUserList.length === 0) {
     if(emailUserInput.length===0||pwUserInput.length===0){
         target.innerHTML = "<p style ='color:rgb(246,88,147)'>Missing email or password input</p>";}
     else{
 target.innerHTML = "<p style ='color:rgb(246,88,147)'>There is no user with email '" + emailUserInput + "' or you have typed the incorrect password  </p>";}
} else if (obj.webUserList[0].errorMsg.length > 0) {
 target.innerHTML += "<p style ='color:rgb(246,88,147)'>Connection was success, however, the Logon API supplied this error message: " + +obj.webUserList[0].errorMsg+"</p>";
 } else {
 target.innerHTML += "<br/><p style ='color:rgb(246,88,147)'>Welcome Web User number " + obj.webUserList[0].webUserId + ", here's your detail: </p>";
 target.innerHTML += "<br/>"; // clear out old content and add new line spacing
                MakeFilterSortableTable(obj.webUserList, msgId, "webUserId", true);
 }
 }

 function processHttpError(httpRequest) { // this fn is also private/local to logonFn, good coding style
 target.innerHTML = "LogOn API call failed: " + httpRequest.errorMsg;
 }
};



