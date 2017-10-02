//
//
// Area.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Area", {
   superClass: "DisplayElement",


   init: function() {
      this.superInit();

      //子クラスの初期化
      this.MapNode = MapNode();
   },


   loadAreas: function(map_data , load_area_list){
      //MapManager に呼ばれる
      var data = map_data;
      var a = load_area_list;
      (a.length).times(function(i){
         var x = a[i].x;
         var y = a[i].y;
         data[y][x] = this._buildAreaData(a[i]);
      }.bind(this));

      return data;
   },


   unloadAreas: function(map_data , unload_area_list){
      //MapManager に呼ばれる
      var data = map_data;
      var a = unload_area_list;
      (a.length).times(function(i){
         var x = a[i].x;
         var y = a[i].y;
         data[y][x] = null;
      });
      return data;
   },


   _buildAreaData: function(area_pos) {

      //メソッド分割してNPC,Enemy呼び出しと共有する


      //tmxタイルマップデータを大元を読み込み
      var area_asset = this._loadAreaAsset(area_pos);

      //このエリアで使っているタイルセット画像の一覧
      var maptip_set_list = area_asset.getMaptipSetList();

      var floor_map_arr = area_asset.getMapData(MAP_FLOOR_LAYER_NAME);
      var objects_map_arr = area_asset.getMapData(MAP_OBJECTS_LAYER_NAME);
      var collision_map_arr = area_asset.getMapData(MAP_COLLISION_LAYER_NAME);

      var area_data = [];
      (floor_map_arr.length).times(function(y){
         area_data.push([]);
         (floor_map_arr[y].length).times(function(x){

            var floor_maptip_id = floor_map_arr[y][x];
            var objects_maptip_id = objects_map_arr[y][x];
            var collision_maptip_id = collision_map_arr[y][x];
            var node_pos = Vector2(x, y);

            var node = this.MapNode.createMapNode(floor_maptip_id, objects_maptip_id, collision_maptip_id, maptip_set_list, area_pos, node_pos);
            area_data[y].push(node);

         }.bind(this));
      }.bind(this));

      return area_data;
   },


   _loadAreaAsset: function(area_pos) {
      var x = area_pos.x;
      var y = area_pos.y;
      var label = "x" + x + "_y" + y; // like "x0_y0"
      var asset = phina.asset.AssetManager.get("tmx", label);

      return asset;
   },


   getNpcList: function(map_data){
      //MapManager に呼ばれる

      //メソッド分割して↑と共有する

      var npc_list = [];
      (map_data.length).times(function(y){
         (map_data[y].length).times(function(x){
            var area_pos = Vector2(x, y);

            //tmxタイルマップデータを大元を読み込み
            var area_asset = this._loadAreaAsset(area_pos);

            //このエリアで使っているタイルセット画像の一覧
            var maptip_set_list = area_asset.getMaptipSetList();

            var npc_arr = area_asset.getMapData(MAP_NPC_LAYER_NAME);

            (npc_arr.length).times(function(yy){
               (npc_arr[yy].length).times(function(xx){

                  var id = npc_arr[yy][xx];
                  var node_pos = Vector2(xx, yy);
                  //var area_pos = Vector2(x, y);

                  var node = {id:id, area_pos:area_pos, node_pos:node_pos};

                  if(id >= 0) npc_list.push(node);

               }.bind(this));
            }.bind(this));
         }.bind(this));
      }.bind(this));

      return npc_list;
   },


   getEnemyList: function(map_data){
      //MapManager に呼ばれる

      //メソッド分割して↑と共有する

      var enemy_list = [];
      (map_data.length).times(function(y){
         (map_data[y].length).times(function(x){
            var area_pos = Vector2(x, y);

            //tmxタイルマップデータを大元を読み込み
            var area_asset = this._loadAreaAsset(area_pos);

            //このエリアで使っているタイルセット画像の一覧
            var maptip_set_list = area_asset.getMaptipSetList();

            var enemy_arr = area_asset.getMapData(MAP_ENEMY_LAYER_NAME);

            (enemy_arr.length).times(function(yy){
               (enemy_arr[yy].length).times(function(xx){

                  var id = enemy_arr[yy][xx];
                  var node_pos = Vector2(xx, yy);
                  //var area_pos = Vector2(x, y);

                  var node = {id:id, area_pos:area_pos, node_pos:node_pos};

                  if(id >= 0) enemy_list.push(node);

               }.bind(this));
            }.bind(this));
         }.bind(this));
      }.bind(this));

      return enemy_list;
   },


});
