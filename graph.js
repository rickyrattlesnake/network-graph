/* REMEMBER ----
    CO-ORDINATE SYSTEM is 0,0 at top left and increasing x to right, increasing y down
*/

class Node {
    constructor(dimensions, centre, data) {
        this.dimensions = dimensions;
        this.centre = centre;
        this.data = data;
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

        console.log(xDirection);
        console.log(yDirection);

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
        let diffs = this.getDifference(other);
        let xDir;
        let yDir;
        if (diffs.x > 0) {
            xDir = POSITION.RIGHT;
        } else if (diffs.x < 0) {
            xDir = POSITION.LEFT;
        } else {
            xDir = POSITION.MIDDLE;
        }

        if (diffs.y > 0) {
            yDir = POSITION.BOTTOM;
        } else if (diffs.y < 0) {
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
    constructor(nodes, edges) {
        this.nodes = nodes;
        this.edges = edges;
    }
}


