//
//
// MapRenderer.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapRenderer", {
   superClass: "DisplayElement",


   init: function(layer) {
      //@param = asset_layer_class

      this.superInit();
      this.grid = this._grid();
      this.ratio_w = this._ratio()[0];
      this.ratio_h = this._ratio()[1];
      this.layer = layer;
   },



   _grid: function() {
      var grid = Grid({
         width: Math.min(MAP_WIDTH, MAP_HEIGHT),
         columns: NODE_LENGTH * AREA_LENGTH
      });
      return grid;
   },



   _ratio: function() {
      return NODE_WIDTH.ratio(NODE_HEIGHT);
   },



   render: function(map_data) {
      //@param [ {pos(area_pos):Vector(x,y) , list(node_list):[tip_y][tip_x]} , ....]

      for (var i = 0; i < map_data.length; i++) {
         for (var y = 0; y < map_data[i].floor_list.length; y++) {
            for (var x = 0; x < map_data[i].floor_list[y].length; x++) {

               var floor_node = map_data[i].floor_list[y][x];
               var collision_node = map_data[i].collision_list[y][x];
               var objects_node = map_data[i].objects_list[y][x];

               var abs_pos = phina.geom.Vector2(
                  floor_node.tip_pos.x + (floor_node.area_pos.x * NODE_LENGTH),
                  floor_node.tip_pos.y + (floor_node.area_pos.y * NODE_LENGTH)
               );
               var pos_quarter = abs_pos.toQuarter(this.ratio_w, this.ratio_h);


               if(collision_node != null){
                  if (collision_node.area_pos.x == 0 && collision_node.area_pos.y == 0) collision_node.visible = true; //表示暫定 visible_update 作る
                  collision_node.setPosition(
                     this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
                     this.grid.span(pos_quarter.y)
                  );
                  collision_node.addChildTo(this.layer);
               }


               if (floor_node.area_pos.x == 0 && floor_node.area_pos.y == 0) floor_node.visible = true; //表示暫定 visible_update 作る
               floor_node.setPosition(
                  this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
                  this.grid.span(pos_quarter.y)
               );
               floor_node.addChildTo(this.layer);


               if(objects_node != null){
                  if (objects_node.area_pos.x == 0 && objects_node.area_pos.y == 0) objects_node.visible = true; //表示暫定 visible_update 作る
                  objects_node.setPosition(
                     this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
                     this.grid.span(pos_quarter.y)
                  );
                  objects_node.addChildTo(this.layer);
               }
            }
         }
      }
   },
});
