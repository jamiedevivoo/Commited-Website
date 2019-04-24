$( document ).ready(function() {
        
    console.log('ready');
    
    // VARIABLES
    var videoPlayer = $("video.videoplayer").get(0),
        user_choice = null,
        current_video;
    var videos = [
            {
                video_id:0,
                source:'film/1-1s.mp4',
                moment_id:0,
                start: true,
                end: false,
                blob: null
            },
            {
                video_id:1,
                source:'film/1s.mp4',
                moment_id:1,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id:2,
                source:'film/1s-2-2s.mp4',
                moment_id:2,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id:3,
                source:'film/2s.mp4',
                moment_id:3,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id:4,
                source:'film/2s-2.1-2.1s.mp4',
                moment_id:4,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id:5,
                source:'film/2.1s.mp4',
                moment_id:5,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id:6,
                source:'film/2.1s-3-3s.mp4',
                moment_id:6,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id:7,
                source:'film/3s.mp4',
                moment_id:7,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 8,
                source:'film/3s-3a-5-5s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 9,
                source:'film/3s-3b-5-5s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 10,
                source:'film/2.1s-4-4s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 11,
                source:'film/4s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 12,
                source:'film/4s-4a-5-5s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 13,
                source:'film/4s-4b-5-5s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 14,
                source:'film/5s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 15,
                source:'film/5s-5a-6-6s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 16,
                source:'film/5s-5b-6-6s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 17,
                source:'film/6s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 18,
                source:'film/6s-7-7s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 19,
                source:'film/7s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 20,
                source:'film/7s-7a-9-10s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 21,
                source:'film/7s-7b-9-10s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 22,
                source:'film/6s-8-8s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 23,
                source:'film/8s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 24,
                source:'film/8s-8a-9-10s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 25,
                source:'film/8s-8b-9-10s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 26,
                source:'film/10s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 27,
                source:'film/10s-10.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 28,
                source:'film/11s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 29,
                source:'film/11x.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 30,
                source:'film/11y.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 31,
                source:'film/11z.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 32,
                source:'film/11zalt.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 33,
                source:'film/12s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 34,
                source:'film/12x.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 35,
                source:'film/12y.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 36,
                source:'film/12z.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 37,
                source:'film/13s.mp4',
                moment_id:8,
                start: false,
                end: false,
                blob: null
            },
            {
                video_id: 38,
                source:'film/13y.mp4',
                moment_id:8,
                start: false,
                end: true,
                blob: null
            },
            {
                video_id: 39,
                source:'film/13z.mp4',
                moment_id:8,
                start: false,
                end: true,
                blob: null
            }
        ];
    var moments = [
            {
                moment_id: 0,
                moment_start: 0,
                moment_end: 4,
                timeout: false,
                options: [
                    {
                        index: 0,
                        option_id:0,
                        video_id:5,
                        available: true,
                        top:10,
                        left:10,
                        right:55,
                        bottom:10
                    },
                    {
                        index: 1,
                        option_id:1,
                        video_id:1,
                        available: true,
                        top:10,
                        left:55,
                        right:10,
                        bottom:10
                    }
                ]
            },
            {
                moment_id: 1,
                moment_start: 31,
                moment_end: 36,
                timeout: false,
                options: [
                    {
                        index: 0,
                        option_id:2,
                        video_id:4,
                        available: true,
                        top:5,
                        left:5,
                        right:55,
                        bottom:55
                    },
                    {
                        index: 1,
                        option_id:3,
                        video_id:3,
                        available: true,
                        top:5,
                        left:55,
                        right:5,
                        bottom:55
                    },
                    {
                        index: 2,
                        option_id:4,
                        video_id:2,
                        available: true,
                        top:55,
                        left:5,
                        right:5,
                        bottom:0
                    },
                ]
            },
            {
                moment_id: 2,
                moment_start: 15,
                moment_end: 20,
                timeout: false,
                options: [
                    {
                        index: 0,
                        option_id:5,
                        video_id:4,
                        available: true,
                        top:5,
                        left:5,
                        right:55,
                        bottom:55
                    },
                    {
                        index: 1,
                        option_id:6,
                        video_id:3,
                        available: true,
                        top:5,
                        left:55,
                        right:5,
                        bottom:55
                    },
                    {
                        index: 2,
                        option_id:7,
                        video_id:3,
                        available: true,
                        top:55,
                        left:5,
                        right:5,
                        bottom:0
                    },
                ]
            },
            {
                moment_id: 3,
                moment_start: 22,
                moment_end: 27,
                timeout: false,
                options: [
                    {
                        index: 0,
                        option_id:8,
                        video_id:4,
                        available: true,
                        top:5,
                        left:5,
                        right:55,
                        bottom:55
                    },
                    {
                        index: 1,
                        option_id:9,
                        video_id:3,
                        available: true,
                        top:5,
                        left:55,
                        right:5,
                        bottom:55
                    },
                    {
                        index: 2,
                        option_id:10,
                        video_id:2,
                        available: true,
                        top:55,
                        left:5,
                        right:5,
                        bottom:0
                    },
                ]
            },
            {
                moment_id: 4,
                moment_start: 16,
                moment_end: 21,
                timeout: false,
                options: [
                    {
                        index: 0,
                        option_id:11,
                        video_id:5,
                        available: true,
                        top:10,
                        left:10,
                        right:55,
                        bottom:10
                    },
                    {
                        index: 1,
                        option_id:12,
                        video_id:1,
                        available: true,
                        top:10,
                        left:55,
                        right:10,
                        bottom:10
                    }
                ]
            },
            {
                moment_id: 5,
                moment_start: 20,
                moment_end: 26,
                timeout: 6,
                options: [
                    {
                        index: 0,
                        option_id:13,
                        video_id:7,
                        available: true,
                        top:10,
                        left:10,
                        right:55,
                        bottom:10
                    },
                    {
                        index: 1,
                        option_id:14,
                        video_id:8,
                        available: true,
                        top:10,
                        left:55,
                        right:10,
                        bottom:10
                    }
                ]
            },
            {
                moment_id: 6,
                moment_start: null,
                moment_end: null,
                timeout: false,
                options: null
            },
            {
                moment_id: 7,
                moment_start: null,
                moment_end: null,
                timeout: false,
                options: null
            },
            {
                moment_id: 8,
                moment_start: null,
                moment_end: null,
                timeout: false,
                options: null
            }
        ];
        
        // const mediaSource = new MediaSource();
        // const video = document.createElement('video');
        // try {
        //     video.srcObject = mediaSource;
        // } catch (error) {
        //     video.src = URL.createObjectURL(mediaSource);
        // }
        
        function bufferVideo(url, i) {
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.responseType = 'blob';
            
            req.onerror = function() {
                // Error
                console.log(error);
                return;
            }
            
            req.onload = function() {
                // Onload is triggered even on 404 so we need to check the status code
                if (this.status === 200) {
                    var videoBlob = this.response;
                    
                    // Video is now downloaded
                    videos[i].blob = URL.createObjectURL(videoBlob); // IE10+
                }
            }
    
            req.send();
        }


        
        for(var i=0; i < videos.length; i++) {
            bufferVideo(videos[i].source, i);
            console.log(videos[i]);
        }

        // FUNCTIONS
        function videoLoad(video_id) {
            moment_id = videos[video_id].moment_id;
            if (videos[video_id].blob) {
                videoPlayer.src = videos[video_id].blob;
            } else {
                console.log("Blob doesn't exist, loading source.");
                videoPlayer.src = videos[video_id].source;
            }
            videoPlayer.play();
            user_choice = null;
            current_video = video_id;
            
            console.log("CURRENT VIDEO:"+current_video);
            
            var interactiveLayer = $('#interactiveLayer').get(0);
           
            if (moments[moment_id].options !== null) {
                console.log("Video has options. loading options.")
                
                for (i=0;i < moments[moment_id].options.length; i++) {
                    var option = moments[moment_id].options[i];
                    var option_id = moments[moment_id].options[i].option_id;
    
                    if (option.available === true) {
                        option = document.createElement('div');
                        option.setAttribute("id", "option"+option_id);
                        option.setAttribute("class", "hotspot");
                        option.setAttribute('data-targetVideo', moments[moment_id].options[i].video_id);
                        option.setAttribute("style", "top: "+moments[moment_id].options[i].top+"%; bottom: "+moments[moment_id].options[i].bottom+"%; left: "+moments[moment_id].options[i].left+"%; right: "+moments[moment_id].options[i].right+"%");
                        interactiveLayer.appendChild(option)
                    }
                }
                videoPlayer.ontimeupdate = function() {
                    timeCheckVideo(moment_id);
                }
            } else {
                videoPlayer.ontimeupdate = function() {
                    console.log("no time checks");
                }
            }
            
        }
        
        function timeCheckVideo(moment_id) {
            var moment_start = moments[moment_id].moment_start;
            var moment_end = moments[moment_id].moment_end;
            var timeout = moments[moment_id].timeout;
            
            console.log(moment_start,moment_end, timeout);
            if (videoPlayer.currentTime > moment_start && user_choice === null) {
                console.log("video player passed moment start.");
                $('.hotspot').css({'display':'block'});
            }
            
            if (videoPlayer.currentTime > moment_end && user_choice === null) {
                if (timeout === false) {
                    console.log("video player passed moment end. Timeout: False.");
                    videoPlayer.currentTime = moment_start;
                } else {
                    console.log("video player passed moment end. Timeout: True.");
                    $('.hotspot').css({'display':'none'});
                    $('.hotspot').remove();
                    user_choice = timeout;
                }
            }
        }
        
        // TRIGGERS
        
        $('#videoButton.play').click(function() {
            videoPlayerContainer = $("#videoPlayerContainer").get(0);
            if(videoPlayerContainer.requestFullscreen) {
                videoPlayerContainer.requestFullscreen();
            }
            else if(videoPlayerContainer.mozRequestFullScreen) {
                videoPlayerContainer.mozRequestFullScreen();
            }
            else if(videoPlayerContainer.webkitRequestFullscreen) {
                videoPlayerContainer.webkitRequestFullscreen();
            }
            else if(videoPlayerContainer.msRequestFullscreen) {
                videoPlayerContainer.msRequestFullscreen();
            }
            $('#videoButton.play').hide();
            videoLoad(0);
            
            console.log("Play clicked. Requesting full screen and loading video: 0");
        });
        
        $('#interactiveLayer').on("click", ".hotspot", function(){
            user_choice = $(this).attr("data-targetVideo");
            $('.hotspot').css({'display':'none'});
            console.log("User selected choice: "+user_choice);
            $('.hotspot').remove();
        });
        
        $('video.videoPlayer').on('ended', function() {
            if (videos[current_video].end !==true) {
                console.log("This isn't the end, load next video");
                videoLoad(user_choice);
                console.log("video ended. now player: "+user_chioce);
            } else {
                $('#videoButton.play').show();
                console.log('THE END');
            videoPlayer.src = videos[0].blob;
                videoPlayer.pause();
            }
        });
        
    });