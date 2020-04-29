(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{606:function(e,n,s){"use strict";s.r(n),n.default="const {Scene} = spritejs;\nconst {Sphere, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 45,\n  },\n});\n\nlayer.camera.attributes.pos = [0, 0, 8];\nconst texture = layer.createTexture('https://p5.ssl.qhimg.com/t01e4a8428b9cc12bca.jpg');\n\nconst program = layer.createProgram({\n  ...shaders.GEOMETRY_WITH_TEXTURE,\n  texture,\n  // Need inside of sphere to be visible\n  cullFace: null,\n});\n\nconst sphere = new Sphere(program, {radius: 1, widthSegments: 64});\nlayer.append(sphere);\n\nconst skyBox = sphere.cloneNode();\nskyBox.attributes.scale = 10;\nlayer.append(skyBox);\n\nlayer.setOrbit();"}}]);