//
//
// MapManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapManager", {

   map_data: null,
   focus_area_pos: Vector2(-1, -1),

   init: function(MainScene, TouchManager) {
      //子クラスの初期化
      this.AreaList = AreaList();
      this.Area = Area();

      //map_data の雛形を取得
      this.map_data = this.AreaList.getAreaListFormat();
   },


   getMapData: function(new_focus_area_pos){
      //MainScene に呼ばれる
      var new_pos = new_focus_area_pos;
      var old_pos = this.focus_area_pos;
      if(new_pos.equals(old_pos)) return this.map_data;

      this._updateMapData(new_pos);
      this._updateFocusAreaPos(new_pos);

      return this.map_data;
   },


   _updateMapData: function(new_focus_area_pos){
      var update_data = this.AreaList.getAreaListUpdate(new_focus_area_pos); //{load:areas, unload:areas}
      var load_area_list = update_data.load;
      var unload_area_list = update_data.unload;

      this.map_data = this._loadAreas(load_area_list); //書き換えられた map_data が返される
      this.map_data = this._unloadAreas(unload_area_list);  //書き換えられた map_data が返される
   },


   _loadAreas: function(load_area_list){
      return this.Area.loadAreas(this.map_data, load_area_list);
   },


   _unloadAreas: function(unload_area_list){
      return this.Area.unloadAreas(this.map_data, unload_area_list);
   },


   _updateFocusAreaPos: function(new_pos){
      this.focus_area_pos = new_pos;
   },


   getNpcList: function(){
      //MainScene に呼ばれる
      return this.Area.getNpcList(this.map_data);
   },


   getEnemyList: function(){
      //MainScene に呼ばれる
      return this.Area.getEnemyList(this.map_data);
   },


   //暫定
   getRouteList: function(new_abs_pos){
      var new_area_pos_x = Math.floor(new_abs_pos.x/NODE_LENGTH);
      var new_area_pos_y = Math.floor(new_abs_pos.y/NODE_LENGTH);
      var new_node_pos_x = new_abs_pos.x%NODE_LENGTH;
      var new_node_pos_y = new_abs_pos.y%NODE_LENGTH;

      var new_node = this.map_data[new_area_pos_y][new_area_pos_x][new_node_pos_y][new_node_pos_x];

      if(new_node.collision) return false;

      return [new_abs_pos];
   },

});
