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

      var c = CircleShape({
         radius: 30,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });
      c.setPosition(130, -92);
      c.addChildTo(shape);

      var cc = CircleShape({
         radius: 30,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });
      cc.setPosition(50, -110-30);
      cc.addChildTo(shape);

      var ccc = CircleShape({
         radius: 30,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });
      ccc.setPosition(110+37, 0);
      ccc.addChildTo(shape);

      var cccc = CircleShape({
         radius: 30,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });
      cccc.setPosition(110+37+85, 0);
      cccc.addChildTo(shape);

      var ccccc = CircleShape({
         radius: 30,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });
      ccccc.setPosition(-74, -120);
      ccccc.addChildTo(shape);

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
