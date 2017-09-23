//
//
// MapManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapManager", {
   //マップに関する統括。指示だけ出しまくって処理を完遂させる。
   //カメラ位置更新に対する、focus_node_pos / focus_area_pos 更新の見極め差表だけはここでやる。
   //データの入った完成品 valid_map_data はここでのみ保持する。


   //ロードすべきエリア分の、その中身も入ったマップデータ。
   //ロードされてないエリアには 0 が入っている
   //変則四次元配列([area_x][area_y]  {floor:arr[node_y][node_x], collision:arr, objects:arr} or 0);
   valid_map_data: null,

   focus_area_pos: Vector2(-1,-1), //マップ初期化で反応するように負数をいれておく
   focus_node_pos: Vector2(-1,-1),


   init: function() {
      this.AreaList = AreaList();
      this.Area = Area();
      this.Visibility = MapNodeVisibility();

      this.valid_map_data = this.AreaList.getAreaList();
      this._updateArea(AREA_DEF_POS);
      this._updateNode(NODE_DEF_POS , AREA_DEF_POS);
   },


   updateMap: function(camera_pos){
      //カメラの位置(=画面表示中央の位置)に変更があったときは、ピクセル絶対座標でそれを受け取る

      //カメラ位置のマップチップと、エリアに変更があるか見極める(外部委託する？)
      //エリアに変更があれば _updateMap に渡す
      //なければ飛ばして、ノードに変更があれば _updateNode を呼ぶ
   },


   _updateArea: function(new_focus_area_pos) {
      //new_focus_area_pos = カメラ表示対象となるべきエリア(Vector2(x,y))

      var new_pos = new_focus_area_pos;
      if(this.focus_area_pos.equals(new_pos)) return; //エリアに変更なければつっぱねる

      var update_data  = this.AreaList.getUpdateData(new_pos); //{ unload:[area_pos , ...] , load:[area_pos , ...]}
      var unload_list = update_data.unload;
      var load_list = update_data.load;

      this.valid_map_data = this.Area.unloadAreas(this.valid_map_data , unload_list);
      this.valid_map_data = this.Area.loadAreas(this.valid_map_data , load_list);
   },


   _updateNode: function(new_focus_node_pos , new_focus_area_pos){
      //new_focus_node_pos = カメラ表示対象となるべきノード(Vector2(x,y))
      //new_focus_area_pos = まだ focus_area_pos には更新されていない

      //新規カメラ位置と、中身入りマップリストを MapNodeVisibility_Class に渡して、マップチップごとに表示の可否を付けて返してもらう (いまここ)
      //MapRenderer_Class に、可否のついた最終版リストを渡して表示処理(child)してもらう。
      //(↑Rendererはマップ以外も統括する偉いひとにする？)
      //最後に focus_area_pos , focus_node_pos を更新しておく

      var new_pos = new_focus_node_pos;
      if(this.focus_node_pos.equals(new_pos) &&
         this.focus_area_pos.equals(new_focus_area_pos)) return; //エリア・ノード共に変更なければつっぱねる

      this.Visibility.updateVisibility(this.valid_map_data , new_pos);
   },


});
