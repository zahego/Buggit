function MakeComingSoon(id) {
    
    var audio= document.createElement("div");
    audio.setAttribute("data-video","BoZnQNtrO2k");
    audio.setAttribute("data-autoplay","1");
    audio.setAttribute("data-loop","1");
    audio.setAttribute("data-volume","0");
    audio.setAttribute("id", "youtube-audio");
    document.getElementById(id).appendChild(audio);
    
    var middleBold = document.createElement("div");
    var middleThin = document.createElement("div");
    var middleBoldp = document.createElement("p");
    var middleThinp1 = document.createElement("p");
    var middleThinp2 = document.createElement("p");
    var timer = document.createElement("div");
    var returnButton = document.createElement("button");
    document.getElementById(id).classList.add("comingSoonBgImg");
    middleBold.classList.add("middleBold");
    middleThin.classList.add("middleThin");
    returnButton.classList.add("bottomLeft");
    middleBold.setAttribute("id", "middle");
    middleThin.setAttribute("id", "middle");
    returnButton.setAttribute("id", "returnHomePage");
    timer.setAttribute("id", "timer");
    timer.classList.add("timer");
    middleBoldp.innerHTML = "Coming Soon Page";
    middleThinp1.innerHTML = "this webpage is under construction. Stay tunes";
    middleThinp2.innerHTML = "timer for this page to go online";
    returnButton.innerHTML = "return to homepage";
    returnButton.onclick = function () {
        parent.location.replace('../../index.html');
    };
    middleBold.appendChild(middleBoldp);
    middleThin.appendChild(middleThinp1);
    middleThin.appendChild(middleThinp2);
    middleThin.appendChild(timer);
    
    
    document.getElementById(id).appendChild(middleBold);
    document.getElementById(id).appendChild(middleThin);
    document.getElementById(id).appendChild(returnButton);
    /* bgImg.appendChild(middleBold);
     bgImg.appendChild(middleThin);*/
    
    var iframe = document.createElement('script');  
    iframe.setAttribute('src','https://www.youtube.com/iframe_api');
    document.head.appendChild(iframe);
    var youtubeScript = document.createElement('script');  
    youtubeScript.setAttribute('src','onYouTubeIframeAPIReady.js');
    document.head.appendChild(youtubeScript);
    
    
    var ele=document.getElementById(id);
    var eleAudio=ele.audio;
    ele.setYoutube=function(params){
        
        audio.setAttribute("data-video",params.video);
        audio.setAttribute("data-autoplay",params.autoplay);
        audio.setAttribute("data-loop",params.loop);
        if(params.volume==='undefined'||params.volume===null){
        audio.setAttribute("data-volume",10);
        }
        else{audio.setAttribute("data-volume",params.volume);}
    };
    ele.setSound=function(volume){
        audio.setAttribute("data-volume",volume);
    };
    ele.setSource=function(video){
        audio.setAttribute("data-video",video);
    };
    ele.halfWidth=function(){
        console.log("this work"+document.getElementsByClassName("comingSoonBgImg"));
        document.getElementsByClassName("comingSoonBgImg")[0].style.width="50% !important";
    };


    
    ele.timerFunc =function() {
        var countDownDate = new Date("Jan 2, 2021").getTime();

// Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            /*document.getElementById("timer").innerHTML = days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ";*/
            for(var i=0; i<document.getElementsByClassName("timer").length;i++){
                document.getElementsByClassName("timer")[i].innerHTML = days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ";
            }

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
            }
        }, 1000);
    }
    ;
}