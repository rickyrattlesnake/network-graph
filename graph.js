/*
    REMEMBER ----
    CO-ORDINATE SYSTEM is 0,0 at top left and increasing x to right, increasing y down
*/

class Node {
    constructor(dimensions, centre, data) {
        this.dimensions = dimensions;
        this.centre = centre;
        this.data = data;
    }

    getUseRef() {
        return '#router';
    }

    getOriginCoordinate() {
        return this.getPositionCoordinate(POSITION.LEFT, POSITION.TOP);
    }

    getHeight() {
        return this.dimensions.height;
    }

    getWidth() {
        return this.dimensions.width;
    }

    getCentreCoordinate() {
        return this.centre;
    }

    getPositionCoordinate(xPosition, yPosition) {
        let x;
        let y;
        switch (xPosition) {
            case POSITION.LEFT:
                x = this.centre.x - this.getWidth() / 2;
                break;
            case POSITION.MIDDLE:
                x = this.centre.x;
                break;
            case POSITION.RIGHT:
                x = this.centre.x + this.getWidth() / 2;
                break;
            default:
                throw new Error('Not a valid POSITION');
        }

        switch (yPosition) {
            case POSITION.TOP:
                y = this.centre.y - this.getHeight() / 2;
                break;
            case POSITION.MIDDLE:
                y = this.centre.y;
                break;
            case POSITION.BOTTOM:
                y = this.centre.y + this.getHeight() / 2;
                break;
            default:
                throw new Error('Not a valid POSITION');
        }

        return new Coordinate(x, y);
    }
}

class Edge {
    constructor(source, destination) {
        this.source = source;
        this.destination = destination;
    }

    getOriginCoordinate() {
        let { xDirection, yDirection } = this.getEdgeDirection();
        if (xDirection === POSITION.LEFT) {
            return this.source.getPositionCoordinate(POSITION.LEFT, POSITION.MIDDLE);
        } else if (xDirection === POSITION.RIGHT) {
            return this.source.getPositionCoordinate(POSITION.RIGHT, POSITION.MIDDLE);
        } else {
            throw new Error('Unsupported Edge Direction.');
        }
    }

    getDestinationCoordinate() {
        let { xDirection, yDirection } = this.getEdgeDirection();
        if (xDirection === POSITION.LEFT) {
            return this.destination.getPositionCoordinate(POSITION.RIGHT, POSITION.MIDDLE);
        } else if (xDirection === POSITION.RIGHT) {
            return this.destination.getPositionCoordinate(POSITION.LEFT, POSITION.MIDDLE);
        } else {
            throw new Error('Unsupported Edge Direction.');
        }
    }

    getEdgeDirection() {
        return this.source.getCentreCoordinate()
            .getDirection(this.destination.getCentreCoordinate());
    }
}

class Dimensions {
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
}

class Coordinate {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /* from this coordinate to other coordinate */
    getDifference(other) {
        return {
            xDiff: other.x - this.x,
            yDiff: other.y - this.y,
        };
    }

    /* from this coordinate to other coordinate */
    getDirection(other) {
        let { xDiff, yDiff } = this.getDifference(other);
        let xDir;
        let yDir;
        if (xDiff > 0) {
            xDir = POSITION.RIGHT;
        } else if (xDiff < 0) {
            xDir = POSITION.LEFT;
        } else {
            xDir = POSITION.MIDDLE;
        }

        if (yDiff > 0) {
            yDir = POSITION.BOTTOM;
        } else if (yDiff < 0) {
            yDir = POSITION.TOP;
        } else {
            yDir = POSITION.MIDDLE;
        }

        return {
            xDirection: xDir,
            yDirection: yDir,
        }
    }
}

POSITION = {
    LEFT: 0,
    RIGHT: 1,
    TOP: 2,
    BOTTOM: 3,
    MIDDLE: 4,
}

class Graph {
    constructor(nodeData, edgeData) {
        this._nodeData = nodeData;
        this._edgeData = edgeData;

        this.nodes = [];
        this.edges = [];
        this._containerDimensions = new Dimensions(0,0);

        this._NODE_HEIGHT = 25;
        this._NODE_WIDTH = 25;
    }

    setContainerHeight(val) {
        this._containerDimensions.height = val;
    }

    setContainerWidth(val) {
        this._containerDimensions.width = val;
    }

    getContainerHeight() {
        return this._containerDimensions.height;
    }

    getContainerWidth() {
        return this._containerDimensions.width;
    }

    createNodes(yPosition, xSpacing) {
        for (let i = 0; i < this._nodeData.length; i++) {
            let centreCoord = new Coordinate(0, 0);
            let dimensions = new Dimensions(0, 0);
            let data = this._nodeData[i];

            centreCoord.y = yPosition;

            if (i === 0) {
                nodeXPos[i] = spacing;
            } else {
                nodeXPos[i] = spacing + i * (spacing + NODE_WIDTH);
            }

            this.nodes.push(new Node(dimensions, centreCoord, data));

            //Integrate positions with data
            nodeData[i].x = nodeXPos[i];
            nodeData[i].y = nodeYPos;
        }
    }

    createEdges() {

    }

    calculateLayout() {
        // Reposition the nodes
        let centreY = 1 / 2 * this.getContainerHeight();

        // Horizontally distribute nodes with equal spacing
        let numNodes = this._nodeData.length;
        let xSpacing = this.getContainerWidth() / (numNodes + 1);
    }

    renderNodes() {
        let nodes = svg.selectAll('node')
            .data(this.nodes)
            .enter()
            .append("use")
            .attr({
                'xlink:href': '#router',
                class: 'node',
                x: (node) => return node.x,
                y: (node) => return node.y,
                height: (node) => node.getHeight(),
                width: (node) => node.getWidth(),
                fill: 'green',
            });
    }

    renderEdges() {
        let links = svg.selectAll('edge')
            .data(this.edges)
            .enter()
            .append('line')
            .attr({
                class: 'edge',
                x1: (edge) => return edge.getOriginCoordinate().x,
                y1: (edge) => return edge.getOriginCoordinate().y,
                x2: (edge) => return edge.getDestinationCoordinate().x,
                y2: (edge) => return edge.getDestinationCoordinate().y,
            });

    }
}



let n1 = new Node(new Dimensions(10, 10), new Coordinate(10, 10), {});
let n2 = new Node(new Dimensions(5, 5), new Coordinate(20, 20), {});
let e1 = new Edge(n1, n2);
let e2 = new Edge(n2, n1);

console.dir(e2.getOriginCoordinate());
console.dir(e2.getDestinationCoordinate());


