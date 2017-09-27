//
//
// Hero.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Hero",{
   superClass: "Char",


   //全共通
   name: CHAR_HERO_NAME,
   level: 2,
   hp: 12,
   hp_full: 15,
   mp: 4,
   mp_full: 14,
   //
   area_pos: AREA_DEF_POS,
   node_pos: NODE_DEF_POS,

   //Hero のみ
   exp: 4,
   exp_full: 20,
   money: 50,
   item: [], //GET ITEM_LIST
   equip: [], //GET EQUIP_LIST

   //Hero, Enemy のみ
   str: 23,
   def: 67,
   int: 43,
   dex: 77,
   crt: 2,


   init: function(){
      this.superInit();
   },


   getHeroNode: function(area_pos, node_pos, char_id, unique_id){
      var node = this._loadHeroNode(char_id);
      this._attachProperty(node, area_pos, node_pos, char_id, unique_id);

      return node;
   },

   _loadHeroNode: function(char_id){
      var asset = this._loadAsset(char_id);
      var node = Sprite(asset , 60, 80);
      return node;
   },


   _loadAsset: function(char_id){
      if(char_id < 0){
         console.log("error");
         return;
      }
      var label = "hero_" + char_id;
      var asset = phina.asset.AssetManager.get("image", label);
      return asset;
   },

   _attachProperty: function(node, area_pos, node_pos, char_id, unique_id){
      node.char_id = char_id;
      node.unique_id = unique_id;
      node.area_pos = area_pos;
      node.node_pos = node_pos;
      node.visible = true;
      node.frameIndex = 1;
   },

});
