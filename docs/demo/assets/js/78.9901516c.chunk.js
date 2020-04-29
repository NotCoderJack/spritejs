(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{592:function(n,o,t){"use strict";t.r(o),o.default="const fragment = `\n  precision highp float;\n  precision highp int;\n\n  varying vec3 vNormal;\n  varying vec4 vColor;\n\n  uniform vec4 lighting;\n\n  void main() {\n    vec3 normal = normalize(vNormal);\n    float l = dot(normal, normalize(lighting.xyz));\n    gl_FragColor.rgb = vColor.rgb + l * lighting.w;\n    gl_FragColor.a = vColor.a;\n  }\n`;\nconst vertex = `\n  precision highp float;\n  precision highp int;\n\n  attribute vec3 position;\n  attribute vec3 normal;\n  attribute vec4 color;\n  attribute vec3 offset;\n  attribute vec2 random;\n\n  uniform mat4 modelViewMatrix;\n  uniform mat4 projectionMatrix;\n  uniform mat3 normalMatrix;\n\n  varying vec3 vNormal;\n  varying vec4 vColor;\n\n  void rotate2d(inout vec2 v, float a){\n    mat2 m = mat2(cos(a), -sin(a), sin(a),  cos(a));\n    v = m * v;\n  }\n\n  void main() {\n    vNormal = normalize(normalMatrix * normal);\n    vColor = color;\n    vec3 pos = position;\n    rotate2d(pos.xz, random.x * 6.28);\n    rotate2d(pos.xy, random.y * 6.28);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0) + vec4(offset, 1.0);\n  }    \n`;\n\nconst {Scene} = spritejs;\nconst {Cube} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35,\n    pos: [0, 0, 7],\n  },\n});\nlayer.camera.lookAt([0, -0.5, 0]);\n\nconst program = layer.createProgram({\n  vertex,\n  fragment,\n  cullFace: null,\n  uniforms: {\n    lighting: {value: [-0.3, 0.8, 0.6, 0.1]},\n  },\n}, {\n  attributes: {\n    offset(node, geometry) {\n      const data = new Float32Array(5 * 5 * 3);\n      for(let i = 0; i < 5; i++) {\n        const p = -5 + 2 * i;\n        for(let j = 0; j < 5; j++) {\n          const q = -5 + 2 * j;\n          data.set([p, q, 0], (i * 5 + j) * 3);\n        }\n      }\n      return {instanced: 1, size: 3, data};\n    },\n    random(node, geometry) {\n      const data = new Float32Array(5 * 5 * 2);\n      for(let i = 0; i < 25; i++) {\n        data.set([Math.random() * 2 - 1, Math.random() * 2 - 1], i * 2);\n      }\n      return {instanced: 1, size: 2, data};\n    },\n  },\n});\n\nconst cube = new Cube(program);\ncube.attributes.pos = [0, 0, 0];\ncube.attributes.colors = 'red red blue blue orange orange';\ncube.attributes.scale = 0.5;\nlayer.append(cube);\ncube.animate([\n  {rotateY: 0},\n  {rotateY: -360},\n], {\n  duration: 5000,\n  iterations: Infinity,\n});"}}]);