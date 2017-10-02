//
//
// AreaList.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("AreaList", {

   area_list: null,

   init: function() {
      //エリアリストの雛形を作成
      var a = [];
      (AREA_LENGTH).times(function(y) {
         a.push([]);
         (AREA_LENGTH).times(function(x) {
            a[y].push(false);
         });
      });
      this.area_list = a;
   },


   getAreaListFormat: function() {
      //MapManager に呼ばれる
      return this.area_list.clone(true);
   },


   getAreaListUpdate: function(new_focus_area_pos){
      //MapManager に呼ばれる

      var new_pos = new_focus_area_pos;
      var old_areas = this._getOldAreas();
      var new_areas = this._getNewAreas(new_pos);
      var update_data = this._getAreasDiff(old_areas, new_areas);

      this._updateAreaListFormat(update_data); //次回呼ばれたときのために更新された area_list 雛形のバックアップ

      return update_data;
   },


   _getOldAreas: function() {
      var a = [];
      (this.area_list.length).times(function(y) {
         (this.area_list.length).times(function(x) {
            if (this.area_list[y][x] != false) a.push(Vector2(x, y));
         }.bind(this));
      }.bind(this));

      return a;
   },


   _getNewAreas: function(new_focus_area_pos) {
      var new_pos = new_focus_area_pos;
      var a = [new_pos];
      var dir_a = ["RIGHT", "RIGHT_BOTTOM", "BOTTOM", "LEFT_BOTTOM", "LEFT", "LEFT_TOP", "TOP", "RIGHT_TOP"];

      for (var i = 0; i < dir_a.length; i++) {
         var org_pos = new_pos.clone();
         var new_v = Vector2[dir_a[i]];
         var next_pos = org_pos.add(new_v);

         if (!Math.inside(next_pos.x, 0, AREA_LENGTH - 1) || !Math.inside(next_pos.y, 0, AREA_LENGTH - 1)) continue;

         a.push(next_pos);
      }
      return a;
   },


   _getAreasDiff: function(old_areas, new_areas) {
      var old_a = old_areas;
      var new_a = new_areas;
      var data = {
         unload: old_a.concat(),
         load: new_a.concat()
      };

      if (old_a.length == 0) return data;

      (old_a.length).times(function(i) {
         (new_a.length).times(function(v) {
            if (old_a[i].equals(new_a[v])) {
               data.unload.splice(data.unload.indexOf(old_a[i]), 1);
               data.load.splice(data.load.indexOf(new_a[v]), 1);
            }
         });
      });
      return data; // => { unload:[area_pos , ...] , load:[area_pos , ...]}
   },


   _updateAreaListFormat: function(update_data) {
      //update_data = { unload:[area_pos , ...] , load:[area_pos , ...]}

      var list = ["unload", "load"];

      (list.length).times(function(i) {
         var a = update_data[list[i]];

         (a.length).times(function(v) {
            var x = a[v].x;
            var y = a[v].y;
            if (list[i] == "unload") this.area_list[y][x] = false;
            if (list[i] == "load") this.area_list[y][x] = true;
         }.bind(this));
      }.bind(this));
   },


});
