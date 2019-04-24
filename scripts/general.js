    $(document.body).ready(function() {
        
        $(".glitch").each(function(i) {
            var titleText = $(this).text();
            $(this).attr("data-text",titleText);
        });
        
    });

function launchCommitted() {
    $("#videoPlayerContainer").addClass("active");
}

$(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
        $("#videoPlayerContainer").removeClass("active");
    }
});