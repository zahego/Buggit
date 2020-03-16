function webUser(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
        <div id="listHere" class="clickSort"></div>
    
        
    
        <script>
        console.log("I'm here");

            "use strict"; // turn off the "auto variable declaration" feature of the browser.

            function formatCurrency(num) {
                var myNum = Number(num);
                return myNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
            }
            function addkb(num) {
                var myNum = Number(num);
                return myNum.toString()+"kb";
            }

            // invoke ajax function to read cars.json and if the call was successful, 
            // run function processJSON, otherwise, put an error message in the DOM element 
            // that has id "listHere".
            ajax("json/WebUser.jsonz", processData, "listHere");
    

            function processData(WebUserList) {

                console.log(WebUserList);  

                for (var i = 0; i < WebUserList.length; i++) {
                    //WebUserList[i].MembershipFee = "<img  src='" + WebUserList[i].image + "'>";
                    WebUserList[i].MembershipFee = formatCurrency(WebUserList[i].MembershipFee);
                }

                // Making a DOM object, nothing shows yet... 
                MakeSortableTable(WebUserList, "listHere", "WebUserID");

            }

        </script>
    `;
    document.getElementById(id).innerHTML = content;
}

