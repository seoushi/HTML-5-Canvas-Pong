// Author: Sean Chapel
// Date: 10/10/10
// Description: A base class for setting up the canvas and other basic stuff

function _Game()
{
	this.context = null;
	this.canvas = null;
	this.updateInterval = 16;	// target ~60 fps
	this.gameState = null;		// A game state is an object with update and draw functions
	this.debugArea = null;
	this.startTime = null;
	
	this.buffers = [ null, null ]; // two canvas'es used for double buffering
	this.curBuffer = 0;
	
	this.debug = function(text)
	{
		this.debugArea.innerHTML += "<br/>" + text;
	}
	
	this.clearScreen = function(color)
	{
		this.context.fillStyle = color;
		this.context.fillRect (0, 0, this.canvas.width, this.canvas.height);
	}
	
	this.drawText = function(text, x, y, font, color)
	{
		this.context.fillStyle = color;
		this.context.textBaseline = "top";
		this.context.font = font;
		this.context.fillText(text, x, y);
	}

	this.drawTextCentered = function(text, x, y, font, fontHeight, color)
	{
		this.context.fillStyle = color;
		this.context.textBaseline = "top";
		this.context.font = font;

		var dim = this.context.measureText(text);

		this.context.fillText(text, x - (dim.width / 2) , y - (fontHeight / 2));
	}
	
	this.drawRect = function(x, y, width, height)
	{
		this.context.fillRect(x, y, width, height);
	}
	
	this.setDrawColor = function(color)
	{
		this.context.fillStyle = color;
	}
	
	this.width = function()
	{
		return this.canvas.width;
	}
	
	this.height = function()
	{
		return this.canvas.height;
	}

	this.setup = function(canvas1, canvas2, debugAreaId)
	{
		this.debugArea = document.getElementById(debugAreaId);
	
		this.buffers[0] = document.getElementById(canvas1);
		this.buffers[1] = document.getElementById(canvas2);
		this.curBuffer = 0;
	
		this.canvas = this.buffers[0];
		this.context = this.canvas.getContext("2d");
	}

	this.start = function(gameState)
	{
		this.gameState = gameState;
		this.startTime = new Date().getTime();
		setTimeout("Game.update();", this.updateInterval);
	}
	
	this.changeState = function(state)
	{
		this.gameState = state;
	}

	this.update = function()
	{
		this.gameState.update();
		this.gameState.draw();

		//swap buffers
		this.buffers[1 - this.curBuffer].style.visibility='hidden';
		this.buffers[this.curBuffer].style.visibility='visible';

		this.curBuffer = 1 - this.curBuffer;
		
		this.canvas = this.buffers[this.curBuffer];
		this.context = this.context = this.canvas.getContext("2d");

		// do loop again
		setTimeout("Game.update();", this.updateInterval);
	}
}

var Game = new _Game();