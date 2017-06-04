'use strict';

let CONTAINER_ID = 'container';
let CONTAINER_WIDTH = 1200;
let CONTAINER_HEIGHT = 800;

let nodeData = [
    {
        label: 'A',
        type: 'router',
        x: 200,
        y: 150,
    },
    {
        label: 'B',
        type: 'router',
        x: 300,
        y: 150,
    },
];
let edgeData = [
    {
        sourceNode: 'A',
        destNode: 'B',
        latency: '1000',
    },
];



let c10 = (i) => { return d3.schemeCategory10[i % 10]; };
let svg = d3.select('body')
    .append('svg')
    .attr('width', CONTAINER_WIDTH)
    .attr('height', CONTAINER_HEIGHT);

let links = svg.selectAll('link')
    .data(edgeData)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('x1', function(edge){
        let sourceNode = nodeData.filter((node) => {
            return node.label === edge.sourceNode;
        })[0];

        d3.select(this).attr('y1', sourceNode.y);
        return sourceNode.x;
    })
    .attr('x2', function(edge){
        let destNode = nodeData.filter((node) => {
            return node.label === edge.destNode;
        })[0];

        d3.select(this).attr('y2', destNode.y);
        return destNode.x - 30;
    });

let nodes = svg.selectAll('node')
    .data(nodeData)
    .enter()
    .append("use")
    .attr("xlink:href", function() { return "#router"; } )
    .attr('class', 'node')
    .attr('x', function (node){ return node.x - 25; })
    .attr('y', function (node){ return node.y - 10; })
    .attr('height', 20)
    .attr('width', 20)
    .attr('fill', function (d, i){ return c10(i); });

var edgelabels = svg.selectAll("text")
    .data(edgeData)
    .enter()
    .append('text')
    .text(function (edge){ return edge.latency; })
    .attr('x', 225)
    .attr('y', 160);



