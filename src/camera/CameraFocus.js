//
//
// CameraFocus.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("CameraFocus", {

   init: function(){
      this.ratio_w = this._getRatio()[0];
      this.ratio_h = this._getRatio()[1];
      this.grid = this._getGrid();
   },


   _getRatio: function() {
      return NODE_WIDTH.ratio(NODE_HEIGHT);
   },


   _getGrid: function(){
      var grid = Grid({
        width: Math.min( MAP_WIDTH , MAP_HEIGHT ),
        columns: NODE_LENGTH * AREA_LENGTH
      });
      return grid;
   },


   getRelPosToAbsPos: function(area_pos , node_pos){ //汎用化？
      //Camera に呼ばれる
      var x = node_pos.x + (area_pos.x * NODE_LENGTH);
      var y = node_pos.y + (area_pos.y * NODE_LENGTH);
      var abs_pos = Vector2(x, y);
      return abs_pos;
   },


   getCenterPxPos: function(focus_abs_pos, camera_px_pos){
      //Camera に呼ばれる
      var qua_pos = focus_abs_pos.toQuarter(this.ratio_w, this.ratio_h);
      var px_x = this.grid.span(qua_pos.x);
      var px_y = this.grid.span(qua_pos.y);
      var focus_px_pos = Vector2(px_x, px_y);

      var dist_pos = camera_px_pos.sub(SCREEN_CTR_PX_POS); //画面中央点との差を求める
      var ctr_px_pos = focus_px_pos.add(dist_pos); //↑の差を足す
      return ctr_px_pos;
   },


   getCenterAbsPos: function(focus_area_pos, focus_node_pos, camera_px_pos){
      //Camera に呼ばれる
      var focus_abs_pos = this.getRelPosToAbsPos(focus_area_pos, focus_node_pos);
      var ctr_px_pos = this.getCenterPxPos(focus_abs_pos, camera_px_pos);

      //計算式作る。現状は camera_px_pos == SCREEN_CTR_PX_POS の前提
      //this._getNodePosFromPxPos(ctr_px_pos);

      return focus_abs_pos;
   },


   _getNodePosFromPxPos: function(px_pos){
      //todo
   },

});










//
