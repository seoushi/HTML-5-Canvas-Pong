// Author: Sean Chapel
// Date: 10/10/10
// Description: The main game state

function GameState()
{
	this.lastFrameTime = new Date().getTime();

	this.top = 32;

	this.ballX = Game.width() / 2;
	this.ballY = (Game.height() + this.top) / 2;
	
	this.ballVelX = 0.5;
	this.ballVelY = 0.5;
	
	this.ballStartingDir = 1;
	
	
	this.ballSpeed = 500;
	this.ballSize = 15;

	this.score = 0;
	
	this.states = {	Running: 0,
					Dead: 1 };

	this.state = this.states.Running;
	
	
	
	this.paddleMoveSpeed = 400; // pixels a second
	this.paddleColor = "rgb(255,255,255)";
	this.paddleHeight = 100;
	this.paddleWidth = 20;
	
	this.paddle1 = new Paddle(	20, ((Game.height() + this.top) / 2) - (this.paddleHeight / 2), 
								this.paddleWidth, this.paddleHeight, this.top, Game.height());

	this.paddle2 = new Paddle(	Game.width() - this.paddleWidth - 20, ((Game.height() + this.top) / 2) - (this.paddleHeight / 2),
								this.paddleWidth, this.paddleHeight, this.top, Game.height());

	this.resetText = "Press Enter to Reset";
	this.scoreText = "Score";


	this.update = function()
	{
		
		//reset
		if(this.state == this.states.Dead)
		{
			if(Input.keys[Input.keyStates.Confirm])
			{
				this.score = 0;
	
				//reverse the starting movement
				this.ballStartingDir *= -1;
				this.ballVelX = this.ballStartingDir * 0.5;

				// randomize y velocity
				if(Math.floor(Math.random()*2)) // should be 0 or 1
				{
					this.ballVelY = 0.5;
				}
				else
				{
					this.ballVelY = -0.5;
				}
				
				this.ballX = Game.width() / 2;
				this.ballY = (Game.height() + this.top) / 2;
				
				this.state = this.states.Running;
			}
			
			return;
		}	
	
		var time = new Date().getTime();
		var deltaT = (time - this.lastFrameTime) / 1000.0;
		this.lastFrameTime = time;


		
		// move paddle 1 down
		if(Input.keys[Input.keyStates.Paddle1Down])
		{
			this.paddle1.moveY(this.paddleMoveSpeed * deltaT);
		}

		// move paddle 1 up		
		if(Input.keys[Input.keyStates.Paddle1Up])
		{
			this.paddle1.moveY(-this.paddleMoveSpeed * deltaT);
		}
		
		// move paddle 2 down
		if(Input.keys[Input.keyStates.Paddle2Down])
		{
			this.paddle2.moveY(this.paddleMoveSpeed * deltaT);
		}

		// move paddle 2 up		
		if(Input.keys[Input.keyStates.Paddle2Up])
		{
			this.paddle2.moveY(-this.paddleMoveSpeed * deltaT);
		}
		
		// ball
		this.ballX += this.ballVelX * this.ballSpeed * deltaT;
		this.ballY += this.ballVelY * this.ballSpeed * deltaT;

		// bounce off top
		if(this.ballY < this.top)
		{
			this.ballY = this.top;
			this.ballVelY *= -1;
		}
		
		// bounce off bottom
		if(this.ballY > (Game.height() - this.ballSize))
		{
			this.ballY = Game.height() - this.ballSize;
			this.ballVelY *= -1;
		}
		
		//stop on right
		if(this.ballX > (Game.width() - this.ballSize))
		{
			this.ballX = Game.width() - this.ballSize;
			this.ballVelY = 0;
			this.ballVelX = 0;
			this.state = this.states.Dead;
		}
		
		//stop on left
		if(this.ballX < 0)
		{
			this.ballX = 0;
			this.ballVelY = 0;
			this.ballVelX = 0;
			this.state = this.states.Dead;
		}	

		// check for ball bouncing off paddle
		var collided = false;
		
		//check left paddle
		if((this.ballVelX < 0) && // only check when heading left (avoids ball getting stuck in paddle)
			this.paddle1.doesCollide(this.ballX, this.ballY, this.ballX + this.ballSize, this.ballY + this.ballSize))
		{
			collided = true;
		}
		
		//check right paddle
		if((this.ballVelX > 0) && // only check when heading left (avoids ball getting stuck in paddle)
			this.paddle2.doesCollide(this.ballX, this.ballY, this.ballX + this.ballSize, this.ballY + this.ballSize))
		{
			collided = true;
		}
	
		if(collided)
		{
			this.score += 50;	// hurray for points
			this.ballVelX *= -1; // reverse direction
		}

	}
	
	this.draw = function()
	{
		Game.clearScreen("rgb(0,0,0)");

		Game.setDrawColor(this.paddleColor);
		
		this.paddle1.draw();
		this.paddle2.draw();
		
		Game.drawRect(this.ballX, this.ballY, this.ballSize, this.ballSize);
		
		Game.drawText(this.scoreText, 300, -2, "22pt Arial", "rgb(255,255,255)");
		Game.drawText(this.score, 400, -2, "22pt Arial", "rgb(255,255,255)");
		
		//draw line on top border
		Game.drawRect( 0, this.top - 1, Game.width(), 1);
		
		if(this.state == this.states.Dead)
		{
			Game.drawTextCentered(this.resetText, Game.width() / 2, Game.height() / 2, "32pt Arial", 32, "rgb(255,255,255)");
		}
	}
}