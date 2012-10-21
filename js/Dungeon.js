
function Dungeon()
{
		this.stairIndex=0;
		this.stairs=new Array();
		this.generateStair();
		this.turn=0;
}

/**
 * This method checks if a stair alreday exists or not
 */
Dungeon.prototype.stairExists=function(index)
{
		if(typeof this.stairs[index] != "undefined")
			return true;
		else
			return false;
}

/**
 * This method create a new Stair in the dungeon
 */
Dungeon.prototype.generateStair=function(ownerTemp)
{
	
	if(!this.stairExists(this.stairIndex))
	{
			this.stairs[this.stairIndex]=new Stair(this,this.stairIndex);
			if(this.stairIndex==0)
				if(ownerTemp != undefined)
					ownerTemp.sendMessage("Vous penetrez dans un donjon sombre et sale");
			else
			{
					flag=Math.floor(Math.random()*2)+1;
					if(flag==1)
						if(ownerTemp != undefined)
							ownerTemp.sendMessage("Vous montez difficilement les marches millenaires et decouvrez une nouvelle salle.");
					else
						if(ownerTemp != undefined)
							ownerTemp.sendMessage("Encore un nouvel etage ?!");
			}
	}
	
	return this.stairs[this.stairIndex];
}

/**
 * This method allow the player to go up in the dungeon
 */
Dungeon.prototype.upStair=function(ownerTemp)
{
	this.stairIndex=this.stairIndex+1;
	return this.generateStair(ownerTemp);
}

/**
 * This method allow the player to go down in the dungeon
 */
Dungeon.prototype.downStair=function(ownerTemp)
{
	this.stairIndex=this.stairIndex-1;
	return this.generateStair(ownerTemp);
}


/**
 * Actualize the dungeon for multiplayer
 */
Dungeon.prototype.actualize=function()
{
	
}

