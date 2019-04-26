//function initApp() {
//  // Install built-in polyfills to patch browser incompatibilities.
//  shaka.polyfill.installAll();
//
//  // Check to see if the browser supports the basic APIs Shaka needs.
//  if (shaka.Player.isBrowserSupported()) {
//    // Everything looks good!
//    initPlayer();
//  } else {
//    // This browser does not have the minimum set of APIs we need.
//    console.error('Browser not supported!');
//  }
//}
//
//
//
//function initPlayer() {
//    // Create a Player instance.
//    var videoPlayer = document.getElementById('videoPlayer');
//    var player = new shaka.Player(videoPlayer);
//
//    // Attach player to the window to make it easy to access in the JS console.
//    window.player = player;
//
//    // Listen for error events.
//    player.addEventListener('error', onErrorEvent);
//
//    // Try to load a manifest.
//    // This is an asynchronous process.
//    var mpdUrl = videos[0].manifest;
//    var estimator = new shaka.util.EWMABandwidthEstimator();
//    var source = new shaka.player.DashVideoSource(mpdUrl, null, estimator);
//    player.load(source).then(function() {
//        // This runs if the asynchronous load is successful.
//        console.log('The video has now been loaded!');
//    }).catch(onError);  // onError is executed if the asynchronous load fails.
//    }
//
//function onErrorEvent(event) {
//  // Extract the shaka.util.Error object from the event.
//  onError(event.detail);
//}
//
//function onError(error) {
//  // Log the error.
//  console.error('Error code', error.code, 'object', error);
//}
//
//document.addEventListener('DOMContentLoaded', initApp);

var currentStage;
var videoContainer = $("div.testContainer").get(0);
var videoPlayer = $("video.videoPlayer").get(0); 

function initPlayer() {
    console.log("init");
    
        for(var i=0; i < stages.length; i++) {
        if (stages[i].is_start == true) {
            loadStage(i);
        }
    }
        
    // get the first clip
    // set up the choice
    // is it a decision?
        // yes
            // get choice clip
            // get the options for the clip
        // No
            // get the next clip
    // set up players in the background
    // play first clip
}

document.addEventListener('DOMContentLoaded', initPlayer);

function loadStage(stageIndex) {
    var stage = stages[stageIndex];
    var initialVideoID = stage.video_id;
    var initialVideo = videos[initialVideoID];
    var initialVideoSrc = initialVideo.source;
    var isStart = stage.is_start;
    var isEnd = stage.is_end;
    var isDecision = stage.decision;
    var defaultOutcome = stage.defaultOutcome;
    var timeout;
    if (defaultOutcome == undefined) { timeout = false; } else {timeout = true;}
    
    console.log("loaded stage: ",stageIndex,", Start: ",isStart,", End: ",isEnd,", Decision: ",isDecision,", Timeout: ",timeout,", Default: ",defaultOutcome) 
    
    videoPlayer.src = initialVideoSrc;
    loadOptions(stageIndex);
//    if isDecision == true {
//        if timeout == true
//    }
}

function loadOptions(stageIndex) {
    var stage = stages[stageIndex];
    var options = stage.options;

        for(var i=0; i < options.length; i++) {
            var option = stage.options[i]
            var optionVideoID = option.video_id;
            var optionVideo = videos[optionVideoID];
            var optionVideoSrc = optionVideo.source;
            var optionVideoElement = document.createElement('video');
                video.src = optionVideoSrc;
                video.autoplay = false;
                videoContainer.appendChild(video)
        }
}

function createOverlay() {
    // get titles for options
    // position options
}

function showOverlay() {
    
}

function videoPlaying() {
    // Has video ended?
    // 
}

function videoEnded() {
    
}


