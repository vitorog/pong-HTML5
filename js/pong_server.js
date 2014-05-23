function PongServer() {
    this.game_state = new GameState();

    //Game general configurations
    this.middle_blocks_width = 10;
    this.middle_blocks_height = 15;
    this.middle_blocks_spacing = 15;
    this.paddle_width = 10;
    this.paddle_height = 150;    
    this.ball_radius = 15;
    this.canvas_height = 0;
    this.canvas_width = 0;
    this.paddle_dir = [0, 0];
    this.paddle_speed = 5;
}


PongServer.prototype.SetMessage = function (msg, id) {
    console.log(msg);
    switch (msg) {
        case "UP_PRESSED":
            this.paddle_dir[id - 1] = -1;
            break;
        case "DOWN_PRESSED":
            this.paddle_dir[id - 1] = 1;
            break;
        case "UP_RELEASED":            
            this.paddle_dir[id - 1] = 0;
            break;
        case "DOWN_RELEASED":            
            this.paddle_dir[id - 1] = 0;
            break;
    }

}

PongServer.prototype.StartGame = function () {
    this.game_state = new GameState();
    this.canvas_height = document.getElementById("game_canvas").height;
    this.canvas_width = document.getElementById("game_canvas").width;
   
    this.game_state.ball.position = [this.canvas_width / 2, this.canvas_height / 2];    
    this.game_state.ball.speed = 5;
    this.game_state.ball.direction = [1, 0];
    this.game_state.players_pos[0][0] = 60;
    this.game_state.players_pos[1][0] = this.canvas_width - 60;
    this.game_state.players_pos[0][1] = this.canvas_height / 2; //Y pos
    this.game_state.players_pos[1][1] = this.canvas_height / 2; //Y pos
    var t = this;
    setInterval(function () { t.Update(); },0);
}

PongServer.prototype.Update = function () {
    this.Logic();
}

PongServer.prototype.Logic = function () {    
    this.MovePaddles();
    this.CheckBallCollisions();
    this.game_state.ball.Move();
}

PongServer.prototype.CheckBallCollisions = function () {
    //Check collision with left paddle
    if ((this.game_state.ball.position[1] >= this.game_state.players_pos[0][1] - (this.paddle_height / 2))
        && (this.game_state.ball.position[1] <= this.game_state.players_pos[0][1] + (this.paddle_height / 2))) {
        if ((this.game_state.ball.position[0] - this.ball_radius <= this.game_state.players_pos[0][0] + (this.paddle_width / 2)) &&
            (this.game_state.ball.position[0] - this.ball_radius > this.game_state.players_pos[0][0] - (this.paddle_width / 2))) {
            this.game_state.ball.direction[0] = -this.game_state.ball.direction[0];            
            return;
        }
    }

    //Check collision with right paddle
    if ((this.game_state.ball.position[1] >= this.game_state.players_pos[1][1] - (this.paddle_height / 2))
       && (this.game_state.ball.position[1] <= this.game_state.players_pos[1][1] + (this.paddle_height / 2))) {
        if ((this.game_state.ball.position[0] + this.ball_radius >= this.game_state.players_pos[1][0] - (this.paddle_width / 2)) &&
                (this.game_state.ball.position[0] + this.ball_radius < this.game_state.players_pos[1][0] + (this.paddle_width / 2))) {
            this.game_state.ball.direction[0] = -this.game_state.ball.direction[0];
            this.game_state.ball.direction[1] = -1;
            return;
        }
    }

    //Check collision with top or bottom corner
    if ((this.game_state.ball.position[1] + this.ball_radius >= this.canvas_height) || (this.game_state.ball.position[1] - this.ball_radius <= 0)) {
        this.game_state.ball.direction[1] = -this.game_state.ball.direction[1];
        return;
    }

    //Check for score
    if (this.game_state.ball.position[0] <= 0) {
        this.PlayerScored(2);
        return;
    }

    if (this.game_state.ball.position[0] >= this.canvas_width) {
        this.PlayerScored(1);
        return;
    }
}

PongServer.prototype.PlayerScored = function (player_id) {
    if (player_id == 1) {
        this.game_state.score[0] += 1;
    } else {
        this.game_state.score[1] += 1;
    }

    this.game_state.ball.position = [this.canvas_width / 2, this.canvas_height / 2];
    if (player_id == 1) {
        this.game_state.ball.direction = [1, 0];
    } else {
        this.game_state.ball.direction = [-1, 0];
    }
}

PongServer.prototype.MovePaddles = function () {
    for (var player_id = 0; player_id <= 1; player_id++) {
        this.game_state.players_pos[player_id][1] += this.paddle_dir[player_id] * this.paddle_speed;
        if (this.game_state.players_pos[player_id][1] - (this.paddle_height / 2) < 0) {
            this.game_state.players_pos[player_id][1] = this.paddle_height / 2;
        }
        if (this.game_state.players_pos[player_id][1] + this.paddle_height / 2 > this.canvas_height) {
            this.game_state.players_pos[player_id][1] = this.canvas_height - this.paddle_height / 2;
        }
    }    
}


