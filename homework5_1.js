const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const rand = function(num){
	return Math.floor(Math.random()*num)+1;
};

const createBoxes= function(count, canvasWidth, canvasHeight){	
	const arr=[];
	canvas.width= canvasWidth;
	canvas.height=canvasHeight;
	context.fillStyle ='pink';
	context.fillRect(0,0,canvas.width, canvas.height);
	const colorArray=['green','blue','orange','black','purple','grey','white','yellow'];

	for (let i=0;i<count;i++){
		arr[i]={
			x:rand(canvas.width-30),
			y:rand(canvas.height-30),
			width:30,
			height:30, 
			color:colorArray[rand(colorArray.length)-1],
			draw:function(){
				context.fillStyle=this.color;
				context.fillRect(this.x,this.y,this.width,this.height);
			}

		}

	}
	return arr;
}

const boxes = createBoxes(7,500,500);
for(let i=0;i<boxes.length;i++){
	boxes[i].draw();
}
