var width=800,height=800;
var svg = d3.select("body")
	.append("svg")
    .attr("width", width)
    .attr("height", height);
	
var defs = svg.append("defs");
defs.append("linearGradient")
	.attr("id", "circle-white")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "0%").attr("y2", "100%")
	.selectAll("stop")
	.data([{offset:"0%",color:"#FFF"},{offset:"75%",color:"#F0F8FF"}])
	.enter().append("stop")
	.attr("offset", function(d){return d.offset;})
	.attr("style", function(d){return "stop-opacity:1;stop-color:"+d.color;});

defs.append("linearGradient")
	.attr("id", "circle-black")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "0%").attr("y2", "100%")
	.selectAll("stop")
	.data([{offset:"0%",color:"#DCDCDC"},{offset:"75%",color:"#000"}])
	.enter().append("stop")
	.attr("offset", function(d){return d.offset;})
	.attr("style", function(d){return "stop-opacity:1;stop-color:"+d.color;});

var space = 40;

var g = svg.append("g");
for(var i=0; i<=20; i++){
	g.append("line").attr("class", "line")
		.attr("x1", i*space).attr("y1", 0).attr("x2", i*space).attr("y2", height);
	
	g.append("line").attr("class", "line")
		.attr("x1", 0).attr("y1", i*space).attr("x2", width).attr("y2", i*space);
}

var coords = [];
var nodes = [];
for(var i=1; i<20;i++){
	for(var j=1; j<20; j++){
		var d = {x:i,y:j};
		nodes.push(d);
		coords[i]=coords[i]||[];
		coords[i][j]=d;
	}
}

svg.append("g").selectAll(".position")
	.data(nodes)
	.enter().append("circle")
	.attr("class", "position")
	.attr("cx", function(d){return d.x*space;})
	.attr("cy", function(d){return d.y*space;})
	.attr("r", 18)
	.on("click", choose);
	
var isWhiteTurn = true;

function choose(d){
	d.status = isWhiteTurn?"white":"black";
	tick();
	checkWin(d);
	isWhiteTurn = !isWhiteTurn;
}

function tick(){
	svg.selectAll(".position")
		.data(nodes).attr("class", function(d){return "position"+(d.status?" "+d.status:"");});
}

function checkWin(d){
	var line = checkHorizontal(d) || checkVertical(d) || checkLHT(d) || checkRHT(d);
	if(line){
		svg.append("line").attr("class", "win")
			.attr("x1", line.fx * space).attr("y1", line.fy * space)
			.attr("x2", line.tx * space).attr("y2", line.ty * space);
			
		svg.selectAll(".position").data(nodes).on("click", null);
		if("Winner is "+d.status+", 重新开始？"){
			window.location.reload();
		}
	}
}

function checkHorizontal(d){
	var lx = d.x-1;
	for( ; lx>d.x-5 && lx>0; lx--){
		if(coords[lx][d.y].status != d.status){
			break;
		}
	}
	var rx = d.x+1;
	for( ; rx<d.x+5 && rx<20; rx++){
		if(coords[rx][d.y].status != d.status){
			break;
		}
	}
	if(rx-lx>5){
		return {fx:lx+1,fy:d.y,tx:rx-1,ty:d.y};
	}
}

function checkVertical(d){
	var ty = d.y-1;
	for( ; ty>d.y-5 && ty>0; ty--){
		if(coords[d.x][ty].status != d.status){
			break;
		}
	}
	var by = d.y+1;
	for( ; by<d.y+5 && by<20; by++){
		if(coords[d.x][by].status != d.status){
			break;
		}
	}
	if(by-ty>5){
		return {fx:d.x,fy:ty+1,tx:d.x,ty:by-1};
	}
}

function checkLHT(d){
	var lx = d.x-1, ly = d.y-1;
	for(; lx>d.x-5 && lx>0 && ly>0; lx--,ly--){
		if(coords[lx][ly].status != d.status){
			break;
		}
	}
	var rx = d.x+1, ry = d.y+1;
	for(; rx<d.x+5 && rx<20 && ry<20; lx++,ly++){
		if(coords[rx][ry].status != d.status){
			break;
		}
	}
	if(rx-lx>5){
		return {fx:lx+1,fy:ly+1,tx:rx-1,ty:ry-1};
	}
}

function checkRHT(d){
	var lx = d.x-1, ly = d.y+1;
	for(; lx>d.x-5 && lx>0 && ly<20; lx--,ly++){
		if(coords[lx][ly].status != d.status){
			break;
		}
	}
	var rx = d.x+1, ry = d.y-1;
	for(; rx<d.x+5 && rx<20 && ry>0; rx++,ry--){
		if(coords[rx][ry].status != d.status){
			break;
		}
	}
	if(rx-lx>5){
		return {fx:lx+1,fy:ly-1,tx:rx-1,ty:ry+1};
	}
}