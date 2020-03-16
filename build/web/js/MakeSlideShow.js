
function MakeSlideShow(params) {

// Expecting a parameter object with these properties:
//        slideShowEle: a DOM object to hold the slide show image and buttons,
//        objList: objects with images inside
//        picPropName: "image" 
//        DID NOT IMPLEMENT: picCaptionName (field name of caption)

    if (!params) {
        alert("MakeSlideShow requires a parameter object");
        return;
    }
    if (!params.slideShowEle) {
        alert("MakeSlideShow requires a parameter object with 'slideShowEle' property (DOM object where slide show is to be created).");
        return;
    }
    if (!params.objList || !params.objList[0] || !params.picPropName || !params.caption) {
        alert("MakeSlideShow requires a parameter object with 'objList' property (array of objects)" +
                " and each object must have an image file name specified by property 'picPropName' and 'caption'");
        return;
    }

    // slideShowEle is the DOM object that will hold the SlideShow image and the buttons.
    var slideShowEle = params.slideShowEle;
    slideShowEle.classList.add("slideShow");
    

    var objList = params.objList;
    var picPropName = params.picPropName;
    var caption=params.caption;
    
    //these property doesnt need to be included, but helps for customization, add them in slideShow.js
    var imageWidth=params.imageWidth;
    var imageHeight=params.imageHeight;
    var border=params.border;
    var borderLeft=params.borderLeft;
    var borderRight=params.borderRight;
    var borderTop=params.borderTop;
    var borderBottom=params.borderBottom;
    var borderImageSlice=params.borderImageSlice;
    var borderImage=params.borderImage;
    var borderRadius=params.borderRadius;

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShowEle.appendChild(div);

    // add image into the div & set the image's src attribute to the 1st picture in the list
    var myImage = document.createElement("img");
    div.append(myImage);
    var myCaption = document.createElement("p");
    div.append(myCaption);

    // add back button under the image (and space between buttons)
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; "; // HTML code for the less than sign.
    slideShowEle.appendChild(backButton);

    // add forward button after back button and space
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; "; // HTML code for the greater than sign.
    slideShowEle.appendChild(fwdButton);

    // Private variable that keeps track of which image is showing
    var picNum = 0;
    updatePic();

    // Private method to advance to next image in the picture list
    function nextPic() {
        picNum++;
        if (picNum >= objList.length) {
            picNum = 0;
        }
        // change the src attribute of the image element to the desired new image)				
        updatePic();
    }

    // Private method to go back to the previous image in the picture list
    function prevPic() {
        picNum--;
        if (picNum < 0) {
            picNum = objList.length - 1;
        }
        // change the src attribute of the image element to the desired new image)				
        updatePic();
    }

    // Whenever anyone clicks the back button, make the prevPic method run
    // Whenever anyone clicks the fwd button, make the nextPic method run
    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;

    // Example of a public method that the HTML coder can invoke when/if they want to 
    slideShowEle.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < objList.length)) {
            picNum = newNum;
            
            // change the src attribute of the image element to the desired new image)				
            updatePic();
            
        }
    };
    slideShowEle.getPicNum = function (){
        console.log("this is pic num: "+picNum);
        return picNum;
    };
    
    slideShowEle.sizeChange = function (){
        console.log("this is pic height: "+imageHeight+ " ,width: "+ imageWidth);
        myImage.style.height=imageHeight; 
        myImage.style.width= imageWidth;
    };
    
    slideShowEle.borderSizeChange = function (){
        console.log("this is border"+border);
        //note about border: can't get more than 1 style for 1 border property. The basic property order is: [width style color]
        myImage.style.border=border;
        myImage.style.borderLeft=borderLeft;
        myImage.style.borderRight=borderRight;
        myImage.style.borderTop=borderTop;
        myImage.style.borderBottom=borderBottom;
    };
    
    slideShowEle.borderCustomize = function (){
        myImage.style.border="5px solid transparent";
        myImage.style.padding="5px";
        console.log("this is borderImage: "+borderImage);
        myImage.style.borderImageSlice=borderImageSlice;
        myImage.style.borderImage="url("+borderImage+") 150 repeat";
        myImage.style.borderRadius=borderRadius;
    };
    

    function updatePic() {
        var obj = objList[picNum];
        myImage.src = obj[picPropName];
        myCaption.innerHTML = obj[caption];
        
    }

    return slideShowEle;
}