


// MainScene Class



phina.define('MainScene', {
  superClass: 'DisplayScene',


  init: function() {
    this.superInit({
      backgroundColor: MAINSCENE_BG_COLOR
    });

    //以下テスト中
    this.asset_layer = AssetLayer().addChildTo(this);
    this.map_manager = MapManager( this.asset_layer );

    this.map_manager.updateArea(AREA_DEF_POS); //テスト要暫定数字 実際は自キャラの位置をもらう


    /*
    this.map_render_m = MapRenderManager(); //マップ描画マネージャクラス
    this.map_char_m = MapCharManager(); //マップ＋自キャラ仲介クラス
    this.ctrl_char_m = ControllerCharManager(); //コントローラ＋自キャラ仲介クラス
    this.touch_m = TouchManager(); //画面タッチマネージャクラス
    this.ui_m = UIManager(); //UIマネージャクラス

    this.map = Map(this.map_render_m , this.map_char_m , this.touch_m , this.ui_m).addChildTo(this); //マップクラス
    this.char = Char(this.map_char_m , this.ctrl_char_m); //自キャラクラス
    this.ui = UI(this.ui_m).addChildTo(this); //UIクラス
    this.controller = Controller(this.ctrl_char_m , this.touch_m).addChildTo(this); //コントローラクラス

    this.map_char_m.setup(); //マップ＋自キャラ仲介クラス、の初期化
    this.ctrl_char_m.setup(); //コントローラ＋自キャラ仲介クラス、の初期化
    this.touch_m.setup(); //画面タッチマネージャクラス、初期化
    */
  },


});
