//
//
// AreaPosList.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("AreaPosList", {


   old_area_pos_list: [],
   new_area_pos_list: [],


   init: function() {
      //
   },


   getAreaPosListUpdate: function(area_ctr_pos) {
      this.new_area_pos_list = this._updateAreaPosList(area_ctr_pos);
      var update_lists = this._checkAreaListDiff();
      this.old_area_pos_list = this.new_area_pos_list;

      return update_lists;
   },


   _updateAreaPosList: function(area_ctr_pos) {
      var list = [area_ctr_pos];
      var dir_list = ["RIGHT", "RIGHT_BOTTOM", "BOTTOM", "LEFT_BOTTOM", "LEFT", "LEFT_TOP", "TOP", "RIGHT_TOP"];

      for (var i = 0; i < dir_list.length; i++) {
         var pos_org = area_ctr_pos.clone();
         var v_new = Vector2[dir_list[i]];
         var pos_new = pos_org.add(v_new);

         if (!Math.inside(pos_new.x, 0, AREA_LENGTH - 1) || !Math.inside(pos_new.y, 0, AREA_LENGTH - 1)) continue;

         list.push(pos_new);
      }
      return list;
   },


   _checkAreaListDiff: function() {
      var old_a = this.old_area_pos_list;
      var new_a = this.new_area_pos_list;
      var lists = {
         unbuild_list: old_a.concat(),
         build_list: new_a.concat(),
         keep_list: []
      };

      if (old_a.length == 0) return lists;

      (old_a.length).times(function(i) {
         (new_a.length).times(function(v) {
            if (old_a[i].equals(new_a[v])) {
               lists.unbuild_list.splice(lists.unbuild_list.indexOf(old_a[i]), 1);
               lists.build_list.splice(lists.build_list.indexOf(new_a[v]), 1);
               lists.keep_list.push(new_a[v]);
            }
         });
      });
      return lists;
   },


});
