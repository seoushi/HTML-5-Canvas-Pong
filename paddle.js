// Author: Sean Chapel
// Date: 10/10/10
// Description: The paddle object

function Paddle(x, y, width, height, minY, maxY)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	// used for the maximium top/bottom the paddle can go
	this.maxY = maxY;
	this.minY = minY;
	
	// move the paddle
	this.moveY = function(y)
	{
		this.y += y;
		
		//clamp to top/bottom
		if(this.y < this.minY)
		{
			this.y = this.minY;
		}
		if((this.y + this.height) > this.maxY)
		{
			this.y = this.maxY - this.height;
		}
	}
	
	// check for collision with a rectangle
	this.doesCollide = function(x1, y1, x2, y2)
	{
		var left = this.x;
		var right = left + this.width;
		var top = this.y;
		var bot = this.y + this.height;
		
		// check for x collision
		if( !	(((x1 <= left) && (x2 >= right)) ||	// the paddle is encompassed by the rectangle
				((x2 >= left) && (x2 <= right)) ||	// the rectangle is touching on the right side
				((x1 >= left) && (x1 <= right))))	// the rectangle is touching on the left side
		{
			return false;
		}
		
		// check for y collision
		if( !	(((y1 <= bot) && (y2 >= top)) ||	// the paddle is encompassed by the rectangle
				((y2 >= top) && (y2 <= bot)) ||		// the rectangle is touching on the bottom
				((y1 >= top) && (y1 <= bot))))		// the rectangle is touching on the top
		{
			return false;
		}
		
		return true;
	}
	
	this.draw = function()
	{
		Game.drawRect( this.x, this.y, this.width, this.height);
	}
}