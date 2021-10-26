<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Aleksandra Gołębiowska</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <!--    <link rel="icon" type="image/png" href="img/favicon.png"/>-->
    <link rel="stylesheet" href="css/styles.css"/>
    <script src="https://kit.fontawesome.com/9d948e6a6d.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=News+Cycle&display=swap" rel="stylesheet">
    <script
            src="https://code.jquery.com/jquery-3.6.0.js"
            integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
            crossorigin="anonymous">
    </script>
</head>
<body>
    <header>
        <nav class="main-nav">
            <div id="icons">
                <div class="icon">
                    <a href="https://github.com/laitacende" target="_blank"><i class="fab fa-github-square"></i></a>
                    <p class="icon-caption">Github</p>
                </div>
                <div class="icon">
                    <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <p class="icon-caption">Linkedin</p>
                </div>
                <div class="icon">
                    <a href="#" target="_blank"><i class="fas fa-envelope"></i></a>
                    <p class="icon-caption">Email</p>
                </div>
                <div class="icon">
                    <a href="https://www.behance.net/aleksgolebiowska" target="_blank"><i class="fab fa-behance-square"></i></a>
                    <p class="icon-caption">Behance</p>
                </div>
            </div>
            <div id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="overlay">
                <ul id="nav-list">
                    <li><a href="index.php" class="active">Work</a></li>
                    <li><a href="about.php" class="">About</a></li>
                </ul>
            </div>
        </nav>


    </header>
    <main>
        <article id="greeting">
            <h1>Hello, I'm Aleksandra Gołębiowska</h1>
            <p>
                I am an amateur web developer/designer, UX designer and Java developer.
            </p>
            <a href="about.php" class="more">Learn more about me</a>
        </article>
        <article class="work-pane">
            <div class="buttons">
                <button id="web">Web development & design</button>
                <button id="ux">UX design</button>
                <button id="android">Android development</button>
                <button id="java">Java development</button>
            </div>
        </article>
    </main>
    <script src="js/index_animations.js"></script>
    <script src="js/menu.js"></script>
</body>
</html>

