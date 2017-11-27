		function scale(sensor,radians,color) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');      var x = 32;      var y = 34;	  var adj = -12;	  var t = 10;      var radius = radians;      var startAngle = toRadians(0);      var endAngle = toRadians(360);      var counterClockwise = true;      var sep = ' xx ';      var ini = '0';      var str = ini.concat(sep,'20',sep,'40',sep,'60',sep,'80',sep,'100');      context.beginPath();      context.arc(x, y, radius+adj, startAngle, endAngle, counterClockwise);      context.lineWidth = t;      // line color	  context.strokeStyle = color; 	      context.stroke();	  context.restore();}function value(sensor,radius,color,min,max,val) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');      var x = 32;      var y = 34;	  var adj = -12;	  var tick = 10;	  var endAngle = calculateAngle(min,max,val)      var startAngle = toRadians(90);	  var counterClockwise = false;	  if (val / Math.abs(val) == -1) {      counterClockwise = true;	  }      context.beginPath();      context.arc(x, y, radius+adj, startAngle, endAngle, counterClockwise);      context.lineWidth = tick;      context.strokeStyle = color;	  //context.shadowColor = color;      //context.shadowBlur = 10;      //context.shadowOffsetX = 0;      //context.shadowOffsetY = 0;      context.stroke();	  context.restore();}function trigger(sensor,radius,color,scaleMin,scaleMax,min,max) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');      var x = 32;      var y = 34;	  var adj = 9;	  var tick = 4;	  var endAngle = calculateAngle(scaleMin,scaleMax,max);      var startAngle = calculateAngle(scaleMin,scaleMax,min);      var counterClockwise = false;      context.beginPath();      context.arc(x, y, radius+adj, startAngle, endAngle, counterClockwise);      context.lineWidth = tick;      context.strokeStyle = color;      context.stroke();	  context.restore();}function triggerDelimiter(sensor,radius,color,min,max,val) {    var canvas = document.getElementById(sensor);    var ctx = canvas.getContext('2d');	var cty = canvas.getContext('2d');	//calculate angle	var tick = 2;	var len = 8;	var x = 32;	var y = 34;	var adj = -6;	a = calculateAngle (min,max,val);	var x1 = x + Math.cos(a)*(radius+adj);	var y1 = y + Math.sin(a)*(radius+adj);	var x2 = x + Math.cos(a)*(radius+adj+len);	var y2 = y + Math.sin(a)*(radius+adj+len);	var tx = x + Math.cos(a)*(radius+adj+2);	var ty = y + Math.sin(a)*(radius+adj+2);	cty.beginPath();	cty.arc(tx+4, ty, 7, Math.PI*0.5, Math.PI*1.5, true);   cty.arc(tx-4, ty, 7, Math.PI*1.5, Math.PI*0.5, true);   cty.lineWidth = 1;	cty.fillStyle = '#b776ea';
	//cty.fillStyle =  'rgba(183,118,234,0.7)';   cty.fill();	cty.strokeStyle = '#531584';   cty.strokeStyle = 'rgba(83,21,133,1)';	cty.closePath();   cty.stroke();		cty.restore;			ctx.textAlign="center"; 	ctx.font = '7pt San Francisco,Helvetica Neue, Helvetica, Arial';	ctx.fillStyle = '#FFF';	ctx.fillText(val,tx,ty+3);	ctx.lineWidth = tick;	//ctx.strokeStyle = "#000";//color;    //ctx.beginPath();    //ctx.moveTo(x1, y1);    //ctx.lineTo(x2, y2);    //ctx.stroke();	ctx.restore();	} 	 	function toDegrees (radians) {    return radians * (180 / Math.PI);}function toRadians (angle) {    return angle * (Math.PI / 180);}	function tick(sensor,radius,color,angle) {    var canvas = document.getElementById(sensor);    var ctx = canvas.getContext('2d');	//calculate angle	var x = 32;	var y = 32;	var adj = -0;		var tick = 1;	var len = 8;	var a = toRadians(angle);	var x1 = x + Math.cos(a)*(radius+adj-10);	var y1 = y + Math.sin(a)*(radius+adj-10);	var x2 = x + Math.cos(a)*(radius+adj+len);	var y2 = y + Math.sin(a)*(radius+adj+len);	ctx.lineWidth = tick;	ctx.strokeStyle = color;    ctx.beginPath();    ctx.moveTo(x1, y1);    ctx.lineTo(x2, y2);    ctx.stroke();	ctx.restore();	}    function pointer(sensor,radius,color,min,max,val) {    var canvas = document.getElementById(sensor);    var ctx = canvas.getContext('2d');    var context = canvas.getContext('2d');	//calculate angle	var tick = 2;	var len = 17;	var x = 32;	var y = 34;	var adj = -0;		a = calculateAngle (min,max,val);	var x1 = x + Math.cos(a)*(radius+adj-2);	var y1 = y + Math.sin(a)*(radius+adj-2);	var x2 = x + Math.cos(a)*(radius+adj+len);	var y2 = y + Math.sin(a)*(radius+adj+len);	ctx.lineWidth = tick;	ctx.strokeStyle = color;    ctx.beginPath();    ctx.moveTo(x1, y1);    ctx.lineTo(x2, y2);    ctx.stroke();	 ctx.restore();		    context.beginPath();    context.arc(x, y, 12, 0, 2 * Math.PI, false);    context.lineWidth = 0;	context.fillStyle = color;    context.fill();    context.strokeStyle = color;    context.stroke();	context.restore();} function calculateAngle (min,max,val) {	var perc = val/(max-min);	var angle = 360*perc;	var a = toRadians(angle+90);	return a; } function border(sensor) {    var canvas = document.getElementById(sensor);    var context = canvas.getContext('2d');    var x = 43;    var y = 43;    context.beginPath();    context.arc(x, y, 42, 0, 2 * Math.PI, false);    context.lineWidth = 1;    context.strokeStyle = 'rgba(255,255,255,0.5)';    context.stroke();	context.restore();} function iconborder(sensor,color) {    var canvas = document.getElementById(sensor);    var context = canvas.getContext('2d');    var x = 29;    var y = 96;    context.beginPath();    context.arc(x, y, 22, 0, 2 * Math.PI, false);    context.lineWidth = 1;	context.fillStyle = color;    context.fill();    context.strokeStyle = 'rgba(255,255,255,0.5)';    context.stroke();	context.restore();} function alarmtypeborder(sensor,alarm) {    if (alarm != '') {	var canvas = document.getElementById(sensor);    var context = canvas.getContext('2d');    var x = 36;    var y = 109;    context.beginPath();    context.arc(x, y, 10, 0, 2 * Math.PI, false);    context.lineWidth = 1;	context.fillStyle = '#292929';    context.fill();    context.strokeStyle = 'rgba(255,255,255,0.5)';    context.stroke();	context.restore();	} } function sensor(sensor, val, scaleMin, scaleMax, color, alarm) {    	var rMax = 35; 	var rMin = 15; 	//borderTriggers(sensor); 	border(sensor);	//iconborder(sensor,color);	//alarmtypeborder(sensor, alarm);	//linevalue(sensor,'rgba(255,108,000,0.5)',scaleMin,scaleMax,val);	//linescale(sensor,'rgba(000,000,000,0.3)');	//currentValue(sensor,'rgba(255,108,000,0.5)',scaleMin,scaleMax,val);    scale(sensor,rMax,'rgba(183,118,234,0.5)'); //scala	 	value(sensor,rMax,'rgba(83,21,132,1)',scaleMin,scaleMax,val); //valore 	//tick(sensor,rMax,'#fff',360); //tick min 	//tick(sensor,rMax,'#fff',90); 	pointer(sensor,rMin,'rgba(183,118,234,1)',scaleMin,scaleMax,val); 	//actuatorborder(sensor,'rgba(0,108,000,1)');}    function event(sensor, valMin, valMax, scaleMin, scaleMax) {  	var rx = 30;
	//triggerDelimiter(sensor,32,'rgba(255,255,255,1)',scaleMin,scaleMax,valMin);	//triggerDelimiter(sensor,32,'rgba(255,255,255,1)',scaleMin,scaleMax,valMax); 	  	trigger(sensor,21, 'rgba(247,147,30,0.5)',scaleMin,scaleMax,valMin,valMax);	}  function actuatorborder(sensor,val) {    var canvas = document.getElementById(sensor);    var context = canvas.getContext('2d');    var radius = 62;	var x = 65;	var y = 65;	var adj = 30;	var angle = 30+(25*(val-1));	var a = toRadians(angle);	var x = x - Math.cos(a)*(radius);	var y = y - Math.sin(a)*(radius);	context.beginPath();	context.arc(x, y, 11, 0, 2 * Math.PI, false);    context.lineWidth = 1;	context.fillStyle = 'rgba(FFF,000,000,1)';    context.fill();    context.font = '16pt ionicons';	context.fillText(String.fromCharCode('\f201'),25,25);	context.strokeStyle = 'rgba(255,255,255,0.5)';    context.stroke();	context.restore();} function linevalue(sensor,color,scaleMin,scaleMax,val) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');	  var endpoint = 70;	  var startpoint = 0;      var valx = (70*val/scaleMax-scaleMin)+startpoint;      var valy = 0;      // round line cap (middle line)      context.beginPath();      context.moveTo(valy, 10);      context.lineTo(valx, 10);      context.lineWidth = 7;      context.strokeStyle = color;      context.lineCap = 'square';      context.stroke();}function linescale(sensor,color) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');      context.beginPath();      context.moveTo(30, 10);      context.lineTo(100, 10);      context.lineWidth = 5;      context.strokeStyle = color;      context.lineCap = 'square';      context.stroke();}function linetrigger(sensor,color,scaleMin,scaleMax,min,max) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');	  var endpoint = 70;	  var startpoint = 0;      var valmax = (70*max/scaleMax-scaleMin)+startpoint;      var valmin = (70*min/scaleMax-scaleMin)+startpoint;;      // round line cap (middle line)      context.beginPath();      context.moveTo(valmin, 15);      context.lineTo(valmax, 15);      context.lineWidth = 5;      context.strokeStyle = color;      context.lineCap = 'square';      context.stroke();}function currentValue(sensor,color,scaleMin,scaleMax,val) {      var canvas = document.getElementById(sensor);      var context = canvas.getContext('2d');	  var endpoint = 70;	  var startpoint = 0;      var currentval = (70*val/scaleMax-scaleMin)+startpoint;      // round line cap (middle line)      context.beginPath();	  context.arc(currentval, 10, 5, 0, 2 * Math.PI, false);      context.strokeStyle = color;      context.lineCap = 'square';      context.stroke();}