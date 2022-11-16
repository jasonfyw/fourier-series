import _ from "lodash"

export class Graph {
    private order: number = 0
    private directed: boolean = true
    private adjMatrix: Array<Array<number>> = []

    constructor(order: number, directed: boolean) {
        this.order = order
        this.directed = directed
        this.adjMatrix = new Array(order).fill(new Array(order).fill(0))
    }

    public getOrder(): number {
        return this.order
    }
    
    public addEdge(node1: number, node2: number, weight: number = 0): void {
        this.adjMatrix[node1][node2] = weight
        if (!this.directed) { this.adjMatrix[node2][node1] = weight }
    } 

    public shortestTraversal(start_node: number = 0): Array<number> {
        let traversal = [start_node]
        let unvisited = new Set(_.range(this.order).filter(n => n !== start_node))

        let curr = start_node
        while (unvisited.size > 0) {
            let min_node = Infinity
            let min = Infinity
            for (let i = 0; i < this.order; i++) {
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

export const createGraphFromPoints = (points: Array<[number, number]>): Graph => {
    let G = new Graph(points.length, false)

    for (let i of _.range(G.getOrder())) {
        for (let j of _.range(G.getOrder())) {
            const [x1, y1] = points[i]
            const [x2, y2] = points[j]
            const dist = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
            G.addEdge(i, j, dist)
        }
    }

    return G
}


