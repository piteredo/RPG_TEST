//
//
// NPC.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Npc",{
   superClass: "Char",


   //NPC のみ
   type: "_type", //SHOP, QUEST..？
   talkable: true,
   move_area: [], //SET 4POS (NON_ACTIVE_SCENE) MOVE??


   init: function(){
      this.superInit();
   },
});
