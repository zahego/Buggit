function home(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var contentHome =
        `
    
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <style>
    [v-cloak]{
                display: none;
            }
    </style>
    
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>    
    <p style="text-align: center">this is a combination of Reddit and Stackoverflow. Let's see if people like if coding meet social media</p>    
    <p style="text-align: center">user can post their coding questions or lessons and earn upvote like a social media website</p>
     <p style="text-align: center"> here is the link to  <a href="https://www.reddit.com/">Reddit</a> and <a href="https://stackoverflow.com/">Stack Overflow</a> </p>
            <div id="front_img">
                <img src="img/stack.png" height="120">
                <b>&nbsp + &nbsp</b>
                <img src="img/reddit.png" height="120">
            </div>
     <p style="text-align: center">additionally, this website will be dubbed as a research outsourcing service, as well as an image classifying simulation</p>
    <script> <p style="text-align: center">additionally, this website will be dubbed as a research outsourcing service, as well as an image classifying simulation</p></script>
    <div id="draggableChatBox">
    <div id="draggableChatBoxHeader">
    Draggable Chat Box
    <div id="line" onclick="showHide()"></div>
    <div class="stopFloat"></div>
    </div>
    <div id="draggableDivVue"  v-show="minimized">
    <div id="draggableChatBoxBody" v-cloak>
    <div v-show="!showText">
    <p>This will be</p>
    <p>chat area</p>
    <p>where you read</p>
    </div>
    <div v-show="showText" v-cloak ><p style="white-space: pre;">{{DisplayDragDiv}}</p></div>
    </div>
    <div id="draggableChatBoxTextArea">
    <input type="text" v-model="textInputDragDiv" class="form-control form-control-lg" placeholder="This is where you input text">
    
    <button type="button" @click.prevent="DragDivFunction(); showTextFunc()">Submit</button>
    <button type="button" @click.prevent="clear()">Clear</button>
    <div class="stopFloat"></div>
    
    </div>
    </div>
    </div>

    `;
        document.getElementById(id).innerHTML = contentHome;
        document.getElementById("draggableChatBox").style.left="80%";
        document.getElementById("draggableChatBox").style.top="56%";
        
        dragElement(document.getElementById("draggableChatBox"));
        function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById(elmnt.id + "Header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
        } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
        e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
        e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
                document.onmousemove = null;
        }
        }
        document.getElementById("line").onmousedown = showHide;
        function showHide() {
         var x = document.getElementById("draggableDivVue");
                if (x.style.display === "none") {
                    x.style.display = "block";
                    } else {
                    x.style.display = "none";
                }
         var x = document.getElementById("line");
                if (x.style.transform === "rotate(90deg)") {
                    x.style.transform = "rotate(0)";
                    } else {
                    x.style.transform = "rotate(90deg)";
                }
        document.getElementById("draggableChatBox").style.left="80%";
        document.getElementById("draggableChatBox").style.top="56%";
            }              
        
        
        var DragVue=new Vue({
            el:'#draggableDivVue',
            data:{
                textInputDragDiv:"",
                DisplayDragDiv:"",
                showText: false,
                minimized:true,
            },
            methods:{
                DragDivFunction: function(){
                    this.DisplayDragDiv+="-"+this.textInputDragDiv+'\n';
                    this.textInputDragDiv="";
                    
                },
            showTextFunc: function(){
                this.showText=true;
            },
            clear: function(){
                if(this.showText){
                this.DisplayDragDiv="";
                this.showText=!this.showText;
            }
            },
            minimize: function(){
                this.minimized=!this.minimized;
            }
        }
        });
}