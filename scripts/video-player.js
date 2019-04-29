
//document.addEventListener('DOMContentLoaded', initPlayer);

var body = document.getElementsByTagName("body")[0];










// ------------------------------------------------------------------------------------ //
// #################################################################################### //
// ############### --------------- The Player Object --------------- ################## //
// #################################################################################### //





var player = {
    
    // # REFERENCES & MEMORY # //
    // State Tracking
    created: false,
    initialised: false,
    visible: false,
    state: "uninitialised",
    currentStage: null,
    currentVideo: null,
    currentSelection: null,
    
    // Video
    vObjects: {
        all: [],
        get pilot()     { return findObjectByKey(this.all, 'is_start', true);      },
        get live()      { return findObjectByKey(this.all, 'currentVideo', true);  },
        get queued()    { return findObjectByKey(this.all, 'queued', true);        },
        
        getVideoObjectByID: function(id) {
            var found = this.all.find(function(element) {
                return element == id;
            }); 
            return found
        }
    },
    
    dock: {
        get e() { return player.player.querySelector("#choiceSelection"); },
        
        visible: false,
        
        show: function() {
            this.visible = true;
            $(this.e).addClass('active');
            $(player.interactiveLayer).addClass('bordered');
        },
    
        hide: function() {
            this.visible = false;
            $(this.e).removeClass('active');
            $(player.interactiveLayer).removeClass('bordered');
        },
            
    },
    choices: [], 

    // Other
    flags: [],
    restarts: 0,
        
    
    
    
    
    // # GETTERS # //
    // Significant Containers
    get container()         { return document.querySelector("div.filmContainer");       },
    get player()            { return this.container.querySelector("div.filmPlayer");    },    
    get splash()            { return this.container.querySelector("playerSplash");      },    
    get interactiveLayer()  { return this.player.querySelector("#interactiveLayer");    },    
    
    // DOM Binded Elements
    binded: {
        get choices()   { return player.dock.e.getElementsByClassName("playerChoice");  },
        get videos()    { return player.player.getElementsByTagName("video");         },
        get videoWithEarliestStage() {   
            var queue = player.binded.videos,        
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
        get activeVideo() {    
            var queue = player.binded.videos;
            for(var i=0; i < queue.length; i++) {
                if ($(queue[i]).hasClass("active")) {
                    return queue[i];
                }
            }
        },
    },
    
    // Interaction Tracking
    highlightedChoice: {
        get element() {
            return player.dock.e.querySelector(".playerChoice.selected");
        },
        get index() {
            console.log(this.element);
            if ((this.element !== null) && (this.element !== undefined)) {
                return this.element.getAttribute("data-stageid");
            } else {
                return '0';
            }
        },
    },
    

    
    
    
    // # METHODS # //
    loadVideo: function(videoObject) {
        if (typeof videoObject !== 'undefined') {

            var exists;
            for(exists = false, i = 0; i < this.vObjects.all.length && exists == false; i++) {
                if (this.vObjects.all[i].id == videoObject.id) {
                    console.log("⮑ → [Video is already loaded] ❌ ");
                    exists = true;
                    break;
                }
            }

            if (exists == false) {
                videoObject.e = createVideoElement(videoObject);
                this.vObjects.all.push(videoObject);
            }
        }
    },
    
    queue: function(videoObject) {
        
    },
    
    play: function(videoObject) {
        if (typeof videoObject == 'undefined') {
            this.vObjects.live.e.play();
            this.vObjects.live.currentVideo = true;
        } else {
            this.vObjects.all.forEach( function(vObject) { 
                vObject.currentVideo = false; 
                vObject.e.pause()
            });
            
            $(this.binded.videos).removeClass("active");
            
            $(videoObject.e).removeClass("queued").addClass("active");
            videoObject.e.play();
            videoObject.currentVideo = true;
            this.currentVideo = videoObject.id;
            this.currentStage = videoObject.stage;
        }
        this.player.focus();
    },
    
    pause: function() {
        this.vObjects.live.e.pause();
    }
}










// -------------------------------------------------------------------------------------------- //
// ############################################################################################ //
// ############### --------------- First and last Responders --------------- ################## //
// ############################################################################################ //





// Launch the film
function launchCommitted() {
    
    console.log("[New Request to Launch Player] ... ");
    
    // 1) Check if player is already launched
    if (player.visible == true) {
        console.log("🚧 [Player Already Visible]");
    }
    
        // 2) Check player is created
        else if (player.created == false) {
            console.log("🚧 [Player Doesn't Exist]");
            createPlayer(function() {    
                launchCommitted();
            });
        }
    
        // 3) Check player is initialised
        else if (player.initialised == false) {
            console.log("🚧 [Player Isn't Initialised]");
            initPlayer(function() {    
                launchCommitted();
            });
        }
    
        // 4) If both are initialised, continue with the launch.
        else if (player.initialised == true && player.created == true) {
            console.log("[Player is Ready] ✅ ");

            $(player.container).addClass("active");
            $(body).addClass("filmLaunched");
            player.state = "launched";

            // Request Fullscreen
            requestFullscreen();

            player.visible = true;
            $(player.player).focus();

            // Then set the url parameters
            if (player.visible = true && history.pushState) {
              var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?state=launchedCommitted';
              window.history.pushState({path:newurl},'',newurl);
            }
        }
}





// Exit the film
function exitCommitted() {
    
    console.log("[Exiting Player]");
    
    $(player.container).removeClass("active");    
    $(body).removeClass("filmLaunched");
    player.state = "closed";
    
    if (history.pushState) {
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?state=exitedCommitted';
          window.history.pushState({path:newurl},'',newurl);
    }
    
    player.visible = false;
}










// ------------------------------------------------------------------------------------ //
// #################################################################################### //
// ############### --------------- Set the Player up --------------- ################## //
// #################################################################################### //





// Ajax call to add the player to the DOM
function createPlayer(callback) {
    
    if (player.created == false) {
        console.log("⮑ [Creating and Appending Player] 👩‍💻  ... ");
        player.state = "creating";
    
        var filmContainer = document.createElement('div');
        $(filmContainer).addClass("filmContainer")
        filmContainer.setAttribute("data-playerInitialised",false);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("⮑ → [AJAX Call Successful] ✅ ");
                
                filmContainer.innerHTML = this.responseText;
                    player.state = "created";
                    player.created = true;
                
                body.appendChild(filmContainer);
                    player.state = "loaded";
                
                console.log("✅ [Player Created and Appended to DOM]");

                callback();
                }
        };
        xhttp.open("GET", "filmPlayer.php", true);
        xhttp.send();
        console.log("⮑ → [Creating AJAX Call] 👩‍💻  ... ");
    }
    
}





