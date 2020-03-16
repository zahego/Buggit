function home(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var contentHome =
        `
    <style>
    [v-cloak]{
                display: none;
            }
    </style>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
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
    <div id="draggableChatBoxHeader">Draggable Chat Box</div>
    <div id="draggableDivVue">
    <div id="draggableChatBoxBody" v-cloak>
    <div v-show="!showText">
    <p>This will be</p>
    <p>chat area</p>
    <p>where you read</p>
    </div>
    <div v-show="showText" v-cloak><p>{{DisplayDragDiv}}</p></div>
    </div>
    <div id="draggableChatBoxTextArea">
    <input type="text" v-model="textInputDragDiv" class="form-control form-control-lg">
    <button type="button" @click="showTextFunc" class="btn btn-primary" style="width:100%; border-radius:0; background-color:#0C79BC">Submit</button>
    </div>
    </div>
    </div>

    `;
        document.getElementById(id).innerHTML = contentHome;
        document.getElementById("draggableChatBox").style.left="80%";
        document.getElementById("draggableChatBox").style.top="70%";
        
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
        
        var DragVue=new Vue({
            el:'#draggableDivVue',
            data:{
                textInputDragDiv:"This is where you input text",
                DisplayDragDiv:"This will be chat area where you read",
                showText: false
            },
            methods:{
                DragDivFunction: function(event){
                    event.preventDefault();
                    this.DisplayDragDiv+=this.textInputDragDiv;
                }
            },
            showTextFunc: function(event){
                event.preventDefault();
                this.showText=true;
            }
        });
}