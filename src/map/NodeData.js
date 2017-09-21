


// NodeData Class



phina.define("NodeData", {
  superClass: "DisplayElement",

  init: function(){
    this.superInit();
    this.loader = MapAssetLoader();
  },

  getNodeData: function(maptip_no , img_name , firstgid , tip_x , tip_y , area_x , area_y){
    //@param maptip_no = tmxで指定されたマップチップの番号
    //@param img_name = このマップチップに使用されるアセット名
    //@param firstgid = このマップチップに使用されるアセットの開始番号

    if(img_name == null) return null;

    var node =  this.loader.loadMapTip( img_name );
    node.step = 0; // step 適用のためのマップデータも読み込むように要修正
    node.setFrameIndex( maptip_no - firstgid );
    node.visible = false;
    node.tip_pos = phina.geom.Vector2( tip_x , tip_y );
    node.area_pos = phina.geom.Vector2( area_x , area_y );

    return node;
  },
});
