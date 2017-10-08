//
//
// UiManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiManager", {

   ui_data_list: [],

   init: function() {
      //子クラスの初期化
      this.UiController = UiController();
      this.UiMinimap = UiMinimap();
      this.UiHeroStatus = UiHeroStatus();
      this.UiOtherStatus = UiOtherStatus();

      //UIの組み立て
      this._buildUiList();
   },


   _buildUiList: function(){
      var controller = this.UiController.getUi();
      var minimap = this.UiMinimap.getUi();
      var hero_status = this.UiHeroStatus.getUi();
      var other_status = this.UiOtherStatus.getUi();

      //仮
      controller.setPosition(187.5/2+20, SCREEN_HEIGHT - 187.5/2-20);
      minimap.setPosition(SCREEN_WIDTH-10-50, 10+50).setVisible(false);

      var margin = 5;
      hero_status.setPosition(margin, margin);

      other_status.setPosition(85+10+170+10, 10+50).setVisible(false);

      this.ui_data_list.push(controller, minimap, hero_status, other_status);
   },


   getUiDataList: function(){
      //MainScene から呼ばれる
      return this.ui_data_list;
   },


   updateMapUi: function(map_data, focus_area_pos, focus_node_pos){
      console.log("UiManager_updateMapUi_come");
      //todo
   },


   updateHeroUi: function(hero_data_list){
      //[{hero_data}] only 1 length
      console.log("UiManager_updateHeroUi_come");
      //todo
   },


   updateNpcUi: function(npc_data_list){
      console.log("UiManager_updateNpcUi_come");
      //todo
   },


   updateEnemyUi: function(enemy_data_list){
      console.log("UiManager_updateEnemyUi_come");
      //todo
   },

});
