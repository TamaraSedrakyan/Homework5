const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const rand = function(num) {
        return Math.floor(Math.random() * num) + 1;
    };
const createBoxes= function(count, canvasWidth,canvasHeight){
	canvas.width= canvasWidth;
	canvas.height = canvasHeight;
	const arr=[];
	const colorArray=['blue','green','orange','purple','yellow'];
	const directionArray = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1]
        ];

	for(let i = 0; i < count; i++){
		const direction = directionArray[rand(directionArray.length)-1]   
        let colorIndex = rand(colorArray.length)-1;
		arr[i]={
			x:rand(canvas.width-20),
			y:rand(canvas.height-20),
			yDelta:direction[0],
			xDelta:direction[1],
			width:20,
			height:20,
			color:colorArray[colorIndex],
			draw:function(){
				context.fillStyle= this.color;
				context.fillRect(this.x,this.y,this.width,this.height);
			},
			update:function(){
				this.x += this.xDelta;
                this.y += this.yDelta;
                if(this.x <= 0 || this.x + this.width >= canvas.width){
                    this.xDelta *= -1;
                    colorIndex += 1;
                }
                if(this.y <= 0 || this.y + this.height >= canvas.width){
                    this.yDelta *= -1;
                    colorIndex += 1;
                }
                if(colorIndex >= colorArray.length){
                    colorIndex = 0;
                }
                this.color = colorArray[colorIndex];
				 
			}
		}

	}
	return arr;
};

const boxes=createBoxes(5,300,300)

const draw= function(){
	context.fillStyle = "pink";
    context.fillRect(0,0, canvas.width, canvas.height);
	for(let i=0;i<boxes.length;i++)
	boxes[i].draw();
};
const update=function(){
        for(let i = 0; i < boxes.length; i++){
            boxes[i].update();
        }
};
const loop=function(){
	draw();
	update();
	requestAnimationFrame(loop);
};
loop()




