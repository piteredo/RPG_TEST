


// Asset list



var ASSETS = {
   image: {
      "hero_0": "assets/image/character/hero_0.png",
      "npc_0": "assets/image/character/npc_0.png",
      "enemy_0": "assets/image/character/enemy_0.png",
      "maptip_step0_1": "assets/image/maptip/maptip_step0_1.png",
      "maptip_step0_2": "assets/image/maptip/maptip_step0_2.png",
      "object_1": "assets/image/maptip/object_1.png",
   },

   tmx: {
      "x0_y0": "assets/tmx/x0_y0.tmx",
      "x1_y0": "assets/tmx/x1_y0.tmx",
      "x2_y0": "assets/tmx/x2_y0.tmx",
      "x0_y1": "assets/tmx/x0_y1.tmx",
      "x1_y1": "assets/tmx/x1_y1.tmx",
      "x2_y1": "assets/tmx/x2_y1.tmx",
      "x0_y2": "assets/tmx/x0_y2.tmx",
      "x1_y2": "assets/tmx/x1_y2.tmx",
      "x2_y2": "assets/tmx/x2_y2.tmx",
   },

   spritesheet: {
      "hero_0_ss": {
         "frame": {
            "width": 60,
            "height": 81,
            "cols": 3,
            "rows": 8,
         },
         "animations": {
            "RIGHT_BOTTOM_WALK": {
               "frames": [0, 1, 2],
               "next": "RIGHT_BOTTOM_WALK", // loopさせるのに必要
               "frequency": 6,
            },
            "LEFT_BOTTOM_WALK": {
               "frames": [3, 4, 5],
               "next": "LEFT_BOTTOM_WALK", // loopさせるのに必要
               "frequency": 6,
            },
            "RIGHT_TOP_WALK": {
               "frames": [9, 10, 11],
               "next": "RIGHT_TOP_WALK", // loopさせるのに必要
               "frequency": 6,
            },
            "LEFT_TOP_WALK": {
               "frames": [6, 7, 8],
               "next": "LEFT_TOP_WALK", // loopさせるのに必要
               "frequency": 6,
            },
         }
      },
   }
};
