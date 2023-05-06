//inspired by https://github.com/ImKennyYip/Tic-Tac-Toe
//From Tic-Tac-Toe

var board;
var playerS = "S";
var playerM = "M";
var currPlayer = playerS;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // 6 rows x 7 columns container 
    board = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r != 5) {
                tile.classList.add("horizontal_line");
            }
            if (c != 6) {
                tile.classList.add("vertical_line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }

    if (r != 5 && board[r + 1][c] == " ") {
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //change players
    if (currPlayer == playerS) {
        currPlayer = playerM;
    }
    else {
        currPlayer = playerS;
    }

    //check winner
    checkWinner();
}


function checkWinner() {
    //horizontally, check 6 rows
    for (let r = 0; r < 6; r++) {
        //check four in a row (horizontal)
        for (let i = 0; i < 4; i++) {
            if (board[r][i] == board[r][i+1] && board[r][i+1] == board[r][i+2] && board[r][i+2] == board[r][i+3] && board[r][i] != ' ') {
                //if we found the winning row
                //apply the winner style to that row
                let end_index = i + 4;
                let team_logo_path;
                if (board[r][i] == "S")
                    team_logo_path = "/images/Msu_logo.png";
                else{
                    team_logo_path = "/images/Umich_logo.png";
                }
                for (; i < end_index; i++) {
                    let tile = document.getElementById(r.toString() + "-" + i.toString());   
                    image = document.createElement("img");
                    image.src = team_logo_path;
                    tile.innerText = "";
                    document.getElementById(tile.id).appendChild(image);
                }
                gameOver = true;
                return;
            }
        }
    }

    //vertically, check 7 columns
    for (let c = 0; c < 7; c++) {
        //check four in a column (vertical)
        for (let i = 0; i < 3; i++){
            if (board[i][c] == board[i+1][c] && board[i+1][c] ==  board[i+2][c] && board[i+2][c] == board[i+3][c] && board[i][c] != ' ') {
                //if we found the winning col
                //apply the winner style to that col
                end_index = i + 4;
                let team_logo_path;
                if (board[i][c] == "S")
                    team_logo_path = "/images/Msu_logo.png";
                else{
                    team_logo_path = "/images/Umich_logo.png";
                }
                for (; i < end_index; i++) {
                    let tile = document.getElementById(i.toString() + "-" + c.toString());
                    image = document.createElement("img");
                    image.src = team_logo_path;
                    tile.innerText = "";
                    document.getElementById(tile.id).appendChild(image);
                }
                gameOver = true;
                return;
            }
        }
    }

    //diagonally
    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 4; c++){
            if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3] && board[r][c] != ' ') {
                let team_logo_path;
                if (board[r][c] == "S")
                    team_logo_path = "/images/Msu_logo.png";
                else{
                    team_logo_path = "/images/Umich_logo.png";
                }
                for (i = 0; i < 4; i++) {
                    let tile = document.getElementById((r + i).toString() + "-" + (c + i).toString());
                    image = document.createElement("img");
                    image.src = team_logo_path;
                    tile.innerText = "";
                    document.getElementById(tile.id).appendChild(image);
                }
                gameOver = true;
                return;
            }
        }
    }

    //anti-diagonally
    for (let r = 0; r < 3; r++ ){
        for (let c = 6; c > 2; c--){
            if (board[r][c] == board[r+1][c-1] && board[r+1][c-1] == board[r+2][c-2] && board[r+2][c-2] == board[r+3][c-3] && board[r][c] != ' ') {
                let team_logo_path;
                if (board[r][c] == "S")
                    team_logo_path = "/images/Msu_logo.png";
                else{
                    team_logo_path = "/images/Umich_logo.png";
                }
                for (i = 0; i < 4; i++) {
                    let tile = document.getElementById((r + i).toString() + "-" + (c - i).toString());
                    image = document.createElement("img");
                    image.src = team_logo_path;
                    tile.innerText = "";
                    document.getElementById(tile.id).appendChild(image);
                }
                gameOver = true;
                return;
            }
        }
    }
}
