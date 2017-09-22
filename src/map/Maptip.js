//
//
// Maptip.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("Maptip", {
   superClass: "DisplayElement",


   init: function() {
      this.superInit();
   },


   getMaptipData: function(maptip_no, img_name, firstgid, tip_x, tip_y, area_x, area_y) {
      var maptip;

      if (firstgid < 0) {
         maptip = null;
      } else {
         maptip = this._loadMaptip(img_name);
         maptip.step = 0; // step 適用のためのマップデータも読み込むように要修正
         maptip.setFrameIndex(maptip_no - firstgid);
         maptip.visible = false;
         maptip.tip_pos = phina.geom.Vector2(tip_x, tip_y);
         maptip.area_pos = phina.geom.Vector2(area_x, area_y);
      }

      return maptip;
   },


   _loadMaptip: function(img_name) {
      return Sprite(img_name, NODE_WIDTH, NODE_HEIGHT);
   },


});
