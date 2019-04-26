    <header class="wrapper">
        <div class="component">
            <a href="index.html">
                <p class="title headerTitle">
                    <span><span>AV</span>ERSION</span>
                    <span>GAMES</span>
                </p>
            </a>
            <nav>
                <a <?php if ($page == 'home') { ?>class="active"<?php } ?>href="index.php">Home</a>
<!--                <a href="#" class="expand">Titles</a>-->
                    <a <?php if ($page == 'committed') { ?>class="active"<?php } ?> href="committed.php">Committed</a>
                    <a <?php if ($page == 'admitted') { ?>class="active"<?php } ?> href="admitted.php">Admitted</a>
<!--
                <span>
                    <a href="committed.html">Committed</a>
                    <a href="admitted.html">Admitted</a>
                </span>    
-->
                <a <?php if ($page == 'about') { ?>class="active"<?php } ?> href="about.php">About</a>
                <a <?php if ($page == 'bts') { ?>class="active"<?php } ?> href="bts.php">BTS</a>
            </nav>
        </div>
    </header>