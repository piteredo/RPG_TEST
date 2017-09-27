//
//
// CharManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("CharManager",{


   init: function(layer){
      this.layer = layer;
      this.HeroManager = HeroManager();
      //this.EnemyManager = EnemyManager();
      //this.NPCManager = NPCManager();
   },

   displayChar: function(type, area_pos, node_pos, char_id){
      //@param type = (HERO, ENEMY, NPC)
      //@param char_id = char_no (not a unique_id)

      var unique_id = Random.uuid(); //phina.util.Random
      var char = null;

      switch(type){
         case "HERO":
            char = this.HeroManager.displayHero(area_pos, node_pos, char_id, unique_id);
            break;
         case "ENEMY":
            char = this.EnemyManager.displayEnemy(area_pos, node_pos, char_id, unique_id);
            break;
         case "NPC":
            char = this.NPCManager.displayNPC(area_pos, node_pos, char_id, unique_id);
            break;
         default:
            console.log("error");
      }

      this._child(char);
   },

   _child: function(char){
      if(char == null){
         console.log("error");
         return;
      }

      var area_pos = char.area_pos;
      var node_pos = char.node_pos;
      var floor;
      var n;
      (this.layer.children.length).times(function(i){
         var a_p = this.layer.children[i].area_pos;
         var n_p = this.layer.children[i].node_pos;
         if(area_pos.equals(a_p) && node_pos.equals(n_p)){
            floor = this.layer.children[i];
            n = i;
         }
      }.bind(this));
      this.layer.addChildAt(char, n+1);

      char.setPosition(floor.x , floor.y-28-10); //超仮
   },

});