// Set up variables and load initial stage
function initPlayer(callback) {
    
    if (player.created == true && player.initialised == false) {
        console.log("⮑ [Initialising Player] 👩‍💻  ...  ");
        player.state = "initialising";
    
        $(".playerSplash").addClass('show');
        $(".playerSplash button").focus();
        player.container.setAttribute("data-playerInitialised",true);
        
        for(var i=0; i < stages.length; i++) {
            if (stages[i].is_start == true) {
                loadStage(i);
    
                $(".playerSplash").addClass('show');
                player.container.setAttribute("data-playerInitialised",true);
                
                console.log("✅ [Player Initialised]");
                player.state = "initialised";
                player.initialised = true;
                
                callback()
            }
        }
    }
}










// ----------------------------------------------------------------------------------------- //
// ######################################################################################### //
// ############### --------------- Key One Time Functions --------------- ################## //
// ######################################################################################### //





// Start the Film
function startFilm() {
    
    // Request Fullscreen
    requestFullscreen();

    // Remove the Splash Screen    
    $(".playerSplash").removeClass('show');
    setTimeout(function(){
        $(".playerSplash").remove();
    }, 1500);

    startVideo(player.vObjects.pilot);
    
    // Fade the player in
    $(player.player).fadeIn('slow').addClass('active');
    
}










// ------------------------------------------------------------------------------------------ //
// ########################################################################################## //
// ############### --------------- Key Continous Functions --------------- ################## //
// ########################################################################################## //





