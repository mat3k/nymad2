export default [
  {
    id: 'demo_island',
    name: "Demo island",
    width: 6,
    height: 6,
    spriteUrl: 'build/assets/wiptiles.png',
    board: [
      // 0
      [
        {type: 'water', sx: 0, sy: 2},
        {type: 'water', sx: 1, sy: 2},
        {type: 'water', sx: 1, sy: 2},
        {type: 'water', sx: 1, sy: 2},
        {type: 'water', sx: 1, sy: 2},
        {type: 'water', sx: 2, sy: 2},
      ],
      [
        {type: 'water', sx: 0, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'water', sx: 2, sy: 3},
      ],
      [
        {type: 'water', sx: 0, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'water', sx: 2, sy: 3},
      ],
      [
        {type: 'water', sx: 0, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'water', sx: 2, sy: 3},
      ],
      [
        {type: 'water', sx: 0, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'sand', sx: 1, sy: 3},
        {type: 'door', sx: 4, sy: 3, options: {destination: {id: 'island_dungeon_hall', x: 1, y: 4}}},
        {type: 'water', sx: 2, sy: 3},
      ],
      [
        {type: 'water', sx: 0, sy: 4},
        {type: 'water', sx: 1, sy: 4},
        {type: 'water', sx: 1, sy: 4},
        {type: 'water', sx: 1, sy: 4},
        {type: 'water', sx: 1, sy: 4},
        {type: 'water', sx: 2, sy: 4},
      ],
    ]
  },
  {
    id: 'island_dungeon_hall',
    name: "Demo dungeon hall",
    width: 3,
    height: 5,
    spriteUrl: 'build/assets/wiptiles.png',
    board: [
      [
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
      ],
      [
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
      ],
      [
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
      ],
      [
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'rocks', sx: 4, sy: 3},
      ],
      [
        {type: 'rocks', sx: 4, sy: 3},
        {type: 'door', sx: 4, sy: 5, options: {destination: {id: 'demo_island', x: 4, y: 4}}},
        {type: 'rocks', sx: 4, sy: 3},
      ]
    ]
  }
]
