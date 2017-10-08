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

      (11).times(function(y){
         (11).times(function(x){

            var r = RectangleShape({
               width: 5,
               height: 5,
               fill: "rgb(210,210,200)",
               stroke: null,
               pudding: null
            });
            r.addChildTo(shape);
            r.setPosition(x*8+10, y*8+10);

         }.bind(this));
      }.bind(this));

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
