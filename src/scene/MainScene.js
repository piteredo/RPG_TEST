//
//
// MainScene.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define('MainScene', {
   superClass: 'DisplayScene',


   init: function() {
      this.superInit({
         backgroundColor: MAINSCENE_BG_COLOR
      });

      //仮
      var focus_uuid = HERO_UUID;
      var focus_area_pos = AREA_DEF_POS;
      var focus_node_pos = NODE_DEF_POS;

      //クラス初期化
      this.AssetLayer = AssetLayer().addChildTo(this);
      this.UiLayer = UiLayer().addChildTo(this);
      //
      this.Camera = Camera(this.AssetLayer);
      this.Renderer = Renderer(this.AssetLayer , this.UiLayer);
      //
      this.TouchManager = TouchManager();
      //
      this.MapManager = MapManager(this, this.TouchManager);
      this.CharManager = CharManager(this, this.TouchManager);
      this.UiManager = UiManager(this, this.TouchManager);

      //表示の初期化
      this._initDisplay(focus_uuid, focus_area_pos, focus_node_pos);
      this.TouchManager.setup();
   },


   _initDisplay: function(focus_uuid, focus_area_pos, focus_node_pos){
      this._displayUi();
      this._displayMap(focus_uuid, focus_area_pos, focus_node_pos);
      this._displayChar(focus_uuid, focus_area_pos, focus_node_pos);
   },


   _displayUi: function(){
      var ui_data_list = this.UiManager.getUiDataList();
      this.Renderer.renderUi(ui_data_list);
   },


   _displayMap: function(focus_uuid, focus_area_pos, focus_node_pos){
      var map_data = this.MapManager.getMapData(focus_area_pos);
      this.Camera.updateCameraPos(focus_uuid, focus_area_pos, focus_node_pos);
      this.UiManager.updateMapUi(map_data, focus_area_pos, focus_node_pos);
      var visible_node_list = this.Camera.getVisibleNodeList(map_data, focus_area_pos, focus_node_pos);
      this.Renderer.renderMap(visible_node_list);
   },


   _displayChar: function(focus_uuid, focus_area_pos, focus_node_pos){
      this._displayHero(focus_uuid, focus_area_pos, focus_node_pos);
      this._displayNpc();
      this._displayEnemy();
   },


   _displayHero: function(focus_uuid, focus_area_pos, focus_node_pos){
      var hero_data_list = this.CharManager.getHeroData(focus_uuid, focus_area_pos, focus_node_pos); //[{hero_data}] only 1 length
      this.UiManager.updateHeroUi(hero_data_list);
      this.Renderer.renderChar(hero_data_list);

      //仮
      this.hero = hero_data_list[0];
   },


   _displayNpc: function(){
      var npc_list = this.MapManager.getNpcList(); //中身が npc_id, area/node_pos のみのNPCリスト
      var npc_data_list = this.CharManager.getNpcData(npc_list);
      this.UiManager.updateNpcUi(npc_data_list);
      this.Renderer.renderChar(npc_data_list);
   },


   _displayEnemy: function(){
      var enemy_list = this.MapManager.getEnemyList(); //中身が enemy_id, area/node_pos のみの敵リスト
      var enemy_data_list = this.CharManager.getEnemyData(enemy_list);
      this.UiManager.updateEnemyUi(enemy_data_list);
      this.Renderer.renderChar(enemy_data_list);
   },


   //暫定
   moveCharHero: function(dir){
      //UiManagerから呼ばれる
      var old_abs_pos = this.hero.abs_pos;
      var new_abs_pos = old_abs_pos.add(phina.geom.Vector2[dir]);
      this.Renderer.moveChar(this.hero, old_abs_pos, new_abs_pos);
      this.Camera.updateCameraPos(this.hero.uuid, this.hero.area_pos, this.hero.node_pos);
      var map_data = this.MapManager.getMapData(this.hero.area_pos);
      var visible_node_list = this.Camera.getVisibleNodeList(map_data, this.hero.area_pos, this.hero.node_pos);
      //console.log(visible_node_list);
      //this.Renderer.renderMap(visible_node_list);
   },


   stopCharHero: function(){
      //this.CharManager.stopHero();
   },

});
