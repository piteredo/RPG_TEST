//
//
// AreaBuilder.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("AreaBuilder", {
   superClass: "DisplayElement",


   init: function() {
      this.superInit();
      this.Maptip = Maptip();
   },


   buildArea: function(area_pos) {
      var tileset = this._loadTileset(area_pos);
      var tileset_list = tileset.getTilesetData();

      var floor_maptip_list = tileset.getMapData(MAP_FLOOR_LAYER_NAME);
      var collision_maptip_list = tileset.getMapData(MAP_COLLISION_LAYER_NAME);
      var objects_maptip_list = tileset.getMapData(MAP_OBJECTS_LAYER_NAME);

      var floor_node_list = this._buildNodeList(floor_maptip_list, tileset_list, area_pos);
      var collision_node_list = this._buildNodeList(collision_maptip_list, tileset_list, area_pos);
      var objects_node_list = this._buildNodeList(objects_maptip_list, tileset_list, area_pos);

      var area = {
         pos: area_pos,
         floor_list: floor_node_list,
         collision_list: collision_node_list,
         objects_list: objects_node_list
      };

      return area;
   },


   _loadTileset: function(area_pos) {
      var x = area_pos.x;
      var y = area_pos.y;
      var label = "x" + x + "_y" + y; // like "x0_y0"
      var tileset = phina.asset.AssetManager.get("tmx", label);
      tileset.area_pos = Vector2(x, y);

      return tileset;
   },


   _buildNodeList: function(map_data, tileset_list, area_pos) {
      var arr = [];
      for (var y = 0; y < map_data.length; y++) {
         arr.push([]);
         for (var x = 0; x < map_data[y].length; x++) {
            var maptip_no = map_data[y][x];
            var img_name = this._getFirstGid(tileset_list, maptip_no).img_name;
            var firstgid = this._getFirstGid(tileset_list, maptip_no).firstgid;
            var tip_x = x;
            var tip_y = y;

            var node = this.Maptip.getMaptipData(maptip_no, img_name, firstgid, tip_x, tip_y, area_pos.x, area_pos.y);

            arr[y].push(node);
         }
      }
      return arr;
   },


   _getFirstGid: function(tileset_list, maptip_no) {
      //@param tileset=画像へのリンクのリスト
      //@param maptip_no=マップチップの番号
      var img_name;
      var firstgid;
      for (var i = 0; i < tileset_list.length; i++) {
         if (maptip_no < 0) {
            img_name = null;
            firstgid = -1;
         } else if (maptip_no >= tileset_list[i].firstgid) {
            img_name = tileset_list[i].name;
            firstgid = tileset_list[i].firstgid;
         }
      }

      return {
         img_name: img_name,
         firstgid: firstgid
      };
   },
});
