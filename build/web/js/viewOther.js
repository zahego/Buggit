var othersView = {};

othersView.display = function (id) {
    
    console.log ("othersView.display function was called");

    var content = `  
        <style>
            /* override size of image from the clicksort.css */
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 40px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
        </style> 
        <h2 style='position:fixed; right:50%; top: 10%; font-size:25px; color: #F65893'>Profile</h2>
        <div id="listOtherViewHere" class="clickSort"></div>
    `;
    
    
    ajaxCall("webAPIs/listOtherAPI.jsp", displayUser, displayUserError);

    function displayUser(httpRequest) {
        var obj = JSON.parse(httpRequest.responseText);
        if (obj.otherList.length === 0) {
            document.getElementById(id).innerHTML = "There is no user with loaded";
        } else if (obj.otherList[0].errorMsg.length > 0) {
            document.getElementById(id).innerHTML = "Error extracting the Profile from the database: "+obj.otherList[0].errorMsg;
        } else {
            document.getElementById(id).innerHTML = content;
            var i=0;
            var otherList = [];
            for(i=0;i<obj.otherList.length; i++){
            otherList[i] = {};
            // Don't show the id (no meaningful data)
            otherList[i].profileId =  obj.otherList[i].profileId;
            otherList[i].otherId =  obj.otherList[i].webUserId+"/"+obj.otherList[i].departmentId;
            otherList[i].userEmail =  obj.otherList[i].userEmail;
            otherList[i].nickname = obj.otherList[i].nickname; 
            otherList[i].image = obj.otherList[i].image;
            otherList[i].description = obj.otherList[i].description;
            otherList[i].createdDate = obj.otherList[i].createdDate;
            otherList[i].pointEarn = obj.otherList[i].pointEarn;
            otherList[i].errorMsg = obj.otherList[i].errorMsg;
        }

        console.log("USER LIST");
        console.log(otherList);

        // Making a DOM object, nothing shows yet... 
        MakeFilterSortableTable(otherList, "listOtherViewHere", "profileId");
        }
        }

    function displayUserError(httpRequest) {
        this.innerHTML = "Error trying to make the API call: " + httpRequest.errorMsg;
    }

}