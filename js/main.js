var Scene=new Title();
var TileSet=new TileSet("Tile.png");
var surface=undefined;
var Interval=undefined;
var LastKey=0;
var Input=new Input();
var RoomList=new Array();
var Client=new Client();
var Parameters=new GameParameter();
var RecipeGUI=new RecipeGUI();



window.onload = function() {
	surface = document.getElementById('canvas').getContext('2d');
	Interval=setInterval(function() {
		Scene.update();
	}, 20);
}

function clean()
{
	//surface.fillStyle="rgb(43,67,54)";
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (0, 0,document.getElementById('canvas').width,document.getElementById('canvas').height);
}

function exit()
{
	clearInterval(Interval);
}

