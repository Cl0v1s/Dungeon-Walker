//////////////////////////////////////////////////////////////////////////////////////
//class Title
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 11/08/2012
/////////////////////////////////////////////////////////////////////////////////////
//Affiche le Menu Principal et gère les entrées.
////////////////////////////////////////////////////////////////////////////////////

function Title()
{
	this.index=1;
	this.title=undefined;

}

Title.prototype.update=function()
{
		this.draw();
		
		if(Input.equals(40))
			this.index+=1;
			
		if(Input.equals(38))
			this.index-=1;
			
		if(Input.equals(13))
			this.validate();
		
		
		if(this.index>3)
			this.index=1;

		
		if(this.index<1)
			this.index=3;
	
}

Title.prototype.draw=function()
{
	if(!Parameters.isTiled())
	{
		if(typeof r=="undefined")
		{

			r=50;
			v=50;
			b=50;
			ratio=5;
			for(i=0;i<380;i++)
			{
				surface.font = "100px pixel";
				surface.fillStyle = "rgb("+r+","+v+","+b+")";
				surface.fillText("#",100*i, 150);
			}
		}
		clean();
		surface.font = "100px pixel";
		surface.fillStyle = "rgb("+r+","+v+","+b+")";
		surface.fillText("DUNGEON WALKER",30, 70);
		r+=ratio;
		v+=ratio;
		b+=ratio;

		if(r>255)
		{
			ratio=-5;
		}
		if(r<50)
		{
			ratio=5;
		}

		surface.font = "50px pixel";
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("Nouvelle exploration",100, 150+70*1);
		surface.fillText("Reprendre une exploration",100, 150+70*2);
		surface.fillText("Credits",100, 150+70*3);
		surface.fillText(">",80, 150+70*this.index);	
	}
	else
	{
		if(this.title==undefined)
		{
			this.title=new Image();
			this.title.src="graphics/title.png";
		}	
		surface.fillStyle="rgb(234,249,173)";
		surface.fillRect (0, 0,document.getElementById('canvas').width,document.getElementById('canvas').height);
			
		surface.drawImage(this.title,0,0);	
		surface.font = "50px pixel";
		surface.fillStyle = "rgb(83,122,62)";
		surface.fillText("Nouvelle exploration",100, 190+70*1);
		surface.fillText("Reprendre une exploration",100, 190+70*2);
		surface.fillText("Credits",100, 190+70*3);
		surface.fillText(">",80, 190+70*this.index);	
	}
	
	
	
}


Title.prototype.validate=function()
{
		if(this.index==1)
		{
			Scene=new PlayerEditor();
		}
	
		//fonctions à venir
}
