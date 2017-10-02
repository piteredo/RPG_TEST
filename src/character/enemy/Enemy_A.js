//
//
// Enemy_A.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Enemy_A",{
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
      this.superInit();
   },

   //ATTACH UNIQUE_ID
   //GET MOVE_AREA
   //GET MONITOR_AREA (for active enemy)
   //GET FST_POS(AREA / NODE)
   //ASSET_NAME?
   //VISIBILITY BE TRUE


   getNodeData: function(char_id, area_pos, node_pos, abs_pos){
      //EnemyManager に呼ばれる
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
      var label = "enemy_" + char_id;
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
