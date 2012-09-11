function PlayerEditor()
{
	this.index=0;
	this.page=0;
	
}

/**
 * Updates the player editor's gui
 */
PlayerEditor.prototype.update=function()
{
	clean();
	surface.font = "50px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("Creation d'un personnage",100, 50);
	surface.font = "32px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("Selection de la Classe",32, 110);

	for(i=0;i<Class.length;i++)
	{
		surface.fillText(Class[i].Name,52, 110+52*(i+1));	
	}
	
		if(Input.equals(40))
			this.index+=1;
		
		if(Input.equals(38))
			this.index-=1;
		
		if(Input.equals(39))
			this.page+=1;
		
		if(Input.equals(37))
			this.page-=1;
		
		if(Input.equals(13))
			this.validate();
	
	
		if(this.index>Class.length-1)
			this.index=0;

		
		if(this.index<0)
			this.index=Class.length-1;

		surface.fillText(">",16, 110+52*(this.index+1));



	surface.fillRect (608-250-50,70,300,16);
	surface.fillRect (608-266-50,70+16,16,520);

		if(this.page>1)
			this.page=0;

		
		if(this.page<0)
			this.page=1;

	if(this.page==0)
	{
		surface.fillText("Apercu",608-266+32, 70+48);
		surface.fillStyle = "rgb(50,150,50)";
		surface.fillText(Class[this.index].Img,608-266+32, 70+48+32);
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("Vie Bonus Maximum",608-266+32, 70+48+32+48);
		surface.fillStyle = "rgb(150,50,255)";
		surface.fillText((Class[this.index].Lrm*6),608-266+32, 70+48+32+48+32);
		surface.fillStyle = "rgb(150,150,150)"
		surface.fillText("Multiplicateur de stats",608-266+32, 70+48+32+48+32+48);
		surface.fillStyle = "rgb(50,50,255)";
		surface.fillText("For: X"+(Class[this.index].For),608-266+32, 70+48+32+48+32+48+32);
		surface.fillText("Con: X"+(Class[this.index].Con),608-266+32, 70+48+32+48+32+48+32+32);
		surface.fillText("Tai: X"+(Class[this.index].Tai),608-266+32, 70+48+32+48+32+48+32+32+32);
		surface.fillText("Dex: X"+(Class[this.index].Dex),608-266+32, 70+48+32+48+32+48+32+32+32+32);
	}
	else
	{
		surface.font = "20px pixel";
		surface.fillStyle = "rgb(150,150,150)"
		word=Class[this.index].Desc.split("");
		y=0;
		x=0;
		flag=11;
		for (i=0;i<word.length;i++)
		{
			if(i>flag && word[i]==" ")
			{
				y+=1;
				flag+=20;
				x=0;
			}
			x+=1;
			surface.fillText(word[i],608-266-50+32+x*10, 70+48+y*32);
		}
	}
}

/**
 * Generates a new dungeon and spawn the player in this last
 */
PlayerEditor.prototype.validate=function()
{
	stair=Client.generateDungeon();
	player=new Player(stair,0,0,1,50,180,1,Class[this.index]);
	Client.start(player);
	Scene=Client;
}
