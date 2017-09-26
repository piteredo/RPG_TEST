//
//
// CharManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("HeroManager",{


   init: function(layer){
      this.layer = layer;
      this.Hero = Hero();
   },


   displayHero: function(area_pos, node_pos, char_id, unique_id){
      //@param char_id = char_no (not a unique_id)

      var hero = this.Hero.getHeroNode(area_pos, node_pos, char_id, unique_id);
      return hero;
   },

});
