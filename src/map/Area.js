


// Area Class



phina.define("Area", {
  superClass: "DisplayElement",

  init: function(){
    this.superInit();
    this.loader = MapAssetLoader();
    this.node_data = NodeData();
  },

  createArea: function(new_area_list , old_area_list){
    //@param new~ = 最新のエリアロードリスト
    //@param old~ = 更新前のエリア(ロード)リスト

    var add_list = this._checkDiff( new_area_list , old_area_list ).add;
    var tilemap_list = this._loadTilemap( add_list );

    return this._buildAreaList( tilemap_list );
  },

  _checkDiff: function(new_area_list , old_area_list){
    //@param new~ = 最新のエリアロードリスト
    //@param old~ = 更新前のエリア(ロード)リスト

    //Vector2 を 配列に変換 を 文字列に変換 して比較。(他に手段ない？
    var new_arr = this._vectorToArrayString( new_area_list );
    var old_arr = this._vectorToArrayString( old_area_list );

    var add_list = [];
    var del_list = [];
    var keep_list = [];

    for(var i=0; i<new_arr.length; i++){
      var idx = old_arr.indexOf( new_arr[i] );

      if(idx == -1) add_list.push( new_area_list[i] );
      else keep_list.push( new_area_list[i] );
    }
    for(var v=0; v<old_arr.length; v++){
      var idx = new_arr.indexOf( old_arr[v] );

      if(idx == -1) del_list.push( old_area_list[v] );
    }

    return { add:add_list , del:del_list , keep:keep_list };
  },

  _vectorToArrayString: function(vector_list){
    //@param Vector2(x,y) が並んだ配列

    var arr = [];
    for(var i=0; i<vector_list.length; i++){
      arr.push(
        [ vector_list[i].x , vector_list[i].y ].toString()
      );
    }
    return arr;
  },

  _loadTilemap: function(add_list){
    //@param 更新後新たにロードされるエリアのリスト

    return this.loader.loadTilemap( add_list );
  },

  _buildAreaList: function(tilemap_list){
    //@param 更新後新たにロードされるリスト(add_list)のassetが入った配列

    var enable_area_list = [];
    for(var i=0; i<tilemap_list.length; i++){

      var map_data = tilemap_list[i].getMapData("FLOOR"); //二次元arr
      var tileset_list = tilemap_list[i].getTilesetData();
      var area_x = tilemap_list[i].area_x;
      var area_y = tilemap_list[i].area_y;

      var area = this._buildNodeList( map_data , tileset_list , area_x , area_y );
      enable_area_list.push( area );
    }

    return enable_area_list;
  },

  _buildNodeList: function(map_data , tileset_list , area_x , area_y){
    //@param map_data=１エリア分の二次元配列
    //@param  tileset_list=assetリスト
    //@param area_x,y このエリアのVector2(x,y)pos

    var arr =[];
    for(var y=0; y<map_data.length; y++){
      arr.push([]);
      for(var x=0; x<map_data[y].length; x++){
        var maptip_no = map_data[y][x];
        var img_name = this._getFirstGid( tileset_list , maptip_no).img_name;
        var firstgid = this._getFirstGid( tileset_list , maptip_no).firstgid;
        var tip_x = x;
        var tip_y = y;

        var node  = this.node_data.getNodeData( maptip_no , img_name , firstgid , tip_x , tip_y , area_x , area_y );

        arr[y].push( node );
      }
    }

    return arr;
  },

  _getFirstGid: function(tileset_list , maptip_no){
    //@param tileset=画像へのリンクのリスト
    //@param maptip_no=マップチップの番号

    for(var i=0; i<tileset_list.length; i++){
      /*if(maptip_no < 0){
        var img_name = null;
        var firstgid = 0;
      }
      else*/ if(maptip_no >= tileset_list[i].firstgid){
        var img_name = tileset_list[i].name;
        var firstgid = tileset_list[i].firstgid;
      }
    }

    return { img_name:img_name , firstgid:firstgid };
  },
});
