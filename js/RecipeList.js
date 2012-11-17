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
  var SkewerRecipe=new Recipe("recette de brochettes",new Array(Skewer),new Array(Steak,Stick));
  var GreenSaladRecipe=new Recipe("recette de salade verte",new Array(GreenSalad),new Array(GrassGreen,GrassGreen,GrassGreen));
  
  /**
   * Potions
   */
  var GreenPotionRecipe=new Recipe("recette de potion de vie",new Array(GreenPotion),new Array(WaterBucket,GrassGreen));   
  var LittleLightPotionRecipe=new Recipe("recette de petite potion de lumiere",new Array(LittleLightPotion),new Array(WaterBucket,LightMushroom,LightMushroom)); 
  
  /**
  * Other
  **/
  var WoodenTorchRecipe=new Recipe("Torche de bois",new Array(WoodenTorch,Lighter),new Array(Stick,Lighter));
  
