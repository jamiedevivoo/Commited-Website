//document.addEventListener('DOMContentLoaded', initPlayer);

var body = document.getElementsByTagName("body")[0];
  
// Player Object
var player = {
    
    // REFERENCES & MEMORY
    initialised: false,
    currentStage: {
        id: null,
        video_id: null,

        is_start: null,
        is_end: null,

        decision:null,
        default_outcome: null
    },
    availableOptions: [
        {
            option_index: null,
            title: null,

            flags_required: null,

            video_id: null,
            flags_set: null,

            next_stage: null
        }
    ],
    selectedOption: null,
    activeVideo: {
        id: null,
        type: null      
    },
    queue: [
        {
            element: null,
            video_id: null
        }
    ],
    flags: [],
        
    // GETTERS
    get container() {
        return document.querySelector("div.filmContainer");
    },
    get player() {
        return this.container.querySelector("div.filmPlayer");
    },    
    get interactiveLayer() {
        return this.player.querySelector("#interactiveLayer");
    },    
    get choiceDock() {
        return this.player.querySelector("#choiceSelection");
    },
    get allChoices() {
        return this.choiceDock.getElementsByClassName("playerChoice");
    },    
    get currentChoice() {
        return this.choiceDock.querySelector(".playerChoice.selected");
    },
    get currentChoiceIndex() {    
        var allChoices = player.allChoices;
        for(var i=0; i < allChoices.length; i++) {
            if ($(allChoices[i]).hasClass("selected")) {
                return i;
                }
            }
    },
    get bindedVideos() {
        return this.player.getElementsByTagName("video");
    },
    get bindedVideoWithEarliestStage() {   
        var queue = player.bindedVideos,        
            earliestStage = null,
            stageToBeReturned = null;
        for(var i=0; i < queue.length; i++) {
            var stage = queue[i].getAttribute("data-stageid");
            
            if ((earliestStage === null) || (stage < earliestStage)) {
                earliestStage = stage;
                stageToBeReturned = queue[i];
            }
        }
        return stageToBeReturned;
    },
    get activeBindedVideo() {    
        var queue = player.bindedVideos;
        for(var i=0; i < queue.length; i++) {
            if ($(queue[i]).hasClass("active")) {
                return queue[i];
            }
        }
    },
    get nextVideo() {
        return this.queue[0];
    },
}





function launchCommitted() {
    console.log("Launching Player");
    
    if (player.container == null || player.initialised == false) {
        console.log("Player Doesn't Exist");
        createPlayer();
    }
    
    $(player.container).addClass("active");
    $(body).addClass("filmLaunched");

    if (history.pushState) {
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?state=launchedCommitted';
          window.history.pushState({path:newurl},'',newurl);
    }
    $(player.player).focus();
}





function exitCommitted() {
    console.log("Exiting Player");
    
    $(player.container).removeClass("active");    
    $(body).removeClass("filmLaunched");
    
    if (history.pushState) {
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?state=exitedCommitted';
          window.history.pushState({path:newurl},'',newurl);
    }
}





function createPlayer() {
    console.log("Creating Player");
    
    if (player.container == null) {
        var filmContainer = document.createElement('div');
        $(filmContainer).addClass("filmContainer")
        filmContainer.setAttribute("data-playerInitialised",false);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Player Created");
                filmContainer.innerHTML = this.responseText;
                body.appendChild(filmContainer);
                launchCommitted();
                initPlayer();
            }
        };
        xhttp.open("GET", "filmPlayer.php", true);
        xhttp.send();
    }
}



function initPlayer() {
    console.log("Initialising Player");
    
    for(var i=0; i < stages.length; i++) {
        if (stages[i].is_start == true) {
            loadStage(i);
        }
    }
    
    player.container.setAttribute("data-playerInitialised",true);
    player.initialised = true;
    player.player
}




