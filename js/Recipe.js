var RecipeList=new Array();

function Recipe(nameTemp,resultTemp,elementsTemp)
{
	this.name=nameTemp;
	this.result=resultTemp;
	this.elements=elementsTemp;
	this.id=RecipeList.length;
	RecipeList[RecipeList.length]=this;
}

/**
 * Returns the recipe's name
 */
Recipe.prototype.getName=function()
{
	return this.name;
}

/**
 * Returns the recipe's result
 */
Recipe.prototype.getResult=function()
{
	return this.result;
}

/**
 * Returns the recipe's elements
 */
Recipe.prototype.getElements=function()
{
	return this.elements;
}

/**
 * Checks if the caller have all the elements in his inventory, destroy the caller's inventory's elements
 * and adds the recipe's result to the caller's inventory.
 */
Recipe.prototype.craft=function(caller)
{
	got=0;
	previous=new Array();
	if(caller != undefined)
	{
		for(i=0;i<this.elements.length;i++)
		{
				for(u=0;u<caller.inventory.contains.length;u++)
				{
					if(caller.inventory.contains[u] != undefined)
					{
						if(caller.inventory.contains[u].getId()==this.elements[i].getId())
						{
							previous.push(caller.inventory.contains[u].getId());
							caller.inventory.remove(u);
							got=got+1;
							if(got==this.elements.length)
							{
								for(o=0;i<this.result.length;o++)
								{
									caller.inventory.add(this.result[o].getId());
								}
								return;
							}
						}
					}
				}
		}
	}
	else
	{
		console.log("Recipe.js: method craft, caller is undefined.");
	}
	for(n=0;n<previous.length;n++)
	{
		caller.inventory.add(previous[n]);
	}
	caller.sendMessage("Vous n'avez pas tout les objets necessaires pour realiser cette recette.");
}
