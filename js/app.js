var width=960,height=860;
var svg = d3.select("body")
	.append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("defs").selectAll("marker")
	.data(["rel", "kill", "takepower", "transmit"])
	.enter().append("marker")
	.attr("id", function(d) { return "marker-"+d; })
	.attr("class", function(d){return d;})
	.attr("viewBox", "0 -5 10 10")
	.attr("refX", 30)
	.attr("refY", 0)
	.attr("markerWidth", 10)
	.attr("markerHeight", 10)
	.attr("orient", "auto")
	.append("path")
	.attr("d", "M0,-5 L10,0 L0,5");
	
var nodes = [
	{name:"司马防",role:"background",desc:"生了八个儿子，各各有才华...",fx:500,fy:35},//0
		{name:"司马懿",role:"background",desc:"惹不起你们，也要耗死你们...",fx:350,fy:120},//1
			{name:"司马昭",role:"background",desc:"路人皆知我心也...",fx:480,fy:240},//2
				{name:"司马炎",role:"background",desc:"后宫佳丽上万，今晚睡哪个羊说了算...",fx:450,fy:360},//3
					{name:"司马衷",desc:"没饭吃，咋不吃肉呢？百姓真蠢...",role:"king",fx:370,fy:650},//4
						{name:"司马遹",desc:"太子：贼妇害我...",fx:370,fy:800},//5
						{name:"贾南风",desc:"皇后：我很丑，但是我心地狠毒...",fx:220,fy:650},//6
					{name:"司马玮",desc:"楚王：杀贼之功竟被司马亮所窃...",role:"wang",fx:50,fy:650},//7
					{name:"司马乂",desc:"长沙王：大意了，被阴险小人所害...",role:"wang",fx:750,fy:650},//8
					{name:"司马颖",desc:"成都王：本想挟惠帝以令诸王，却被司马顒捡了便宜...",role:"wang",fx:900,fy:650},//9
					{name:"司马炽",desc:"躺着得来一个皇位...",fx:520,fy:650},//10
				{name:"杨  芷",desc:"我饿...我冷...",fx:320,fy:360},//11
				{name:"杨  骏",desc:"改你诏书，夺你大权...",fx:320,fy:240},//12
				{name:"司马攸",desc:"明德清畅，忠允笃诚...",role:"background",fx:600,fy:360},//13
					{name:"司马冏",desc:"齐王：杀了伪帝司马伦，迎惠帝复位...",role:"wang",fx:600,fy:650},//14
			{name:"司马亮",desc:"汝南王：武帝欲托孤于我，却被奸人杨骏所阻...",role:"wang",fx:160,fy:240},//15
			{name:"司马伦",desc:"赵王伦：今日吾也来当一回皇上...",role:"wang",fx:50,fy:240},//16
		{name:"司马孚",desc:"仲达是我二哥也...",role:"background",fx:560,fy:120},//17
			{name:"司马瑰",desc:"做人要低调...",role:"background",fx:650,fy:240},//18
				{name:"司马颙",desc:"河间王：司马越这小子竟敢阴我...",role:"wang",fx:750,fy:360},//19
		{name:"司马馗",desc:"仲达是我二哥也...",role:"background",fx:750,fy:120},//20
			{name:"司马泰",desc:"做人要低调...",role:"background",fx:830,fy:240},//21
				{name:"司马越",desc:"东海王：哈哈哈哈，看谁笑到最后...",role:"wang",fx:900,fy:360}//22
];

