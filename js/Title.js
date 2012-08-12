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

}

Title.prototype.update=function()
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
		surface.fillText(">",80, 150+70*this.index);		
}

Title.prototype.validate=function()
{
		if(this.index==1)
		{
			Scene=new PlayerEditor();
		}
	
		//fonctions à venir
}
