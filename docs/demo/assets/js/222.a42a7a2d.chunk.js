(window.webpackJsonp=window.webpackJsonp||[]).push([[222],{736:function(n,e,o){"use strict";o.r(e),e.default="const {Scene, Path, Group} = spritejs;\nconst container = document.getElementById('stage');\nconst scene = new Scene({\n  container,\n  width: 1200,\n  height: 1200,\n});\n\nconst layer = scene.layer('fglayer');\nlayer.canvas.style.backgroundColor = '#9cd470';\n\nconst d = 'M235.946483,75.0041277 C229.109329,53.4046689 214.063766,34.845093 195.469876,22.3846101 C175.428247,8.9577702 151.414895,2 127.314132,2 C75.430432,2 31.6212932,32.8626807 18.323944,74.9130141 C8.97646468,77.1439182 2,85.5871171 2,95.7172992 C2,104.709941 7.49867791,112.371771 15.2700334,115.546944 C15.8218133,115.773348 16.6030463,122.336292 16.8270361,123.236385 C22.1235768,144.534892 35.4236577,163.530709 52.5998558,176.952027 C52.6299032,176.976876 52.6626822,177.001726 52.6954612,177.026575 C72.5513428,192.535224 98.5478246,202 127.043705,202 C152.034964,202 176.867791,194.597706 197.428422,180.146527 C215.659011,167.335395 230.201962,148.621202 236.52831,126.969284 C237.566312,123.421373 238.549682,119.685713 239.038636,116.019079 C239.044099,115.983185 239.074146,115.444787 239.082341,115.442025 C246.673412,112.184022 252,104.580173 252,95.7172992 C252,85.6892748 245.15192,77.3371896 235.946483,75.0041277';\nconst shadowD = 'M82.1534529,43 C127.525552,43 164.306906,33.6283134 164.306906,21.663753 C164.306906,9.6991926 127.525552,0 82.1534529,0 C36.7813537,0 0,9.6991926 0,21.663753 C0,33.6283134 36.7813537,43 82.1534529,43 Z';\nconst shadow = new Path();\nshadow.attr({\n  d: shadowD,\n  fillColor: '#000000',\n  opacity: 0.05,\n  pos: [440, 712.5],\n  scale: [1.3, 1.2],\n});\nlayer.append(shadow);\n\nconst lemon = new Path();\nlemon.attr({\n  d,\n  pos: [374, 460],\n  fillColor: '#fed330',\n  scale: 1.4,\n});\nlayer.append(lemon);\n\nconst lemonGroup = new Group();\nlemonGroup.attr({\n  pos: [610, 600],\n  anchor: 0.5,\n  size: [180, 180],\n  bgcolor: '#faee35',\n  border: [6, '#fdbd2c'],\n  borderRadius: 90,\n  scale: 1.5,\n});\nlayer.append(lemonGroup);\n\nconst d2 = 'M0,0L0,100A15,15,0,0,0,50,86.6z';\nfor(let i = 0; i < 12; i++) {\n  const t = new Path();\n  t.attr({\n    d: d2,\n    pos: [0, 0],\n    lineWidth: 2,\n    strokeColor: '#fff',\n    fillColor: '#f8c32d',\n    rotate: 30 * i,\n    scale: 0.65,\n  });\n  lemonGroup.append(t);\n}\n\nlemonGroup.animate([\n  {rotate: 360},\n], {\n  duration: 10000,\n  iterations: Infinity,\n});\n\nlemonGroup.addEventListener('mouseenter', (evt) => {\n  layer.timeline.playbackRate = 3.0;\n});\nlemonGroup.addEventListener('mouseleave', (evt) => {\n  layer.timeline.playbackRate = 1.0;\n});"}}]);