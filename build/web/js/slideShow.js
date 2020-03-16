
function slideShow(id){
    
    console.log ("slideShowy function was called");
    var content = `  
        <div id = "slideShowUser" class ="slideShow" style="float: left; padding-left: 150px;"></div>
        <div id = "slideShowOther" class ="slideShow" style="float: right; padding-right: 150px;"></div> 
        <div style="clear:both;"></div>
    
    `;
        
    document.getElementById(id).innerHTML = content;
    
    
    ajax3({
                url: "json/allWebUsers.json",
                successFn: successWebUser,
                errorEle: document.getElementById("slideShowUser")
            });

    function successWebUser(webUserList) {
                console.log(webUserList);

                var ss = MakeSlideShow({
                    slideShowEle: document.getElementById("slideShowUser"), // id in which to render slideshow,
                    objList: webUserList, // array of objects with image and caption
                    picPropName: "image",
                    caption: "userEmail",
                    borderImage: "img/reddit.png"
                });
                document.getElementById("slideShowUser").sizeChange();
                document.getElementById("slideShowUser").borderCustomize();
            }
    ajax3({
                url: "json/allOthers.json",
                successFn: successOther,
                errorEle: document.getElementById("slideShowOther")
            });
    function successOther(otherList) {
                console.log(otherList);
                //for (var i = 0; i < otherList.length; i++) {
                //    otherList[i].make = otherList[i].make+ "  $"+otherList[i].price;
                //}
                

                var ss = MakeSlideShow({
                    slideShowEle: document.getElementById("slideShowOther"), // id in which to render slideshow,
                    objList: otherList, // array of objects with image and caption
                    picPropName: "image",
                    caption: "userEmail",
                    borderLeft: "10px double #F65893",
                    borderRight: "5px dotted #1B80B6",
                    borderRadius: "25%",
                    imageWidth: "280px",
                    imageHeight: "280px"
                });
                document.getElementById("slideShowOther").sizeChange();
                document.getElementById("slideShowOther").borderSizeChange();
                
                
            }

    
    
}

