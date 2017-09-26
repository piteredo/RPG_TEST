//
//
// Enemy.A.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Enemy.A",{
   superClass: "Enemy",


   char_id: 0,
   name: "enemy_a",
   level: 3,
   hp: 100,
   hp_full: 120,
   mp: 20,
   mp_full: 30,
   //
   str: 4,
   def: 3,
   int: 5,
   dex: 2,
   crt: 6,
   //
   type: "PASSIVE", //PASSIVE or ACTIVE
   track_dist: 10, //DIST FROM TARGET (ACTIVE_SCENE)
   exp_given: 72,
   item_given: ["potato", "juice"], //？


   init: function(){
      this.superInt();
   },

   //ATTACH UNIQUE_ID
   //GET MOVE_AREA
   //GET MONITOR_AREA (for active enemy)
   //GET FST_POS(AREA / NODE)
   //ASSET_NAME?
   //VISIBILITY BE TRUE
});
