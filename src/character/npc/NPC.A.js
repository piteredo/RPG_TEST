//
//
// NPC.A.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("NPC.A",{
   superClass: "NPC",


   char_id: 0,
   name: "npc_a",
   level: 50,
   hp: 980,
   hp_full: 999,
   mp: 990,
   mp_full: 997,


   init: function(){
      this.superInt();
   },

   //ATTACH UNIQUE_ID
   //GET MOVE_AREA
   //GET FST_POS(AREA / NODE)
   //ASSET_NAME?
   //VISIBILITY BE TRUE
});
