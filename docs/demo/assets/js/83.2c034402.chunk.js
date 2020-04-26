(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{596:function(n,e,t){"use strict";t.r(e),e.default="const {Scene} = spritejs;\nconst {Mesh3d, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 45,\n    pos: [-2, 2, 2],\n  },\n  directionalLight: [0.5, 1.0, -0.3],\n  directionalLightColor: [1, 1, 1, 0.15],\n});\n\nconst texture = layer.createTexture('https://p1.ssl.qhimg.com/t01b4bd0e2fb9f47550.jpg');\nconst program = layer.createProgram({\n  ...shaders.NORMAL_TEXTURE,\n  texture,\n});\n\nconst model = layer.loadModel('https://s2.ssl.qhres.com/static/bf607b5f64a91492.json');\nconst macow = new Mesh3d(program, {model});\nlayer.append(macow);\nlayer.setOrbit({target: [0, 0.7, 0]});"}}]);