var links = [
	{source:0,target:1,desc:"次子",type:"rel",stage:"background"},
	{source:1,target:2,desc:"次子",type:"rel",stage:"background"},
	{source:2,target:3,desc:"长子",type:"rel",stage:"background"},
	{source:2,target:13,desc:"次子",type:"rel",stage:"background"},
	{source:3,target:4,desc:"次子",type:"rel",stage:"background"},
	{source:4,target:5,desc:"太子",type:"rel",stage:"background"},
	{source:4,target:6,desc:"皇后",type:"rel",stage:"background"},
	{source:3,target:7,desc:"五子",type:"rel",stage:"background"},
	{source:3,target:8,desc:"六子",type:"rel",stage:"background"},
	{source:3,target:9,desc:"十六子",type:"rel",stage:"background"},
	{source:3,target:10,desc:"二十五子",type:"rel",stage:"background"},
	{source:3,target:11,desc:"皇后",type:"rel",stage:"background"},
	{source:1,target:15,desc:"四子",type:"rel",stage:"background"},
	{source:1,target:16,desc:"九子",type:"rel",stage:"background"},
	{source:12,target:11,desc:"女",type:"rel",stage:"background"},
	{source:13,target:14,desc:"子",type:"rel",stage:"background"},
	{source:0,target:17,desc:"三子",type:"rel",stage:"background"},
	{source:17,target:18,desc:"子",type:"rel",stage:"background"},
	{source:18,target:19,desc:"子",type:"rel",stage:"background"},
	{source:0,target:20,desc:"四子",type:"rel",stage:"background"},
	{source:20,target:21,desc:"子",type:"rel",stage:"background"},
	{source:21,target:22,desc:"子",type:"rel",stage:"background"},
	{source:7,target:11,desc:"杀",type:"kill",stage:"first"},
	{source:7,target:12,desc:"杀",type:"kill",stage:"first"},
	{source:12,target:15,desc:"权",type:"takepower",stage:"first"},
	{source:7,target:15,desc:"杀",type:"kill",stage:"second"},
	{source:15,target:7,desc:"权",type:"takepower",stage:"second"},
	{source:6,target:7,desc:"杀",type:"kill",stage:"third"},
	{source:7,target:6,desc:"权",type:"takepower",stage:"third"},
	{source:6,target:5,desc:"杀",type:"kill",stage:"fourth"},
	{source:16,target:6,desc:"杀",type:"kill",stage:"fourth"},
	{source:6,target:16,desc:"权",type:"takepower",stage:"fourth"},
	{source:14,target:16,desc:"杀",type:"kill",stage:"fifth"},
	{source:16,target:14,desc:"权",type:"takepower",stage:"fifth"},
	{source:8,target:14,desc:"杀",type:"kill",stage:"sixth"},
	{source:14,target:8,desc:"权",type:"takepower",stage:"sixth"},
	{source:22,target:8,desc:"杀",type:"kill",stage:"seventh"},
	{source:8,target:9,desc:"权",type:"takepower",stage:"seventh"},
	{source:9,target:19,desc:"权",type:"takepower",stage:"eighth"},
	{source:22,target:9,desc:"杀",type:"kill",stage:"ninth"},
	{source:22,target:19,desc:"杀",type:"kill",stage:"ninth"},
	{source:22,target:4,desc:"杀",type:"kill",stage:"ninth"},
	{source:19,target:22,desc:"权",type:"takepower",stage:"ninth"},
	{source:4,target:16,desc:"皇位",type:"transmit",stage:"fourth"},
	{source:16,target:4,desc:"皇位",type:"transmit",stage:"fifth"},
	{source:4,target:10,desc:"皇位",type:"transmit",stage:"ninth"},
	{source:6,target:7,desc:"联合",type:"union",stage:"first"},
	{source:6,target:15,desc:"联合",type:"union",stage:"first"},
	{source:7,target:15,desc:"联合",type:"union",stage:"first"},
	{source:6,target:7,desc:"联合",type:"union",stage:"second"},
	{source:14,target:9,desc:"联合",type:"union",stage:"fifth"},
	{source:14,target:19,desc:"联合",type:"union",stage:"fifth"},
	{source:9,target:19,desc:"联合",type:"union",stage:"fifth"},
	{source:19,target:8,desc:"联合",type:"union",stage:"sixth"},
	{source:19,target:9,desc:"联合",type:"union",stage:"seventh"},
];

var force = d3.forceSimulation(nodes)
	.force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter(width/2,height/2))
	.on("tick", tick);

var path = svg.append("g").selectAll("path")
    .data(links)
	.enter().append("path")
    .attr("class", function(d) { return "link " + d.type+" "+d.stage; })
    .attr("marker-end", function(d) { return "url(#marker-" + d.type + ")"; });
	
var action = svg.append("g")
	.selectAll("text")
	.data(links)
	.enter()
	.append("text")
	.attr("x", -100)
	.attr("class", function(d) { return d.type+" "+d.stage+" action"; })
	.text(function(d){
		return d.desc;
	});
	
var role = svg.append("g")
	.selectAll("circle")
    .data(force.nodes())
	.enter().append("circle")
    .attr("r", 30)
	.attr("class", function(d){return "role "+(d.role||" "); })
	.on("mouseover", function(d){showDesc(d);})
	.on("mouseout", function(d){hideDesc(d);})
	.call(d3.drag()
		.on("start",started)
		.on("drag",dragged));

var roleName = svg.append("g").selectAll("text")
    .data(force.nodes())
	.enter().append("text")
    .attr("x", -25)
    .attr("y", -5)
	.attr("dy", 10)
    .text(function(d) { return d.name; });

var roleDesc = svg.append("g").append("text")
	.attr("x", 30)
	.attr("y", 40)
	.attr("class", "desc");
	
