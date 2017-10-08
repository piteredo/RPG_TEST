//
//
// UiHeroStatus.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiHeroStatus", {
   superClass: "DisplayElement",

   init: function() {
      this.superInit();

      this.ui = this._createUi();
   },


   _createUi: function() {

      //仮
      var shape = RectangleShape({
         width: 155,
         height: 60,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10,
         padding: null
      });
      shape.setOrigin(0, 0);



      var t = Label({
         text: "99",
         fontSize: 20,
         fontWeight: "bold",
         fill: "rgb(210,210,200)"
      });
      t.setOrigin(0, 0);
      t.setPosition(10, 10);
      t.addChildTo(shape);

      var tt = Label({
         text: "わたしわたし",
         fontSize: 14,
         fontWeight: "bold",
         fill: "rgb(210,210,200)"
      });
      tt.setOrigin(0, 0);
      tt.setPosition(50, 4);
      tt.addChildTo(shape);

      var ttt = Label({
         text: "HP",
         fontSize: 10,
         fontWeight: "bold",
         fill: "rgb(210,210,200)"
      });
      ttt.setOrigin(0, 0);
      ttt.setPosition(50, 21);
      ttt.addChildTo(shape);

      var tttt = Label({
         text: "MP",
         fontSize: 10,
         fontWeight: "bold",
         fill: "rgb(210,210,200)"
      });
      tttt.setOrigin(0, 0);
      tttt.setPosition(50, 31);
      tttt.addChildTo(shape);

      var gauge = Gauge({
            value: 0,
            width: 62,
            height: 6,
            fill: "rgb(210,210,200)",
            stroke: false,
            gaugeColor: "rgb(0,210,200)",
            padding: 0,
      });
      gauge.setPosition(80, 32);
      gauge.setOrigin(0, 0);
      gauge.addChildTo(shape);

      var gauge2 = Gauge({
            value: 0,
            width: 62,
            height: 6,
            fill: "rgb(210,210,200)",
            stroke: false,
            gaugeColor: "rgb(0,210,200)",
            padding: 0,
      });
      gauge2.setPosition(80, 42);
      gauge2.setOrigin(0, 0);
      gauge2.addChildTo(shape);




      return shape;
   },


   getUi: function() {
      //UiManager から呼ばれる
      return this.ui;
   },


   updateData: function(argus) {
      //UiManager から呼ばれる
   },

});
