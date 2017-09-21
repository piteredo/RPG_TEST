


// AreaList Class



phina.define("AreaList", {

  init: function(){
    //
  },

  updateAreaList: function(area_pos){
    //@param 画面中央の最新エリア座標 Vector2(x,y)

    var list = [];
    var dir_x = [-1,0,1,-1,1,-1,0,1];
    var dir_y = [-1,-1,-1,0,0,1,1,1];

    for(var i=0; i<dir_x.length; i++){
        var v_org = area_pos.clone();
        var v_new = phina.geom.Vector2( dir_x[i] , dir_y[i] );
        var pos_new = v_org.add(v_new);

        if(!Math.inside( pos_new.x , 0 , AREA_LENGTH-1 ) || !Math.inside( pos_new.y , 0 , AREA_LENGTH-1 )) continue;

        list.push(pos_new);
    }
    list.push(area_pos);

    return list;
  },
});
