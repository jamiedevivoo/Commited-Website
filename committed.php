<?php 
    $title = "Committed - by Aversion Games";
    $page = "committed";
    include 'includes/head.php'; 
?>
<div class="section hero customImageBackground" style="background-image: url('images/committed@2x.jpg'); background-position: center">
    <?php include 'includes/nav.php'; ?>
    <div class="wrapper">
        <div class="wrapper">
            <div class="component">
                <h2 class="subtitle letter-Spacing glitch alwaysAnimating">YOU ARE NOT ALONE</h2>
                <h1 class="title letter-Spacing committedTitle freezeGlitch">Committed</h1>
                <p class="date">23/04/2019</p>
            </div>
        </div>
        <div class="wrapper">
            <div class="component">
                <button onclick="launchCommitted()" class="primary_cta buttonGlitch">PLAY NOW</button>
            </div>
        </div>
    </div>
</div>
<div class="section">
<!--    <div id="videoPlayerContainer">-->
<!--    <video data-dashjs-player autoplay src="http://committed.devivo.co.uk/test2/config.mpd" muted="muted" controls></video>-->
    <div class="testContainer">
        <video class="videoPlayer" muted="muted" controls loop="true">
<!--            <source src="http://committed.devivo.co.uk/test/config.mpd" type="application/dash+xml">-->
        </video>
<!--    </div>-->
    </div>
</div>
<div class="section customImageBackground padded" style="background-image: url('images/exploreAndEscape.png');">
    <div class="wrapper">
        <div class="component">
            <h2 class="letter-Spacing glitch scaleOnHover">Explore and Escape</h2>
            <p>Search by torchlight for clues to understand the past of Sedgley House. Understand the cause behind the disappearances of young women in the Bournemouth area.</p>
        </div>
        <div class="component"></div>
    </div>
</div>
<div class="section altBackground">
    <div class="wrapper">
        <div class="component vertical-padding">
            <h2 class="letter-Spacing glitch scaleOnHover">Navigation</h2>
            <div class="wrapper">
                <div class="component mini">
                    <video class="loopingCircularInlineVideo" autoplay loop muted playsinline>
                        <source src="media/5.mp4" type="video/mp4">
                    </video>
                    <h3>Non-Linear Story</h3>
                    <p>You will be asked to choose your way around Sedgley House. You have the opportunity to go from room to room and learn more about the disappearance of your friend.</p>
                </div>
                <div class="component mini">
                    <video class="loopingCircularInlineVideo" autoplay loop muted playsinline>
                        <source src="media/6.mp4" type="video/mp4">
                    </video>
                    <h3>Your Controls</h3>
                    <p>To choose a navigation option, you can use your arrow keys, or click/touch on the text prompts on screen or press the onscreen objects. Use which suits you best.</p>
                </div>
                <div class="component mini">
                    <video class="loopingCircularInlineVideo" autoplay loop muted playsinline>
                        <source src="media/3.mp4" type="video/mp4">
                    </video>
                    <h3>Time Out</h3>
                    <p>Some decisions in game may come with a timer. If you can't make a decision in time, it will be made on your behalf, for better or worse.</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="section">
    <div class="wrapper">
        <div class="component large imageContainer">
            <video autoplay loop muted playsinline>
                <source src="media/house.mp4" type="video/mp4">
            </video>
        </div>
        <div class="component large padded">
            <h2 class="letter-Spacing glitch scaleOnHover">SEDGLEY HOUSE</h2>
            <p>Set in an abandoned Boscombe complex you must navigate your way through the property and it's open plan layout. The property has been untouches for over a decade with it's aesthetic being all natural.</p>
        </div>
    </div>
</div>
<div id="videoPlayerContainer">
    <video id="video0" class="videoplayer livePlayer" autoplay>
        <source src="" type="video/mp4">
    </video>

    <div id="interactiveLayer">
        <div id="videoButton" class="play"></div>
    </div>
</div>
<?php include 'includes/footer.php'; ?>