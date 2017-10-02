//
//
// Npc_A.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Npc_A",{
   superClass: "Npc",


   char_id: 0,
   name: "npc_a",
   level: 50,
   hp: 980,
   hp_full: 999,
   mp: 990,
   mp_full: 997,


   init: function(){
      this.superInit();
   },

   //ATTACH UNIQUE_ID
   //GET MOVE_AREA
   //GET FST_POS(AREA / NODE)
   //ASSET_NAME?
   //VISIBILITY BE TRUE


   getNodeData: function(char_id, area_pos, node_pos, abs_pos){
      //NpcManager に呼ばれる
      var sprite = this._loadSprite(char_id);
      var uuid = Random.uuid(); //phina.util.Random
      var node = this._attachNodeProperty(sprite, uuid, area_pos, node_pos, abs_pos, char_id);

      return node;
   },

   _loadSprite: function(char_id){
      var asset = this._loadAsset(char_id);
      var node = Sprite(asset , 60, 80); //自動計算にする
      return node;
   },


   _loadAsset: function(char_id){
      if(char_id < 0){
         console.log("error");
         return;
      }
      var label = "npc_" + char_id;
      var asset = phina.asset.AssetManager.get("image", label);

      return asset;
   },

   _attachNodeProperty: function(sprite, uuid, area_pos, node_pos, abs_pos, char_id){
      var node = sprite;
      node.uuid = uuid;
      node.area_pos = area_pos;
      node.node_pos = node_pos;
      node.abs_pos = abs_pos;
      node.char_id = char_id;
      node.visible = false;
      node.setOrigin(0.5, 1); //自動計算にする
      node.frameIndex = 1; //自動計算にする

      return node;
   },
});
