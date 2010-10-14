// Author: Sean Chapel
// Date: 10/10/10
// Description: The paddle object


function IntroState()
{
	this.time = new Date().getTime();
	
	this.states = { DrawNormal:		0,
					FadeOut:		1,
					DrawNothing:	2,
					FadeIn:			3,
					Done:			4};
						
	this.stateLengths = [500, 1500, 750, 1500]; // in milliseconds
	
	this.state = this.states.DrawNormal;
	this.color = "rgba(255,255,255,1)";	
	this.startText = "Press Enter to Start";



	this.update = function()
	{
		var deltaT = new Date().getTime() - this.time;
	
		// is this state done?
		if(deltaT >= this.stateLengths[this.state])
		{
			this.time = new Date().getTime();
			deltaT = 0;
	
			// repeat
			if(this.state == this.states.FadeIn)
			{
				this.state = this.states.DrawNormal;
			}
			else
			{
				this.state++;
			}
		}

		// set the color of the text
		switch(this.state)
		{
			case this.states.DrawNormal:
				this.color = "rgba(255,255,255,1)";
				break;
			case this.states.FadeOut:
				var alpha = 1.0 - (deltaT / this.stateLengths[this.state]);
				this.color = "rgba(255,255,255," + alpha.toString() + ")";
				break;
			case this.states.DrawNothing:
				this.color = "rgba(255,255,255,0)";
				break;
			case this.states.FadeIn:
				var alpha = deltaT / this.stateLengths[this.state];
				this.color = "rgba(255,255,255," + alpha.toString() + ")";
				break;
		}
 
		// check for starting the game
		if(Input.keys[Input.keyStates.Confirm])
		{
			this.state = this.states.Done;
			Game.changeState(new GameState());
		} 		
	}
	
	this.draw = function()
	{
		Game.clearScreen("rgb(0,0,0)");

		if((this.state != this.states.DrawNothing) && (this.state != this.states.Done))
		{
			Game.drawTextCentered(this.startText, Game.width() / 2, Game.height() / 2, "32pt Arial", 32,  this.color);
		}
	}
}