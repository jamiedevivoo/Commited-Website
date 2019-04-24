$(document.body).ready(function() {

    $(".glitch").each(function(i) {
        var titleText = $(this).text();
        $(this).attr("data-text",titleText);
    });

    $(window).scroll(function() {
        var scrollDistanceFromTop = $(this).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height();
        
        var nearEdge = false;    
        var nearTop = false;
        var nearBottom = false;
        if((scrollDistanceFromTop < Math.min(100,(windowHeight / 2)))) 
           { 
            nearEdge = true;
            nearTop = true;
            nearBottom = false;
           } 
        else if (scrollDistanceFromTop + windowHeight > documentHeight - Math.min(100,(windowHeight / 2)))
            {
                nearEdge = true;
                nearTop = false;
                nearBottom = true;
            }
        else {
                nearEdge = false;
                nearTop = false;
                nearBottom = false;
        }

        if (nearEdge == true) {
            $(".section").each(function(i) {   
                
                if (((scrollDistanceFromTop - (windowHeight / 2)) < ($(this).offset().top)) && 
                    ((scrollDistanceFromTop + windowHeight) > ($(this).offset().top + $(this).outerHeight()))) {
                        if ((nearTop) && ((scrollDistanceFromTop + (windowHeight / 2)) > $(this).offset().top)) {
                            $(this).removeClass("notActive").addClass("active");
                        } else if (nearBottom) {
                            $(this).removeClass("notActive").addClass("active");
                        }
                } else {
                   $(this).removeClass("active").addClass("notActive");
                }
            });
        } else {
            $(".section").each(function(i) {
                var previousSection = $(this).previousSibling,
                    nextSection = $(this).nextSibling,
                    sectionHeight = $(this).outerHeight(),
                    sectionOffset = $(this).offset().top;

                var previousSectionhasLostFocus = false;
                if (previousSection) {
                    if (scrollDistanceFromTop > ($(previousSection).offset().top + ($(previousSection).outerHeight() / 2))) { previousSectionhasLostFocus = true; }
                    else { previousSectionhasLostFocus = false }
                } else {
                    if (scrollDistanceFromTop > (sectionOffset - (windowHeight / 2))) { previousSectionhasLostFocus = true; }
                    else { previousSectionhasLostFocus = false }            
                }

                if ((previousSectionhasLostFocus) && (scrollDistanceFromTop < (sectionOffset + sectionHeight))) {
                    $(".section.active").addClass("notActive").removeClass("active");
                    $(this).removeClass("notActive").addClass("active");
                } else {
                    $(this).removeClass("active").addClass("notActive");
                }
            });
        }
    });
});
//
//        if (distanceFromTop > )
//       var hT = $('.section').offset().top,
//           hH = $('.section').outerHeight(),
//           wH = $(window).height(),
//           wS = $(this).scrollTop();
//        
//       if (wS > (hT+hH-wH)){
//           console.log('section on the view!');
//       }
//    });


function launchCommitted() {
    $("#videoPlayerContainer").addClass("active");
}

$(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
        $("#videoPlayerContainer").removeClass("active");
    }
});