//API de Youtube.

function dalePlay (entrada){
    
    var tag = document.createElement('script');
            tag.id = "player-" + entrada.media.archivoNombre;
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.querySelector("#player-" + entrada.media.archivoNombre);
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            var player;
            function onYouTubeIframeAPIReady() {
              player = new YT.Player("video-"+entrada.media.archivoNombre , {
                videoId: entrada.media.archivoNombre , 
                fs: '1',
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }
    
}