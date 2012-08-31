function RecipeGUI()
{
	this.width=350;
	this.height=RecipeList.length*44;
	this.x=Math.round(608/2-this.width/2);
	this.y=Math.round(520/2-this.height/2);
	this.index=0;
}

/**
 * Update the recipeList's Gui
 */
RecipeGUI.prototype.update=function()
{
	clean();
	Motor.dungeon.getCurrentStair().draw();
	Motor.player.draw();
	Motor.messages.draw();
	this.updateInput();
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (this.x, this.y,this.width,this.height);
	surface.font = "22px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	for(a=0;a<RecipeList.length;a++)
	{
		surface.font = "22px pixel";
		surface.fillText(RecipeList[a].getName(),this.x+10,this.y+a*22);
		surface.font = "18px pixel";
		txt="";
		for(b=0;b<RecipeList[a].getElements().length;b++)
		{
			txt=txt+RecipeList[a].getElements()[b].getName();
			if(b != RecipeList[a].getElements().length-1)
			txt=txt+",";
		}
		surface.fillText(txt,this.x+20,this.y+a*22+20);
	}
	surface.fillText(">",this.x,this.y+this.index*33);
}

RecipeGUI.prototype.updateInput=function()
{
	if(Input.equals(40) && this.index<RecipeList.length-1)
		this.index+=1;	
		
	if(Input.equals(38) && this.index>0)
		this.index-=1;
	
	if(Input.equals(13))
		this.craft();
		
	if(Input.equals(27))
		Scene=Motor;
}

/**
 * Crafts the selected recipe
 */
RecipeGUI.prototype.craft=function()
{
	RecipeList[this.index].craft(Motor.player);
}


