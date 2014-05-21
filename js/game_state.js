//Contains the informaton of the current game state
//Score, Players position and ball position
function GameState() {
    this.score = [0,0];
    this.players_y = [0,0];
    this.ball = new Ball();
}