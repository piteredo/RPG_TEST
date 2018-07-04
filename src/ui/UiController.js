//
//
// UiController.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiController", {
   superClass: "CircleShape",

   init: function(UiManager, TouchManager) {
      this.superInit({
         radius: 187.5/2,
         fill: null,
         stroke: "rgb(210,210,200)",
         strokeWidth: 10
      });

      this.UiManager = UiManager;

      this.name = "controller";
      TouchManager.add(this);
      TouchManager.on(this);
   },


   getUi: function() {
      //UiManager から呼ばれる
      return this;
   },


   updateData: function(argus){
      //UiManager から呼ばれる
   },

   touchStart: function(e){
      var center = phina.geom.Vector2(this.x , this.y);
      var pointed = phina.geom.Vector2(e.pointer.x , e.pointer.y);
      this.dir = pointed.sub(center).getDirection();
      //移動要求＋方角 func(this.dir)
      this.UiManager.moveCharHero(this.dir);
   },

   touchStay: function(e){
      //console.log("stay" , this.name);
   },

   touchMove: function(e){
      var center = phina.geom.Vector2(this.x , this.y);
      var pointed = phina.geom.Vector2(e.pointer.x , e.pointer.y);
      var new_dir = pointed.sub(center).getDirection();
      if(new_dir != this.dir)
      {
         this.dir = new_dir;
         //移動要求＋方角 func(this.dir)
         this.UiManager.moveCharHero(this.dir);
      }
   },

   touchFlick: function(e){
      //console.log("flick" , this.name);
   },

   touchTap: function(e){
      //console.log("tap" , this.name);
   },

   touchEnd: function(e){
      //移動停止要求 func()
      this.UiManager.stopCharHero();
   },

});
