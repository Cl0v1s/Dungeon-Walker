/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ITEMLIST.JS              														 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This File lists the various items that the player can found during his adventure.
 * To add an item, you must create an object and instanciate the Item or the ItemFood class.
 * The informations of the items must be in this order:
 * 	For Items:
 * 		name,weight,description and price.
 * 	For Eatble Items (ItemFood):
 * 		name,weight,effect amount,cooking result object 
 * 		(for example RawSteak to Steak, type undefined if you won't add a cooking result),description and price.
 */

/**
 * The no-specials items.
 */
var SpiderLeg=new Item("patte d'arai.",2,"Une patte velue arachee du corps d'une enorme araignee.",2);
var SpiderEye=new Item("oeil d'arai.",2,"Un oeil visqueux arachee du corps d'une enorme araignee.",2);
/**
 * The eatables items.
 */
var RottenFlesh=new ItemFood("chair infame",2,2,undefined,"Un bout de chair a l'aspect fort peu apetissant.",2);
var Steak=new ItemFood("steak",2,10,undefined,"Un bon morceau de muscle cuit a point.",15);
var RawSteak=new ItemFood("steak cru",2,5,Steak,"Un morceau de muscle juteux preleve sur un cadavre.",5);
