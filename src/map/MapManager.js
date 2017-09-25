//
//
// MapManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapManager", {
   //マップに関する統括。指示だけ出しまくって自分は作業せずに処理を完遂させる。
   //全体に関わる雑用計算だけここでやる(？) または庶務課をつくる？
   //データの入った完成品 valid_map_data はここでのみ保持する。


   //ロードすべきエリア分の、その中身も入ったマップデータ。ロードされてないエリアには 0 が入っている
   //四次元配列([area_x][area_y][node_y][node_x]( {floor:floor_node collision:node, objects:node} or 0 );
   map_data: null,

   ctr_area_pos: Vector2(-1, -1), //マップ初期化で反応するように負数をいれておく
   ctr_node_pos: Vector2(-1, -1),


   init: function(AssetLayer_Class) {
      this.AreaList = AreaList();
      this.Area = Area();
      this.Visibility = MapNodeVisibility(this);
      this.Renderer = MapRenderer(this, AssetLayer_Class);

      this.grid = this._getMapGrid();
      this.map_data = this.AreaList.getAreaList();

      this._updateArea(AREA_DEF_POS);
      this._updateNode(AREA_DEF_POS, NODE_DEF_POS);
   },


   _getMapGrid: function() { //外部委託する？
      var grid = Grid({
         width: Math.min(MAP_WIDTH, MAP_HEIGHT),
         columns: NODE_LENGTH * AREA_LENGTH
      });
      return grid;
   },


   updateMap: function(abs_x , abs_y) {
      //カメラのtarget_obj(通常は自キャラ)位置に変更があったら、abs_pos(？)でそれを受け取る
      //カメラ位置のマップチップと、エリアに変更があるか見極める(外部委託する？)
      //エリアに変更があれば _updateMap に渡す
      //なければ飛ばして、ノードに変更があれば _updateNode を呼ぶ
   },


   _updateArea: function(new_ctr_area_pos) {
      if (this.ctr_area_pos.equals(new_ctr_area_pos)) return; //エリアに変更なければつっぱねる

      var data = this.AreaList.getUpdateData(new_ctr_area_pos); //{ unload:[area_pos , ...] , load:[area_pos , ...]}
      var unload_list = data.unload;
      var load_list = data.load;

      this.map_data = this.Area.unloadAreas(this.map_data, unload_list);
      this.map_data = this.Area.loadAreas(this.map_data, load_list);
   },


   _updateNode: function(new_ctr_area_pos, new_ctr_node_pos) {
      if ( //エリア・ノード共に変更なければつっぱねる
         this.ctr_node_pos.equals(new_ctr_node_pos) &&
         this.ctr_area_pos.equals(new_ctr_area_pos)
      ) return;

      var abs_pos = this.getAbsPos(new_ctr_area_pos, new_ctr_node_pos);
      var update_nodes = this.Visibility.updateVisibility(this.map_data, abs_pos);
      this.Renderer.render(update_nodes.child , this.grid);
      //remove_list 内ノードの削除処理

      //最後に ctr_area_pos , ctr_node_pos を更新しておく
   },


   getNode: function(abs_x, abs_y, layer_name) {
      var x = abs_x;
      var y = abs_y;
      if (x < 0 || y < 0 || x >= AREA_LENGTH * NODE_LENGTH || y >= AREA_LENGTH * NODE_LENGTH) return false;

      var area_pos = this._getRelPosData(x, y).area_pos;
      var node_pos = this._getRelPosData(x, y).node_pos;

      var node;
      if(layer_name == "all") node = this.map_data[area_pos.y][area_pos.x][node_pos.y][node_pos.x];
      else node = this.map_data[area_pos.y][area_pos.x][node_pos.y][node_pos.x][layer_name];

      return node;
   },


   _getRelPosData: function(abs_x, abs_y) {
      var area_x = Math.floor(abs_x / NODE_LENGTH);
      var area_y = Math.floor(abs_y / NODE_LENGTH);
      var node_x = (abs_x % NODE_LENGTH);
      var node_y = (abs_y % NODE_LENGTH);

      var list = {
         area_pos: Vector2(area_x, area_y),
         node_pos: Vector2(node_x, node_y)
      };
      return list;
   },


   getAbsPos: function(area_pos , node_pos){
      var n_p = node_pos;
      var a_p = area_pos;
      var abs_pos = a_p.mul(NODE_LENGTH).add(n_p);

      return abs_pos;
   },


});
