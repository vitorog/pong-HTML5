function Ball() {
    this.position = [0, 0];
    this.direction = [0, 0];
    this.speed = 0;
}


Ball.prototype.Move = function () {
    this.position[0] += this.direction[0] * this.speed;
    this.position[1] += this.direction[1] * this.speed;
}