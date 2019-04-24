    $(document.body).ready(function() {
        
        $(".glitch").each(function(i) {
            var titleText = $(this).text();
            $(this).attr("data-text",titleText);
        });
        
    });