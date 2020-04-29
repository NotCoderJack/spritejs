(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{583:function(e,n,t){"use strict";t.r(n),n.default="const {Scene} = spritejs;\nconst {Mesh3d, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35,\n  },\n  directionalLight: [0.5, 1.0, -0.3],\n  directionalLightColor: [1, 1, 1, 0.15],\n});\n\nlayer.camera.attributes.pos = [8, 5, 15];\nlayer.camera.lookAt([0, 1.5, 0]);\n\nconst texture = layer.createTexture('https://p3.ssl.qhimg.com/t01d6c6c93fdddf1e42.jpg');\nconst program = layer.createProgram({\n  ...shaders.NORMAL_TEXTURE,\n  texture,\n});\n\nconst model = layer.loadModel('https://s5.ssl.qhres.com/static/1eb3e9b91a296abd.json');\nconst fox = new Mesh3d(program, {model});\nlayer.append(fox);\nlayer.setOrbit();"}}]);