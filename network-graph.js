'use strict';

let CONTAINER_ID = 'container';
let VIEWBOX_WIDTH = 600;
let VIEWBOX_HEIGHT = 300;
let NODE_HEIGHT = 25;
let NODE_WIDTH = 25;


let nodeData = data.nodes;
let edgeData = data.edges;
let jumpData = data.jumps;

function redraw(containerHeight, containerWidth){

}

// breakpoints = {
//     x-small: () =>{},
//     small: () => {},
//     medium: () => {},
//     large: () => {},
// };



// Vertically centre the nodes
let nodeYPos = 1/2 * (VIEWBOX_HEIGHT - NODE_HEIGHT);
// Horizontally distribute nodes with equal spacing
let numNodes = nodeData.length;
let spacing = (VIEWBOX_WIDTH - (numNodes * NODE_WIDTH)) / (numNodes + 1);
let nodeXPos = [];
for (let i = 0; i < nodeData.length; i++) {
    if (i === 0) {
        nodeXPos[i] = spacing;
    } else {
        nodeXPos[i] = spacing + i * (spacing + NODE_WIDTH);
    }

    //Integrate positions with data
    nodeData[i].x = nodeXPos[i];
    nodeData[i].y = nodeYPos;
}

//
for (let i = 0; i < edgeData.length; i++){
    let edge = edgeData[i];
    let source = nodeData.filter((node) => {
        return node.id === edge.source;
    })[0];
    let dest = nodeData.filter((node) => {
        return node.id === edge.dest;
    })[0];

    // Position it halfwaydown on right edge
    edge.x1 = source.x + NODE_WIDTH;
    edge.y1 = source.y + NODE_HEIGHT / 2;
    // Halfway down left edge
    edge.x2 = dest.x;
    edge.y2 = dest.y + NODE_HEIGHT / 2;
}

for (let i = 0; i < jumpData.length; i++){
    let jump = jumpData[i];
    let source = nodeData.filter((node) => {
        return node.id === jump.source;
    })[0];
    let dest = nodeData.filter((node) => {
        return node.id === jump.dest;
    })[0];

    // middle of top edge
    jump.points = [];
    jump.points.push({
        x: source.x + NODE_WIDTH / 2,
        y: source.y,
    }, {
        x: source.x + (dest.x - source.x) / 2 ,
        y: source.y - 100,
    }, {
        x: dest.x + NODE_WIDTH / 2,
        y: dest.y,
    });
}


let c10 = (i) => { return d3.schemeCategory10[i % 10]; };
let svg = d3.select('body')
    .append('svg')
    .attr('viewBox', '0 0 600 300')
    .attr('preserveAspectRatio', 'xMidYMid meet');

let links = svg.selectAll('link')
    .data(edgeData)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('x1', function(edge) { return edge.x1; })
    .attr('y1', function(edge) { return edge.y1; })
    .attr('x2', function(edge) { return edge.x2; })
    .attr('y2', function(edge) { return edge.y2; });


let nodes = svg.selectAll('node')
    .data(nodeData)
    .enter()
    .append("use")
    .attr("xlink:href", function() { return "#router"; } )
    .attr('class', 'node')
    .attr('x', function (node){ return node.x; })
    .attr('y', function (node){ return node.y; })
    .attr('height', NODE_HEIGHT)
    .attr('width', NODE_WIDTH)
    .attr('fill', function (d, i){ return c10(i); });

var edgelabels = svg.selectAll("text")
    .data(edgeData)
    .enter()
    .append('text')
    .text(function (edge){ return edge.latency; })
    .attr('x', 225)
    .attr('y', 160);


let lineGen = d3.line()
    .curve(d3.curveNatural)
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

let linePath = svg.append('path')
    .attr('class', 'jump')
    .attr('d', lineGen(jumpData[0].points));


svg.on('SVGResize', (evt) => {
    console.log('svg.SVGResize Event Fired :: ');
    console.dir(evt);
});

svg.on('resize',(evt) => {
    console.log('svg.resize Event Fired :: ');
    console.dir(evt);
});

window.addEventListener('resize', debounce((evt) => {
    console.log('windows.resize Event Fired :: ');
    console.dir(svg.node().getBoundingRectangle());
}, 250));