function loadStage(stageIndex) {
    var stage = stages[stageIndex];
    var initialVideoID = stage.video_id;
    var initialVideo = videos[initialVideoID];
    var isStart = stage.is_start;
    var isEnd = stage.is_end;
    var isDecision = stage.decision;
    var defaultOutcome = stage.default_outcome;
    var timeout;
    
    if (defaultOutcome == undefined || defaultOutcome == null) { timeout = false; } else {timeout = true;}
    
    console.log(stageIndex+".x", " loaded stage: ",stageIndex,"videoId: ",initialVideoID,", Start: ",isStart,", End: ",isEnd,", Decision: ",isDecision,", Timeout: ",timeout,", Default: ",defaultOutcome);
    queuePlayer(videos[initialVideoID],undefined,stage);
        
    if (isDecision == true) {
        loadOptions(stageIndex);
    } else if (isDecision == false) {
        var defaultOption = stage.options[defaultOutcome];
        var nextStage = defaultOption.next_stage;
        loadStage(nextStage);
    }
    
}





function loadOptions(stageIndex) {
    var stage = stages[stageIndex];
    var options = stage.outcome;

        for(var i=0; i < options.length; i++) {
            var option = stage.outcome[i]
            var optionVideo = videos[option.video_id];
            
            console.log(stageIndex+"."+i," loaded option: ",i,", Video ID: ",optionVideo.video_id,", optionVideo: ",optionVideo,", optionVideoSrc: ",optionVideo.source);
            
            // Create and add Choice
            var playerChoice = document.createElement('span');
                playerChoice.innerHTML = option.title;
                $(playerChoice).addClass("playerChoice");
                playerChoice.setAttribute("data-optionIndex",option.option_index);
            
            var dock = player.choiceDock;
                dock.appendChild(playerChoice);
            console.log("Added Choice for: ",option.title);
                        
            // Create and add Video
            queuePlayer(optionVideo,option,stage);
        }
}





function queuePlayer(video, option, stage) {
    
    // Check if video is already in the queue
    var exists;
    for(exists = false, i = 0; i < player.bindedVideos.length && exists == false; i++) {
        if (player.bindedVideos[i].getAttribute("data-videoid") == video.video_id) {
            console.log("Video is already in the queue");
            exists = true;
            break;
        }
    }
    
    // If it isn't already in the queue, create the new video
    if (exists == false) {
        var videoElement = document.createElement('video');
            videoElement.src = video.source;
            videoElement.controls = false;
            videoElement.setAttribute("data-videoID",video.video_id);
            $(videoElement).addClass("queued");
        
            videoElement.setAttribute("data-videoID",video.video_id);
        
            if (typeof stage !== 'undefined') {
                videoElement.setAttribute("data-stageID",stage.stage_id);
                if (stage.decision == true && stage.video_id == video.video_id) {
                    videoElement.setAttribute("loop","loop");
                    videoElement.setAttribute("data-videoType","decision");
                } else {
                    videoElement.setAttribute("data-videoType","static");
                }
            }
            if (typeof option !== 'undefined') {
                videoElement.setAttribute("data-optionID",option.option_index);
                videoElement.setAttribute("data-videoType","option");
                videoElement.setAttribute("data-nextVideo",option.next_stage);
            }
        
        // Add the new video to the page
        var filmPlayer = player.player;
        filmPlayer.appendChild(videoElement);
        console.log("Created Video for: ",video.video_id);
    }
}







function highlightChoice(choice) {
    var newChoice = player.allChoices[choice];
    console.log("highlighting choice: ",newChoice)
    $(".playerChoice").removeClass("selected"); 
    $(newChoice).addClass("selected"); 
}




function navigateOptions(direction) {
    var currentChoiceIndex = player.currentChoiceIndex;
    var allChoices = player.allChoices;
    console.log("currentChoice: ",currentChoiceIndex);
    
    if (typeof currentChoiceIndex == "undefined") {
        console.log("Current Choice Undefined, setting to 0");
        currentChoiceIndex = 0;
    }
    
    var newChoice;
    switch (direction) {
        case "left":
            console.log("left");
            newChoice = currentChoiceIndex - 1;
            break;
        case "right":
            console.log("right");
            newChoice = currentChoiceIndex + 1;
            break;
        default:
            newChoice = 0;
    }
    console.log("New Choice: ",newChoice);
    
    if (newChoice < 0) {
        newChoice = allChoices.length -1;
        console.log("Choice is under 0, setting to: ", newChoice);
    } 
    if (newChoice > allChoices.length -1) {
        newChoice = 0;
        console.log("Choice is over max length, (",allChoices.length,") setting to: ", newChoice);
    }
    highlightChoice(newChoice);
}





