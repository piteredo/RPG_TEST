//
//
// CharManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("HeroManager",{


   init: function(){
      this.Hero = Hero();
   },


   getHeroDataList: function(uuid, area_pos, node_pos, abs_pos, char_id){
      //CharManager に呼ばれる
      ////[{hero_data}] only 1 length

      var hero_node = this.Hero.getHeroNode(uuid, area_pos, node_pos, abs_pos, char_id);
      return [hero_node];
   },

});
