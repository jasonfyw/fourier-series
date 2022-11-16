from pprint import pprint
from typing import List
from math import inf


class Graph:
    def __init__(self, n, directed=True) -> None:
        self.n = n
        self.directed = directed
        self.adj_matrix = [[0 for _ in range(n)] for _ in range(n)]

    def add_edge(self, node1, node2, weight=1) -> None:
        self.adj_matrix[node1][node2] = weight
        if not self.directed: self.adj_matrix[node2][node1] = weight

    def __str__(self) -> str:
        return str(self.adj_matrix)

    def shortest_traversal(self, start_node) -> List[int]:
        # start at start_node
        # init set of univisited nodes (all nodes excluding start_node)
        # travel to closest node and record node
        # travel to next closest unvisited node
        # repeat until there are no more nodes to visit
        traversal = [start_node]
        unvisited = set(range(self.n)).difference({start_node})

        curr = start_node
        while unvisited:
            min_node = min_ = inf
            for i in range(self.n):
                if i in unvisited and self.adj_matrix[curr][i] < min_:
                    min_node = i
                    min_ = self.adj_matrix[curr][i]
            unvisited -= {min_node}
            traversal.append(min_node)
            curr = min_node

        return traversal


def create_graph_from_points(points) -> Graph:
    G = Graph(len(points), directed=False)
    for i in range(G.n):
        for j in range(G.n):
            x1, y1 = points[i]
            x2, y2 = points[j]
            dist = ((x2-x1) ** 2 + (y2-y1) ** 2) ** 0.5
            G.add_edge(i, j, dist)
    return G


def test_4_nodes() -> None:
    G = Graph(4, directed=False)
    G.add_edge(0, 1)
    G.add_edge(1, 2)
    G.add_edge(2, 3)
    G.add_edge(3, 0)

    G.add_edge(0, 2, 1.45)
    G.add_edge(1, 3, 1.4)

    print("4 nodes: ", G.shortest_traversal(0))


def test_5_nodes() -> None:
    G = Graph(5, directed=False)
    G.add_edge(0, 1)
    G.add_edge(1, 2)
    G.add_edge(2, 3)
    G.add_edge(3, 4)
    G.add_edge(4, 0)

    G.add_edge(0, 2, 1.4)
    G.add_edge(0, 3, 1.4)
    G.add_edge(1, 3, 1.4)
    G.add_edge(1, 4, 1.4)
    G.add_edge(2, 4, 1.4)

    print("5 nodes: ", G.shortest_traversal(0))

def test_4_points() -> None:
    p = [[0,0], [2,0], [0, 2], [2, 2]]
    G = create_graph_from_points(p)
    print("4 points: ", G.shortest_traversal(0))

def test_5_points() -> None:
    p = [[0,0], [2,0], [1.5, 3], [-1, 2], [3, 2]]
    G = create_graph_from_points(p)
    print("5 points: ", G.shortest_traversal(0))

if __name__ == "__main__":
    test_4_points()
    test_5_points()
    