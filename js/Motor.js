//////////////////////////////////////////////////////////////////////////////////////
//class Motor
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 11/08/2012
//modifié le : 12/08/2012
/////////////////////////////////////////////////////////////////////////////////////
//Le moteur de jeu.
//-gère la génération de la première salle.
//-gère le début du jeu.
//-gère les tours à chaque déplacement du joueur.
//-gère le GameOver.
////////////////////////////////////////////////////////////////////////////////////

function Motor()
{
	this.player=undefined;
	this.stair=undefined;
	this.turn=0;
	this.dayInterval=144;
	this.time="Day";
	
	this.messages=new MsgZone(1,11);
	
	this.xPos=0;
	this.yPos=0;


}

Motor.prototype.start=function(par1)
{
		this.player=par1;
}

Motor.prototype.getXPos=function()
{
		return this.xPos;
}

Motor.prototype.getYPos=function()
{
		return this.yPos;
}

Motor.prototype.getCurrentRoom=function()
{
	return RoomList[this.xPosRoom*100+this.yPosRoom];	
}

Motor.prototype.getLeftNextRoom=function()
{
	return RoomList[(this.xPosRoom-1)*100+this.yPosRoom];		
}

Motor.prototype.getRightNextRoom=function()
{
	return RoomList[(this.xPosRoom+1)*100+this.yPosRoom];		
}

Motor.prototype.getUpNextRoom=function()
{
	return RoomList[this.xPosRoom*100+this.yPosRoom-1];		
}

Motor.prototype.getDownNextRoom=function()
{
	return RoomList[this.xPosRoom*100+this.yPosRoom+1];		
}

Motor.prototype.generateStair=function(top,left,down,right)
{
	this.stair=new Dungeon();
}

Motor.prototype.update=function()
{
	
	clean();
	//affichage des infos 
	//this.messages.draw();
	this.stair.draw();
	this.inputUpdate();
	//this.player.draw();
}


Motor.prototype.inputUpdate=function()
{
	if(!Input.equals(0))
		//this.newTurn();
		
	if(Input.equals(39))
	{
		//this.player.move("right");
		this.xPos=this.xPos-32;
	}

	if(Input.equals(40))
	{
		//this.player.move("down");
		this.yPos=this.yPos-32;		
	}
		
	if(Input.equals(37))
	{
		//this.player.move("left");
		this.xPos=this.xPos+32;
	}
		
	if(Input.equals(38))
	{
		//this.player.move("up");
		this.yPos=this.yPos+32;
		
	}
		
	if(Input.equals(76))
		this.player.lap();
		
	if(Input.equals(73))
		this.player.openInventory();
		
	if(Input.equals(69))
		this.player.openEquipement();
}

Motor.prototype.newTurn=function()
{	
	this.turn+=1;
	if (this.turn>=this.player.hi)
	{
		this.player.hi+=this.turn;
		this.player.heal();	
		this.messages.add("Vos blessures cicatrisent peu a peu...");
	}
	if (this.turn>=this.player.fi)
	{
		this.player.fi+=this.turn;
		this.player.fire();	
	}
	if (this.turn>=this.player.si)
	{
		this.player.si+=this.turn;
		this.player.sick();	
	}


	if(this.turn>=this.dayInterval)
	{
		if(this.time=="Day")
		{
			this.player.changeStat();
			this.messages.add("La luminositee diminue peu a peu...");
			this.time="Night";
		}
		else
		{
			this.messages.add("La lumiere du jour revient suivie par son compagnon le soleil.");
			this.time="Day";
		}
		this.dayInterval+=this.turn;
	}
//	this.getCurrentRoom().moveMonsters();
}

Motor.prototype.gameOver=function()
{
	clean();
	surface.font = "100px pixel";
	surface.fillStyle="rgb(50,50,50)";
	surface.fillText("GAME OVER", document.getElementById('canvas').width/2-400/2,document.getElementById('canvas').height/2-100/2);
	exit();

}







