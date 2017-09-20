


// LoadingScene Class



phina.define('LoadingScene', {
  superClass: 'phina.display.DisplayScene',


  init: function(options){
    options = ({
      backgroundColor: LOADINGSCENE_BG_COLOR
    }).$safe(options, phina.game.LoadingScene.defaults);
    this.superInit(options);

    this.gauge = this._gauge().addChildTo(this);
    this.label = this._label().addChildTo(this);

    this.loader = phina.asset.AssetLoader();
    this._load(options);
  },



  _gauge: function(){
    var gauge = Gauge({
      value: 0,
      width: LOADINGSCENE_GAUGE_WIDTH,
      height: LOADINGSCENE_GAUGE_HEIGHT,
      fill: LOADINGSCENE_GAUGE_BG_COLOR,
      stroke: false,
      gaugeColor: LOADINGSCENE_GAUGE_COLOR,
      padding: 0,
    })
    .setPosition( LOADINGSCENE_GAUGE_POS_X , LOADINGSCENE_GAUGE_POS_Y );
    gauge.animationTime = LOADINGSCENE_GAUGE_ANIMATION_TIME;
    return gauge;
  },



  _label: function(){
    var label = Label({
      text: LOADINGSCENE_LABEL_TEXT,
      fill: LOADINGSCENE_LABEL_COLOR,
      fontSize: LOADINGSCENE_LABEL_FONT_SIZE,
      fontWeight: LOADINGSCENE_LABEL_FONT_WEIGHT
    })
    .setPosition( LOADINGSCENE_LABEL_POS_X , LOADINGSCENE_LABEL_POS_Y );
    return label;
  },



  _load: function(options){
    this.loader.onprogress = function(e){
      this.gauge.value = e.progress * 100;
    }.bind(this);
    this.gauge.onfull = function(){
      //this.app.popScene();
      this.flare('loaded'); //phina.game.GameApp の onLoaded 呼び出しで MainScene に推移。
    }.bind(this);

    this.loader.load(options.assets); //phina.asset.AssetLoader の load 開始
  }


});
