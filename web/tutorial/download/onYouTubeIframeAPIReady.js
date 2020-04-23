function onYouTubeIframeAPIReady() {
    var e = document.getElementById("youtube-audio");
    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player"), e.appendChild(a);
    var volume =12;
    var setYTVolume=YTsetVolume();
    

    e.onclick = function () {
        r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo()) : (r.playVideo())
    };
    var r = new YT.Player(
            "youtube-player",
            {height: "0",
                width: "0",
                videoId: e.dataset.video, playerVars: {autoplay: e.dataset.autoplay, loop: e.dataset.loop},
                events:
                        {onReady: function (e) {
                                r.setVolume(volume);
                                r.setPlaybackQuality("small");
                            },
                            onStateChange: function (e) {
                                e.data === YT.PlayerState.ENDED;
                            }}})

    function YTsetVolume() {
        if (e.dataset.volume === 'undefined' || e.dataset.volume === null) {
            volume = 10;
        } else {
            volume = e.dataset.volume;
        }
    }
}
    
