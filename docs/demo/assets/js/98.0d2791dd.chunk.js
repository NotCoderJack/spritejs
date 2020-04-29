(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{612:function(e,n,t){"use strict";t.r(n),n.default="const {Scene} = spritejs;\nconst {Mesh3d, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35,\n  },\n  directionalLight: [0.5, 1.0, -0.3],\n  directionalLightColor: [1, 1, 1, 0.15],\n});\n\nlayer.camera.attributes.pos = [5, 3, 6];\nlayer.camera.lookAt([0, 0, 0]);\n\n(async function () {\n  const texture = layer.createTexture('https://p2.ssl.qhimg.com/t01598a49e49aba1046.jpg');\n  const program = layer.createProgram({\n    ...shaders.NORMAL_TEXTURE,\n    uniforms: {\n      tMap: {value: texture},\n    },\n  });\n\n  const model = await layer.loadModel('https://s3.ssl.qhres.com/static/8613b585d1542274.json');\n\n  // For an accurate wireframe, triangle vertices need to be duplicated to make line pairs.\n  // Here we do so by generating indices. If your geometry is already indexed, this needs to be adjusted.\n  const index = new Uint16Array((model.position.length / 3 / 3) * 6);\n  for(let i = 0; i < model.position.length / 3; i += 3) {\n    // For every triangle, make three line pairs (start, end)\n    index.set([i, i + 1, i + 1, i + 2, i + 2, i], i * 2);\n  }\n  model.index = index;\n\n  // console.log(geometry);\n\n  const wireframeMesh = new Mesh3d(program, {\n    mode: 'LINES',\n  });\n  wireframeMesh.setGeometry(model);\n  layer.append(wireframeMesh);\n  wireframeMesh.animate([\n    {rotateY: 0},\n    {rotateY: 360},\n  ], {\n    duration: 5000,\n    iterations: Infinity,\n  });\n}());"}}]);