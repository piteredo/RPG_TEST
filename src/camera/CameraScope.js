//
//
// CameraScope.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("CameraScope", {

   init: function(){

   },


   getVisibleNodeList: function(map_data, ctr_abs_pos){
      //表示範囲の四角(=スクリーン)の四隅に位置するマップノードのPOSを求める(四隅分を詰めたリスト)。
      var corner_list = this._getCornerPosList(ctr_abs_pos);

      //↑で得た四隅位置の内側にいるノードを詰めたリストを取得
      var target_nodes = this._getTargetNodes(map_data, corner_list);
      return target_nodes;
   },


   _getCornerPosList: function(abs_pos) {
      var list = {};
      var dir_list = ["left_top", "left_bottom", "right_top", "right_bottom"];
      var dir_vertical;
      var dir_horizontal;

      (dir_list.length).times(function(i) {
         switch (dir_list[i]) {
            case "left_top":
               dir_vertical = Vector2.TOP.clone(); //トップビューでの方角
               dir_horizontal = Vector2.LEFT.clone();
               break;
            case "left_bottom":
               dir_vertical = Vector2.BOTTOM.clone();
               dir_horizontal = Vector2.LEFT.clone();
               break;
            case "right_top":
               dir_vertical = Vector2.TOP.clone();
               dir_horizontal = Vector2.RIGHT.clone();
               break;
            case "right_bottom":
               dir_vertical = Vector2.BOTTOM.clone();
               dir_horizontal = Vector2.RIGHT.clone();
               break;
         }

         var pos = abs_pos.clone();

         //画面中央から画面外までの縦幅(SCREEN_WIDTH/2) を マップチップの縦幅で割ったもの=個数
         var dis_vertical = Math.ceil(SCREEN_HEIGHT / 2 / NODE_HEIGHT) + 1;
         //↑で求めた縦方向の方角に、↑のマップチップ個数分 center_pos(clone) を移動
         pos.add(dir_vertical.mul(dis_vertical));

         //↑の横幅版
         var dis_horizontal = Math.ceil(SCREEN_WIDTH / 2 / NODE_WIDTH) + 1;
         pos.add(dir_horizontal.mul(dis_horizontal));

         //{DIR:pos , ...}
         list[dir_list[i]] = pos;
      });

      return list;
   },


   _getTargetNodes: function(map_data, corner_list) {
      var a = [];

      var left_top_pos = corner_list.left_top;
      var right_top_pos = corner_list.right_top;
      var left_bottom_pos = corner_list.left_bottom;
      var right_bottom_pos = corner_list.right_bottom;

      var y_dim_add = left_top_pos.y; //Y方向マイナス→折り返してプラスに進む変数
      var y_add_dim = left_top_pos.y; //Y方向プラス→折り返してマイナスに進む変数
      var y_dim_add_dir = "dim"; //最初はマイナス方向だというフラグ
      var y_add_dim_dir = "add"; //最初はプラス方向だというフラグ

      //クォータービューなのでトップビュー的にはジグザグ(？)に読まないとならない、
      //クォータービュー座標で、x++ の間に、y は上下に範囲を広げつつ、端まで行ったら閉じつつ進み、画面の四角のエリアを読む。
      for (var x = left_top_pos.x; x < right_bottom_pos.x + 1; x++) {
         for (var y = y_dim_add; y < y_add_dim + 1; y++) {

            var data = this._getAbsPosToRelPos(x,y);
            var area_pos = data.area_pos;
            var node_pos = data.node_pos;
            var node = map_data[area_pos.y][area_pos.x][node_pos.y][node_pos.x];

            a.push(node);

         }
         switch (y_dim_add_dir) {
            case "dim":
               y_dim_add--;
               break;
            case "add":
               y_dim_add++;
               break;
         }
         switch (y_add_dim_dir) {
            case "dim":
               y_add_dim--;
               break;
            case "add":
               y_add_dim++;
               break;
         }
         if (y_dim_add == right_top_pos.y) y_dim_add_dir = "add";
         if (y_add_dim == left_bottom_pos.y) y_add_dim_dir = "dim";
      }

      return a;
   },


   //書く場所ここじゃない
   _getAbsPosToRelPos: function(abs_pos_x, abs_pos_y) {
      var area_x = Math.floor(abs_pos_x / NODE_LENGTH);
      var area_y = Math.floor(abs_pos_y / NODE_LENGTH);
      var node_x = (abs_pos_x % NODE_LENGTH);
      var node_y = (abs_pos_y % NODE_LENGTH);

      var list = {
         area_pos: Vector2(area_x, area_y),
         node_pos: Vector2(node_x, node_y)
      };
      return list;
   },
});