function startFilm() {
    $(".playerSplash").fadeOut('slow',function() {
        $(".playerSplash").remove();
        
        var filmContainer = $(player.container);
            if(filmContainer.requestFullscreen) {
                filmContainer.requestFullscreen();
            }
            else if(filmContainer.mozRequestFullScreen) {
                filmContainer.mozRequestFullScreen();
            }
            else if(filmContainer.webkitRequestFullscreen) {
                filmContainer.webkitRequestFullscreen();
            }
            else if(filmContainer.msRequestFullscreen) {
                filmContainer.msRequestFullscreen();
            }
        
        startVideo(player.bindedVideoWithEarliestStage);
        $(".filmPlayer").fadeIn('slow');
    });
}



// Bind Events
function bindInteractionEvents() { 
    
    var allChoices = player.allChocies;
    console.log(allChoices);
    for(var i=0; i < allChocies.length; i++) {
        $(allChoices[i]).click(function() {
                var choiceIndex = $(this).getAttribute("data-optionindex");
                highlightChoice(choiceIndex);
                console.log("click on choice");
        });

       $(allChoices[i]).hover(
            function() {
                console.log(this);
                var choiceIndex = $(this).getAttribute("data-optionindex");
                highlightChoice(choiceIndex);
                console.log("hover on choice");
            }, function() {
            }
        );
    }

    $(document).keyup(function(e) {
        console.log("key pressed");
        switch (e.keyCode) {
            case 27: // Escape
                exitCommitted()
                break;
            case 37: // Left Arrow
                navigateOptions("left");
                break;
            case 39: // Right Arrow
                navigateOptions("right");
                break;
            case 13: // Enter
                console.log("Enter");
                break;
            case 9: // Tab
                navigateOptions("right");
                break;
        }
    });

}


function nextVideo() {
    
}



function bindVideoEvents() {
    console.log($(".filmPlayer video"));
    
   $(player.activeVideoInQueue).on('ended', function() {
       var videoType = this.getAttribute("data-videotype");
       var stageID = this.getAttribute("data-stageid");
       var stage = stages[stageID];
       console.log("End: ",stage);

        if (stage.is_end !==true) {
            console.log("This isn't the end, load next video");
            if (videoType == "option") {
//                var nextVideo = 
                startVideo();
            }
        } else {
            player.activeVideoInQueue.element.pause();
        }
    });
    
}





function startVideo(videoTag) {
    var stageID = videoTag.getAttribute("data-stageid");
    if (stages[stageID].decision == true) {
        var dock = player.choiceDock;
        $(dock).addClass("active");
    } else {
        $(dock).removeClass("active");
    }
    videoTag.play();
    $(videoTag).addClass("active");
    $(videoTag).removeClass("queued");  
    bindVideoEvents()
    bindInteractionEvents()
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
//    var filmPlayer = $("div.filmPlayer video").get(0);
//    
//    for(var i=0; i < stages.length; i++) {
//        if (stages[i].is_start == true) {
//            var video_id = stages[i].video_id;
//            filmPlayer.src = videos[video_id].source;
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
//          filmPlayer.src = url;
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
//    var filmPlayer = $("video.filmPlayer").get(0),
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
//                filmPlayer.src = videos[video_id].blob;
//            } else {
//                console.log("Blob doesn't exist, loading source.");
//                filmPlayer.src = videos[video_id].source;
//            }
//            filmPlayer.play();
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
//                filmPlayer.ontimeupdate = function() {
//                    timeCheckVideo(moment_id);
//                }
//            } else {
//                filmPlayer.ontimeupdate = function() {
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
//            if (filmPlayer.currentTime > moment_start && user_choice === null) {
//                console.log("video player passed moment start.");
//                $('.hotspot').css({'display':'block'});
//            }
//            
//            if (filmPlayer.currentTime > moment_end && user_choice === null) {
//                if (timeout === false) {
//                    console.log("video player passed moment end. Timeout: False.");
//                    filmPlayer.currentTime = moment_start;
//                } else {
//                    console.log("video player passed moment end. Timeout: True.");
//                    $('.hotspot').css({'display':'none'});
//                    $('.hotspot').remove();
//                    user_choice = timeout;
//                }
//            }
//        }
//        
        
    });