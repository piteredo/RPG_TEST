//
//
// MapNode.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapNode", {
   //マップのエリア作成時に Area_Class からのみ呼ばれて、マップの単一ノードの情報を詰め込んで返す。

   superClass: "DisplayElement",


   init: function() {
      this.superInit();
   },


   getMapNodeData: function(maptip_id, maptip_set_name, firstgid, tilewidth, tileheight, node_x, node_y, area_x, area_y) {
      var node = null; // マップチップが存在しないノード = null でこの先済むのか？

      if (firstgid >= 0) {
         node = this._loadMaptip(maptip_set_name, tilewidth, tileheight);
         node.setFrameIndex(maptip_id - firstgid);
         node.node_pos = Vector2(node_x, node_y);
         node.area_pos = Vector2(area_x, area_y);
         //node.step = 0;
         node.visible = false;
      }

      return node;
   },


   _loadMaptip: function(maptip_set_name, tilewidth, tileheight) {
      return Sprite(maptip_set_name, tilewidth, tileheight);
   },


});
