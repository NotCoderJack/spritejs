(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{582:function(n,e,t){"use strict";t.r(e),e.default="const {Scene} = spritejs;\nconst {Cube, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 45,\n  },\n});\n\nlayer.camera.attributes.pos = [-2, 1, -3];\n\nconst gl = layer.gl;\n\nconst boxImages = [\n  'https://p1.ssl.qhimg.com/d/inn/b61950e9faba/posx.jpg',\n  'https://p5.ssl.qhimg.com/d/inn/b61950e9faba/negx.jpg',\n  'https://p1.ssl.qhimg.com/d/inn/b61950e9faba/posy.jpg',\n  'https://p4.ssl.qhimg.com/d/inn/b61950e9faba/negy.jpg',\n  'https://p0.ssl.qhimg.com/d/inn/b61950e9faba/posz.jpg',\n  'https://p1.ssl.qhimg.com/d/inn/b61950e9faba/negz.jpg',\n];\n\nconst texture = layer.createTexture({\n  target: gl.TEXTURE_CUBE_MAP,\n  image: boxImages,\n});\n\nconst program = layer.createProgram({\n  ...shaders.TEXTURE_CUBE,\n  texture,\n  cullFace: null,\n});\n\nconst cube = new Cube(program);\nlayer.append(cube);\n\nconst skybox = cube.cloneNode();\nskybox.attributes.scale = 20;\nlayer.append(skybox);\n\ncube.animate([\n  {rotateY: 0},\n  {rotateY: 360},\n], {\n  duration: 20000,\n  iterations: Infinity,\n});\n\nlayer.setOrbit();"}}]);