//https://www.youtube.com/watch?v=BxabnKrOjT0
//Prim's algorithm to soleve the Minimum Spanning Tree
//to solve question like getting telephone wires
//around with the shortest amount of cables possible
//
//(Telephones?? People use those anymore...)
//
var startingVertices = 20;
var vertices = [];
var newVertices = [];

 //debug
var count = startingVertices-1;

function setup() {
	canvas = createCanvas(800,500);
	canvas.parent('canv');

	for (var i = 0; i < startingVertices; i++) {
		var v = createVector(random(width), random(height));
		vertices.push(v);
	}
	count = startingVertices-1;
}

function mousePressed () {
	if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
		var v = createVector(mouseX, mouseY);
		vertices.push(v);
		edges = [];
		notEdges = [];
	}
}

function draw() {
	background(211);
	edgeDetector();
}

var edges = [];
var notEdges = [];

function edgeDetector () {
	var reached = [];
	var unreached = [];


	//-------------------------------------//
	unreached = vertices.concat([]);//At begin all unreached
	// for (var i = 0; i < vertices.length; i++) {
	// 	unreached.push(vertices[i])
	// }
	reached.push(unreached[0]);				//put one vetex in reached
	unreached.splice(0, 1);					//and remove it from unreached
 
	while(unreached.length > count){
	// while(unreached.length > 0){
		var Maxim = 100000			//staring max record to check dist
		var rIndex;
		var uIndex;
		for (var i = 0; i < reached.length; i++) {
			for (var j = 0; j < unreached.length; j++) {
				var v1 = reached[i];
				var v2 = unreached[j]
				var d = dist(v1.x, v1.y, v2.x, v2.y);

				if (d < Maxim){
					Maxim = d;
					rIndex = i;
					uIndex = j;
					//count1++;
				}
			}
		}
		stroke(255);
		strokeWeight(2);
		line(reached[rIndex].x, reached[rIndex].y,
			unreached[uIndex].x, unreached[uIndex].y);

		reached.push(unreached[uIndex]);
		unreached.splice(uIndex, 1);
		//---------------------------------------//noLoop()
		//Tthis is for checking edges!!!!!!!!!!!!!!!
		// inEdgesU = contains.call(edges, unreached[uIndex])

		//if we have to points they're both edges
		if(reached.length == 2 && edges.length == 0){
			edges.push(reached[0]);edges.push(reached[1]);
		}
		//if edge and an unreached
		else if(reached.length == (edges.length + notEdges.length + 1) &&(edges.indexOf(reached[rIndex])+1 > 0)
				&& (notEdges.indexOf(reached[rIndex]) == -1)){
			last = reached.length - 1;
			pos = edges.indexOf(reached[rIndex]);
			notEdges.push(reached[rIndex]);
			edges.splice(pos, 1);
			edges.push(reached[last]);
		}
		//notEdge and an unreached
		else if(reached.length == (edges.length + notEdges.length + 1)
				&& (notEdges.indexOf(reached[rIndex]) != -1)){
			last = reached.length - 1;
			edges.push(reached[last]);
			//console.log("pineapples")
		}
		for (var i = 0; i < edges.length; i++) {
			fill(20, 50, 250, 170); 
			noStroke();
			ellipse(edges[i].x, edges[i].y, 20, 20);
		}
		//_______________________________________//end of edge check
	}

	//This is to hightlight the differences btn reached and all vertices
	//______________________________________________//
	for (var i = 0; i < vertices.length; i++) {
		fill(255, 200); 
		stroke(255);
		strokeWeight(2);
		ellipse(vertices[i].x, vertices[i].y, 5, 5);
	}
	for (var i = 0; i < unreached.length; i++) {
		fill(255, 70, 130, 100); 
		stroke(0, 200, 180);
		strokeWeight(1);
		ellipse(unreached[i].x, unreached[i].y, 16, 16);
	}
	//----------------------------------------
	//This is to slow down the process so I can see what's happening
	frameRate(8);

	count -= 0.1;
	if (count <= 0){
		count = 0;
	}
	//----------------------------------------
}
