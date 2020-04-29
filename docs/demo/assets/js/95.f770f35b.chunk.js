(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{609:function(n,e,t){"use strict";t.r(e),e.default="const {Scene} = spritejs;\nconst {Plane, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35,\n  },\n});\n\nlayer.camera.attributes.pos = [2, 2, 3];\nlayer.camera.lookAt([0, 1.5, 0]);\n\nconst texture = layer.createText('\u4f60\u597d SpriteJS 3D', {\n  font: '48px Arial',\n  fillColor: 'red',\n});\n\nconst program = layer.createProgram({\n  ...shaders.NORMAL_TEXTURE,\n  texture,\n  cullFace: null,\n});\nconst label = new Plane(program, {\n  width: 1,\n  height: texture.image.height / texture.image.width,\n  colors: 'transparent',\n});\nlabel.animate([\n  {rotateY: 0},\n  {rotateY: 360},\n], {\n  duration: 20000,\n  iterations: Infinity,\n});\nlayer.append(label);\nlayer.setOrbit();"}}]);