//
//
// Camera.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Camera", {
   //もらった(どこからもらう？)MAP_ABS_POSデータ(仮想も含む？) が 画面中央(か否か？)にくるよう更新(=ASSET_LAYERを動かす)

   //POS データからPX絶対座標をここで算出するか、NODEを取得して参照するかどちらか？(前者なら仮想も対応できる
   //画面中央にさせることが基本だけど、一応変動可能にさせておく(追尾対象をあえて右上にするとか)
   //基本は自キャラのPOSを追尾対象。あとは敵タッチでカメラ追尾などできるように、追尾対象の変更機能をつけておく
   //POSの受取元は、Map位置更新時MapManagerからか、UI周りからかどちらか？(または追尾対象物をここで管理するか否か)


   camera_pos : CAMERA_POS, //カメラのターゲットPOS を画面上のどこに表示するかの PX座標

   init: function(layer){
      this.layer = layer;
      this.grid = this._grid();
      this.ratio_w = this._ratio()[0];
      this.ratio_h = this._ratio()[1];
   },


   updateCameraPos: function(abs_x , abs_y){
      //@arug = Camera's target_pos

      var px_pos = this._getPxPos(abs_x , abs_y);
      this.layer.updatePos(px_pos.x , px_pos.y);
   },


   _grid: function() { //MapRendererとかぶってるので共有させる
      var grid = Grid({
         width: Math.min(MAP_WIDTH, MAP_HEIGHT),
         columns: NODE_LENGTH * AREA_LENGTH
      });
      return grid;
   },



   _ratio: function() { //MapRendererとかぶってるので共有させる
      return NODE_WIDTH.ratio(NODE_HEIGHT);
   },


   _getPxPos: function(abs_x , abs_y){
      var abs_pos = Vector2(abs_x , abs_y);
      var pos_quarter = abs_pos.toQuarter(this.ratio_w, this.ratio_h);
      var x = this.grid.span(pos_quarter.x) - NODE_WIDTH / 2;
      var y = this.grid.span(pos_quarter.y);

      return Vector2(x ,y);
   },


});
