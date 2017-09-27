//
//
// MapRenderer.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapRenderer", {
   superClass: "DisplayElement",


   init: function(MapManager_Class , AssetLayer_Class) {

      this.superInit();
      this.Manager = MapManager_Class;
      this.layer = AssetLayer_Class;
      this.ratio_w = this._ratio()[0];
      this.ratio_h = this._ratio()[1];
   },


   _ratio: function() {
      return NODE_WIDTH.ratio(NODE_HEIGHT);
   },


   render: function(child_list , grid) {
      this.grid = grid;


      //ソート書き直す
      function unstableSort_X(a, b){ return a - b; }
      function stableSort_X(a, b) {
         //console.log(a);
         var a_abs_pos_x = a.floor.node_pos.x + (a.floor.area_pos.x * NODE_LENGTH);
         var b_abs_pos_x = b.floor.node_pos.x + (b.floor.area_pos.x * NODE_LENGTH);
          if (a_abs_pos_x === b_abs_pos_x){return indexed.indexOf(a) - indexed.indexOf(b); }
          return unstableSort_X.call(this, a_abs_pos_x, b_abs_pos_x);
      }
      function unstableSort_Y(a, b){ return a - b; }
      function stableSort_Y(a, b) {
         var a_abs_pos_y = a.floor.node_pos.y + (a.floor.area_pos.y * NODE_LENGTH);
         var b_abs_pos_y = b.floor.node_pos.y + (b.floor.area_pos.y * NODE_LENGTH);
          if (a_abs_pos_y === b_abs_pos_y){ return indexed.indexOf(a) - indexed.indexOf(b); }
          return unstableSort_Y.call(this, a_abs_pos_y, b_abs_pos_y);
      }
      var indexed = child_list.slice(0);
      child_list.sort(stableSort_X);
      indexed = child_list.slice(0);
      child_list.sort(stableSort_Y);


      (child_list.length).times(function(i){

         var floor_node = child_list[i].floor;
         var collision_node = child_list[i].collision;
         var objects_node = child_list[i].objects;

         var abs_pos = this.Manager.getAbsPos(floor_node.area_pos , floor_node.node_pos);
         var pos_quarter = abs_pos.toQuarter(this.ratio_w, this.ratio_h);


         //↓ループに直す
         if(collision_node != null){
            collision_node.setPosition(
               this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
               this.grid.span(pos_quarter.y)
            );
            this.layer.childNode(collision_node);
         }


         //if==null => error を出すようにする
         floor_node.setPosition(
            this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
            this.grid.span(pos_quarter.y)
         );
         this.layer.childNode(floor_node);
         floor_node.visible = true;


         //別のクラス(またはメソッド)に作り直す？
         if(objects_node != null){
            objects_node.setOrigin(0.5 , 1);
            objects_node.setPosition(
               this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
               this.grid.span(pos_quarter.y) + 20 //+20はマップチップ縦の半分分を上にずらす
            );
            this.layer.childNode(objects_node);
            objects_node.visible = true;
         }

      }.bind(this));


      //全画像の表示順ソートをする
   },
});
