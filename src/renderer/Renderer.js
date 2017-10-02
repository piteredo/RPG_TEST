//
//
// Renderer.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Renderer", {

   rendering_list: [], //現在描画しているマップノードデータ

   init: function(AssetLayer , UiLayer) {
      //レイヤークラスの登録
      this.AssetLayer = AssetLayer;
      this.UiLayer = UiLayer;

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


   renderUi: function(ui_data_list){
      //MainScene に呼ばれる
      var list = ui_data_list;
      (list.length).times(function(i){
         this.UiLayer.childNode(list[i]);
      }.bind(this));
   },


   renderMap: function(visible_node_list){

      //メソッド分割する
      var new_list = visible_node_list;
      var old_list = this.rendering_list;

      var data = this._getListDiff(old_list, new_list);
      var child_list = data.load;
      var remove_list = data.unload;

      child_list = this._sortNodeList(child_list);

      (child_list.length).times(function(i){
         var node = child_list[i];
         var qua_pos = node.abs_pos.toQuarter(this.ratio_w, this.ratio_h);
         node.setPosition(
            this.grid.span(qua_pos.x),
            this.grid.span(qua_pos.y)
         );
         node.visible = true;

         //objのchildどうする？

         this.AssetLayer.childMapNode(node);
      }.bind(this));

      (remove_list.length).times(function(i){
         var node = child_list[i];
         this.AssetLayer.removeMapNode(node);
      }.bind(this));

      this.rendering_list = child_list;
   },


   _getListDiff: function(old_a, new_a) { //AreaList_getAreasDiffのコピー 汎用化？
      var data = {
         unload: old_a.concat(),
         load: new_a.concat()
      };

      if (old_a.length == 0) return data;

      (old_a.length).times(function(i) {
         (new_a.length).times(function(v) {
            if (old_a[i].equals(new_a[v])) {
               data.unload.splice(data.unload.indexOf(old_a[i]), 1);
               data.load.splice(data.load.indexOf(new_a[v]), 1);
            }
         });
      });
      return data; // => { unload:[node , ...] , load:[node , ...]}
   },


   _sortNodeList: function(node_list){

      //ソート書き直す
      function unstableSort_X(a, b){
         return a - b;
      }
      function stableSort_X(a, b) {
         var a_x = a.abs_pos.x;
         var b_x = b.abs_pos.x;
          if (a_x === b_x){
             return indexed.indexOf(a) - indexed.indexOf(b);
          }
          return unstableSort_X.call(this, a_x, b_x);
      }

      function unstableSort_Y(a, b){
         return a - b;
      }
      function stableSort_Y(a, b) {
         var a_y = a.abs_pos.y;
         var b_y = b.abs_pos.y;
          if (a_y === b_y){
             return indexed.indexOf(a) - indexed.indexOf(b);
          }
          return unstableSort_Y.call(this, a_y, b_y);
      }

      var indexed = node_list.slice(0);
      node_list.sort(stableSort_X);

      indexed = node_list.slice(0);
      node_list.sort(stableSort_Y);

      return node_list;
   },


   renderChar: function(char_data_list){
      //MainScene に呼ばれる
      //メソット分割する

      var list = char_data_list;

      (list.length).times(function(i){
         var node = list[i];
         var index = this._getMapNodeRenderIndex(node); //-1なら描画範囲外、0以上で描画posのマップノードの重なり順
         if(index >= 0){
            var child_index = index + 1; //描画posの床のひとつ上に重ねる

            var qua_pos = node.abs_pos.toQuarter(this.ratio_w, this.ratio_h);
            node.setPosition(
               this.grid.span(qua_pos.x),
               this.grid.span(qua_pos.y)
            );
            node.visible = true;

            this.rendering_list.splice(child_index, 0, node);
            this.AssetLayer.childCharNode(node, child_index);
         }
      }.bind(this));
   },


   _getMapNodeRenderIndex: function(char_node){
      var c_x = char_node.abs_pos.x;
      var c_y = char_node.abs_pos.y;
      var r_list = this.rendering_list;

      for(var i=0; i<r_list.length; i++){
         var map_node = r_list[i];
         var m_x = map_node.abs_pos.x;
         var m_y = map_node.abs_pos.y;
         if(m_x == c_x && m_y == c_y){
            return i;
         }
      }
      return -1;
   },

});
