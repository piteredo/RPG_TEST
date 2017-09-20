Number.prototype.$method("ratio", function(value){
  var self = target = 1;
  if(this > value) self = this / value;
  else target = value / this;
  return [self , target];
});


phina.geom.Vector2.prototype.toQuarter = function(ratio_w , ratio_h){
  //@ratio_w/h 短辺を１とした時の比率
  var vx_x = ratio_w/2;
	var vx_y = ratio_h/2;
	var vy_x = ratio_w/2 * -1;
	var vy_y = ratio_h/2;
	var x = (this.x * vx_x) + (this.y * vy_x);
	var y = (this.x * vx_y) + (this.y * vy_y);
	var pos = {x: x , y: y};
	return pos;
};


phina.geom.Vector2.prototype.getDirection = function() {
  //８方向取得出来るよう拡張
  var angle = this.toDegree();
  if(angle>=337.5 || angle<22.5) return "RIGHT";
  else if(angle<67.5) return "RIGHT_BOTTOM";
  else if(angle<112.5) return "BOTTOM";
  else if(angle<157.5) return "LEFT_BOTTOM";
  else if(angle<202.5) return "LEFT";
  else if(angle<247.5) return "LEFT_TOP";
  else if(angle<292.5) return "TOP";
  else if(angle<337.5) return "RIGHT_TOP";
  console.log("error getDirection angle doesn't much"); return false;
}

phina.geom.Vector2.ZERO = phina.geom.Vector2(0, 0);
phina.geom.Vector2.RIGHT = phina.geom.Vector2(1, -1);
phina.geom.Vector2.RIGHT_BOTTOM = phina.geom.Vector2(1, 0);
phina.geom.Vector2.BOTTOM = phina.geom.Vector2(1, 1);
phina.geom.Vector2.LEFT_BOTTOM = phina.geom.Vector2(0, 1);
phina.geom.Vector2.LEFT = phina.geom.Vector2(-1, 1);
phina.geom.Vector2.LEFT_TOP = phina.geom.Vector2(-1, 0);
phina.geom.Vector2.TOP = phina.geom.Vector2(-1, -1);
phina.geom.Vector2.RIGHT_TOP = phina.geom.Vector2(0, -1);
