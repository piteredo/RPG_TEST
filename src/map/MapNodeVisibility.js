//
//
// MapNodeVisibility.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapNodeVisibility", {
   //MapManager_Class に呼ばれたときだけ働く。
   //中身入りマップデータと NEW_ABS_POS を受取り、表示更新範囲の選定と、表示の可否それぞれのリストを返す、


   init: function(MapManager_Class) {
      this.Manager = MapManager_Class;
   },


   updateVisibility: function(map_data, new_abs_pos) {
      
      //表示範囲の四角(=スクリーン)の四隅に位置するマップノードのPOSを求める(四隅分を詰めたリスト)。
      var corner_list = this._getCornerPosList(new_abs_pos);

      //↑で得た四隅位置の内側にいるノードを詰めたリストを取得
      var target_nodes = this._getTargetNodes(corner_list);

      //リスト内のノードを全て読み、画面表示範囲内にいるかどうかで、child_list と remove_list に分けてもらい、返す
      //data = {child_list:nodes , remove_list:nodes}
      var data = this._sortNodeStatus(target_nodes);
      return data;
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

      //非表示にすべき(更新前に表示対象だった)ノードが↑より外側に移動してることに備えて、
      //求めた四隅から外側上下左右に読み進め、visible=false のところで読み進めを停止する。
      var padding_max = this._getPadding(list);

      //上下左右のなかで一番読み進んだ歩数幅を、四隅全てに適用する(四隅が少し外側に広がる)。
      list.left_top.add(Vector2.LEFT_TOP.mul(padding_max));
      list.right_top.add(Vector2.RIGHT_TOP.mul(padding_max));
      list.left_bottom.add(Vector2.LEFT_BOTTOM.mul(padding_max));
      list.right_bottom.add(Vector2.RIGHT_BOTTOM.mul(padding_max));

      return list;
   },


   _getPadding: function(corner_pos_list) {
      //↓書き方何とかする

      var list = corner_pos_list;
      var padding_list = [];

      //----GO_LEFT(トップビューでの方角)の場合----
      //[X] LEFT_TOP.x から LEFT_BOTTOM.x に進む
      //[Y] LEFT_TOP.y から ++ する (ジグザグ進行)
      //各ノード、visible==true がひとつでもあれば counter++ する
      //Xの端まで(１列)読み終えたところで、counter が０(=１列全てvisible==false) なら終了
      //counter が１以上なら、LEFT_TOP.x , LEFT_BOTTOM.x に１加えて(改行して) もう１列調べる
      //元のコーナー地点から、左に進んだ列の数を返す

      var horizontal_dir_list = ["GO_LEFT" , "GO_RIGHT"];
      (horizontal_dir_list.length).times(function(i){
         var start;
         var start_x;
         var end_x;
         var start_y;
         var str;
         switch(horizontal_dir_list[i]){
            case "GO_LEFT":
               start = list.left_top.x;
               start_x = start;
               end_x = list.left_bottom.x + 1;
               start_y = list.left_top.y;
               str = "ADD";
               break;
            case "GO_RIGHT":
               start = list.right_top.x;
               start_x = start;
               end_x = list.right_bottom.x + 1;
               start_y = list.right_top.y;
               str = "DIM";
               break;
         }
         while (1) {
            var counter = 0;
            var y = start_y;
            for (var x = start_x; x < end_x; x++) {
               var node = this.Manager.getNode(x, y, "floor"); //floor_layerのノードを取得
               if (node && node.visible) counter++;
               y++;
            }
            if (counter == 0) break;
            switch(str){
               case "ADD":
                  start_x++;
                  end_x++;
                  break;
               case "DIM":
                  start_x--;
                  end_x--;
                  break;
            }
         }
         var padding = Math.abs(start - start_x);
         padding_list.push(padding);
      }.bind(this));

      var vertical_dir_list = ["GO_TOP" , "GO_BOTTOM"];
      (vertical_dir_list.length).times(function(i){
         var start;
         var start_y;
         var end_y;
         var start_x;
         var str;
         switch(vertical_dir_list[i]){
            case "GO_TOP":
               start = list.right_top.y;
               start_y = start;
               end_y = list.left_top.y + 1;
               start_x = list.right_top.x;
               str = "DIM";
               break;
            case "GO_BOTTOM":
               start = list.right_bottom.y;
               start_y = start;
               end_y = list.left_bottom.y + 1;
               start_x = list.right_bottom.x;
               str = "ADD";
               break;
         }
         while (1) {
            var counter = 0;
            var x = start_x;
            for (var y = start_y; y < end_y; y++) {
               var node = this.Manager.getNode(x, y, "floor"); //floor_layerのノードを取得
               if (node && node.visible) counter++;
               x--;
            }
            if (counter == 0) break;
            switch(str){
               case "ADD":
                  start_y++;
                  end_y++;
                  break;
               case "DIM":
                  start_y--;
                  end_y--;
                  break;
            }
         }
         var padding = Math.abs(start - start_y);
         padding_list.push(padding);
      }.bind(this));


      var padding_max = padding_list.most().max;
      return padding_max;
   },


   _getTargetNodes: function(corner_list) {
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

            var node = this.Manager.getNode(x, y, "all"); //全レイヤーのノードを取得({floor:node , collision:node , objects:node})
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


   _sortNodeStatus: function(nodes) {
      var child_list = [];
      var remove_list = [];
      (nodes.length).times(function(i) {
         var node_set = nodes[i];
         var node = nodes[i].floor;
         var data = {};

         var abs_right = node.right; //abs 求める(どこを親とするかによってかわる？)
         var abs_left = node.left;
         var abs_bottom = node.bottom;
         var abs_top = node.top;

         var border_left = -PROCESS_MARGIN;
         var border_right = SCREEN_WIDTH + PROCESS_MARGIN;
         var border_top = -PROCESS_MARGIN;
         var border_bottom = SCREEN_HEIGHT + PROCESS_MARGIN;

         if (Math.inside(abs_right, border_left, border_right) && Math.inside(abs_bottom, border_top, border_bottom) ||
            Math.inside(abs_left, border_left, border_right) && Math.inside(abs_bottom, border_top, border_bottom) ||
            Math.inside(abs_right, border_left, border_right) && Math.inside(abs_top, border_top, border_bottom) ||
            Math.inside(abs_left, border_left, border_right) && Math.inside(abs_top, border_top, border_bottom)
         ) {

            if (!node.visible) child_list.push(node_set);

         } else {
            if (node.visible) {

               remove_list.push(node_set);
            }
         }
      }.bind(this));

      data = {
         child: child_list,
         remove: remove_list
      };
      return data;
   },


});
