function Grass(xTemp,yTemp,stairTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.stair=stairTemp;
	this.tick=0;
	if(!this.isNext(3))
		this.growRate=1;
	else
		this.growRate=3;
	this.stat=0;
	this.mature=false;
	this.drop=undefined;
}


/**
 * This Function check if the specified tile is is next the grass
 **/
Grass.prototype.isNext=function(id)
{
	if(this.stair.getMap()[this.x+1][this.y]==id || this.stair.getMap()[this.x-1][this.y]==id || this.stair.getMap()[this.x][this.y+1] || this.stair.getMap()[this.x][this.y-1]==id)
		return true;
	else
		return false;
}


/**
 * This method draws the grass on the screen
 **/
Grass.prototype.draw=function()
{
	if(Parameters.isTiled())
		TileSet.draw(18+this.stat,Client.getXPos()+this.x*32, Client.getYPos()+this.y*32);
	else
	{
		if(this.stat==0)
			surface.fillText("\"",Client.getXPos()+this.x*32, Client.getYPos()+this.y*32);
		else if(this.stat==1)
			surface.fillText("v",Client.getXPos()+this.x*32, Client.getYPos()+this.y*32);
		else
			surface.fillText("V",Client.getXPos()+this.x*32, Client.getYPos()+this.y*32);
		
	}
		
	this.tick+=1;
	if(this.tick>=5)
	{
		this.grow();
		this.tick=0;
	}
}

/**
 *This method manage the growing of the grass
 **/
Grass.prototype.grow=function()
{
	if(!this.mature)
	{
		if(this.isNext(3))
			this.growRate+=0.20;
		else
			this.growRate+=0.10;
		
		if(Math.floor(Math.random()*Math.round(10000/this.growRate))+1==1)
		{
			this.stat+=1;
			if(!this.isNext(3))
				this.growRate=1;
			else
				this.growRate=3;
				
			if(this.stat>=2)
			{
				this.stat=2;
				this.mature=true;
				list=new Array();
				for(i=0;i<ItemList.length;i++)
				{
					if(ItemList[i] != undefined)
					{
						if(ItemList[i].getType()=="grass")
							list.push(ItemList[i]);
					}
				}
				rand=Math.floor(Math.random()*list.length);
				this.drop=list[rand];
				console.log("up");
			}
		}
	}
}


/**
 * This method allow players to harvest the grass and get the drop of the grass
 **/
Grass.prototype.harvest=function()
{
	this.stair.map[this.x][this.y]=1;
	return this.drop;
}

/**
 * This function allow the grass to create a new grass if it's old
 **/
Grass.prototype.reproduce=function()
{
	if(this.mature && Math.floor(Math.random()*Math.round(100/this.growRate))+1==1)
	{
		if(Math.floor(Math.random()*2)+1==1)
			targetX=this.x+1;
		else
			targetX=this.x-1;
		
		if(Math.floor(Math.random()*2)+1==1)
			targetY=this.y+1;
		else
			targetY=this.y-1;
			
		if(this.stair.map[targetX][targetY]==1)
			this.stair.map[targetX][targetY]=new Grass(targetX,targetY,this.stair);
	}
}