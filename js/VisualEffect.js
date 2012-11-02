/**
 * This class is a sprite can be placed everywhere on the screen.
 * The type is the index of the sprite in the Effect.png file.
 */


function VisualEffect(typeTemp)
{
	this.type=typeTemp;
	this.image = new Image();
	this.image.reference = this;
	this.image.onload = function() 
	{
		if(!this.complete) 
			throw new Error("Erreur de chargement du fichier nommé \"Effect.png\".");
	}
	this.image.src = "graphics/Effect.png";
	this.frame=0;
}

/**
 * Draws the effect at the specified position
 */
VisualEffect.prototype.draw=function(xTemp,yTemp)
{
	this.frame+=1;
	if(this.frame==20)
		this.type+=1;
	if(this.frame==40)
	{
		this.type-=1;
		this.frame=0;
	}
	surface.drawImage(this.image,this.type*32, 0, 32, 32,xTemp, yTemp, 32, 32);	
}
