class Gen {
  constructor() {
    this.cells = new Array(w);
    for(let y=0; y<w; y++) {
      this.cells[y] = new Array(w);
      for (let x=0; x<w; x++) {
        this.cells[y][x] = Math.floor(Math.random()*(5/4)); // 1/5 => 1
      }
    }
  }
  
  draw() {
    fill(0, 255, 153);
    strokeWeight(0);
    stroke(255, 255, 255);
    
    for(let y=0; y<w; y++) {
      for(let x=0; x<w; x++) {
        let rectw = width/w
        if(this.cells[y][x] === 1) {
          rect(rectw*x, rectw*y, rectw);
        }
      }
    }
  }
  
  next() {
    let t = this;
    let n = new Gen();
    for(let y=0; y<w; y++) {
      for(let x=0; x<w; x++) {
        if(t.cells[y][x] === 1) {
          //生きているセル
          if(t.livesCnt(y,x) === 2 || t.livesCnt(y,x) === 3) {
            n.cells[y][x] = 1;
          }
          else {
            n.cells[y][x] = 0;
          }
        }
        else {
          //死んでいるセル
          if(t.livesCnt(y,x) === 3) {
            n.cells[y][x] = 1;
          }
          else {
            n.cells[y][x] = 0;
          }
        }
      }
    }
    return n;
  }
  
  livesCnt(cy,cx) {
    let cnt = this.cells[cy][cx] * -1; //真ん中を引く
    for(let y=cy-1; y<cy+2; y++) {
      for(let x=cx-1; x<cx+2; x++) {
        cnt += (y<0 || y>=w || x<0 || x>=w) ? 0 : this.cells[y][x];
      }
    }
    return cnt;
  }
}

let w = 15;
let g = new Gen();

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  frameRate(8);
  drawAll();
}

function drawAll() {
  background(0);
  g.draw();
}

function mousePressed() {
  g = g.next();
  drawAll();
}

function draw() {
   mousePressed()
}
