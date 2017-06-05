'use strict';

let CONTAINER_ID = 'container';
let VIEWBOX_WIDTH = 600;
let VIEWBOX_HEIGHT = 300;
let NODE_HEIGHT = 25;
let NODE_WIDTH = 25;


let nodeData = data.nodes;
let edgeData = data.edges;


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



