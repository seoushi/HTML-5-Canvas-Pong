// Author: Sean Chapel
// Date: 10/10/10
// Description: Input stuff

function _Input()
{
	this.keys = [0, 0, 0, 0, 0];

	this.keyStates = {Paddle1Up:		0,
					Paddle2Down:	1,
					Paddle1Up:		2,
					Paddle1Down:	3,
					Confirm:		4};
			
	this.setKey = function(key, value)
	{
		switch(key)
		{
			case 87: 	this.keys[this.keyStates.Paddle1Up]		= value;	// w
						break;
			case 83:	this.keys[this.keyStates.Paddle1Down]	= value;	// s
						break;
			case 38:	this.keys[this.keyStates.Paddle2Up]		= value;	// up arrow
						break;
			case 40:	this.keys[this.keyStates.Paddle2Down]	= value;	// down arrow
						break;		
			case 13: 	this.keys[this.keyStates.Confirm]		= value;	// enter
						break;
		}
	}
}

var Input = new _Input();


document.onkeydown = function(e)
{
	e = e || window.event;

	Input.setKey(e.keyCode, true);
	
	if(document.uniqueID)
	{
		e.cancelBubble = true;
		e.returnValue = false;
	}
	else
	{
		e.stopPropagation();
		e.preventDefault();
	}

	return false;
}


document.onkeyup = function(e)
{
	e = e || window.event;
	
	Input.setKey(e.keyCode, false);

	if(document.uniqueID)
	{
		e.cancelBubble = true;
		e.returnValue = false;
	}
	else
	{
		e.stopPropagation();
		e.preventDefault();
	}

	return false;
}