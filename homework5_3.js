const canvas= document.getElementById("canvas");
const context=canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;
const rand = function (num) {
    return Math.floor(Math.random() * num) + 1;
            };
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;            


const goodGuyImg = new Image();
goodGuyImg.src = "https://www.neogaf.com/data/avatars/m/470/470237.jpg?1538200660";
const badGuyImg = new Image();
badGuyImg.src = 'http://www.sherv.net/cm/emoticons/smile/big-black-smile-smiley-emoticon.png';
const background = new Image();
background.src = "https://as1.ftcdn.net/jpg/01/85/87/12/500_F_185871216_83Eyma7zY6XOO5LcdYlDBhNNdtCq3Sz1.jpg";
            //defines the array of all possible directions a bad guy can move to  ___ in each pair first integer represents the xDelta and the second one yDelta 
const directionArray = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];
            
//constants for keys

//creates image objects for hero, bad guys and background

//gameData that consists of an object called hero and an emty array that will be filled with objects of bad guys
const gameData = {
    hero: {
        x: 0,
        y: 0,
        xCenter: 0,
        yCenter: 0,
        xDelta: 0,
        yDelta: 0,
        speed: 1,
        width: 30,
        height: 30,
        image: goodGuyImg,
        draw: function () {
            context.drawImage(this.image, this.x, this.y);//sets an image for object hero
            this.xCenter = this.x + this.width / 2;
            this.yCenter = this.y + this.height / 2;
        },
        update: function () {
            //checks to not let the hero get out of canvas
            if (this.x < 0) {
                this.xDelta = 0;
                this.x = 0;
            }
            if (this.x + this.width > canvas.width) {
                this.xDelta = 0;
                this.x = canvas.width - this.width;
            }
            if (this.y < 0) {
                this.yDelta = 0;
                this.y = 0;
            }
            if (this.y + this.height > canvas.height) {
                this.yDelta = 0;
                this.y = canvas.height - this.height;
            }
            //checks if the hero will not get out of canvas and uptadates its coordinates
            if (this.y - this.yDelta >= 0) {
                this.y += this.yDelta;
            }
            if (this.y + this.height + this.yDelta <= canvas.height) {
                this.y += this.yDelta;
            }
            if (this.x - this.xDelta >= 0) {
                this.x += this.xDelta;
            }
            if (this.x + this.width + this.xDelta <= canvas.width) {
                this.x += this.xDelta;
            }
        }
    },
    badGuys: [
    ]
};
//generates bad guys like the one in the first exercise
const createBadGuys = function (count) {
    for (let i = 0; i < count; i++) {
        const curBadGuyDir = directionArray[rand(directionArray.length - 1)];// generates a random direction from directionArray
        gameData.badGuys[i] = {
            x: canvas.width - rand(canvas.width/2) - 128,// this is done to be sure that the player will not get game over at hte beginning as the coordinates of hero and a bad guy may  randomly be so that they collide once the game starts
            y: rand(canvas.height - 128),
            xCenter: 0,
            yCenter: 0,
            xDelta: curBadGuyDir[0],
            yDelta: curBadGuyDir[1],
            width: 128,
            height: 128,
            image: badGuyImg,
            draw: function () {
                context.drawImage(this.image, this.x, this.y);
                this.xCenter = this.x + this.width / 2;
                this.yCenter = this.y + this.height / 2;
            },
            update: function () {
                this.x += this.xDelta;
                this.y += this.yDelta;
                //changes the direction of a bad guy once it hits the wall
                if (this.x <= 0 || this.x + this.width >= canvas.width) {
                    this.xDelta *= -1;
                }
                if (this.y <= 0 || this.y + this.height >= canvas.width) {
                    this.yDelta *= -1;
                }
            }
        }
    }
};
//detects collision between hero and any of bad guys 
//returns true if collision is found and false if not
const meetingchar = function () {
    //iterates over the array of bad guys to check the collision for each of them and hero
    for (let i = 0; i < gameData.badGuys.length; i++) {
        let enemy = gameData.badGuys[i];
        //the condition represents the state when the hero and the enemy collide
        if ((Math.abs(enemy.xCenter - gameData.hero.xCenter) <= (enemy.width + gameData.hero.width) / 2 -10) && Math.abs(enemy.yCenter - gameData.hero.yCenter) <= (enemy.height + gameData.hero.height) / 2) {
            return true;
        }
    }
    return false;
}
//generates up to 6 bad guys
createBadGuys(rand(6));

//sets background and calls the draw method of hero and all bad guys
const draw = function () {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    gameData.hero.draw();
    for (let i = 0; i < gameData.badGuys.length; i++) {
        gameData.badGuys[i].draw();
    }
}
//calls the update method of hero and all bad guys
const update = function () {
    gameData.hero.update();
    for (let i = 0; i < gameData.badGuys.length; i++) {
        gameData.badGuys[i].update();
    }
}

//creates an event to change the xDelta and yDelta of hero based on the key pressed
document.addEventListener('keydown', function (event) {
    if (event.keyCode === downKey && (gameData.hero.y + gameData.hero.height + gameData.hero.yDelta) <= canvas.height) {
        gameData.hero.yDelta = 1 * gameData.hero.speed;
    }    
    if (event.keyCode === upKey && (gameData.hero.y - gameData.hero.yDelta) >= 0) {
        gameData.hero.yDelta = -1 * gameData.hero.speed;
    }
    if (event.keyCode === rightKey && (gameData.hero.x + gameData.hero.width + gameData.hero.xDelta) <= canvas.width) {
        gameData.hero.xDelta = 1 * gameData.hero.speed;
    }
    if (event.keyCode === leftKey && (gameData.hero.x - gameData.hero.xDelta) >= 0) {
        gameData.hero.xDelta = -1 * gameData.hero.speed;
    }

}, false);



//creates animation that draws and uptades all the sprites, however it will alert "Game Over" once collision detected
const loop = function () { 
    draw();
    update();
    if(meetingchar()){
        alert("Game Over");
    }
    else{
        requestAnimationFrame(loop);
    }
};
loop();
//creates an event to set xDelta or yDelta 0 if a certain key is not pressed
document.addEventListener('keyup', function (event) {
    if (event.keyCode === leftKey || event.keyCode === rightKey) {
        gameData.hero.xDelta = 0;
    }    
    if (event.keyCode === upKey || event.keyCode === downKey) {
        gameData.hero.yDelta = 0;
    }
}, false);



