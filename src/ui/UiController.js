//
//
// UiController.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiController", {
   superClass: "DisplayElement",

   init: function() {
      this.superInit();

      this.ui = this._createUi();
   },


   _createUi: function(){

      //仮
      var shape = CircleShape({
         radius: 187.5/2,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });
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
