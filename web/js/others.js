
// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var others = {};

others.display = function (id) {
    
    console.log ("others.display function was called");

    var content = `  
        <style>
            /* override size of image from the clicksort.css */
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 100px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
        </style> 
        <div id="listHere" class="clickSort"></div>
    `;
    
    document.getElementById(id).innerHTML = content;

    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processJSON, otherwise, put an error message in the DOM element 
    // that has id "listHere".
    ajax("json/allOthers.json", processData, "listHere");

    function processData(list) {

        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var otherList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < list.length; i++) {

            otherList[i] = {};
            // Don't show the id (no meaningful data)
            otherList[i].image = "<img  src='" + list[i].image + "'>";
            otherList[i].nickname = list[i].nickname;
            otherList[i].userEmail = list[i].userEmail; // show this first
            // Don't show the password
            otherList[i].createDate = list[i].createDate;
            otherList[i].membershipFee = list[i].membershipFee;
            otherList[i].pointEarn = list[i].pointEarn;
            otherList[i].description = list[i].description;
        }

        console.log("OTHER LIST");
        console.log(otherList);

        // Making a DOM object, nothing shows yet... 
        MakeFilterSortableTable(otherList, "listHere", "nickname");
    }
};