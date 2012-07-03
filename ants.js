// Settings
var width = 200;
var height = 150;
var zoom = 2;
var surfaceBase = 10;
var antCount = 10;

var can;
var ctx;
var dirt = [];
var ants = [];

var realWidth = width * zoom;
var realHeight = height * zoom;

window.onload = init;

function init() {
    var x;
    var y;

    for (x = 0; x < width; x ++) {
        dirt[x] = [];
        for (y = 0; y < height; y ++) {
            dirt[x][y] = 1;
        }
    }

    can = document.createElement('canvas');
    can.width = realWidth;
    can.height = realHeight;

    document.body.appendChild(can);

    ctx = can.getContext('2d');

    generateDirt();
    initAnts();
    loop();
}

function ant(){
    this.x = Math.floor(Math.random()*width);
    this.y = 0;
    // this.speed = 1;
    var thisAnt = this;
    
    this.actions = [
        function left() {
            thisAnt.x --;
        },
        function right() {
            thisAnt.x ++;
        },
        function up() {
            thisAnt.y --;
        },
        function down() {
            thisAnt.y ++;
        }
    ];

}

function initAnts() {
    var i;

    for (i = 0; i < antCount; i++) {
        ants[i] = new ant();
    }
}

function antLoop() {
    var i;
    var l = ants.length;
    var x;
    var y;
    var al;
    var r;
    var a;

    for (i = 0; i < l; i++) {
        a = ants[i];
        

        // Check if dirt is not under ant
        if (!dirt[a.x] || !dirt[a.x][a.y+1]) {
            a.y ++;
        }
        else {
            al = a.actions.length;
            // Cause more left to right
            r = Math.floor(Math.random()*al*0.9);
            a.actions[r]();

        }
        // Creates white trail
        if (a.x > 0 && a.x < width) {
            dirt[a.x][a.y] = 0;
        }


        drawPixel(a.x, a.y, 'red');
    }
}

function loop() {
    render();
    antLoop();
    setTimeout(loop, 0);
}

function generateDirt() {
    var x;
    var y;

    for (x = 0; x < width; x ++) {
        for (y = surfaceBase; y >= 0; y --) {
            dirt[x][y] = 0;
        }
    }
}

function drawPixel(x, y, color) {
    var realX = x * zoom;
    var realY = y * zoom;

    ctx.fillStyle = color;
    ctx.fillRect(realX, realY, zoom, zoom);
}

function clear() {
    ctx.clearRect(0, 0, realWidth, realHeight);
}

function renderDirt() {
    var x;
    var y;

    for (x = 0; x < width; x ++) {
        for (y = 0; y < height; y ++) {
            if (dirt[x][y]) {
                drawPixel(x, y, 'black');
            }
        }
    }
}

function render() {
    clear();
    renderDirt();
}
