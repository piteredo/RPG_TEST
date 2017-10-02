//
//
// EnemyManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("EnemyManager",{


   init: function(){
      this.Enemy_A = Enemy_A();
   },


   getEnemyDataList: function(enemy_list){
      //CharManager に呼ばれる
      var list = enemy_list;
      var node_data_list = [];
      (list.length).times(function(i){
         var node = list[i];

         //node.id を enemy_A 呼び出しに関連付ける

         var id = 0;//仮
         var area_pos = node.area_pos;
         var node_pos = node.node_pos;
         var abs_pos = node.abs_pos;

         var node_data = this.Enemy_A.getNodeData(id, area_pos, node_pos, abs_pos);
         node_data_list.push(node_data);
      }.bind(this));

      return node_data_list;
   },

});
