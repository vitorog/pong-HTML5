function PongServer() {
    this.game_state = new GameState();

    //Game general configurations
    this.middle_blocks_width = 10;
    this.middle_blocks_height = 15;
    this.middle_blocks_spacing = 15;
    this.paddle_width = 10;
    this.paddle_height = 150;
    this.ball_radius = 15;
}


PongServer.prototype.HandleMessages = function () {

}

PongServer.prototype.StartGame = function () {
    this.game_state = new GameState();
    var canvas_height = document.getElementById("game_canvas").height;
    var canvas_width = document.getElementById("game_canvas").width;
    this.game_state.players_y = [canvas_height / 2, canvas_height / 2];
    this.game_state.ball.position = [canvas_width / 2, canvas_height / 2];    
    this.game_state.ball.speed = 1;
    this.game_state.ball.direction = [1, 0];
    var t = this;
    setInterval(function () { t.Update(); },0);
}

PongServer.prototype.Update = function () {
    this.Logic();
}

PongServer.prototype.Logic = function () {
    this.game_state.ball.Move();
    this.CheckBallCollisions();
}