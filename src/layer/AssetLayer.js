// asset_layer Class



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


   updatePos: function(x, y) {
      this.setPosition(SCREEN_WIDTH/2 - x , SCREEN_HEIGHT/2 - y);
   },

});
