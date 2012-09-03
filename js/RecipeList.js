/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * RECIPELIST.JS              														 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This File lists the various recipes that the player can craft during his adventure.
 * To add a recipe, you must create an object and instanciate the Recipe class.
 * The informations of the recipes must be in this order:
 * 		name,result item and an array who contains the recipe's various elements.
 */
 
 /**
  * Eatables
  */
  var SkewerRecipe=new Recipe("recette de brochettes",Skewer,new Array(Steak,Stick));
  var GreenPotionRecipe=new Recipe("recette de potion de vie",GreenPotion,new Array(WaterBucket,GrassGreen));
