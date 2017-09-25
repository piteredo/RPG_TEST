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


   childNode: function(node) {
      node.addChildTo(this);
   },


   updatePos: function(x, y , camera_pos) {
      this.setPosition(camera_pos.x - x , camera_pos.y - y);
   },

});
