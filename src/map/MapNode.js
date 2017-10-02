//
//
// MapNode.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapNode", {
   superClass: "DisplayElement",

   init: function() {
      this.superInit();
   },


   createMapNode: function(floor_maptip_id, objects_maptip_id, collision_maptip_id, maptip_set_list, area_pos, node_pos){
      //Area から呼ばれる
      var floor_node_maptip_set = this._getMaptipSetDataOfNode(floor_maptip_id, maptip_set_list);
      var objects_node_maptip_set = this._getMaptipSetDataOfNode(objects_maptip_id, maptip_set_list);

      var floor_node_sprite = this._getMaptipSprite(floor_maptip_id, floor_node_maptip_set);
      var objects_node_sprite = this._getMaptipSprite(objects_maptip_id, objects_node_maptip_set);
      var collision_boo = this._getCollisionBoo(collision_maptip_id); //壁ならtrue、壁でなければfalse

      var node = this._attachNodeProperty(floor_node_sprite, objects_node_sprite, collision_boo, area_pos, node_pos);
      return node;
   },


   _getMaptipSetDataOfNode: function(maptip_id, maptip_set_list) {
      var name = null;
      var firstgid = -1;

      (maptip_set_list.length).times(function(i){
         if (maptip_id >= maptip_set_list[i].firstgid) {
            name = maptip_set_list[i].name;
            firstgid = maptip_set_list[i].firstgid;
            tilewidth = maptip_set_list[i].tilewidth;
            tileheight = maptip_set_list[i].tileheight;
         }
      });
      return {
         name: name,
         firstgid: firstgid,
         tilewidth: tilewidth,
         tileheight: tileheight
      };
   },


   _getMaptipSprite: function(maptip_id, maptip_set){
      var maptip = null; // マップチップが存在しないノード = null でこの先済むのか？

      var id = maptip_id;
      var name = maptip_set.name;
      var firstgid = maptip_set.firstgid;
      var width = maptip_set.tilewidth;
      var height = maptip_set.tileheight;

      //firstgid = -1 のときはマップチップ無しノードなので nullを返す
      if (firstgid >= 0) {
         maptip = this._loadSprite(name, width, height);
         maptip.setFrameIndex(id - firstgid);
      }

      return maptip;
   },


   _loadSprite: function(name, width, height) {
      return Sprite(name, width, height);
   },


   _getCollisionBoo: function(collision_maptip_id){
      var id = collision_maptip_id;
      if(id < 0) return false;
      return true;
   },


   _attachNodeProperty: function(floor_node_sprite, objects_node_sprite, collision_boo, area_pos, node_pos){
      var node = floor_node_sprite;
      node.area_pos = area_pos;
      node.node_pos = node_pos;
      node.abs_pos = this._getRelPosToAbsPos(area_pos, node_pos);
      //node.step = 0;
      node.visible = false;

      //書く場所ここじゃない
      if(objects_node_sprite != null){
         objects_node_sprite.setOrigin(0.5, 0.75); //自動計算にする
         objects_node_sprite.addChildTo(node);
      }

      node.collision = collision_boo;

      return node;
   },


   _getRelPosToAbsPos: function(area_pos , node_pos){
      var x = node_pos.x + (area_pos.x * NODE_LENGTH);
      var y = node_pos.y + (area_pos.y * NODE_LENGTH);
      var abs_pos = Vector2(x, y);
      return abs_pos;
   },

});
