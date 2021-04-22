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

function check() {
    var cols = document.getElementById("nocols").value;
    var rows = document.getElementById("norows").value;

    if (!Number.isInteger(+cols) || !Number.isInteger(+rows) || +cols < 4 || +rows < 4) {
        alert("Wprowadź wartości liczbowe z zakresu od 4!");
    } else {  // start game, input valid
        start();
    }
}

window.onload = function() {
    document.getElementById("closeform").onclick = closeForm;
    document.getElementById("startgame").onclick = check;
    for (var i = 1; i <= 12; i++) {
        document.getElementById(i + "img").onclick = openForm;
        loadIMG("images/" + i + ".jpg", i);
    }
}