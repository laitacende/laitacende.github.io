function loadIMG(url, id) {
    return new Promise (
        function(resolve, reject) {
            var img = document.getElementById(id + "img");
            img.onload  = function(){ resolve(url, id); };
            img.onerror = function(){ reject(url, id); };
            img.src = url;
        }
    );
}

function openForm() {
    document.getElementById("modalform").style.display = "block";
    document.getElementById("selectedimg").setAttribute("value", this.src) // hidden input
}

function closeForm() {
    document.getElementById("modalform").style.display = "none";
}

function closePreview() {
    document.getElementById("modalpreview").style.display = "none";
}

function openPreview() {
    document.getElementById("modalpreview").style.display = "block";
    document.getElementById("previewimg").src = document.getElementById("selectedimg").value;
}

function check() {
    var cols = document.getElementById("nocols").value;
    var rows = document.getElementById("norows").value;

    if (!Number.isInteger(+cols) || !Number.isInteger(+rows) || +cols < 4 || +rows < 4) {
        alert("Wprowadź wartości liczbowe z zakresu od 4!");
    } else {  // start game, input valid
        start();
    }
}

function newGame() {
    document.getElementById("instr1").style.display = "block";
    document.getElementById("gallery").style.display = "flex";
}

function newGameClose() {
    document.getElementById("modalfinish").style.display = "none";
    newGame();
}

window.onload = function() {
    document.getElementById("closeform").onclick = closeForm;
    document.getElementById("startgame").onclick = check;
    document.getElementById("newfinish").onclick = newGameClose;
    document.getElementById("new").onclick = newGame;
    document.getElementById("reset").onclick = resetGame;
    //document.getElementById("reset").addEventListener("touchend", resetGame, false);
    document.getElementById("closepreview").onclick = closePreview;
    document.getElementById("preview").onclick = openPreview;
    for (var i = 1; i <= 12; i++) {
        document.getElementById(i + "img").onclick = openForm;
        loadIMG("images/" + i + ".jpg", i);
    }
}