// Start the provided video
function startVideo(videoObject) {
    console.log("[Request to play Video:",videoObject.id,"] ... ");
    
    switch (videoObject.type) {
        case "decision":
            loadChoicesToDockForDecision(videoObject);
            player.dock.show();
            break;
        case "outcome":
            player.dock.hide();
            break;
        case "static":
            player.dock.hide();
            break;
    }
    
        
    if ((videoObject.flags_set !== null) || (videoObject.flags_set !== undefined)) {
        player.flags.push(videoObject.flags_set);
        console.log("[Setting Flag:",videoObject.flags_set,"]");
    }
    
    player.play(videoObject);
    player.vObjects.live.e.currentTime = 0;
    console.log("[Video Playing:",videoObject.id,"] ✅ ");
}



function loadChoicesToDockForDecision(decisionVideoObject) {     
    player.dock.e.innerHTML = '';
    decisionVideoObject.choices.forEach( function(choice) { 
        player.dock.e.appendChild(choice);
        console.log("⮑ → [Added Choice to DOM:",choice.title,"] ✅ ");
    });
}



// Start the current video
function stopVideo() {
        player.vObjects.live.e.pause();  
}




function nextVideoAfter(oldVideo) {
    
    if (oldVideo.next_stage !== null) {
        loadStage(oldVideo.next_stage);
    }
    if (player.vObjects.getVideoObjectByID([stages[oldVideo.next_stage].video_id]) == null) {
        console.log("video isn't loaded");
    }                
    
    console.log("⮑ → [Next Stage is set:",oldVideo.next_stage,"]");
    if (oldVideo.next_stage !== null) {
        loadStage(oldVideo.next_stage);
    }

    loadStage(oldVideo.next_stage);

    var nextVideo;
    switch (oldVideo.type) {
        case "decision":
            console.log(player.vObjects.getVideoObjectByID(player.vObjects.live.nextVideo));
            nextVideo = player.vObjects.getVideoObjectByID(player.vObjects.live.nextVideo);
            break;
        case "static":
            console.log(player.vObjects.getVideoObjectByID(stages[oldVideo.next_stage].video_id));
            nextVideo = player.vObjects.getVideoObjectByID(stages[oldVideo.next_stage].video_id);
            break;
        case "outcome":
            console.log(stages[oldVideo.next_stage].video_id);
            console.log(oldVideo.next_stage);
            console.log(player.vObjects.getVideoObjectByID(stages[oldVideo.next_stage].video_id));
            nextVideo = player.vObjects.getVideoObjectByID(stages[oldVideo.next_stage].video_id);
            break;
    }
    
    oldVideo.completed = true;
    $(oldVideo).addClass("completed").removeClass("active");
    try {
        player.vObjects.all.forEach( function(video) { 
            if (video.stage < nextVideo.stage) {
                if ((player.player.contains(video.e)) && (video.addedToDOM == true)) {
                    video.e.removeEventListener("ended", livePlayerEnded);
                    player.player.removeChild(video.e);
                    video.addedToDOM = false;
                }
            }
        });
    } catch(err) { console.log("Error", err); }

    loadStage(nextVideo.stage);
    loadStage(nextVideo.stage + 1);
    startVideo(nextVideo);
}





// ------------------------------------------------------------------------------------------------------ //
// ###################################################################################################### //
// ############### --------------- Loaders - Continous Setup Functions --------------- ################## //
// ###################################################################################################### //





// Load the provided stageID
function loadStage(stageIndex) {
    console.log("⮑ [Loading Stage:",stageIndex+".x","] 👩‍💻 ");
    
    var reload;
    
    var stageVideoObject = createVideoObject(stageIndex);
    player.loadVideo(stageVideoObject)
    bindPlayerLayer(stageVideoObject);
            
    if ((stages[stageIndex].outcomes.length) <= 0 || (stages[stageIndex].outcomes[0].video_id == null)) {
        console.log("⮑ → [Stage",stageIndex," has no optional Outcomes, loading next stage instead:",stageVideoObject.next_stage,"] ✅ "); 
        reload = function() {loadStage(stageVideoObject.next_stage) };
    } else {
        console.log("⮑ → [Loading Outcomes for:",stageIndex,"] 🛠 ");
        for(var i=0; i < stages[stageIndex].outcomes.length; i++) {
            var outcomeVideoObject = createVideoObject(stageIndex, i);

            player.loadVideo(outcomeVideoObject)
            bindPlayerLayer(outcomeVideoObject);
            
            stageVideoObject.choices.push(createChoiceFromOptionVideoObject(outcomeVideoObject));
            
        }
        console.log("⮑ → [Outcomes for stage: ",stageIndex," Created] ✅ ");
    }
    
    console.log("⮑ [Stage Created:",stageIndex+".x","] ✅ ");
    
    if (typeof reload !== 'undefined') {
        reload();
    }
}










