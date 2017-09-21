


// MapAssetLoader Class



phina.define("MapAssetLoader", {
  superClass: "phina.asset.AssetLoader",

  init: function(){
    this.superInit();
  },

  loadTilemap: function(area_list){
    //@param ロードされるエリアのリスト Vector2(x,y)が並んだ配列

    var tilemap_list = [];
    for(var i=0; i<area_list.length; i++){
      var x = area_list[i].x;
      var y = area_list[i].y;
      var label = "x" + x + "_y" + y; // like "x0_y0"
      var asset = phina.asset.AssetManager.get("tmx" , label);
      asset.area_x = x;
      asset.area_y = y;

      tilemap_list.push( asset );
    }

    return tilemap_list;
  },

  loadMapTip: function(img_name){
    //@param このマップチップに使われるアセット名
    return Sprite( img_name , NODE_WIDTH , NODE_HEIGHT);
  },
});
