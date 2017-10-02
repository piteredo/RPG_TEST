//
//
// Enemy.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Enemy",{
   superClass: "Char",


   //Enemy のみ
   type: "_type", //PASSIVE or ACTIVE
   move_area: [], //SET 4POS (NON_ACTIVE_SCENE)
   monitor_area: [], //only for active enemy
   track_dist: 0, //DIST FROM TARGET (ACTIVE_SCENE)
   exp_given: 0,
   item_given: [], //LIST？
   isTracking: false,
   attackable: true,

   //Hero, Enemy のみ
   str: 1,
   def: 1,
   int: 1,
   dex: 1,
   crt: 1,


   init: function(){
      this.superInit();
   },

});
