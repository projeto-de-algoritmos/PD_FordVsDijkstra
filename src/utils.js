class WeightedGraph {
	constructor() {
		this.adjList = new Map();
		this.size = 0;
	}
	
	addVertex(v, info = {}) {
		this.adjList.set(v, {...info, edges: []});
		this.size++;
	}
	
	getVertex(v) {
		return this.adjList.get(v);
	}

	getSize() {
		return this.adjList.size;
	}
}

class UndirectedGraph extends WeightedGraph {
	addEdge(v1, v2, weight) {
		this.adjList.get(v1).edges.push({edge: v2, weight: weight});
		this.adjList.get(v2).edges.push({edge: v1, weight: weight});
	}
}

class DirectedGraph extends WeightedGraph {	
	addEdge(v1, v2, weight) {
		this.adjList.get(v1).edges.push({edge: v2, weight: weight});
	}
}

function getDistance(pointA, pointB) {
	return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

var addNode = document.getElementById("addNode");
var nodeProperties = document.getElementById("nodeProperties");
var endNode = document.getElementById("endNode");
var startNode = document.getElementById("startNode");

function resetTools() {
	startNode.style.color = "#8d6262"
    startNode.style.color = "#8d6262"
    endNode.style.color = "#8d6262"
	nodeProperties.style.opacity = "1.0"
    nodeProperties.style.display = "none"
	activeTool = 0;
}

function setNode(){
    activeTool = 1;

    addNode.style.color = "#ed8d8d"
    startNode.style.color = "#8d6262"
    endNode.style.color = "#8d6262"

    nodeProperties.style.opacity = "1.0"
    nodeProperties.style.display = "block"
}

function setFinish(){
    endNode.style.color = "#ed8d8d"
    nodeProperties.style.opacity = "1.0"
    nodeProperties.style.display = "none"

    addNode.style.color = "#8d6262"    
    startNode.style.color = "#8d6262" 

    activeTool = 2;
}

function setStart(){
    
    startNode.style.color = "#ed8d8d"
    endNode.style.color = "#8d6262"
    addNode.style.color = "#8d6262"
    nodeProperties.style.opacity = "1.0"
    nodeProperties.style.display = "none"
    activeTool = 3;
}

function setElectrical() {
    var checkBox = document.getElementById("eletricalRoad");
	
    if (checkBox.checked == true){
        multiplier = -1;
    } else {
       multiplier = 1;
    }
}

function dijkstra(graph, start_node, last_node) {
	let priority_queue = new Heapify(graph.getSize());
	let distance = {};
	let previous = {};

	distance[start_node] = 0;
	priority_queue.push({index: start_node, node: graph.getVertex(start_node)}, 1);

	graph.adjList.forEach((node, index) => {
		if(index != start_node)
			distance[index] = Infinity;
		previous[index] = null;
	});

	while(priority_queue.size) {
		let current_node = priority_queue.pop();

		current_node.node.edges.forEach((edge) => {
			let cost = edge.weight + distance[current_node.index];

			if(cost < distance[edge.edge]) {
				distance[edge.edge] = cost;
				previous[edge.edge] = current_node.index;

				priority_queue.push({index: edge.edge, node: graph.getVertex(edge.edge)}, cost);
			}
		});
	}

	let best_path = [last_node];

	while(best_path[0] != start_node)
		best_path.unshift(previous[best_path[0]]);

	return best_path;
}