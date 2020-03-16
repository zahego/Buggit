var logOff={};
logOff.UI=function (id) {
    
 var target = document.getElementById(id);
 var URL = "webAPIs/logOffAPI.jsp";
 ajaxCall (URL, processLogoff, processHttpError);
 


function processLogoff(httpRequest) { // this function defined inside of logonFn, local to logonFn
   var stripe=httpRequest.responseText.replace(/"/g, '');
 target.innerHTML = "<p style ='color:rgb(246,88,147)'>"+stripe+"</p>";
 
 }

 function processHttpError(httpRequest) { // this fn is also private/local to logonFn, good coding style
 target.innerHTML = "LogOff API call failed: " + httpRequest.errorMsg;
 }
};

