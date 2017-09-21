


// MapRenderer Class



phina.define("MapRenderer", {
  superClass: "DisplayElement",


  init: function(layer){
    //@param = asset_layer_class

    this.superInit();
    this.grid = this._grid();
    this.ratio_w = this._ratio()[0];
    this.ratio_h = this._ratio()[1];
    this.layer = layer;
  },



  _grid: function(){
    var grid = Grid({
      width: Math.min( MAP_WIDTH , MAP_HEIGHT ),
      columns: NODE_LENGTH * AREA_LENGTH
    });
    return grid;
  },



  _ratio: function(){
    return NODE_WIDTH.ratio(NODE_HEIGHT);
  },



  render: function(map_data){
    //@param [enable_area_list][tip_y][tip_x] の３次元配列

    for(var i=0; i<map_data.length; i++){
      for(var y=0; y<map_data[i].length; y++){
        for(var x=0; x<map_data[i][y].length; x++){
          var node = map_data[i][y][x];

          var abs_pos = phina.geom.Vector2(
            node.tip_pos.x + (node.area_pos.x * NODE_LENGTH),
            node.tip_pos.y + (node.area_pos.y * NODE_LENGTH)
          )

          if(node.area_pos.x == 0 && node.area_pos.y == 0) node.visible = true; //表示暫定 visible_update 作る

          var pos_quarter = abs_pos.toQuarter( this.ratio_w , this.ratio_h );
          node.setPosition(
            this.grid.span( pos_quarter.x ) - NODE_WIDTH/2,
            this.grid.span( pos_quarter.y )
          );

          node.addChildTo(this.layer);
        }
      }
    }
  },
});