// ------------------------------------------------------------------------------------------------------ //
// ###################################################################################################### //
// ############### --------------- Binders - Continous Setup Functions --------------- ################## //
// ###################################################################################################### //





// Add the provided video the Player, with the option and stage metadata
function bindPlayerLayer(videoObject, callback) {
//    console.log("⮑ [Binding to DOM, VObject ID:",videoObject.id,"] 👩‍💻 ");

    // 1) Check if video is already in the Player DOM
    var exists;
    for(exists = false, i = 0; i < player.binded.videos.length && exists == false; i++) {
        if (player.binded.videos[i].getAttribute("data-videoid") == videoObject.id) {
            console.log("⮑ → [Video is already in the DOM] ❌ ");
            exists = true;
            break;
        }
    }
    
    if (videoObject.e === null) {
        switch (videoObject.type) {
            case "decision":
                console.log(createVideoObject(videoObject.stage, videoObject.outcome_index));
                videoObject.e = createVideoObject(videoObject.stage);
                break;
            case "outcome":
                console.log(createVideoObject(videoObject.stage, videoObject.outcome_index));
                videoObject.e = createVideoObject(videoObject.stage, videoObject.outcome_index);
                break;
            case "static":
                console.log(createVideoObject(videoObject.stage));
                videoObject.e = createVideoObject(videoObject.stage);
                break;
        }
    }
    
    // 2) If it isn't already in the DOM, add it to the DOM
    if ((exists == false)) {   
        console.log(exists, videoObject.e, videoObject, typeof videoObject.e);
        player.player.appendChild(videoObject.e);
        videoObject.addedToDOM = true;
        console.log("⮑ → [Binded to DOM, VObject ID:",videoObject.id,"] ✅ ");
        
        if (typeof callback !== 'undefined') {
            callback();
        }
    }
}










// ---------------------------------------------------------------------------------- //
// ################################################################################## //
// ############### --------------- Object Builders --------------- ################## //
// ################################################################################## //





// Create Video Object
function createVideoObject(stageIndex, outcomeIndex) {
    
    // Creating Video Objects for Stages
    if ((typeof stageIndex !== 'undefined') && (typeof outcomeIndex === 'undefined')) {
//        console.log("⮑ → [Creating VObject for Stage:",stageIndex+".x","] 🛠 ");
                
        var stage = stages[stageIndex];
        var video = videos[stage.video_id];
        var timeout = false,
            type = 'decision',
            next_stage = null;
        
        if (stage.default_outcome !== null) { timeout = true; }
        
        if (stage.decision == false) { 
            type = 'static';
            console.log(stage,stage.default_outcome, stage.outcomes[stage.default_outcome])
            next_stage = stage.outcomes[stage.default_outcome].next_stage;
        }
        
        var videoObject = {
            id: stage.video_id,
            type: type,
            next_stage: next_stage,
            e: null,
            
            completed: false,

            choices: [],
            
            source:video.source,
            manifest:video.manifest,
            blob: video.lob,
            
            stage: stage.stage_id,
            is_start: stage.is_start,
            is_end: stage.is_end,
            decision: stage.decision,
            timeout: timeout,
            default_outcome: stage.default_outcome,
        }
        console.log("⮑ → [Created VObject for Stage:",stageIndex+".x","] ✅ ");
        return videoObject;
    } 
    
    // Creating Video Objects for Outcomes.
    else if ((typeof stageIndex !== 'undefined') && 
             (typeof outcomeIndex !== 'undefined') && 
             ((stages[stageIndex].default_outcome === null) || (stages[stageIndex].outcomes[stages[stageIndex].default_outcome].video_id !== null))
            ) {
//        console.log("⮑ → [Creating VObject for Outcome:",stageIndex+"."+outcomeIndex,"] 🛠 ");
        
        var stage = stages[stageIndex];
        var outcome = stage.outcomes[outcomeIndex];
        var video = videos[outcome.video_id];
        var timeout = false,
            type = 'outcome';
                
        var videoObject = {
            id: video.video_id,
            type: type,
            next_stage: outcome.next_stage,
            e: null,
            
            completed: false,
            
            source:video.source,
            manifest:video.manifest,
            blob: video.lob,
            
            stage: stage.stage_id,
            is_start: stage.is_start,
            is_end: stage.is_end,
            decision: stage.decision,
            timeout: timeout,
            default_outcome: stage.default_outcome,
            
            outcome_index: outcome.outcome_index,
            title: outcome.title,
            flags_required: outcome.flags_required,
            flags_set: outcome.flags_set
        }
        console.log("⮑ → [Created VObject for Outcome:",stageIndex+"."+outcomeIndex,"] ✅ ");
        return videoObject;
    }
}