$( document ).ready(function() {
    
    // Videos and Stages defined in video-db.js
//    var flags = [];
//    var videoPlayer = $("video.videoplayer").get(0);
//    
//    for(var i=0; i < stages.length; i++) {
//        if (stages[i].is_start == true) {
//            var video_id = stages[i].video_id;
//            videoPlayer.src = videos[video_id].source;
//            console.log(videos[video_id].source);
//        }
//    }
    
//    var xhr = new XMLHttpRequest();
//    xhr.responseType = 'blob';
//
//    xhr.onload = function() {
//      var reader = new FileReader();
//
//      reader.onloadend = function() {
//          var byteCharacters = atob(reader.result.slice(reader.result.indexOf(',') + 1));
//
//          var byteNumbers = new Array(byteCharacters.length);
//
//          for (var i = 0; i < byteCharacters.length; i++) {
//              byteNumbers[i] = byteCharacters.charCodeAt(i);
//          }
//          var byteArray = new Uint8Array(byteNumbers);
//          var blob = new Blob([byteArray], {type: 'video/ogg'});
//          var url = URL.createObjectURL(blob);
//          videoPlayer.src = url;
//      }
//      reader.readAsDataURL(xhr.response);
//    };
//
//    xhr.open('GET', videos[video_id].source);
//    xhr.send();
    
//    var blob = new Blob([arrayBufferWithPNG], {type: "image/png"}),
//    url = URL.createObjectURL(blob),
//    img = new Image();
//
//    img.onload = function() {
//        URL.revokeObjectURL(this.src);     // clean-up memory
//        document.body.appendChild(this);   // add image to DOM
//    }
//
//img.src = url; 
//    

    
//    // VARIABLES
//    var videoPlayer = $("video.videoplayer").get(0),
//        user_choice = null,
//        current_video;
//        
//        // const mediaSource = new MediaSource();
//        // const video = document.createElement('video');
//        // try {
//        //     video.srcObject = mediaSource;
//        // } catch (error) {
//        //     video.src = URL.createObjectURL(mediaSource);
//        // }
//        
//        function bufferVideo(url, i) {
//            var req = new XMLHttpRequest();
//            req.open('GET', url, true);
//            req.responseType = 'blob';
//            
//            req.onerror = function() {
//                // Error
//                console.log(error);
//                return;
//            }
//            
//            req.onload = function() {
//                // Onload is triggered even on 404 so we need to check the status code
//                if (this.status === 200) {
//                    var videoBlob = this.response;
//                    
//                    // Video is now downloaded
//                    videos[i].blob = URL.createObjectURL(videoBlob); // IE10+
//                }
//            }
//    
//            req.send();
//        }
//
//
//        
//        for(var i=0; i < videos.length; i++) {
//            bufferVideo(videos[i].source, i);
//            console.log(videos[i]);
//        }
//
//        // FUNCTIONS
//        function videoLoad(video_id) {
//            moment_id = videos[video_id].moment_id;
//            if (videos[video_id].blob) {
//                videoPlayer.src = videos[video_id].blob;
//            } else {
//                console.log("Blob doesn't exist, loading source.");
//                videoPlayer.src = videos[video_id].source;
//            }
//            videoPlayer.play();
//            user_choice = null;
//            current_video = video_id;
//            
//            console.log("CURRENT VIDEO:"+current_video);
//            
//            var interactiveLayer = $('#interactiveLayer').get(0);
//           
//            if (moments[moment_id].options !== null) {
//                console.log("Video has options. loading options.")
//                
//                for (i=0;i < moments[moment_id].options.length; i++) {
//                    var option = moments[moment_id].options[i];
//                    var option_id = moments[moment_id].options[i].option_id;
//    
//                    if (option.available === true) {
//                        option = document.createElement('div');
//                        option.setAttribute("id", "option"+option_id);
//                        option.setAttribute("class", "hotspot");
//                        option.setAttribute('data-targetVideo', moments[moment_id].options[i].video_id);
//                        option.setAttribute("style", "top: "+moments[moment_id].options[i].top+"%; bottom: "+moments[moment_id].options[i].bottom+"%; left: "+moments[moment_id].options[i].left+"%; right: "+moments[moment_id].options[i].right+"%");
//                        interactiveLayer.appendChild(option)
//                    }
//                }
//                videoPlayer.ontimeupdate = function() {
//                    timeCheckVideo(moment_id);
//                }
//            } else {
//                videoPlayer.ontimeupdate = function() {
//                    console.log("no time checks");
//                }
//            }
//            
//        }
//        
//        function timeCheckVideo(moment_id) {
//            var moment_start = moments[moment_id].moment_start;
//            var moment_end = moments[moment_id].moment_end;
//            var timeout = moments[moment_id].timeout;
//            
//            console.log(moment_start,moment_end, timeout);
//            if (videoPlayer.currentTime > moment_start && user_choice === null) {
//                console.log("video player passed moment start.");
//                $('.hotspot').css({'display':'block'});
//            }
//            
//            if (videoPlayer.currentTime > moment_end && user_choice === null) {
//                if (timeout === false) {
//                    console.log("video player passed moment end. Timeout: False.");
//                    videoPlayer.currentTime = moment_start;
//                } else {
//                    console.log("video player passed moment end. Timeout: True.");
//                    $('.hotspot').css({'display':'none'});
//                    $('.hotspot').remove();
//                    user_choice = timeout;
//                }
//            }
//        }
//        
//        // TRIGGERS
//        
//        $('#videoButton.play').click(function() {
//            videoPlayerContainer = $("#videoPlayerContainer").get(0);
//            if(videoPlayerContainer.requestFullscreen) {
//                videoPlayerContainer.requestFullscreen();
//            }
//            else if(videoPlayerContainer.mozRequestFullScreen) {
//                videoPlayerContainer.mozRequestFullScreen();
//            }
//            else if(videoPlayerContainer.webkitRequestFullscreen) {
//                videoPlayerContainer.webkitRequestFullscreen();
//            }
//            else if(videoPlayerContainer.msRequestFullscreen) {
//                videoPlayerContainer.msRequestFullscreen();
//            }
//            $('#videoButton.play').hide();
//            videoLoad(0);
//            
//            console.log("Play clicked. Requesting full screen and loading video: 0");
//        });
//        
//        $('#interactiveLayer').on("click", ".hotspot", function(){
//            user_choice = $(this).attr("data-targetVideo");
//            $('.hotspot').css({'display':'none'});
//            console.log("User selected choice: "+user_choice);
//            $('.hotspot').remove();
//        });
//        
//        $('video.videoPlayer').on('ended', function() {
//            if (videos[current_video].end !==true) {
//                console.log("This isn't the end, load next video");
//                videoLoad(user_choice);
//                console.log("video ended. now player: "+user_chioce);
//            } else {
//                $('#videoButton.play').show();
//                console.log('THE END');
//            videoPlayer.src = videos[0].blob;
//                videoPlayer.pause();
//            }
//        });
        
    });