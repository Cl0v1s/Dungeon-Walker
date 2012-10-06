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
	this.menu=new WindowChoice(608/2-300/2,520/2-50+100,300,120,"Nouvelle partie","Poursuivre","Credits",30);

}

Title.prototype.update=function()
{
		this.draw();
		this.menu.update();
		this.index=this.menu.getIndex();
			
		if(Input.equals(13))
			this.validate();
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
		surface.fillText(">",80, 150+70*(this.index+1));	
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
		this.menu.draw();
	}
	
	
	
}


Title.prototype.validate=function()
{
		if(this.index==0)
		{
			Scene=new PlayerEditor();
		}
	
		//fonctions à venir
}
