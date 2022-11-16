import _ from "lodash"

export class Graph {
    private order: number = 0
    private directed: boolean = true
    private adjMatrix: Array<Array<number>> = []

    constructor(order: number, directed: boolean) {
        this.order = order
        this.directed = directed
        this.adjMatrix = Array.from({ length: order }, () => new Array(order).fill(0))
    }

    /**
     * Returns the order of the graph (number of vertices)
     * @returns graph order 
     */
    public getOrder(): number {
        return this.order
    }
    
    /**
     * Add an edge between node1 and node2 with optional weight
     * @param node1 index of node1
     * @param node2 index of node2
     * @param weight (optional, default 1) weight of the edge 
     */
    public addEdge(node1: number, node2: number, weight: number = 1): void {
        this.adjMatrix[node1][node2] = weight
        if (!this.directed) { this.adjMatrix[node2][node1] = weight }
    } 

    /**
     * Returns a list of a traversal going from start_node to every other node
     * by taking the shortest distance between each node
     * @param start_node index of starting node
     * @returns array of indices of nodes
     */
    public shortestTraversal(start_node: number = 0): Array<number> {
        let traversal = [start_node]
        let unvisited = new Set(_.range(this.order).filter(n => n !== start_node))

        let curr = start_node
        while (unvisited.size > 0) {
            let min_node = Infinity
            let min = Infinity
            for (let i of _.range(this.order)) {
                if (unvisited.has(i) && this.adjMatrix[curr][i] < min) {
                    min_node = i
                    min = this.adjMatrix[curr][i]
                }
            }
            unvisited.delete(min_node)
            traversal.push(min_node)
            curr = min_node
        }

        return traversal
    }
}

/**
 * Creates a weighted undirected graph based on an array of coordinate points
 * @param points array of [x, y] points
 * @returns graph
 */
export const createGraphFromPoints = (points: Array<[number, number]>): Graph => {
    let G = new Graph(points.length, false)

    for (let i of _.range(G.getOrder())) {
        for (let j of _.range(i, G.getOrder())) {
            const [x1, y1] = points[i]
            const [x2, y2] = points[j]
            const dist = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
            G.addEdge(i, j, dist)
        }
    }

    return G
}


