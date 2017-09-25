//
//
// MapRenderer.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapRenderer", {
   superClass: "DisplayElement",


   init: function(p , l) {

      this.MapManager = p;

      this.superInit();
      this.grid = this._grid();
      this.ratio_w = this._ratio()[0];
      this.ratio_h = this._ratio()[1];
      this.layer = l;
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



   render: function(child_list) {
      (child_list.length).times(function(i){

         var ss = this.MapManager.map_data[child_list[i].area_pos.x][child_list[i].area_pos.y][child_list[i].node_pos.x][child_list[i].node_pos.y];
         var floor_node = ss.floor;
         var collision_node = ss.collision;
         var objects_node = ss.objects;

         var abs_pos = phina.geom.Vector2(
            floor_node.node_pos.x + (floor_node.area_pos.x * NODE_LENGTH),
            floor_node.node_pos.y + (floor_node.area_pos.y * NODE_LENGTH)
         );
         var pos_quarter = abs_pos.toQuarter(this.ratio_w, this.ratio_h);


         if(collision_node != null){
            //if (collision_node.area_pos.x == 0 && collision_node.area_pos.y == 0) collision_node.visible = true; //表示暫定 visible_update 作る
            collision_node.setPosition(
               this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
               this.grid.span(pos_quarter.y)
            );
            this.layer.childNode(collision_node);
         }


         //if (floor_node.area_pos.x == 0 && floor_node.area_pos.y == 0) floor_node.visible = true; //表示暫定 visible_update 作る
         floor_node.setPosition(
            this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
            this.grid.span(pos_quarter.y)
         );
         this.layer.childNode(floor_node);
         floor_node.visible = true;


         if(objects_node != null){
            //if (objects_node.area_pos.x == 0 && objects_node.area_pos.y == 0) objects_node.visible = true; //表示暫定 visible_update 作る
            objects_node.setPosition(
               this.grid.span(pos_quarter.x) - NODE_WIDTH / 2,
               this.grid.span(pos_quarter.y)
            );
            this.layer.childNode(objects_node);
            objects_node.visible = true;
         }



         //CAMERA TEST
         if(floor_node.area_pos.equals(Vector2(1,1)) && floor_node.node_pos.equals(Vector2(25,25))){
            //this.layer.setPosition(SCREEN_WIDTH/2 + 40 , -3040 + SCREEN_HEIGHT/2);
            //console.log(floor_node);
         }

      }.bind(this));
      //var c = CircleShape({radius:10}).addChildTo(this.layer).setPosition(-40 , 3040);
   },
});
