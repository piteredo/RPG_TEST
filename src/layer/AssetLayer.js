//
//
// AssetLayer.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("AssetLayer", {
   superClass: "DisplayElement",


   init: function() {
      this.superInit();
      this.setSize(MAP_WIDTH, MAP_HEIGHT);
      //this.setOrigin(0.5 , 0);
   },


   updatePos: function(ctr_px_pos) {
      //Camera に呼ばれる
      //中央に来るべき px_pos が届くので -1 を掛けた位置に自身を動かす
      this.setPosition(ctr_px_pos.x * -1 , ctr_px_pos.y * -1);
   },


   childMapNode: function(node) {
      //Renderer に呼ばれる
      node.addChildTo(this);
   },


   removeMapNode: function(node) {
      //Renderer に呼ばれる
      this.removeChild(node);
   },


   childCharNode: function(node, index){
      //Renderer に呼ばれる
      this.addChildAt(node, index);
   },
});
