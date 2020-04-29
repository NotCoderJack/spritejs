(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{636:function(n,e,t){"use strict";t.r(e),e.default="/* globals d3 */\nconst {Scene} = spritejs;\nconst container = document.getElementById('stage');\nconst scene = new Scene({\n  container,\n  width: 1200,\n  height: 900,\n  mode: 'stickyWidth',\n});\n\nconst layer = scene.layer('fglayer', {\n  handleEvent: false,\n  autoRender: false,\n});\n\ndocument.querySelector('#stage canvas').style.backgroundColor = '#313131';\n\nconst simulation = d3.forceSimulation()\n  .force('link', d3.forceLink().id(d => d.id))\n  .force('charge', d3.forceManyBody())\n  .force('center', d3.forceCenter(400, 300));\n\nd3.json('https://s0.ssl.qhres.com/static/f74a79ccf53d8147.json', (error, graph) => {\n  if(error) throw error;\n\n  simulation\n    .nodes(graph.nodes)\n    .on('tick', ticked);\n\n  simulation.force('link')\n    .links(graph.links);\n\n  d3.select(layer.canvas)\n    .call(d3.drag()\n      .container(layer.canvas)\n      .subject(dragsubject)\n      .on('start', dragstarted)\n      .on('drag', dragged)\n      .on('end', dragended));\n\n  // draw lines\n  d3.select(layer).selectAll('path')\n    .data(graph.links)\n    .enter()\n    .append('path')\n    .attr('d', (d) => {\n      const [sx, sy] = [d.source.x, d.source.y];\n      const [tx, ty] = [d.target.x, d.target.y];\n      return `M${sx} ${sy} L ${tx} ${ty}`;\n    })\n    .attr('name', (d, index) => {\n      return `path${index}`;\n    })\n    .attr('strokeColor', 'white');\n\n  // draw spots\n  // ! due to d3 rules, you have to set attributes seperatly\n  d3.select(layer).selectAll('sprite')\n    .data(graph.nodes)\n    .enter()\n    .append('sprite')\n    .attr('pos', (d) => {\n      return [d.x, d.y];\n    })\n    .attr('size', [10, 10])\n    .attr('border', [1, 'white'])\n    .attr('borderRadius', 5)\n    .attr('anchor', 0.5);\n\n  function ticked() {\n    d3.select(layer).selectAll('path')\n      .attr('d', (d) => {\n        const [sx, sy] = [d.source.x, d.source.y];\n        const [tx, ty] = [d.target.x, d.target.y];\n        return `M${sx} ${sy} L ${tx} ${ty}`;\n      })\n      .attr('strokeColor', 'white')\n      .attr('lineWidth', 1);\n    d3.select(layer).selectAll('sprite')\n      .attr('pos', (d) => {\n        return [d.x, d.y];\n      });\n    layer.render();\n  }\n\n  function dragsubject() {\n    const [x, y] = layer.toLocalPos(d3.event.x, d3.event.y);\n    return simulation.find(x, y);\n  }\n});\n\nfunction dragstarted() {\n  if(!d3.event.active) simulation.alphaTarget(0.3).restart();\n\n  const [x, y] = [d3.event.subject.x, d3.event.subject.y];\n  d3.event.subject.fx0 = x;\n  d3.event.subject.fy0 = y;\n  d3.event.subject.fx = x;\n  d3.event.subject.fy = y;\n\n  const [x0, y0] = layer.toLocalPos(d3.event.x, d3.event.y);\n  d3.event.subject.x0 = x0;\n  d3.event.subject.y0 = y0;\n}\n\nfunction dragged() {\n  const [x, y] = layer.toLocalPos(d3.event.x, d3.event.y),\n    {x0, y0, fx0, fy0} = d3.event.subject;\n  const [dx, dy] = [x - x0, y - y0];\n\n  d3.event.subject.fx = fx0 + dx;\n  d3.event.subject.fy = fy0 + dy;\n}\n\nfunction dragended() {\n  if(!d3.event.active) simulation.alphaTarget(0);\n  d3.event.subject.fx = null;\n  d3.event.subject.fy = null;\n}"}}]);