//
//
// NpcManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("NpcManager",{


   init: function(){
      this.Npc_A = Npc_A();
   },


   getNpcDataList: function(npc_list){
      //CharManager に呼ばれる
      var list = npc_list;
      var node_data_list = [];
      (list.length).times(function(i){
         var node = list[i];

         //node.id を npc_A 呼び出しに関連付ける

         var id = 0;//仮
         var area_pos = node.area_pos;
         var node_pos = node.node_pos;
         var abs_pos = node.abs_pos;

         var node_data = this.Npc_A.getNodeData(id, area_pos, node_pos, abs_pos);
         node_data_list.push(node_data);
      }.bind(this));

      return node_data_list;
   },
});