// ----------------------------------------------------------------------------------- //
// ################################################################################### //
// ############### --------------- Element Builders --------------- ################## //
// ################################################################################### //





// Create a video element for the supplied videoObject
function createVideoElement(videoObject) { // Returns Video Element
    if (typeof videoObject !== 'undefined') {
//        console.log("⮑ → [Creating Video VElement for VObject:",videoObject.id,"] 🛠 ");
        
        var videoElement = document.createElement('video');
            videoElement.controls = false;

            videoElement.src = videoObject.source;
            videoElement.setAttribute("data-videoID",videoObject.id);
            videoElement.setAttribute("data-videoType",videoObject.type);
            videoElement.setAttribute("data-stageID",videoObject.stage);
            $(videoElement).addClass("queued");

            switch (videoObject.type) {
                case "decision":
                    break;
                case "static":
                    break;
                case "outcome":
                    videoElement.setAttribute("data-outcomeID",videoObject.outcome_index);
                    break;
            }
        
            videoElement.addEventListener("ended", livePlayerEnded);
        
        console.log("⮑ → [Created VElement for VObject:",videoObject.id,"] ✅ ");
        return videoElement;
    }
}





function createChoiceFromOptionVideoObject(videoObject) {
    if ((typeof videoObject !== 'undefined') && (videoObject.type == 'outcome')) {
//        console.log("⮑ → [Creating Choice for outcome:",videoObject.outcome_index,"(videoID:",videoObject.id,")] 🛠 ");
        var isChoiceAvailable = true;
        
        if (videoObject.flags_required !== null) {
            if (player.flags.indexOf(videoObject.flags_required[0]) < 0) {
                isChoiceAvailable = false;
            }
        }
          
        if (isChoiceAvailable === true) {
            // Create and add Choice
            var playerChoice = document.createElement('span');
                playerChoice.innerHTML = videoObject.title;
                $(playerChoice).addClass("playerChoice");
                playerChoice.setAttribute("data-outcomeIndex",videoObject.outcome_index);
                playerChoice.setAttribute("data-nextvideoId",videoObject.id);
                playerChoice.setAttribute("data-nextstage",videoObject.stage);

                playerChoice.addEventListener("click", selectingChoiceListener);
                playerChoice.addEventListener("mouseenter", selectingChoiceListener);

                return playerChoice;
        }
    }
}











// -------------------------------------------------------------------------------------------------- //
// ################################################################################################## //
// ############### --------------- Reusable Micro DOM Interactions --------------- ################## //
// ################################################################################################## //





// Highlight the provided Choice Tag
function highlightChoice(choice) {
    var newChoice = player.binded.choices[choice];
    $(".playerChoice").removeClass("selected"); 
    $(newChoice).addClass("selected"); 
}





// Highlight the provided Choice Tag
function lockChoice() {    
    if (player.vObjects.live.type == "decision") {
        var highlightedChoice = player.highlightedChoice.element
        $(highlightedChoice).addClass("locked");
        var optionIndex = highlightedChoice.getAttribute("data-outcomeIndex");
        console.log("[Locking Choice",optionIndex,"]");
        player.vObjects.live.optionIndex = parseInt(optionIndex);
        player.vObjects.live.nextVideo = parseInt(highlightedChoice.getAttribute("data-nextvideoId"));
        player.vObjects.live.next_stage = parseInt(highlightedChoice.getAttribute("data-nextstage"));
        
        $(".choiceSelection .playerChoice:not(.locked)").css({"width":"0","opacity":"0"});
    }
}





