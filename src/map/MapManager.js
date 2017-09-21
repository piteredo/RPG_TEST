


// MapManager Class



phina.define("MapManager", {

  init: function(asset_layer_class){
    this.tip_pos = phina.geom.Vector2(0 , 0); //最終的には char first pos にする
    this.area_pos = phina.geom.Vector2(0 , 0); //最終的には char first pos にする
    this.area_loaded = [
      //phina.geom.Vector2(0,0), //テスト用初期設定(本来はvoid)
      //phina.geom.Vector2(2,2)
    ];

    this.layer = asset_layer_class;
    this.area_list = AreaList();
    this.area = Area();
    this.renderer = MapRenderer( this.layer );
  },

  updateMap: function(tip_x , tip_y , area_x , area_y){
    //@param tip_x,y=画面中央の最新マップチップ位置座標
    //@param area_x,y=画面中央の最新エリア位置座標

    this.tip_pos = phina.geom.Vector2( tip_x , tip_y );
    this.area_pos = phina.geom.Vector2( area_x , area_y );

    var new_area_list = this.area_list.updateAreaList( this.area_pos );
    var map_data = this.area.createArea( new_area_list , this.area_loaded );

    this.renderer.render( map_data );
  },

});
