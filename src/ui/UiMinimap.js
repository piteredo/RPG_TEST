//
//
// UiMinimap.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiMinimap", {
   superClass: "DisplayElement",

   init: function() {
      this.superInit();

      this.ui = this._createUi();
   },


   _createUi: function(){

      //仮
      var shape = RectangleShape({
         width: 100,
         height: 100,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10,
         padding: null
      });
      shape.setOrigin(0, 0);
      return shape;
   },


   getUi: function() {
      //UiManager から呼ばれる
      return this.ui;
   },


   updateData: function(argus){
      //UiManager から呼ばれる
   },

});