// Navigate bvetween binded choices
function navigateOptions(direction) {
    var allBindedChoices = player.binded.choices;
    var highlightedChoiceIndex = player.highlightedChoice.index;
    var allBindedChoices = player.binded.choices;
    console.log("Current Choice: ",highlightedChoiceIndex);
    
    var newChoice;
    switch (direction) {
            
        case "left": console.log("left");
            if ((highlightedChoiceIndex === null) || ((highlightedChoiceIndex - 1) < 0)) 
                { newChoice = 0; } 
            else 
                { newChoice = highlightedChoiceIndex - 1; }
            break;
            
        case "right": console.log("right");
            if ((highlightedChoiceIndex === null) || ((highlightedChoiceIndex + 1) > (allBindedChoices.length - 1))) 
                { newChoice = allBindedChoices.length - 1; } 
            else 
                { newChoice = highlightedChoiceIndex + 1; }
            break;
            
        default:
            newChoice = 0;
    }
    console.log("New Choice: ",newChoice);
    highlightChoice(newChoice);
}





// Request Fullscreen
function requestFullscreen() {
    
    try {
        if(player.container.requestFullscreen) {
            player.container.requestFullscreen();
        }
        else if(player.container.mozRequestFullScreen) {
            player.container.mozRequestFullScreen();
        }
        else if(player.container.webkitRequestFullscreen) {
            player.container.webkitRequestFullscreen();
        }
        else if(player.container.msRequestFullscreen) {
            player.container.msRequestFullscreen();
        }
    } catch(err) { console.log("Error", err); }
}










// ------------------------------------------------------------------------------------ //
// #################################################################################### //
// ############### --------------- Binding Observers --------------- ################## //
// #################################################################################### //








$(document).keyup(function(e) {
    console.log("key pressed");
    switch (e.keyCode) {
        case 27: // Escape
            exitCommitted();
            break;
        case 37: // Left Arrow
            navigateOptions("left");
            break;
        case 39: // Right Arrow
            navigateOptions("right");
            break;
        case 13: // Enter
            lockChoice();
            break;
        case 9: // Tab
            navigateOptions("right");
            break;
    }
});




function selectingChoiceListener(event) {
    console.log(event);
    var choiceIndex = event.target.getAttribute("data-outcomeindex");
    console.log("selecting choice",choiceIndex);  
    
    highlightChoice(choiceIndex);
    
    if (event.type == "click") {
        lockChoice();
    }
}





function livePlayerEnded(event) {
    var videoObject = player.vObjects.getVideoObjectByID(event.target.getAttribute("data-videoid"));

    if (videoObject == player.vObjects.live) {
        console.log("⮑ [Video Ended:",videoObject.id,"] 🛠 ");


        if (videoObject.is_end !==true) {
            console.log("⮑ → [Still more to do]");
            
            if (videoObject.next_stage !== null) {
                nextVideoAfter(videoObject);
            } else {
                event.target.play();
            }
        } else {
            layer.vObjects.live.e.pause();
        }
    }
}






// ------------------------------------------------------------------------------------ //
// #################################################################################### //
// ############### --------------- Video Timechecks --------------- ################### //
// #################################################################################### //





//function timeCheckVideo(moment_id) {
//    var moment_start = moments[moment_id].moment_start;
//    var moment_end = moments[moment_id].moment_end;
//    var timeout = moments[moment_id].timeout;
//
//    console.log(moment_start,moment_end, timeout);
//    if (filmPlayer.currentTime > moment_start && user_choice === null) {
//        console.log("video player passed moment start.");
//        $('.hotspot').css({'display':'block'});
//    }
//
//    if (filmPlayer.currentTime > moment_end && user_choice === null) {
//        if (timeout === false) {
//            console.log("video player passed moment end. Timeout: False.");
//            filmPlayer.currentTime = moment_start;
//        } else {
//            console.log("video player passed moment end. Timeout: True.");
//            $('.hotspot').css({'display':'none'});
//            $('.hotspot').remove();
//            user_choice = timeout;
//        }
//    }
//}







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











// ----------------------------------------------------------------------------------- //
// ################################################################################### //
// ############### --------------- Generic Methods --------------- ################### //
// ################################################################################### //






function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}