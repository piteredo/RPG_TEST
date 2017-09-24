//
//
// MaptipVisibility.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapNodeVisibility", {

   visible_list: [],

   init: function(MapManager_Class){
      this.MapManager = MapManager_Class;
   },


   updateVisibility: function(valid_map_data , new_focus_node_pos , new_focus_area_pos){

      //絶対座標を求める
      //
      //表示範囲の四角(=スクリーン)の四隅に位置するマップノード_posを求める。
      //
      //非表示にすべき(更新前に表示対象だった)ノードが↑より外側に移動してることに備えて、
      //求めた四隅から外側上下左右に読み進め、visible=false のところで読み進めを停止する。
      //
      //上下左右のなかで一番読み進んだ歩数を、四隅全てに適用する(四隅が少し外側に広がる)。
      //
      //クォータービューなのでジグザグ(？)に読まないとならない、
      //クォータービュー座標で、x++ の間に、y は上下に範囲を広げつつ、端まで行ったら閉じつつ進む。
      //
      //そうして対象のマップノードを読み、画面表示範囲内にいるかで、visible=true/false を付けて、リストを返す。


      var abs_pos = this._getAbsPos(new_focus_node_pos , new_focus_area_pos); //外部に移動

      var corner_list = this._getCornerPosList(abs_pos);

      var target_nodes = this._getTargetNodes(corner_list);

      var data = this._sortNodeStatus(target_nodes);
      return data;
   },


   _getAbsPos: function(new_focus_node_pos , new_focus_area_pos){
      var node_pos = new_focus_node_pos;
      var area_pos = new_focus_area_pos;
      var abs_pos = area_pos.mul(NODE_LENGTH).add(node_pos);

      return abs_pos;
   },


   _getCornerPosList: function(abs_pos){
      var list = {};
      var corner_list = ["left_top" , "left_bottom" , "right_top" , "right_bottom"];
      var dir_vertical;
      var dir_horizontal;

      (corner_list.length).times(function(i){
         switch (corner_list[i]) {
            case "left_top":
               dir_vertical = Vector2.TOP; //トップビューでの方角
               dir_horizontal = Vector2.LEFT;
               break;
            case "left_bottom":
               dir_vertical = Vector2.BOTTOM;
               dir_horizontal = Vector2.LEFT;
               break;
            case "right_top":
               dir_vertical = Vector2.TOP;
               dir_horizontal = Vector2.RIGHT;
               break;
            case "right_bottom":
               dir_vertical = Vector2.BOTTOM;
               dir_horizontal = Vector2.RIGHT;
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
         list[corner_list[i]] = pos;
      });

      var padding_max = this._getPadding(list);

      list.left_top.add(Vector2.LEFT_TOP.mul(padding_max));
      list.right_top.add(Vector2.RIGHT_TOP.mul(padding_max));
      list.left_bottom.add(Vector2.LEFT_BOTTOM.mul(padding_max));
      list.right_bottom.add(Vector2.RIGHT_BOTTOM.mul(padding_max));

      return list;
   },

   _getPadding: function(corner_pos_list){

      var list = corner_pos_list;
      var padding_list =[];

      //----GO_LEFT(トップビューでの方角)----
      //[X] LEFT_TOP.x から LEFT_BOTTOM.x に進む
      //[Y] LEFT_TOP.y から ++ する (ジグザグ進行)
      //各ノード、visible==true がひとつでもあれば counter++ する
      //Xの端まで(１列)読み終えたところで、counter が０(=１列全てvisible==false) なら終了
      //counter が１以上なら、LEFT_TOP.x , LEFT_BOTTOM.x に１加えて(改行して) もう１列調べる
      //元のコーナー地点から、左に進んだ列の数を返す
      var start = list.left_top.x;
      var end = list.left_bottom.x + 1;
      while(1){
         var counter = 0;
         var y = list.left_top.y;
         for(x = start; x < end; x++){
            var node = this.MapManager.getNode(x,y);
            if(node && node.visible) counter++;
            y++;
         }
         if(counter == 0) break;
         start++;
         end++;
      }
      var padding_left = Math.abs(start - list.left_top.x);
      padding_list.push(padding_left);

      var start = list.right_top.x;
      var end = list.right_bottom.x + 1;
      while(1){
         var counter = 0;
         var y = list.right_top.y;
         for(x = start; x < end; x++){
            var node = this.MapManager.getNode(x,y);
            if(node && node.visible) counter++;
            y++;
         }
         if(counter == 0) break;
         start--;
         end--;
      }
      var padding_right = Math.abs(list.right_top.x - start);
      padding_list.push(padding_right);

      var start = list.right_top.y;
      var end = list.left_top.y + 1;
      while(1){
         var counter = 0;
         var x = list.right_top.x;
         for(y = start; y < end; y++){
            var node = this.MapManager.getNode(x,y);
            if(node && node.visible) counter++;
            x--;
         }
         if(counter == 0) break;
         start--;
         end--;
      }
      var padding_top = Math.abs(start - list.right_top.y);
      padding_list.push(padding_top);

      var start = list.right_bottom.y;
      var end = list.left_bottom.y + 1;
      while(1){
         var counter = 0;
         var x = list.right_bottom.x;
         for(y = start; y < end; y++){
            var node = this.MapManager.getNode(x,y);
            if(node && node.visible) counter++;
            x--;
         }
         if(counter == 0) break;
         start++;
         end++;
      }
      var padding_bottom = Math.abs(list.right_bottom.y - start);
      padding_list.push(padding_bottom);


      var padding_max = padding_list.most().max;
      return padding_max;
   },


   _getTargetNodes: function(corner_list){
      var a = [];

      var left_top_pos = corner_list.left_top;
      var right_top_pos = corner_list.right_top;
      var left_bottom_pos = corner_list.left_bottom;
      var right_bottom_pos = corner_list.right_bottom;

      var y_dim_add = left_top_pos.y; //Y方向マイナス→折り返してプラスに進む変数
      var y_add_dim = left_top_pos.y; //Y方向プラス→折り返してマイナスに進む変数
      var y_dim_add_dir = "dim"; //最初はマイナス方向だというフラグ
      var y_add_dim_dir = "add"; //最初はプラス方向だというフラグ

      for (var x = left_top_pos.x; x < right_bottom_pos.x + 1; x++) {
         for (var y = y_dim_add; y < y_add_dim + 1; y++) {

            var node = this.MapManager.getNode(x, y);
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


   _sortNodeStatus: function(nodes){
      var child = [];
      var remove = [];
      (nodes.length).times(function(i){
         var node = nodes[i];
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
            Math.inside(abs_left, border_left, border_right) && Math.inside(abs_top, border_top, border_bottom)) {
            if (!node.visible) child.push(node);
         } else {
            if (node.visible) {
               //var index = this.visible_list.indexOf(node);
               //this.visible_list.splice(index, 1);
               //this.map.remove(node); 外部委託
               remove.push(node);
            }
         }
      }.bind(this));

      data = {child:child,remove:remove};
      return data;
   },


   /*
   _updt: function(tip_ctr_pos, area_ctr_pos , mpdt) { //すでに新しくなった pos を(変更あるときのみ)もらう

      this.mpdt = mpdt; //仮

      this.abs_ctr_pos = area_ctr_pos.mul(NODE_LENGTH).add(tip_ctr_pos); //書く場所ここ？？

      //更新処理対象の四角(クォータービューじゃなくて平面上の)範囲の４隅の pos を取得
      var c_pos_list = this._getCornerPositions();
      var x_min_pos = c_pos_list.x_min;
      var x_max_pos = c_pos_list.x_max;
      var y_min_pos = c_pos_list.y_min;
      var y_max_pos = c_pos_list.y_max;

      var y_dim_add = x_min.y; //Y方向マイナス→折り返してプラスに進む変数
      var y_add_dim = x_min.y; //Y方向プラス→折り返してマイナスに進む変数
      var y_dim_add_dir = "dim"; //最初はマイナス方向だというフラグ
      var y_add_dim_dir = "add"; //最初はプラス方向だというフラグ
      for (var x = x_min.x; x < x_max.x + 1; x++) {
         for (var y = y_dim_add; y < y_add_dim + 1; y++) {

            var node = this._getNode(x, y);

            var abs_right = node.right;
            var abs_left = node.left;
            var abs_bottom = node.bottom;
            var abs_top = node.top;

            var inside_x_min = -PROCESS_MARGIN;
            var inside_x_max = SCREEN_WIDTH + PROCESS_MARGIN;
            var inside_y_min = -PROCESS_MARGIN;
            var inside_y_max = SCREEN_HEIGHT + PROCESS_MARGIN;

            if (Math.inside(abs_right, inside_x_min, inside_x_max) && Math.inside(abs_bottom, inside_y_min, inside_y_max) ||
               Math.inside(abs_left, inside_x_min, inside_x_max) && Math.inside(abs_bottom, inside_y_min, inside_y_max) ||
               Math.inside(abs_right, inside_x_min, inside_x_max) && Math.inside(abs_top, inside_y_min, inside_y_max) ||
               Math.inside(abs_left, inside_x_min, inside_x_max) && Math.inside(abs_top, inside_y_min, inside_y_max)) {
               if (!node.visible) this.visible_list.push(node);
            } else {
               if (node.visible) {
                  var index = this.visible_list.indexOf(node);
                  this.visible_list.splice(index, 1);
                  this.map.remove(node);
               }
            }
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
         if (y_dim_add == y_min.y) y_dim_add_dir = "add";
         if (y_add_dim == y_max.y) y_add_dim_dir = "dim";
      }

      console.log(this.visible_list);


      //ソート書き直す
      function unstableSort_X(a, b) {
         return a.abs_pos.x - b.abs_pos.x;
      }

      function stableSort_X(a, b) {
         if (a.abs_pos.x === b.abs_pos.x) {
            return indexed.indexOf(a) - indexed.indexOf(b);
         }
         return unstableSort_X.call(this, a, b);
      }

      function unstableSort_Y(a, b) {
         return a.abs_pos.y - b.abs_pos.y;
      }

      function stableSort_Y(a, b) {
         if (a.abs_pos.y === b.abs_pos.y) {
            return indexed.indexOf(a) - indexed.indexOf(b);
         }
         return unstableSort_Y.call(this, a, b);
      }
      var indexed = this.visible_list.slice(0);
      this.visible_list.sort(stableSort_X);
      indexed = this.visible_list.slice(0);
      this.visible_list.sort(stableSort_Y);


      //char の child先をマップチップレイヤー変更したら、charのchild位置をここで更新する


      for (var i in this.visible_list) {
         var node = this.visible_list[i];
         this.map.child(node);
      };
   },


   _getCornerPositions: function() {
      var list = {};
      var corner_arr = ["x_min", "x_max", "y_min", "y_max"];

      (corner_arr.length).times(function(i) {
         var dir_vert_x;
         var dir_vert_y;
         var dir_hori_x;
         var dir_hori_y;
         switch (corner_arr[i]) {
            case "x_min":dir_vertical = Vector2.TOP;//クォータービューじゃなくて平面上での方角
               dir_horizontal = Vector2.LEFT;
               break;
            case "x_max":dir_vertical = Vector2.BOTTOM;
               dir_horizontal = Vector2.RIGHT;
               break;
            case "y_min":
               dir_vertical = Vector2.TOP;
               dir_horizontal = Vector2.RIGHT;
               break;
            case "y_max":
               dir_vertical = Vector2.BOTTOM;
               dir_horizontal = Vector2.LEFT;
               break;
         }

         //画面中央の絶対値座標をコピー
         var pos_temp = this.abs_ctr_pos.clone();

         //画面中央から画面外までの縦幅(SCREEN_WIDTH/2) を マップチップの縦幅で割ったもの=個数
         var dis_vertical = Math.ceil(SCREEN_HEIGHT / 2 / NODE_HEIGHT) + 1;
         //↑で求めた縦方向の方角に、↑のマップチップ個数分 center_pos(clone) を移動
         pos_temp.add(dir_vertical.mul(dis_vertical));

         //↑の横幅版
         var dis_horizontal = Math.ceil(SCREEN_WIDTH / 2 / NODE_WIDTH) + 1;
         pos_temp.add(dir_horizontal.mul(dis_horizontal));

         //list{ "name(like x_min)" : pos(Vector2) } の形で代入
         list[corner_arr[i]] = pos_temp;

      }.bind(this));

      var padding_max = this._getMaxPadding(list);
      list.x_min.x -= padding_max;
      list.x_max.x += padding_max;
      list.y_min.y -= padding_max;
      list.y_max.y += padding_max;

      return list;
   },

   _getMaxPadding: function(param) {
      //@param {x_min:Vector2(x,y) , x_max:{circular} , y_min:{circular} , y_max:{circular}}
      var padding_list = [];
      var dir_arr = ["left", "top", "right", "bottom"];
      (dir_arr.length).times(function(i) {
         padding_list.push(this._getPadding(param, dir_arr[i]));
      }.bind(this));
      var padding_max = padding_list.most().max;
      return padding_max;
   },

   _getPadding: function(param, type_str) {
      //@param {x_min:{x:Number,y:Number} , x_max:{circular} , y_min:{circular} , y_max:{circular}}
      //@type_str "left" , "top" , "right" , "bottom"
      var x_min = param.x_min;
      var x_max = param.x_max;
      var y_min = param.y_min;
      var y_max = param.y_max;
      switch (type_str) {
         case "left":
            var base = x_min.x;
            var end = y_max.x;
            var v = x_min.y;
            var type = "n_v+1";
            var add = -1;
            var v_add = 1;
            break;
         case "top":
            var base = y_min.y;
            var end = x_min.y;
            var v = y_min.x;
            var type = "v-1_n";
            var add = -1;
            var v_add = -1;
            break;
         case "right":
            var base = y_min.x;
            var end = x_max.x;
            var v = y_min.y;
            var type = "n_v-1";
            var add = 1;
            var v_add = 1;
            break;
         case "bottom":
            var base = x_max.y;
            var end = y_max.y;
            var v = x_max.x;
            var type = "v+1_n";
            var add = 1;
            var v_add = -1;
            break;
      }

      var start = base;
      while (1) {
         var counter = 0;
         for (var n = start; n < end + 1; n++) {
            switch (type) {
               case "n_v+1":
                  var node = this._getNode(n, v + 1);
                  break;
               case "v-1_n":
                  var node = this._getNode(v - 1, n);
                  break;
               case "n_v-1":
                  var node = this._getNode(n, v - 1);
                  break;
               case "v+1_n":
                  var node = this._getNode(v + 1, n);
                  break;
            }
            if (node && node.visible) counter++;
            v += v_add;
         }
         if (counter == 0) break;
         start += add;
         end += add;
      }
      var padding = Math.abs(base - start);
      return padding;
   },

   //受け取った絶対座標数から、該当ノードデータを返す (座標 → 実際のデータ)
   _getNode: function(x, y) {
      //x , y (abs_pos)
      if (x < 0 || y < 0 || x >= AREA_LENGTH * NODE_LENGTH || y >= AREA_LENGTH * NODE_LENGTH) return false;

      var area_x = Math.floor(x / NODE_LENGTH);
      var area_y = Math.floor(y / NODE_LENGTH);
      var rel_x = x % NODE_LENGTH;
      var rel_y = y % NODE_LENGTH;

      var node = this.mpdt[0].floor_list[rel_x][rel_y];

      return node;
   },
   */
});
