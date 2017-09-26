//
//
// Char.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Char",{
   superClass: "DisplayElement",


   //全共通
   name: "_name",
   level: 1,
   hp: 10,
   hp_full: 10,
   mp: 0,
   mp_full: 10,
   //
   char_id: -1, //char_no
   unique_id: -1, //unique_id
   area_pos: Vector2(0, 0),
   node_pos: Vector2(0, 0),
   asset_name: null, //？
   frame_index: 0,
   visible: false,
   //
   isWalking: false,
   isTalking: false,
   isFighting: false,
   isAttacking: false,
   isUnderAttack: false,
   isMuteki: false, //naming..？
   isDead: false,


   init: function(){
      this.superInit();
   },

   //ACTION_METHOD..
});
