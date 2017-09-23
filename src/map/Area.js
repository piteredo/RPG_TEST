//
//
// Area.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Area", {
   //MapManager_Class に呼ばれたときだけ働く。
   //valid_map_data を預かって、指定されたエリアデータを消し去って返す
   //valid_map_data を預かって、指定されたエリアデータを構築して詰め込んで返す
   //エリアデータの構築は、area_asset(TiledMapEditorのタイルマップデータ) 読み込み、各ノード情報を MapNode_Class から貰って行う。


   superClass: "DisplayElement",


   init: function() {
      this.superInit();
      this.MapNode = MapNode();
   },


   unloadAreas: function(valid_map_data , unload_list){
      var data = valid_map_data;
      var a = unload_list;
      (a.length).times(function(i){
         var x = a[i].x;
         var y = a[i].y;
         data[y][x] = null;
      });
      return data;
   },


   loadAreas: function(valid_map_data , load_list){
      var data = valid_map_data;
      var a = load_list;
      (a.length).times(function(i){
         var x = a[i].x;
         var y = a[i].y;
         data[y][x] = this._buildAreaData(a[i]);
      }.bind(this));

      return data;
   },


   _buildAreaData: function(area_pos) {
      var area_asset = this._loadAreaAsset(area_pos);
      var maptip_set_list = area_asset.getMaptipSetList();

      var floor_node_a = area_asset.getMapData(MAP_FLOOR_LAYER_NAME);
      var floor_node_data = this._buildNodeDataList(floor_node_a , maptip_set_list , area_pos);

      var collision_node_a = area_asset.getMapData(MAP_COLLISION_LAYER_NAME);
      var collision_node_data = this._buildNodeDataList(collision_node_a , maptip_set_list , area_pos);

      var objects_node_a = area_asset.getMapData(MAP_OBJECTS_LAYER_NAME);
      var objects_node_data = this._buildNodeDataList(objects_node_a , maptip_set_list , area_pos);

      var area_data = {floor:floor_node_data , collision:collision_node_data , objects:objects_node_data};
      return area_data;
   },


   _loadAreaAsset: function(area_pos) {
      var x = area_pos.x;
      var y = area_pos.y;
      var label = "x" + x + "_y" + y; // like "x0_y0"
      var asset = phina.asset.AssetManager.get("tmx", label);

      return asset;
   },


   _buildNodeDataList: function(node_list, maptip_set_list, area_pos) {
      var a = [];
      (node_list.length).times(function(y){
         a.push([]);
         (node_list[y].length).times(function(x){
            var maptip_id = node_list[y][x];
            var maptip_set_data = this._getMaptipSetData(maptip_set_list, maptip_id);
            var maptip_set_name = maptip_set_data.name;
            var firstgid = maptip_set_data.firstgid;
            var tip_x = x;
            var tip_y = y;

            var node = this.MapNode.getMapNodeData(maptip_id, maptip_set_name, firstgid, tip_x, tip_y, area_pos.x, area_pos.y);

            a[y].push(node);

         }.bind(this));
      }.bind(this));

      return a;
   },


   _getMaptipSetData: function(maptip_set_list, maptip_id) {
      var name = null;
      var firstgid = -1;

      (maptip_set_list.length).times(function(i){
         if (maptip_id >= maptip_set_list[i].firstgid) {
            name = maptip_set_list[i].name;
            firstgid = maptip_set_list[i].firstgid;
         }
      });

      return {
         name: name,
         firstgid: firstgid
      };
   },
});
