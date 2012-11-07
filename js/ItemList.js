/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ITEMLIST.JS              														 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This File lists the various items that the player can found during his adventure.
 * To add an item, you must create an object and instanciate the Item or the ItemFood class.
 * The informations of the items must be in this order:
 * 	For Items:
 * 		name,weight,description,price and type.
 * 	For Eatble Items (ItemFood):
 * 		name,weight,effect amount,cooking result object 
 * 		(for example RawSteak to Steak, type undefined if you won't add a cooking result),description,price and type.
 * 	For Potions (ItemPotion):
 * 		name,weight,effect time(in turns),ligth bonus,strength bonus,constitution bonus,size bonus,dexterity bonus,
 * 		life bonus,attack number bonus,lrm bonus,permanentLifeBonus,description,price
 */

/**
 * The no-specials items.
 */
var SpiderLeg=new Item("patte d'arai.",2,"Une patte velue arachee du corps d'une enorme araignee.",2,"drop");
var SpiderEye=new Item("oeil d'arai.",2,"Un oeil visqueux arachee du corps d'une enorme araignee.",2,"drop");
var GrassGreen=new Item("herbe verte",1,"une poignee d'herbe aux proprietes curatives.",3,"grass");
var Stick=new Item("baton",2,"Un petit bout de bois.",1,"grass");
var LightMushroom=new Item("champ. phospho.",3,"Un champignon qui semble emmetre de la lumiere dans le noir.",5,"grass");


/**
 * The potions
 */
var LifePotion=new ItemPotion("potion vie",5,30,0,0,0,0,0,0,50,"Une potion a l'etrange couleur verte.",50);
var LittleLightPotion=new ItemPotion("peti. poti. lumi.",5,20,2,0,0,0,0,0,0,"Cette potion semble emmetre de la lumiere dans le noir.",50);


/**
 * The eatables items.
 */
var RottenFlesh=new ItemFood("chair infa.",2,5,undefined,"Un bout de chair a l'aspect fort peu apetissant.",2);
var Steak=new ItemFood("steak",2,20,undefined,"Un bon morceau de muscle cuit a point.",15);
var RawSteak=new ItemFood("steak cru",2,10,Steak,"Un morceau de muscle juteux preleve sur un cadavre.",5);
var Skewer=new ItemFood("brochette",4,30,undefined,"De bons morceaux de steak embroches sur une pique.",20);
var GreenPotion=new ItemFood("potion ver.",5,0,LifePotion,"Une etrange potion verte, on dirait qu'il y manque quelque chose...",4);
var GreenSalad=new ItemFood("salade ver.",2,10,undefined,"Un mélange d'herbes verte, peu nutritif.",9); 


/**
 * The specials items.
 */
var Lighter=new ItemLighter("briquet",3,"Un petit briquet constitue d'un pierre et d'un bout de fer rouille.",3);
var WaterBucket=new ItemWaterBucket("seau d'eau",12,"Un seau rempli d'eau.",9);
var Bucket=new ItemBucket("seau",6,"Un seau en fer vide.",9); 
var WoodenTorch=new ItemTorch("torche bois",6,2,"Une torche simple constituée d'un simple morceau de bois.",3);
var Seed=new ItemSeed("graine",1,"Une petie graine fragile.",1);
