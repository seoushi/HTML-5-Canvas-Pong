// Author: Sean Chapel
// Date: 10/10/10
// Description: The pong game

function start()
{
	Game.setup("buffer1", "buffer2", "debugArea");
	var intro = new IntroState();
	Game.start(intro);
}