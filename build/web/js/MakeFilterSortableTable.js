function MakeFilterSortableTable(list, id, sortOrderPropName) {

    function jsSort(list, byProperty) {

        // To use the built-in sort method (that is available to any JS array),
        // you pass it a function that compares two of the elements of the array
        // and returns 1, 0 or -1 depending on how the two elements compare with each other.

        list.sort(function (q, z) {  // in line anonymous fn to compare list elements. 
            // returns positive (if first bigger), 0 if equal, negative otherwise.

            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            // By applying the convert function, each string value is converted to the actual data 
            // type, for example "123" is converted to 123. 
            var qVal = convert(q[byProperty]);
            var zVal = convert(z[byProperty]);

            var c = 0;
            if (qVal > zVal) {
                c = 1;
            } else if (qVal < zVal) {
                c = -1;
            }
            console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        } // end of the anonymous comparision function
        );

        // check the string to see what type it is, then return that string converted to the right type 
        // so as to get the sort order correct. 
        function convert(s) {

            if (!s || s.length === 0) {
                //console.log("s is null or empty string");
                return -1;
            }

            // a string that holds a date returns true for isNaN(strDate) (it's not a number)  
            // And it returns false for isNaN(Date.parse(strDate))
            var parsedDate = Date.parse(s);
            if (isNaN(s) && !isNaN(parsedDate)) {
                //console.log(s + " is a Date ");
                return parsedDate;
            } else {
                var tmp = s;
                console.log("tmp is " + tmp);
                tmp = tmp.replace("$", ""); // remove dollar signs
                tmp = tmp.replace(",", ""); // remove commas
                if (isNaN(tmp)) { // if not a number, return what was passed in 
                    //console.log(s + " is a string - convert to uppercase for sorting purposes");
                    return s.toUpperCase();
                } else {
                    //console.log(tmp + " is a number");
                    return Number(tmp);
                }
            }
        } // convert 

    } // jsSort

    // Add data as th or td (based on eleType) to row of HTML table.
    // local function inside of MakeTable
    function addToRow(eleType, row, data, alignment) {
        var ele = document.createElement(eleType);
        ele.innerHTML = data;
        ele.style.textAlign = alignment;
        row.appendChild(ele);
        return ele;  // future code may need a reference to this dom object
    }
    
    function alignment(val) {
              
        // check if date
        var parsedDate = Date.parse(val);
        if (isNaN(val) && (!isNaN(parsedDate))) {
            return "center";
        }
        
        // check if numeric (remove $ and , and then check if numeric)
        var possibleNum = val.replace("$","");
        possibleNum = possibleNum.replace(",","");
        if (isNaN(possibleNum)) {
            return "left";
        } 
        return "right"; // it's a number
        
    } // alignment
    function niceHeading(val){
        val=val[0].toUpperCase()+val.substring(1);
        for(var i=1; i<val.length;i++){
            if(val[i]===val[i].toUpperCase() && val[i-1]!==val[i-1].toUpperCase()){
                var tempBefore=val.substring(0, i);
                var tempAfter=val.substring(i);
                val=tempBefore+" "+tempAfter;
            }
        }
        return val;
    }
    
    
    // return true if any property of obj contains searchKey. Else return false.
    function isToShow(obj, searchKey) {
        if(list.length>1){
        if (!searchKey || searchKey.length === 0) {
            return true; // show the object if searchKey is empty
        }
        var searchKeyUpper = searchKey.toUpperCase();
        for (var prop in obj) {
            var propVal = obj[prop]; // associative array, using property name as if index. 
            console.log("checking if " + searchKeyUpper + " is in " + propVal);
            var propValUpper = propVal.toUpperCase();
            if (propValUpper.includes(searchKeyUpper)) {
                console.log("yes it is inside");
                return true;
            }
        }
        console.log("no it is not inside");
        return false;
    }
    } // isToShow 

    function addDataRows(filterValue) {

        // remove old tbody element if there is one (else you'll get sorted rows added to end of what's there).
        var oldBody = newTable.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            newTable.removeChild(oldBody[0]);
        }

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        newTable.appendChild(tableBody);
        for (var i in list) {
            if (isToShow(list[i], filterValue)) {
                console.log("adding row " + i + " to the HTML table");

                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = list[i];
                for (var prop in obj) {
                    addToRow("td", tableRow, obj[prop], alignment(obj[prop]));
                }
                if(i%2===1){
                    tableRow.style.color="rgb(11,121,187)";
                }
                else{
                    tableRow.style.color="rgb(0,52,104)";
                }

            } else {
                console.log("not adding row " + i + " to the HTML table");
            }
        } // for loop 
    } // addDataRows

    if(list.length>1){
    // Main program of MakeTable
    // Remove whatever was in the element with the given id
    document.getElementById(id).innerHTML = "<p style='color:#EEEEEE; display: inline'>Filter row by: </p>";

    // Create a filter text box for user input and append it.
    var searchInput = document.createElement("input");
    document.getElementById(id).appendChild(searchInput);
}


    

    // Create a new HTML table (DOM object)
    var newTable = document.createElement("table");

    // Create a header for table and put a row in the header
    var tableHead = document.createElement("thead");
    newTable.appendChild(tableHead);
    var tableHeadRow = document.createElement("tr");
    tableHead.appendChild(tableHeadRow);

    // create one column header per property with column header content
    // matching the property name
    var obj = list[0];
    for (var prop in obj) {
        var colHead = addToRow("th", tableHeadRow, niceHeading(prop), alignment(obj[prop]));
        colHead.onclick = function () {
            MakeFilterSortableTable(list, id, this.innerHTML);
        };
    }

    // Add one row (to HTML table) per element in the array.
    // Each array element has a list of properties that will become 
    // td elements (Table Data, a cell) in the HTML table. 
    var tableBody = document.createElement("tbody");
    newTable.appendChild(tableBody);
    for (var i in list) {
        var tableRow = document.createElement("tr");
        
        tableBody.appendChild(tableRow);
        

        // create one table data <td> content matching the property name
        var obj = list[i];
        for (var prop in obj) {
            addToRow("td", tableRow, obj[prop], alignment(obj[prop]));
        }
        
    }
    if(list.length>1){
    // Initially searchInput.value should be "" and when passing that to 
    // function isToShow should always return meaning all rows will initially show. 
    addDataRows(searchInput.value);

    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addDataRows(searchInput.value);
        
    };
}
    console.log("function MakeFilterSortableTable called sorting by " + sortOrderPropName);
    jsSort(list, sortOrderPropName);

    // The DOM object (htmlTable) will not show unless you attach it somewhere on the page.
    //document.getElementById(id).innerHTML = ""; // blank out the target DOM object
    document.getElementById(id).appendChild(newTable);

}  // MakeTable