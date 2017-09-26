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
      char.addChildTo(this.layer);

      char.setPosition(-40 , 3000); //超仮
   },

});
