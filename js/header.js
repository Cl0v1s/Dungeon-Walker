////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BESTIAIRE
var ARAIGNEE_VELUE={
"Name" : "araignee velue",
"Biome": "dungeon",
"Img" : "X",
"Life" : 0,
"For" : 5,
"Con" : 2,
"Tai" : 2,
"Dex" : 5,
"Launch" : 1,
"Lrm" : 8,
"Weapon" : Claw,
"Follow" : false,
"Desc" : "On trouve cette araignée de la taille d'une main et à la morsure redoutable dans les jungles, les tombes, les grottes, et bien sur, dans tout l'Outreterre. Elles ne tissent pas de toile, mais peuvent s'installer sur celles d'autres araignees.",
"Score" : 10,
"Level" : 0,
"Drop" : new Array()
}
ARAIGNEE_VELUE.Drop[0]=SpiderLeg.getId();
ARAIGNEE_VELUE.Drop[1]=SpiderEye.getId();
ARAIGNEE_VELUE.Drop[2]=RottenFlesh.getId();


var CUBE_GELATINEUX={
"Name" : "cube gelatineux",
"Biome": "dtes",
"Img" : "&",
"Life" : 32,
"For" : 6,
"Con" : 1,
"Tai" : 4,
"Dex" : 2,
"Launch" : 4,
"Lrm" : 8,
"Weapon" : Glue,
"Follow" : false,
"Desc" : "Le cube gelatineux est un monstre presque transparent qui erre lentement dans les donjons et les cavernes, absorbant dechets, charogne et creatures vivantes. Il ne digère que les matieres organiques, les autres restant piegees et visibles à l’interieur de son corps.",
"Score" : 50,
"Level" : 100
}



var Bestiaire=new Array();
Bestiaire[0]=ARAIGNEE_VELUE;
Bestiaire[1]=CUBE_GELATINEUX;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CLASSES
var BARBARE={
"Name" :"barbare",
"Img" : "B",
"Life" : 0,
"Launch" : 1,
"Lrm" : 12,
"For" : 4,
"Con" : 1,
"Tai" : 1,
"Dex" : 1,
"Hi" : 20,
"Hr" : 2,
"Light" : 1,
"Weapon" : SingleEdgedSword,
"Desc" : "Les barbares sont des guerriers ruses, pleins de ressources, perseverants et impitoyables.Ils sont egalement plutot solitaires, c'est pour cela qu'ils vivent a l'ecart de la civilisation,en pleine nature."
}

var PALADIN={
"Name" :"paladin",
"Img" : "P",
"Life" : 0,
"Launch" : 1,
"Lrm" : 10,
"For" : 2,
"Con" : 1,
"Tai" : 1,
"Dex" : 2,
"Hi" : 20,
"Hr" : 5,
"Light" : 1,
"Weapon" : Pike,
"Desc" : "Les paladins sont possesseurs de magie divine et exellent dans le soin ainsi que dans la protection.Tres tot, les paladins sont capables de detecter le Mal et vivent pour le combattre."
}

var RODEUR={
"Name" :"rodeur",
"Img" : "R",
"Life" : 0,
"Launch" : 1,
"Lrm" : 8,
"For" : 1,
"Con" : 1,
"Tai" : 1,
"Dex" : 4,
"Hi" : 10,
"Hr" : 2,
"Light" : 2,
"Weapon" : Dague,
"Desc" : " Maitres dans l'art de traquer, les rodeurs connaissent les forets comme leurs poches et acceptent frequemment le role de protecteur de ceux qui vivent ou veulent traverser une foret.Plutot faibles ils preferent les embuscades au attaques directes."
}



var Class=new Array();
Class[0]=BARBARE;
Class[1]=PALADIN;
Class[2]=RODEUR;









