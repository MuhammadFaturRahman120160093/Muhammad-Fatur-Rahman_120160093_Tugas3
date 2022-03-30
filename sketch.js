let Sun; 
let Sun_D = 1391400; 
let theta = 0; 
let wscale; 
let zoom = 0.3 
let warp = 10; 
let pause = false;

function setup() {
  createCanvas(1600, 800);
  background('black');
  wscale = width / (4540 * 2) * zoom;

  Sun = new Planet(["Sun", Sun_D / 3, 0, 0, 0, color('orange')]);
  Sun.x = width / 2;
  Sun.y = height / 2;

  Merkurius = new Planet(["Merkurius", 116464*2 , 1514.5*2, 1352.5*2, 10759*2, color('yellow')]);
  Bumi = new Planet(["Bumi", 50724*2, 3008*2, 2742*2, 30689*2, color('cyan')]);
  Venus = new Planet(["Venus", 49244*2, 4540, 4460, 60182, color('red')]);
}

function draw() {
  if (pause) {
    
  } else {
    background('black');
    Sun.show();

    theta = theta + 0.1 * warp;

    Merkurius.move(theta);
    Venus.move(theta);
    Bumi.move(theta);

  }

}

function mousePressed() {
  if (pause) {
    pause = false
  } else {
    pause = true
  }
}

class Planet {
  constructor(traits) {
    this.name = traits[0]; 
    this.D = traits[1] / 2000 * zoom; 
    this.rx = traits[2] * wscale;
    this.ry = traits[3] * wscale; 
    this.P = traits[4] / 365 * 2 * PI; 
    this.color = traits[5];
    this.x = 0; 
    this.y = 0;
  }
  update(angle) {
    this.x = Sun.x + this.rx * cos(2 * PI / this.P * angle);
    this.y = Sun.y + this.ry * sin(2 * PI / this.P * angle);
  }
  show() {
    noFill();
    stroke(this.color);  
    strokeWeight(2);
    ellipse(Sun.x, Sun.y, 2 * this.rx, 2 * this.ry);
    fill(this.color);  
    circle(this.x, this.y, this.D);  
  }
  move(angle) {
    this.update(angle);
    this.show();
  }
}