//
//
// AreaList.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("AreaList", {
   //MapManager_Class に呼ばれたときだけ働く
   //マップデータ本体は保持せず、エリアリストの二次元配列と、その中に各エリアのロード状況(0=false or 1=true)のみバックアップをとる


   area_list: null,


   init: function() {
      //エリアリストのフォーマットを作成
      var a = [];
      (AREA_LENGTH).times(function(y) {
         a.push([]);
         (AREA_LENGTH).times(function(x) {
            a[y].push(0);
         });
      });
      this.area_list = a;
   },


   getAreaList: function() {
      return this.area_list.clone(true);
   },


   getUpdateData: function(new_ctr_area_pos) {
      var new_pos = new_ctr_area_pos;
      var old_areas = this._getOldAreas();
      var new_areas = this._getNewAreas(new_pos);
      var update_data = this._getAreasDiff(old_areas, new_areas);

      this._updateAreaList(update_data); //次回呼ばれたときのために更新された area_list のバックアップ

      return update_data;
   },


   _getOldAreas: function() {
      var a = [];
      (this.area_list.length).times(function(y) {
         (this.area_list.length).times(function(x) {
            if (this.area_list[y][x] != 0) a.push(Vector2(x, y));
         }.bind(this));
      }.bind(this));

      return a;
   },


   _getNewAreas: function(new_ctr_area_pos) {
      var new_pos = new_ctr_area_pos;
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


   _updateAreaList: function(update_data) {
      //update_data = { unload:[area_pos , ...] , load:[area_pos , ...]}

      var list = ["unload", "load"];

      (list.length).times(function(i) {
         var a = update_data[list[i]];

         (a.length).times(function(v) {
            var x = a[v].x;
            var y = a[v].y;
            if (list[i] == "unload") this.area_list[y][x] = 0;
            if (list[i] == "load") this.area_list[y][x] = 1;
         }.bind(this));
      }.bind(this));
   },


});
