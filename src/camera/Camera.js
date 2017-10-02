//
//
// Camera.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Camera", {

   camera_px_pos: Vector2(SCREEN_WIDTH/2 , SCREEN_HEIGHT/2), //focus対象を画面中央に
   focus_uuid: null, //focus対象のuuidを保管する
   focus_abs_pos: Vector2(-1, -1),
   scope_width: SCREEN_WIDTH + (NODE_WIDTH * 2), //画面領域＋外側にマップノード１つ分ずつ、が可視範囲
   scope_height: SCREEN_HEIGHT + (NODE_HEIGHT * 2),

   init: function(AssetLayer){
      //子クラスの初期化
      this.CameraFocus = CameraFocus();
      this.CameraScope = CameraScope();

      this.AssetLayer = AssetLayer;
   },


   updateCameraPos: function(new_focus_uuid, new_focus_area_pos, new_focus_node_pos){
      //MainScene に呼ばれる
      if(new_focus_uuid != this.focus_uuid) this.focus_uuid = new_focus_uuid;

      var new_focus_abs_pos = this.CameraFocus.getRelPosToAbsPos(new_focus_area_pos, new_focus_node_pos);
      var ctr_px_pos = null;
      var camera_px_pos = this.camera_px_pos.clone(true); //演算するためコピー
      if(!new_focus_abs_pos.equals(this.focus_abs_pos)){
         this.focus_abs_pos = new_focus_abs_pos;
         ctr_px_pos = this.CameraFocus.getCenterPxPos(this.focus_abs_pos, camera_px_pos);
      }

      if(ctr_px_pos == null){
         console.log("error");
         return;
      }
      this.AssetLayer.updatePos(ctr_px_pos);
   },


   getVisibleNodeList: function(map_data, focus_area_pos, focus_node_pos){
      //MainScene に呼ばれる
      var camera_px_pos = this.camera_px_pos.clone(true); //演算するためコピー
      var ctr_abs_pos = this.CameraFocus.getCenterAbsPos(focus_area_pos, focus_node_pos, camera_px_pos);
      var visible_node_list =  this.CameraScope.getVisibleNodeList(map_data, ctr_abs_pos);

      return visible_node_list;
   },

});
