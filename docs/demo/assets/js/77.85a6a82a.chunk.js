(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{591:function(n,e,a){"use strict";a.r(e),e.default="const {Scene} = spritejs;\nconst {Sphere, Cube} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  displayRatio: 2,\n});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35,\n  },\n  ambientColor: 'white',\n});\n\nlayer.camera.attributes.pos = [1, 7, 0];\nlayer.camera.lookAt([0, 0, 0]);\n\nconst vertex = /* glsl */ `\n    precision highp float;\n    precision highp int;\n\n    attribute vec3 position;\n    attribute vec3 normal;\n\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat3 normalMatrix;\n\n    varying vec3 vNormal;\n    varying vec4 vMVPos;\n\n    void main() {\n        vNormal = normalize(normalMatrix * normal);\n        \n        vMVPos = modelViewMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * vMVPos;\n    }\n`;\n\nconst fragment = /* glsl */ `\n    precision highp float;\n    precision highp int;\n\n    varying vec3 vNormal;\n    varying vec4 vMVPos;\n\n    void main() {\n        vec3 normal = normalize(vNormal);\n        float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));\n        vec3 color = vec3(1.0, 0.5, 0.2) * (1.0 - 0.5 * lighting) + vMVPos.xzy * 0.1;\n        \n        float dist = length(vMVPos);\n        float fog = smoothstep(4.0, 10.0, dist);\n        color = mix(color, vec3(1.0), fog);\n        \n        gl_FragColor.rgb = color;\n        gl_FragColor.a = 1.0;\n    }\n`;\n\nconst program = layer.createProgram({\n  vertex,\n  fragment,\n});\n\nconst sphere = new Sphere(program, {\n  radius: 0.15,\n});\n\nconst cube = new Cube(program, {\n  width: 0.3,\n  height: 0.3,\n  depth: 0.3});\nconst shapes = [cube];\n\ncube.speed = -0.5;\nlayer.append(cube);\n\n// Create random array of shapes\nfor(let i = 0; i < 50; i++) {\n  const mesh = Math.random() > 0.5 ? cube : sphere;\n  const shape = mesh.cloneNode();\n  shape.attr({\n    scale: Math.random() * 0.3 + 0.7,\n    x: (Math.random() - 0.5) * 3,\n    y: (Math.random() - 0.5) * 3,\n    z: (Math.random() - 0.5) * 3,\n  });\n  shape.speed = (Math.random() - 0.5) * 0.7;\n\n  // Attach them to a random, previously created shape\n  const parent = shapes[Math.floor(Math.random() * shapes.length)];\n  parent.append(shape);\n  shapes.push(shape);\n}\n\nlayer.tick((t) => {\n  shapes.forEach((shape) => {\n    shape.attributes.rotateY += 2 * shape.speed;\n    shape.attributes.rotateX += 1.5 * shape.speed;\n    shape.attributes.rotateZ += shape.speed;\n  });\n});"}}]);