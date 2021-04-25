var _canvas;
var _stage;
var _img;

var _puzzleWidth;
var _puzzleHeight;

var _cols;
var _rows;
var _pieces;
var _empty;

function shuffleArray(arr) { // empty space parity == 2, solvable is permutation is even
    let j = 0;
    let sum = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
        j = parseInt(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // check parity
    for (let i = 0; i < arr.length; i++) {
        for (j = i + 1; j < arr.length; j++) {
            if (arr[j].id < arr[i].id) {
                sum += 1;
            }
        }
    }
    if (sum % 2 === 1) { // add one transposition to change parity
        [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
}

function setCanvas() {
    document.getElementById("cflex").style.display = "flex";
    _canvas = document.getElementById("canv");
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
   // _canvas.style.border = "1px solid black";
   // _stage.drawImage(_img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
}

function loadImg(path) {
    _img = new Image();
    _img.src = path;
}

function makePieces(pieceWidth, pieceHeight) {
    let piece;
    let xPos = 0;
    let yPos = 0;
    _empty = new Piece(pieceWidth, pieceHeight, xPos, yPos, xPos, yPos, -1);
    let counter = 0;
    for (let i = 0; i < _rows; i++) {
        xPos = 0;
        for (let j = 0; j < _cols; j++) {
            if (i + j  !== 0) {
                piece = new Piece(pieceWidth, pieceHeight, xPos, yPos, xPos, yPos, counter);
                _pieces.push(piece);
                counter += 1;
            }
            xPos += pieceWidth;
        }
        yPos += pieceHeight;
    }
}

function shufflePuzzle() {
    _pieces = shuffleArray(_pieces);
    _stage.clearRect(0, 0, _puzzleWidth, _puzzleHeight);
    _stage.fillStyle = "#d54541";
    _stage.fillRect(_empty.xPos, _empty.yPos, _empty.width, _empty.height);
    let piece;
    let xPos = _pieces[0].width;
    let yPos = 0;
    for(let i = 0; i < _pieces.length; i++) {
        piece = _pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        _stage.drawImage(_img, piece.sx, piece.sy, piece.width, piece.height,
                xPos, yPos, piece.width, piece.height);
       xPos += piece.width;
       if (xPos >= _puzzleWidth) {
           xPos = 0;
           yPos += piece.height;
       }
    }
    _pieces.unshift(_empty);
    //document.onclick = movePiece;
    document.onclick = null;
   //  document.onmousemove = highlight;
    // document.ontouchstart = highlight;
    //document.ontouchend = movePiece;
    _canvas.addEventListener('click', movePiece, {passive: false});
    _canvas.addEventListener('mousemove', highlight, {passive: false});
    _canvas.addEventListener('touchstart', highlight, {passive: false});
    _canvas.addEventListener('touchend', movePiece, {passive: false});
}

function getPieceClicked(mouse) {
    let piece;
    for(let i = 0; i < _pieces.length; i++) {
        piece = _pieces[i];
        if (piece.id !== -1 && (mouse.x > piece.xPos && mouse.x < piece.xPos + piece.width)
            && (mouse.y > piece.yPos && mouse.y < piece.yPos + piece.height)) {
            return [piece, i];
        }
    }
    return null;
}

function checkIfFinish() {
    // if finished, then ids are sorted
    for (let i = 0; i < _pieces.length - 1; i++) {
        if (_pieces[i].id > _pieces[i + 1].id) {
            return false;
        }
    }
    return true;
}

function checkIfNextToEmpty(current) {
    if ((current.xPos - current.width - _empty.xPos === 0 ||
        current.xPos + current.width - _empty.xPos === 0) && current.yPos === _empty.yPos ||
        (current.yPos - current.height - _empty.yPos === 0 ||
            current.yPos + current.height - _empty.yPos === 0) && current.xPos === _empty.xPos) {
        return true;
    }
    return false;
}

function getEmpty() {
    for (let i = 0; i < _pieces.length; i++) {
        if (_pieces[i].id === -1) {
            return i;
        }
    }
}

function highlight(event) {
    // event.preventDefault();
    let mouse = {};
    let rect = _canvas.getBoundingClientRect();
    let scaleX = _canvas.width / rect.width;   // relationship bitmap vs. element for X
    let scaleY = _canvas.height / rect.height;
    mouse.x = (event.clientX - rect.left) * scaleX;
    mouse.y = (event.clientY - rect.top) * scaleY;
    if (Number.isNaN(mouse.x) || Number.isNaN(mouse.y)) { // touch
        let touches = event.changedTouches;
        mouse.x = (touches[0].pageX - rect.left) * scaleX;
        mouse.y = (touches[0].pageY - rect.top) * scaleY;
    }
    let values = getPieceClicked(mouse);
    if (values != null) {
        let current = values[0];
        for (let i = 0; i < _pieces.length; i++) {
            if (_pieces[i].id !== -1) {
                _stage.drawImage(_img, _pieces[i].sx, _pieces[i].sy, _pieces[i].width, _pieces[i].height,
                    _pieces[i].xPos, _pieces[i].yPos, _pieces[i].width, _pieces[i].height);
                if (checkIfNextToEmpty(current)) {
                    _stage.save();
                    _stage.fillStyle = "orange";
                    _stage.globalAlpha = .05;
                    _stage.fillRect(current.xPos, current.yPos, current.width, current.height);
                    _stage.restore();
                }
            }
        }
    }
    event.preventDefault(); // prevent double firing
}

function movePiece(event) {
    let mouse = {};
    let rect = _canvas.getBoundingClientRect();
    let scaleX = _canvas.width / rect.width;   // relationship bitmap vs. element for X
    let scaleY = _canvas.height / rect.height;
    mouse.x = (event.clientX - rect.left) * scaleX;
    mouse.y = (event.clientY - rect.top) * scaleY;
    if (Number.isNaN(mouse.x) || Number.isNaN(mouse.y)) { // touch
        let touches = event.changedTouches;
        mouse.x = (touches[0].pageX - rect.left) * scaleX;
        mouse.y = (touches[0].pageY - rect.top) * scaleY;
    }
    let values = getPieceClicked(mouse);
    if (values != null) {
        let current = values[0];
        let index = values[1];
        let emptyIdx = getEmpty();
        if (checkIfNextToEmpty(current)) {
            [_pieces[index], _pieces[emptyIdx]] = [_pieces[emptyIdx], _pieces[index]];
            console.log(index + " " + emptyIdx);
            let tempX = _empty.xPos;
            let tempY = _empty.yPos;
            _empty.xPos = current.xPos;
            _empty.yPos = current.yPos;
            current.xPos = tempX;
            current.yPos = tempY;
            _stage.fillStyle = "#d54541";
            _stage.fillRect(_empty.xPos, _empty.yPos, _empty.width, _empty.height);
            _stage.drawImage(_img, current.sx, current.sy, current.width, current.height,
                current.xPos, current.yPos, current.width, current.height);
                 // check if user won
            if (checkIfFinish()) {
                // restart game
                document.getElementById("modalfinish").style.display = "block";
            }
        }
    }
    event.preventDefault();
}

function resetGame() {
    start();
}

function start() {
    document.getElementById("instr1").style.display = "none";
    document.getElementById("gallery").style.display = "none";
    document.getElementById("modalform").style.display = "none";
    loadImg(document.getElementById("selectedimg").getAttribute("value"));
    _cols = document.getElementById("nocols").value;
    _rows = document.getElementById("norows").value;
    let pieceWidth = Math.floor(_img.width / _cols);
    let pieceHeight = Math.floor(_img.height / _rows);
    _puzzleWidth = pieceWidth * _cols;
    _puzzleHeight = pieceHeight * _rows;
    _pieces = [];
    setCanvas();
    makePieces(pieceWidth, pieceHeight);
    //shufflePuzzle();
    document.onclick = shufflePuzzle;
}
