function GameOver()
{
	
}

GameOver.prototype.update=function()
{
	clean();
	surface.font = "100px pixel";
	surface.fillStyle="rgb(50,50,50)";
	surface.fillText("GAME OVER", document.getElementById('canvas').width/2-400/2,document.getElementById('canvas').height/2-100/2);
	surface.font = "32px pixel";
	surface.fillText("-appuyez sur entrer pour revenir a l'ecran titre-", document.getElementById('canvas').width/2-500/2,document.getElementById('canvas').height/2-100/2+42);
	Client.resetCanvas();
	if(Input.equals(13))
		Scene=new Title();
}