var stages = [
	{name:"背景", stage: "background", fn: function(){
		nodes[11].role="";
		nodes[12].role="";
		nodes[15].role="wang";
		nodes[7].role="wang";
		nodes[6].role="";
		nodes[5].role="";
		nodes[16].role="wang";
		nodes[14].role="wang";
		nodes[4].role="king";
		nodes[8].role="wang";
		nodes[9].role="wang";
		nodes[19].role="wang";
		nodes[22].role="wang";
		nodes[10].role="wang";
	},desc: "290年，晋武帝司马炎驾崩，太子司马衷即位，即晋惠帝，太傅杨骏辅政"},
	{name:"第一轮", stage: "first", fn: function(){
		nodes[11].role="dead";
		nodes[12].role="dead";
		nodes[15].role="power";
	}, desc: "191年，贾南风联合司马亮和司马玮杀了杨骏，太后杨芷被囚禁于金墉城内活活饿死，司马亮和元老大臣卫瓘掌权"},
	{name:"第二轮", stage: "second", fn: function(){
		nodes[15].role="dead";
		nodes[7].role="power";
	}, desc:"贾南风以惠帝名义，下密诏令司马玮杀了王司马亮和卫瓘，司马玮掌权"},
	{name:"第三轮", stage: "third", fn: function(){
		nodes[7].role="dead";
		nodes[6].role="power";
	}, desc:"贾南风又以司马玮擅杀大臣之罪杀了司马玮，贾南风掌权"},
	{name:"第四轮", stage: "fourth", fn: function(){
		nodes[5].role="dead";
		nodes[6].role="dead";
		nodes[16].role="power king";
		nodes[4].role="background";
	}, desc:"299年，贾南风设计陷害并杀了太子，却中了司马伦的计，被司马伦以杀害太子的罪名处死，司马伦掌权，301年，司马伦废晋惠帝自立为帝"},
	{name:"第五轮", stage: "fifth", fn: function(){
		nodes[16].role="dead";
		nodes[14].role="power";
		nodes[4].role="king";
	}, desc:"司马冏联合司马颙和司马颖杀了司马伦，惠帝复位，司马冏掌权"},
	{name:"第六轮", stage: "sixth", fn: function(){
		nodes[14].role="dead";
		nodes[8].role="power";
	}, desc:"302年，司马颙联合司马乂杀了司马冏，司马乂掌权"},
	{name:"第七轮", stage: "seventh", fn: function(){
		nodes[8].role="dead";
		nodes[9].role="power";
	}, desc:"303年，司马颙联合司马颖讨伐司马乂，却被司马乂打败，结果司马越趁其不备杀了司马乂，实力最强的司马颖掌权"},
	{name:"第八轮", stage: "eighth", fn: function(){
		nodes[19].role="power";
	}, desc:"305年，司马越联合胡人势力击败了司马颖，晋惠帝被司马颖挟持逃到洛阳，被司马颙截获，司马颙掌权"},
	{name:"第九轮", stage: "ninth", fn: function(){
		nodes[4].role="dead";
		nodes[9].role="dead";
		nodes[19].role="dead";
		nodes[22].role="power";
		nodes[10].role="king";
	}, desc:"306年，司马越联合鲜卑势力打败司马颙，随后杀了司马颖，一年后(307年)晋惠帝暴病身亡(疑为司马越毒害)，司马炽被立为晋怀帝，司马越又设计袭杀了司马颙，至此历经十六年(291-307)的八王之乱结束，大中华即将进入五胡乱华的时代"}
];

var stage = d3.select("body")
	.append("div")
	.attr("class","stage");
	
showStage(stages[0]);
	
var currentStage="background";
var toolbar = d3.select("body")
	.append("div")
    .attr("class", "toolbar")
	.selectAll("button")
	.data(stages)
	.enter().append("button")
	.on("click", showStage)
	.text(function(d) { return d.name; });
	
function tick() {
	svg.selectAll("path.link."+currentStage).attr("d", function(d){
		return "M" + d.source.x + "," + d.source.y + " L" + d.target.x + "," + d.target.y;
	});
	role.attr("transform", transform).attr("class", function(d){return "role "+(d.role||" "); });
	roleName.attr("transform", transform);
	svg.selectAll("text."+currentStage).attr("x",function(d){
		return (d.source.x+d.target.x)/2;
	}).attr("y",function(d){
		return (d.source.y+d.target.y)/2;
	});
}

function showStage(d){
	if(currentStage != "background"){
		svg.selectAll("path.link."+currentStage).attr("d", function(){
			return "M0,0";
		});
		svg.selectAll("text."+currentStage).attr("x", -100);
	}
	currentStage=d.stage;
	d.fn && d.fn();
	stage.text(d.name+"："+d.desc);
	force.restart();
}

function showDesc(d){
	roleDesc.text(d.desc);
	if(d.x<600){
		roleDesc.attr("transform", transform(d));
	}else{
		roleDesc.attr("transform", "translate(" + (d.x-d.desc.length*12) + "," + d.y + ")");
	}
}

function hideDesc(){
	roleDesc.attr("transform", null).text("");
}

function started(d){
	if(!d3.event.active){
		force.alphaTarget(0.8).restart();
	}
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d){
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}