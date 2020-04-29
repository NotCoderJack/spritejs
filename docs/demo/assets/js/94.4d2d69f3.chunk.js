(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{608:function(n,e,s){"use strict";s.r(e),e.default="const fragment = `\nprecision highp float;\nprecision highp int;\n// Panteleymonov A K 2015\n\n//\n// procedural noise from https://www.shadertoy.com/view/4sfGzS\n// for first variant\n/*float hash( float n ) { return fract(sin(n)*753.5453123); }\nfloat noise( vec3 x )\n{\n    vec3 p = floor(x);\n    vec3 f = fract(x);\n    f = f*f*(3.0-2.0*f);\n  \n    float n = p.x + p.y*157.0 + 113.0*p.z;\n    return mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),\n                  mix( hash(n+157.0), hash(n+158.0),f.x),f.y),\n              mix(mix( hash(n+113.0), hash(n+114.0),f.x),\n                  mix( hash(n+270.0), hash(n+271.0),f.x),f.y),f.z);\n}*/\n\n// animated noise\nvec4 NC0=vec4(0.0,157.0,113.0,270.0);\nvec4 NC1=vec4(1.0,158.0,114.0,271.0);\n//vec4 WS=vec4(10.25,32.25,15.25,3.25);\nvec4 WS=vec4(0.25,0.25,0.25,0.25);\n\n// mix noise for alive animation, full source\nvec4 hash4( vec4 n ) { return fract(sin(n)*1399763.5453123); }\nvec3 hash3( vec3 n ) { return fract(sin(n)*1399763.5453123); }\nvec3 hpos( vec3 n ) { return hash3(vec3(dot(n,vec3(157.0,113.0,271.0)),dot(n,vec3(271.0,157.0,113.0)),dot(n,vec3(113.0,271.0,157.0)))); }\n\nfloat noise4q(vec4 x)\n{\n  vec4 n3 = vec4(0,0.25,0.5,0.75);\n  vec4 p2 = floor(x.wwww+n3);\n  vec4 b = floor(x.xxxx+n3) + floor(x.yyyy+n3)*157.0 + floor(x.zzzz +n3)*113.0;\n  vec4 p1 = b + fract(p2*0.00390625)*vec4(164352.0, -164352.0, 163840.0, -163840.0);\n  p2 = b + fract((p2+1.0)*0.00390625)*vec4(164352.0, -164352.0, 163840.0, -163840.0);\n  vec4 f1 = fract(x.xxxx+n3);\n  vec4 f2 = fract(x.yyyy+n3);\n  f1=f1*f1*(3.0-2.0*f1);\n  f2=f2*f2*(3.0-2.0*f2);\n  vec4 n1 = vec4(0,1.0,157.0,158.0);\n  vec4 n2 = vec4(113.0,114.0,270.0,271.0);\n  vec4 vs1 = mix(hash4(p1), hash4(n1.yyyy+p1), f1);\n  vec4 vs2 = mix(hash4(n1.zzzz+p1), hash4(n1.wwww+p1), f1);\n  vec4 vs3 = mix(hash4(p2), hash4(n1.yyyy+p2), f1);\n  vec4 vs4 = mix(hash4(n1.zzzz+p2), hash4(n1.wwww+p2), f1);\n  vs1 = mix(vs1, vs2, f2);\n  vs3 = mix(vs3, vs4, f2);\n  vs2 = mix(hash4(n2.xxxx+p1), hash4(n2.yyyy+p1), f1);\n  vs4 = mix(hash4(n2.zzzz+p1), hash4(n2.wwww+p1), f1);\n  vs2 = mix(vs2, vs4, f2);\n  vs4 = mix(hash4(n2.xxxx+p2), hash4(n2.yyyy+p2), f1);\n  vec4 vs5 = mix(hash4(n2.zzzz+p2), hash4(n2.wwww+p2), f1);\n  vs4 = mix(vs4, vs5, f2);\n  f1 = fract(x.zzzz+n3);\n  f2 = fract(x.wwww+n3);\n  f1=f1*f1*(3.0-2.0*f1);\n  f2=f2*f2*(3.0-2.0*f2);\n  vs1 = mix(vs1, vs2, f1);\n  vs3 = mix(vs3, vs4, f1);\n  vs1 = mix(vs1, vs3, f2);\n  float r=dot(vs1,vec4(0.25));\n  //r=r*r*(3.0-2.0*r);\n  return r*r*(3.0-2.0*r);\n}\n\n// body of a star\nfloat noiseSpere(vec3 ray,vec3 pos,float r,mat3 mr,float zoom,vec3 subnoise,float anim)\n{\n    float b = dot(ray,pos);\n    float c = dot(pos,pos) - b*b;\n    \n    vec3 r1=vec3(0.0);\n    \n    float s=0.0;\n    float d=0.03125;\n    float d2=zoom/(d*d); \n    float ar=5.0;\n  \n    for (int i=0;i<3;i++) {\n    float rq=r*r;\n        if(c <rq)\n        {\n            float l1=sqrt(rq-c);\n            r1= ray*(b-l1)-pos;\n            r1=r1*mr;\n            s+=abs(noise4q(vec4(r1*d2+subnoise*ar,anim*ar))*d);\n        }\n        ar-=2.0;\n        d*=4.0;\n        d2*=0.0625;\n        r=r-r*0.02;\n    }\n    return s;\n}\n\n// glow ring\nfloat ring(vec3 ray,vec3 pos,float r,float size)\n{\n    float b = dot(ray,pos);\n    float c = dot(pos,pos) - b*b;\n  \n    float s=max(0.0,(1.0-size*abs(r-sqrt(c))));\n    \n    return s;\n}\n\n// rays of a star\nfloat ringRayNoise(vec3 ray,vec3 pos,float r,float size,mat3 mr,float anim)\n{\n    float b = dot(ray,pos);\n    vec3 pr=ray*b-pos;\n      \n    float c=length(pr);\n\n    pr*=mr;\n    \n    pr=normalize(pr);\n    \n    float s=max(0.0,(1.0-size*abs(r-c)));\n    \n    float nd=noise4q(vec4(pr*1.0,-anim+c))*2.0;\n    nd=pow(nd,2.0);\n    float n=0.4;\n    float ns=1.0;\n    if (c>r) {\n        n=noise4q(vec4(pr*10.0,-anim+c));\n        ns=noise4q(vec4(pr*50.0,-anim*2.5+c*2.0))*2.0;\n    }\n    n=n*n*nd*ns;\n    \n    return pow(s,4.0)+s*s*n;\n}\n\nvec4 noiseSpace(vec3 ray,vec3 pos,float r,mat3 mr,float zoom,vec3 subnoise,float anim)\n{\n    float b = dot(ray,pos);\n    float c = dot(pos,pos) - b*b;\n    \n    vec3 r1=vec3(0.0);\n    \n    float s=0.0;\n    float d=0.0625*1.5;\n    float d2=zoom/d;\n\n  float rq=r*r;\n    float l1=sqrt(abs(rq-c));\n    r1= (ray*(b-l1)-pos)*mr;\n\n    r1*=d2;\n    s+=abs(noise4q(vec4(r1+subnoise,anim))*d);\n    s+=abs(noise4q(vec4(r1*0.5+subnoise,anim))*d*2.0);\n    s+=abs(noise4q(vec4(r1*0.25+subnoise,anim))*d*4.0);\n    //return s;\n    return vec4(s*2.0,abs(noise4q(vec4(r1*0.1+subnoise,anim))),abs(noise4q(vec4(r1*0.1+subnoise*6.0,anim))),abs(noise4q(vec4(r1*0.1+subnoise*13.0,anim))));\n}\n\nfloat sphereZero(vec3 ray,vec3 pos,float r)\n{\n    float b = dot(ray,pos);\n    float c = dot(pos,pos) - b*b;\n    float s=1.0;\n    if (c<r*r) s=0.0;\n    return s;\n}\n\nuniform vec2 uResolution;\nuniform float uTime;\n\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\n{\n    vec2 p = (-uResolution.xy + 2.0*fragCoord.xy) / uResolution.y;\n    p *= 2.0;\n    float time=uTime*1.0;\n    \n    float mx = time*0.025;\n    float my = -0.6;\n    vec2 rotate = vec2(mx,my);\n\n    vec2 sins=sin(rotate);\n    vec2 coss=cos(rotate);\n    mat3 mr=mat3(vec3(coss.x,0.0,sins.x),vec3(0.0,1.0,0.0),vec3(-sins.x,0.0,coss.x));\n    mr=mat3(vec3(1.0,0.0,0.0),vec3(0.0,coss.y,sins.y),vec3(0.0,-sins.y,coss.y))*mr;    \n\n    mat3 imr=mat3(vec3(coss.x,0.0,-sins.x),vec3(0.0,1.0,0.0),vec3(sins.x,0.0,coss.x));\n    imr=imr*mat3(vec3(1.0,0.0,0.0),vec3(0.0,coss.y,-sins.y),vec3(0.0,sins.y,coss.y));\n  \n    vec3 ray = normalize(vec3(p,2.0));\n    vec3 pos = vec3(0.0,0.0,3.0);\n    \n    float s1=noiseSpere(ray,pos,1.0,mr,0.5,vec3(0.0),time);\n    s1=pow(min(1.0,s1*2.4),2.0);\n    float s2=noiseSpere(ray,pos,1.0,mr,4.0,vec3(83.23,34.34,67.453),time);\n    s2=min(1.0,s2*2.2);\n    fragColor = vec4( mix(vec3(1.0,1.0,0.0),vec3(1.0),pow(s1,60.0))*s1, 1.0 );\n    fragColor += vec4( mix(mix(vec3(1.0,0.0,0.0),vec3(1.0,0.0,1.0),pow(s2,2.0)),vec3(1.0),pow(s2,10.0))*s2, 1.0 );\n  \n    fragColor.xyz -= vec3(ring(ray,pos,1.03,11.0))*2.0;\n    fragColor = max( vec4(0.0), fragColor );\n    \n    float s3=ringRayNoise(ray,pos,0.96,1.0,mr,time);\n    fragColor.xyz += mix(vec3(1.0,0.6,0.1),vec3(1.0,0.95,1.0),pow(s3,3.0))*s3;\n\n    float zero=sphereZero(ray,pos,0.9);\n    if (zero>0.0) {\n      //float s4=noiseSpace(ray,pos,100.0,mr,0.5,vec3(0.0),time*0.01);\n      vec4 s4=noiseSpace(ray,pos,100.0,mr,0.05,vec3(1.0,2.0,4.0),0.0);\n      //float s5=noiseSpace(ray,pos,100.0,vec3(mx,my,0.5),vec3(83.23,34.34,67.453),time*0.01);\n      //s4=pow(s4*2.0,6.0);\n      //s4=pow(s4*1.8,5.7);\n      s4.x=pow(s4.x,3.0);\n      //s5=pow(s5*2.0,6.0);\n      //fragColor.xyz += (vec3(0.0,0.0,1.0)*s4*0.6+vec3(0.9,0.0,1.0)*s5*0.3)*sphereZero(ray,pos,0.9);\n      fragColor.xyz += mix(mix(vec3(1.0,0.0,0.0),vec3(0.0,0.0,1.0),s4.y*1.9),vec3(0.9,1.0,0.1),s4.w*0.75)*s4.x*pow(s4.z*2.5,3.0)*0.2*zero;\n      //fragColor.xyz += (mix(mix(vec3(1.0,0.0,0.0),vec3(0.0,0.0,1.0),s4*3.0),vec3(1.0),pow(s4*2.0,4.0))*s4*0.6)*sphereZero(ray,pos,0.9);\n        \n        \n    /*float b = dot(ray,pos);\n      float c = dot(pos,pos) - b*b;\n      float l1 = sqrt(abs(10.0-c));\n      vec3 spos = (ray*(b-l1))*mr;\n        vec3 sposr=ceil(spos)+spos/abs(spos)*0.5;\n        //sposr+=hpos(sposr)*0.2;\n        \n        float ss3=max(0.0,ringRayNoise(ray,(sposr)*imr,0.001,10.0,mr,time));\n        fragColor.xyz += vec3(ss3);*/\n    }\n    \n    //fragColor = max( vec4(0.0), fragColor );\n    //s+=noiseSpere(ray,vec3(0.0,0.0,3.0),0.96,vec2(mx+1.4,my),vec3(83.23,34.34,67.453));\n    //s+=noiseSpere(ray,vec3(0.0,0.0,3.0),0.90,vec2(mx,my),vec3(123.223311,956.34,7.45333))*0.6;\n    \n    fragColor = max( vec4(0.0), fragColor );\n  fragColor = min( vec4(1.0), fragColor );\n}\n\nvoid main() {\n  vec4 color;\n  vec2 coord = gl_FragCoord.xy;\n  vec2 st = coord / uResolution;\n  mainImage(color, coord);\n  gl_FragColor.rgb = color.rgb;\n  float d = distance(st, vec2(0.5));\n  gl_FragColor.a = 1.0 - 0.5 * smoothstep(0.16, 0.2, d) - 0.5 * smoothstep(0.3, 0.4, d);\n}\n\n`;\n\nconst {Scene} = spritejs;\nconst {Sphere, Plane, Group3d, shaders} = spritejs.ext3d;\nconst container = document.getElementById('container');\nconst scene = new Scene({\n  container,\n  // width: 600,\n  // height: 600,\n  displayRatio: 2,\n  // mode: 'stickyHeight',\n  // webgl: 1,\n});\nconst layer = scene.layer3d('fglayer', {\n  alpha: false,\n  // directionalLight: [[1, 0, 0]],\n  // directionalLightColor: [[1, 0, 0, 0.5]],\n  pointLightColor: ['white'],\n  pointLightPosition: [[0, 0, 0]],\n  // pointLightDecay: 0.01,\n  camera: {\n    fov: 35,\n  },\n});\n\nlayer.camera.attributes.pos = [0, 0, 50];\nlayer.camera.lookAt([0, 0, 0]);\n\nconst texture = layer.createTexture({\n  image: 'https://p0.ssl.qhimg.com/t0106ce4840322970d8.jpg',\n  wrapS: layer.gl.REPEAT,\n});\n\nconst sunProgram = layer.createProgram({\n  transparent: true,\n  vertex: shaders.TEXTURE.vertex,\n  fragment,\n  cullFace: null,\n  texture,\n  uniforms: {\n    specularIntensity: {value: 0.5},\n    uTime: {value: 0},\n  },\n});\n\nconst program = layer.createProgram({\n  ...shaders.TEXTURE,\n  cullFace: null,\n  texture,\n  uniforms: {\n    specularIntensity: {value: 0.5},\n    uTime: {value: 0},\n  },\n});\n\nconst sun = new Plane(sunProgram);\nsun.attr({\n  width: 100,\n  height: 100,\n});\nlayer.append(sun);\nlayer.bindTime(sunProgram);\n\nconst g = new Group3d({\n  pos: [0, 0, 0],\n  rotateZ: -30,\n});\nlayer.append(g);\n\nconst planet = new Sphere(program);\nplanet.attr({\n  // phiLength: Math.PI,\n  widthSegments: 120,\n  heightSegments: 60,\n});\n\ng.append(planet);\n\nconst r = 12.5;\n\nlayer.tick((t) => {\n  g.attributes.x = r * Math.cos(0.0005 * t);\n  g.attributes.z = r * Math.sin(0.0005 * t);\n  planet.attributes.rotateY += 5;\n});"}}]);