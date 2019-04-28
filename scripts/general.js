$(document.body).ready(function() {

//    jQuery("h2").fitText();
    jQuery("h1").fitText(0.8);
    jQuery(".playerChoice").fitText(0.8);
    $(".glitch").each(function(i) {
        var titleText = $(this).text();
        $(this).attr("data-text",titleText);
    });
    function configureMobileView() {
        // if ($(window).height() > $(window).width()) {
        // if ($(".hero header.wrapper .component").width() > $(".hero h2.subtitle").width()) {
          if ($(".hero header.wrapper .component").width() > (($(window).width() / 5) * 3)) {
            $(".hero header.wrapper .component").css("display","block");
        }
        if ($(window).height() > $(window).width()) {
            $(".section.hero").css("font-size","1.2em");
            if (window.devicePixelRatio >= 2) {
                $(".section.hero header").css("font-size","1.2em");
            }
        }
    }
    configureMobileView();

    $(window).scroll(function() {
        var scrollDistanceFromTop = $(this).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height();
        
        var nearEdge = false;    
        var nearTop = false;
        var nearBottom = false;
        if((scrollDistanceFromTop <= Math.min(100,(windowHeight / 2)))) 
           { 
            nearEdge = true;
            nearTop = true;
            nearBottom = false;
           } 
        else if ((scrollDistanceFromTop + windowHeight) >= (documentHeight - Math.min(100,(windowHeight / 2))))
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
                if (((scrollDistanceFromTop - (windowHeight / 2)) <= ($(this).offset().top)) && 
                    ((scrollDistanceFromTop + windowHeight) >= ($(this).offset().top + ($(this).outerHeight() / 2)))) {
                        if ((nearTop) && ((scrollDistanceFromTop + (windowHeight / 2)) >= $(this).offset().top)) {
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
                    sectionHeight = $(this).outerHeight(true),
                    sectionOffset = $(this).offset().top;

                var previousSectionhasLostFocus = false;
                if (previousSection) {
                    if (scrollDistanceFromTop >= ($(previousSection).offset().top + ($(previousSection).outerHeight(true) / 2))) { previousSectionhasLostFocus = true; }
                    else { previousSectionhasLostFocus = false }
                } else {
                    if (scrollDistanceFromTop >= (sectionOffset - (windowHeight / 2))) { previousSectionhasLostFocus = true; }
                    else { previousSectionhasLostFocus = false }            
                }

                if ((previousSectionhasLostFocus) && (scrollDistanceFromTop <= (sectionOffset + sectionHeight))) {
                    $(".section.active").addClass("notActive").removeClass("active");
                    $(this).removeClass("notActive").addClass("active");
                } else {
                    $(this).removeClass("active").addClass("notActive");
                }
            });
        }
        if (scrollDistanceFromTop < 50) {
            $(".section.hero").removeClass("notActive").addClass("active");
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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};