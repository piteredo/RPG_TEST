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


         floor_node.setPosition(
            this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
            this.grid.span(pos_quarter.y)
         );
         this.layer.childNode(floor_node);
         floor_node.visible = true;


         if(objects_node != null){
            objects_node.origin.y = 0.25; //ノードのオリジン全サイズでも対応できるよう要調整
            objects_node.setPosition(
               this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
               this.grid.span(pos_quarter.y) - 40
            );
            this.layer.childNode(objects_node);
            objects_node.visible = true;
         }

      }.bind(this));
   },
});
