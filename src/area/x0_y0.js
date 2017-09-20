


// area( x0 , y0 ) Class



phina.define("x0_y0", {
  superClass: "DisplayElement",

  //以下テスト中

  init: function(){
    this.superInit();

    this.grid = this._grid();
    this.tmx = phina.asset.AssetManager.get("tmx" , "x0_y0");

    var map_data = this.tmx.getMapData("FLOOR"); //二次元arr
    var tilesets = this.tmx.getTilesetData();

    var ratio = NODE_WIDTH.ratio(NODE_HEIGHT)
    var ratio_w = ratio[0];
    var ratio_h = ratio[1];

    for(var y=0; y<map_data.length; y++){
      for(var x=0; x<map_data[y].length; x++){

        var maptip_id = map_data[y][x];
        var firstgid = 0;

        for(var i=0; i<tilesets.length; i++){
          if(maptip_id >= tilesets[i].firstgid){
            this.node = Sprite( tilesets[i].name , NODE_WIDTH , NODE_HEIGHT);
            firstgid = tilesets[i].firstgid;
          }
        }
        this.node.setFrameIndex(maptip_id - firstgid);

        var pos = phina.geom.Vector2( x , y );
        var pos_quarter = pos.toQuarter( ratio_w , ratio_h );
        this.node.setPosition(
          this.grid.span( pos_quarter.x ) - NODE_WIDTH/2,
          this.grid.span( pos_quarter.y )
        );

        this.node.addChildTo(this);
      }
    }

  },

  _grid: function(){
    var grid = Grid({
      width: Math.min( MAP_WIDTH , MAP_HEIGHT ),
      columns: NODE_LENGTH * AREA_LENGTH
    });
    return grid;
  },

});
