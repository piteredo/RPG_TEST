//
//
// TouchManager.js
// 2018 @auther piteredo
// This Program is MIT license.
//
//
phina.define("TouchManager", {

   init: function(){
      this.list = [];
      this.temp_a = [];
   },

   add: function(o){
      if(o.name != null){
         this.list[o.name] = o;
      return true;
      }
      console.log("error TouchManager obj_name is null");
      return false;
   },

   on: function(o){
      o.setInteractive(true);
   },

   off: function(o){
      o.setInteractive(false);
   },

   setup: function(){
      for(var i in this.list){
         this._touchHandler(this.list[i]);
         this.list[i].staying = false; //onpointstay の初めだけtouchStartに分岐する為のフラグ
      }
   },

   _touchHandler: function(o){
      o.onpointstart = function(e)
      {
         this.temp_a.push(o); //ここではobj処理は呼べない仕様(複数クリック判定のため)
      }
      .bind(this);

      o.onpointstay = function(e){
         var wait_timer = setTimeout(function(){  //最初一瞬だけクリックした順に拾ってしまうので30ms待って省く
            var front_o = this.temp_a[this.temp_a.length - 1];
            if(o != front_o) return false;

            switch(front_o.staying){
               case false: //最初の１回のみ touchStart を呼ぶ
                  front_o.staying = true;
                  front_o.touchStart(e);
                  break;
               case true: //残りは touchStay を呼ぶ
                  front_o.touchStay(e);
                  break;
               }
            }
            .bind(this), 30);
         }.bind(this);

         o.onpointmove = function(e){
            var wait_timer = setTimeout(function(){
            var front_o = this.temp_a[this.temp_a.length - 1];
            if(o != front_o) return false;

            front_o.touchMove(e);
         }
         .bind(this), 30);
      }.bind(this);

      o.onpointend = function(e){
         var wait_timer = setTimeout(function(){
            var front_o = this.temp_a[this.temp_a.length - 1];
            if(o != front_o) return false;

            if(e.pointer.fx != 0 || e.pointer.fy != 0) front_o.touchFlick(e);

            var dis_x = e.pointer.position.x - e.pointer.startPosition.x;
            var dis_y = e.pointer.position.y - e.pointer.startPosition.y;
            if(dis_x == 0 && dis_y == 0) front_o.touchTap(e);

            front_o.touchEnd(e);

            front_o.staying = false;
            this.temp_a = [];
         }
         .bind(this), 30);
      }.bind(this);
   },

});
