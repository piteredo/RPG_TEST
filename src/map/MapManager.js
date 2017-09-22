//
//
// MapManager.js
// 2017 @auther piteredo
// This Program is MIT license.
//
//
phina.define("MapManager", {


   loaded_map_data: [],


   init: function(layer) {
      //@param AssetLayer_Class

      this.AreaPosList = AreaPosList();
      this.AreaBuilder = AreaBuilder();
      this.Renderer = MapRenderer(layer);
   },


   updateArea: function(area_ctr_pos) { // area_ctr_pos が変更されたときだけ呼ばれるように

      var updt = this.AreaPosList.getAreaPosListUpdate(area_ctr_pos);
      var area_build_list = updt.build_list;
      //var area_unbuild_list = updt.unbuild_list;
      //var area_keep_list = updt.keep_list;

      this._buildAreas(area_build_list);
      //this._unbuildAreas(area_unbuild_list);

      this.Renderer.render(this.loaded_map_data);
   },


   _buildAreas: function(area_build_list){
      (area_build_list.length).times(function(i){
         var area = this.AreaBuilder.buildArea(area_build_list[i]);
         this.loaded_map_data.push(area);
      }.bind(this));
   },


   _unbuildAreas: function(){
      //todo 
   },


});
