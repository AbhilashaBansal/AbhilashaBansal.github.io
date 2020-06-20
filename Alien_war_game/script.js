document.addEventListener("DOMContentLoaded", function(event){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d"); //to draw on the 2D plane
	ctx.fillStyle = "black"; 
	ctx.fillRect(0, 0, 620, 520);
	StartGame();
});

//document.querySelector("button").onclick = StartGame();
var myVar;
function StartGame(){

	var score = 0;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d"); //to draw on the 2D plane

	var counter = 0;

	function drawObject(object){
		//for multiple images of same type
		var currentImgIndex = counter%object.images.length;
		var currentImg = object.images[currentImgIndex];
		ctx.drawImage(currentImg, object.x-(object.width/2), object.y-(object.height/2), object.width, object.height); 
	}

	var WIDTH = 620; 
	var HEIGHT = 520;


	//STEP 1 -> WORK ON THE ALIEN SHIP THAT IS OURS
	//adding the images of our player (alien)
	var alienImages = [];
	//var alienImageUrls = ["https://i.imgur.com/tvJOu59.png","https://i.imgur.com/e1pkJRF.png", "https://i.imgur.com/aRumf1r.png","https://i.imgur.com/jjOPpWL.png", "https://i.imgur.com/hsdEpsM.png", "https://i.imgur.com/u5eNyl8.png"];
	var alienImageUrls = ["alienimage1.jpg", "alienimage2.jpg", "alienimage3.jpg", "alienimage4.jpg", "alienimage5.jpg", "alienimage6.jpg"]
	//pushing images created from urls into alien images list 
	for(var i=0; i<alienImageUrls.length; i++){
		var image = new Image();
		image.src = alienImageUrls[i];
		alienImages.push(image);

	}
	
	//creating the alien object
	var alien = {};
	alien.images = alienImages;
	alien.width = 100;
	alien.height = 100;
	alien.x=300;
	alien.y=300;
	alien.speed = 8;

	//mapping movement of our ship with arrow keys
	var keyMap = {};
	keyMap[37] = {name: "left", active: false, onactive: function() {alien.x -= alien.speed; } };
	keyMap[38] = {name: "up", active: false, onactive: function() {alien.y -= alien.speed; } };
	keyMap[39] = {name: "right", active: false, onactive: function() {alien.x += alien.speed; } };
	keyMap[40] = {name: "down", active: false, onactive: function() {alien.y += alien.speed; } };
	keyMap[32] = {name: "space", active: false, onactive: function() { firefire(); } };

	function firefire(){
		if(new Date().getTime() - lastFireAt >= 300){
			lastFireAt = new Date().getTime();
			AddFire(alien.x, alien.y-30); 
		}
	}

	//helper fn to handle key press
	//basically acyivates & deactivates the key on press & release
	function handleKey(event, status){
		var currentKey = keyMap[event.keyCode];

		if(!!currentKey){
			currentKey.active = status;
		}
	}

	//fn to handle pressing of a key
	document.addEventListener("keydown", function(event) { 
		handleKey(event, true);
	});
	//fn to handle release of a key
	document.addEventListener("keyup", function(event) { 
		handleKey(event, false);
	});

	//STEP 2 -> WORK ON ENEMY SHIPS
	var ships = [];
	var shipImages = [];
	/*var shipImgUrls = ["https://i.imgur.com/gLLRj2T.png",
	"https://i.imgur.com/ZhshGO4.png",
	"https://i.imgur.com/E0wiPJC.png",
	"https://i.imgur.com/WmsDf2l.png",
	"https://i.imgur.com/EjfY1iE.png",
	"https://i.imgur.com/t3VGw8g.png",
	"https://i.imgur.com/d6OT3qt.png"]; */
	var shipImgUrls = ["shipimage1.jpg", "shipimage2.jpg", "shipimage3.jpg", "shipimage4.jpg", 
	"shipimage5.jpg", "shipimage6.jpg", "shipimage7.jpg"];

	for(var i=0; i<shipImgUrls.length; i++){
		var shipImage = new Image();
		shipImage.src = shipImgUrls[i];
		shipImages.push(shipImage);
	}

	//ships on screen at one time
	for(var i=0; i<5; i++){
		var ship = {};
		ship.images = shipImages; //same images list for all ships
		ship.x = (Math.random()*1000000)%WIDTH;
		ship.y = 0; //enemy ships always start from the top of the canvas/ screen
		ship.width = 80;
		ship.height = 80;
		ship.speedX = 1 + Math.random()*3;
		ship.speedY = 1 + Math.random()*3;

		ship.move = function(){
			if( this.x+this.width >= WIDTH && this.speedX>0 ){
				this.speedX = -this.speedX;
			}

			if( this.x <= 0 && this.speedX < 0 ){
				this.speedX = -this.speedX;
			}
			this.x += this.speedX;
			this.y += this.speedY;

			//Reappearing on the screen
			if(this.y>=550){
				this.y = -50;
			}
		}

		//firing a bullet from a ship
		ship.fireBullet = function(){
			if(Math.random()<0.02){
				//firing a bullet for certain probability
				AddBullet(this.x, this.y);
			}
		}

		ships.push(ship); //pushing all ship objects inside the ships array
	}

	//STEP 3 -> ADDING BULLETS FIRED BY ENEMY SHIPS 
	var bullets = []; //stores the active bullets 
	var bulletImage1 = new Image();
	//bulletImage1.src = ["https://i.imgur.com/dM81aDs.gif"];
	bulletImage1.src = "bullet1.gif";
	var bulletImage2 = new Image();
	//bulletImage2.src = ["https://i.imgur.com/NyaUjNn.gif"];
	bulletImage2.src = "bullet2.gif";

	//adding bullet objects to the bullets list
	function AddBullet(x, y){
		var bullet = {};
		bullet.images = [bulletImage1, bulletImage2];
		bullet.x = x;
		bullet.y = y;
		bullet.width = 50;
		bullet.height = 50;
		bullet.speedX = 0;
		bullet.speedY = 8;
		bullet.active = true;
		bullet.move = function(){
			this.y += this.speedY;
			if(this.y >= HEIGHT){
				//bullet out of screen 
				this.active = false;
			}
		}
		bullets.push(bullet);
	}

	//Fn to UPDATE the list of bullets, after moving them
	function drawAndMoveBullets(){
		var temp = [];
		for(var i=0; i<bullets.length; i++){
			bullets[i].move(); //moving the bullets

			drawObject(bullets[i]);
			//only add active bullets
			if(bullets[i].active){
				temp.push(bullets[i]);
			}
		}
		bullets = temp; //updating list
	}

	//STEPS 4 -> ADDING OUR OWN FIRE SHOTS
	var fires = [];
	var fireImage = new Image();
	//fireImage.src = ["https://i.imgur.com/pPvOuhq.png"];
	fireImage.src = "fire.jpg";
	var lastFireAt = new Date().getTime();
	function AddFire(x, y){
		var fire = {};
		fire.x = x;
		fire.y = y;
		fire.images = [fireImage];
		fire.width = 15;
		fire.height = 15;
		fire.speedX = 0;
		fire.speedY = -8;
		fire.active = true;
		fire.move = function (){
			this.y += this.speedY;
			if(this.y < 0){
				this.active = false;
			}
		}
		fires.push(fire);
	}

	function drawAndMoveFires(){
		var temp = [];
		for(var i=0; i<fires.length; i++){
			fires[i].move();
			drawObject(fires[i]);
			if(fires[i].active){
				temp.push(fires[i]);
			}
		}
		fires = temp;
	}


	myVar = setInterval(update, 50);
	//UPDATE FN
	function update(){

		counter++;
		//clear the background each time frame on canvas is changed
		ctx.fillStyle = "black"; 
		ctx.fillRect(0, 0, 620, 520); //fill color in a rectangle, fn accepts coordinates

		//floating effect for our space ship
		alien.x += -2 + Math.random()*4; //ranging from -2 to +2
		alien.y += -2 + Math.random()*4;

		drawObject(alien);

		//checking which keys are active
		for(var key in keyMap){
			var currentKey = keyMap[key]; //extracting all the keys
			if(currentKey.active){
				currentKey.onactive();
			}
			console.log(JSON.stringify(keyMap))
		}

		for(var i=0; i<ships.length; i++){
			drawObject(ships[i]);
			ships[i].move();
			ships[i].fireBullet();
		}
		drawAndMoveBullets(); //update fns
		drawAndMoveFires(); //need to be called at end of every frame

		//STEP 5 -> SCORING
		for(var i=0; i<fires.length; i++){
			var fire = fires[i];
			for(var j=0; j<ships.length; j++){
				var ship = ships[j];
				var distX = (fire.x-ship.x)*(fire.x-ship.x);
				var distY = (fire.y-ship.y)*(fire.y-ship.y);
				var distance = Math.sqrt(distX + distY);
				if(distance<=ship.width/2){
					//we have shot one enemy ship
					score += 10;
					//WE CAN DO THIS, SINCE OBJECTS ARE PASSED WITH REFERENCE
					ship.x = (Math.random()*1000000)%WIDTH;
					ship.y = 0;
					fire.active = false;
				}
				console.log(distance);
			}
		}

		//STEP 6 -> GAME OVER
		for(var i=0; i<bullets.length; i++){
			var bullet = bullets[i];
			var distX = (bullet.x - alien.x)*(bullet.x-alien.x);
			var distY = (bullet.y - alien.y)*(bullet.y-alien.y);
			var distance = Math.sqrt(distX+distY);
			if(distance<=alien.width/2){
				stop();
				ctx.fillStyle = "black"; 
				ctx.fillRect(0, 0, 620, 520);
				document.getElementById("over").textContent = "Game over!";
				document.getElementById("score").textContent = "SCORE : " + score;
				document.getElementById("reload").textContent = "Reload the page to play again!"
				return;
			}
		}

	}
}

function stop(){
	clearInterval(myVar);
}