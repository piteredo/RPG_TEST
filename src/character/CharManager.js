//
//
// CharManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("CharManager",{


   init: function(MainScene, TouchManager){
      this.HeroManager = HeroManager();
      this.EnemyManager = EnemyManager();
      this.NpcManager = NpcManager();
   },


   getHeroData: function(uuid, area_pos, node_pos, char_id){ //char_id未設定
      //MainScene に呼ばれる
      var id = char_id || 0; //仮
      var abs_pos = this._getRelPosToAbsPos(area_pos, node_pos);
      var hero_data_list = this.HeroManager.getHeroDataList(uuid, area_pos, node_pos, abs_pos, id); //[{hero_data}] only 1 length

      return hero_data_list;
   },


   _getRelPosToAbsPos: function(area_pos , node_pos){ //汎用化？
      //Camera に呼ばれる
      var x = node_pos.x + (area_pos.x * NODE_LENGTH);
      var y = node_pos.y + (area_pos.y * NODE_LENGTH);
      var abs_pos = Vector2(x, y);
      return abs_pos;
   },


   getNpcData: function(npc_list){
      //MainScene に呼ばれる
      var list = npc_list;

      var updated_list = [];
      (list.length).times(function(i){
         var node = list[i];
         node.abs_pos = this._getRelPosToAbsPos(node.area_pos, node.node_pos);
         updated_list.push(node);
      }.bind(this));

      return this.NpcManager.getNpcDataList(updated_list);
   },


   getEnemyData: function(enemy_list){
      //MainScene に呼ばれる
      var list = enemy_list;

      var updated_list = [];
      (list.length).times(function(i){
         var node = list[i];
         node.abs_pos = this._getRelPosToAbsPos(node.area_pos, node.node_pos);
         updated_list.push(node);
      }.bind(this));

      return this.EnemyManager.getEnemyDataList(updated_list);
   },


   getHeroAbsPos: function(){
      return this.HeroManager.getHeroAbsPos();
   },

});
