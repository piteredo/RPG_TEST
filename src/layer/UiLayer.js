//
//
// UiLayer.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiLayer", {
   superClass: "DisplayElement",


   init: function() {
      this.superInit();
      this.setSize(MAP_WIDTH, MAP_HEIGHT);
      //this.setOrigin(0.5 , 0);
   },


   childNode: function(node) {
      //Renderer に呼ばれる
      node.addChildTo(this);
   },

});
