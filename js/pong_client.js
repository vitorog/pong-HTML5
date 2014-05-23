var CANVAS;
var CONTEXT;
var PONG_SERVER;

function Setup() {
    CANVAS = document.getElementById("game_canvas");
    CONTEXT = CANVAS.getContext("2d");
    CANVAS.width = 640;
    CANVAS.height = 480;
    //var size = Math.max(window.innerHeight, window.innerWidth);
    //CANVAS.width = size / 2;
    //CANVAS.height = size / 4;

    PONG_SERVER = new PongServer();
    PONG_SERVER.StartGame();

    window.addEventListener("keydown", this.Input, true);
    window.addEventListener("keyup", this.Input, true);
}

function ClearScreen() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CONTEXT.fillStyle = "#010101";
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function Draw(game_state) {
    //Draw borders
    CONTEXT.strokeStyle = "#FFFFFF";
    CONTEXT.lineWidth = 2;
    CONTEXT.strokeRect(0, 0, CANVAS.width, CANVAS.height);

    //Draw middle line
    CONTEXT.fillStyle = "FFFFFF";

    var middle_x = CANVAS.width / 2 - (PONG_SERVER.middle_blocks_width / 2);
    var y = 0;
    var i = 1;
    while (y <= CANVAS.height) {
        y = ((i - 1) * PONG_SERVER.middle_blocks_height) + ((i - 1) * PONG_SERVER.middle_blocks_spacing);
        CONTEXT.fillRect(middle_x, y, PONG_SERVER.middle_blocks_width, PONG_SERVER.middle_blocks_height);
        i++;
    }

    //Draw score
    var score = game_state.score;
    CONTEXT.fillStyle = "white";
    CONTEXT.font = "bold 75px Arial";
    CONTEXT.fillText(parseInt(score[0]), CANVAS.width / 4, 75);
    CONTEXT.fillText(parseInt(score[1]), 3 * CANVAS.width / 4, 75);

    //Draw paddles
    var players_pos = game_state.players_pos;
    //var players_y = [CANVAS.height / 2, CANVAS.height / 2];
    CONTEXT.fillRect(players_pos[0][0] - PONG_SERVER.paddle_width / 2, players_pos[0][1] - PONG_SERVER.paddle_height / 2, PONG_SERVER.paddle_width, PONG_SERVER.paddle_height);
    CONTEXT.fillRect(players_pos[1][0] - PONG_SERVER.paddle_width / 2, players_pos[1][1] - PONG_SERVER.paddle_height / 2, PONG_SERVER.paddle_width, PONG_SERVER.paddle_height);

    //Draw ball
    var ball_pos = game_state.ball.position;
    CONTEXT.beginPath();
    CONTEXT.arc(ball_pos[0], ball_pos[1], PONG_SERVER.ball_radius, 0, 2 * Math.PI, false);
    CONTEXT.lineWidth = 2;
    CONTEXT.fill();
}

function Logic() {
}

function Input(evt) {    
    switch (evt.type) {
        case "keydown":
            switch (evt.keyCode) {
                /* Player 1 Up arrow */
                case 38:
                    PONG_SERVER.SetMessage("UP_PRESSED", 1);                    
                    break;
                    /* Player 1 Down arrow */
                case 40:
                    PONG_SERVER.SetMessage("DOWN_PRESSED", 1);
                    break;
                    /* Player 2 Up arrow */
                case 87:
                    PONG_SERVER.SetMessage("UP_PRESSED", 2);                    
                    break;
                    /* Player 2 Down arrow */
                case 83:
                    PONG_SERVER.SetMessage("DOWN_PRESSED", 2);
                    break;
            }
            break;
        case "keyup":
            switch (evt.keyCode) {                
                /* Player 1 Up arrow */
                case 38:
                    PONG_SERVER.SetMessage("UP_RELEASED", 1);
                    break;
                    /* Player 1 Down arrow */
                case 40:
                    PONG_SERVER.SetMessage("UP_RELEASED", 1);
                    break;
                    /* Player 1 Down arrow */
                case 87:
                    PONG_SERVER.SetMessage("UP_PRESSED", 2);                    
                    break;
                    /* Player 2 Down arrow */
                case 83:
                    PONG_SERVER.SetMessage("DOWN_RELEASED", 2);
                    break;
            }
            break;
    }
}

function Update() {
    ClearScreen();
    Logic();
    Draw(PONG_SERVER.game_state);
}

function main() {
    Setup();
    setInterval(Update, 0);
}

main();
