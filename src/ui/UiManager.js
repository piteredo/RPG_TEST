//
//
// UiManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("UiManager", {

   ui_data_list: [],

   init: function(MainScene, TouchManager) {
      //子クラスの初期化
      this.UiController = UiController(this, TouchManager);
      this.UiMinimap = UiMinimap();
      this.UiHeroStatus = UiHeroStatus();
      this.UiOtherStatus = UiOtherStatus();

      this.MainScene = MainScene;

      //UIの組み立て
      this._buildUiList();
   },


   _buildUiList: function(){
      var controller = this.UiController.getUi();
      //var minimap = this.UiMinimap.getUi();
      //ar hero_status = this.UiHeroStatus.getUi();
      //var other_status = this.UiOtherStatus.getUi();

      //仮
      controller.setPosition(187.5/2+20, SCREEN_HEIGHT - 187.5/2-20);

      /*var margin = 5;
      hero_status.setPosition(margin, margin);

      other_status.setPosition(hero_status.width + margin*5 , margin);

      minimap.setPosition(SCREEN_WIDTH-minimap.width-margin, margin);
      */

      //this.ui_data_list.push(controller, minimap, hero_status, other_status);
      this.ui_data_list.push(controller);
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


   chageCharDirection: function(dir){
      this.MainScene.chageCharDirection(dir);
   },


   startCharMove: function(){
      this.MainScene.startCharMove();
   },


   stopCharMove: function(){
      this.MainScene.stopCharMove();
   },
});
