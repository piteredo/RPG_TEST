//
//
// UiOtherStatus.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiOtherStatus", {
   superClass: "DisplayElement",

   init: function() {
      this.superInit();

      this.ui = this._createUi();
   },


   _createUi: function(){

      //仮
      var tt = Label({
         text: "99 あなたあなた",
         fontSize: 14,
         fontWeight: "bold",
         fill: "rgb(210,210,200)"
      });
      tt.setOrigin(0, 0);
      tt.setPosition(0, 0);

      var gauge = Gauge({
            value: 0,
            width: 122,
            height: 6,
            fill: "rgb(210,210,200)",
            stroke: false,
            gaugeColor: "rgb(0,210,200)",
            padding: 0,
      });
      gauge.setPosition(2, 27);
      gauge.setOrigin(0, 0);
      gauge.addChildTo(tt);

      return tt;
   },


   getUi: function() {
      //UiManager から呼ばれる
      return this.ui;
   },


   updateData: function(argus){
      //UiManager から呼ばれる
   },

});
