function room_map(canvas, width, height, icon) {			var fontSize = 32;			var c = document.getElementById(canvas);			var ctu = c.getContext("2d");			ctu.beginPath();			//ctu.rect(0,0, width, height);      		//ctu.fillStyle = "rgba(83,21,132,0.1)";      		//ctu.fill();      		//ctu.lineWidth = 0;      		//ctu.strokeStyle = "rgba(83,21,132,0.5)";			//icon			ctu.textBaseline = 'middle';			ctu.fillStyle = "rgba(255,0,0,0.1)";			ctu.font = '32px Dhicon';			ctu.fillText  (String.fromCharCode(parseInt(icon, 16)), (width-fontSize)/2, height/2);	      	ctu.stroke();					//ctu.fillStyle = rgba(5, 255, 255, 0.7)";			//ctu.strokeStyle = rgba(255, 255, 255, 0.0)";			//ctu.fillRect(0,0, width, height);			//ctu.stroke();			ctu.restore();		} 		function sensor_map(canvas, x, y, icon, val, um, cnt) {	var c = document.getElementById(canvas);	var ctu = c.getContext("2d");	ctu.strokeStyle="rgba(83,21,132,0.9)";	ctu.fillStyle = "rgba(83,21,132,0.9)";	ctu.fillRect(x,y,14,14);	ctu.strokeRect(x,y,14,14);	ctu.fillStyle= "rgba(255,255,255,1)";	ctu.strokeRect(x+14,y,14,14);	ctu.fillRect(x,y+14,14,14);		//ctu.fillStyle = "rgba(0,0,255,0.9)";	ctu.strokeRect(x,y+14,28,14);	ctu.fillStyle= "rgba(255,255,255,1)";	ctu.fillRect(x,y+14,28,14);	ctu.textBaseline = 'middle';	ctu.textAlign = "center";		//icon	ctu.textBaseline = 'middle';	ctu.textBaseline = 'top';	ctu.fillStyle = "rgba(255,255,255,1)";	ctu.font = '400 12px Dhicon';	ctu.fillText  (String.fromCharCode(parseInt(icon, 16)), x+7, y);	//um 	ctu.font = '400 8px -apple-system-font';	ctu.fillStyle = "rgba(83,21,132,0.9)";	ctu.fillText  (um, x+21, y+3);		//value 	ctu.font = '300 12px -apple-system-font';	ctu.fillStyle = "rgba(83,21,132,0.9)";	ctu.fillText  (val, x+14, y+14);	ctu.stroke();	ctu.restore();} 						function actuator_map(canvas, x, y, icon, status, cnt) {	var c = document.getElementById(canvas);	var ctx = c.getContext("2d");	//ctx.fillStyle = 'black';	ctx.fillStyle= "rgba(255,255,255,1)";	ctx.strokeStyle = "rgba(255,0,0,0.5)";	roundRect(ctx, x, y, 16, 16, 2, true);	if (status == 1)	{		      	ctx.fillStyle = "rgba(255,0,0,1)";		}	if (status == 0)	{		      	ctx.fillStyle = "rgba(83,21,132,0.3)";				}	//icon	//ctx.textBaseline = 'middle';	ctx.textBaseline = 'top';	//ctu.fillStyle = 'blue';	ctx.font = '400 12px Dhicon';	ctx.fillText  (String.fromCharCode(parseInt(icon, 16)), x+8, y+2);	ctx.stroke();	ctx.restore();} /** * Draws a rounded rectangle using the current state of the canvas.  * If you omit the last three params, it will draw a rectangle  * outline with a 5 pixel border radius  * @param {CanvasRenderingContext2D} ctx * @param {Number} x The top left x coordinate * @param {Number} y The top left y coordinate  * @param {Number} width The width of the rectangle  * @param {Number} height The height of the rectangle * @param {Number} radius The corner radius. Defaults to 5; * @param {Boolean} fill Whether to fill the rectangle. Defaults to false. * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true. */function roundRect(ctx, x, y, width, height, radius, fill, stroke) {  if (typeof stroke == "undefined" ) {    stroke = true;  }  if (typeof radius === "undefined") {    radius = 5;  }  ctx.beginPath();  ctx.moveTo(x + radius, y);  ctx.lineTo(x + width - radius, y);  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);  ctx.lineTo(x + width, y + height - radius);  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);  ctx.lineTo(x + radius, y + height);  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);  ctx.lineTo(x, y + radius);  ctx.quadraticCurveTo(x, y, x + radius, y);  ctx.closePath();  if (stroke) {    ctx.stroke();  }  if (fill) {    ctx.fill();  }        }function snap(num){var n_pos = 0;var s_units = num.toString()[1];var n_units = parseInt(s_units);if (n_units > 0 && n_units < 5) {	n_pos = 0;}else if (n_units > 5 && n_units <= 9) {	n_pos = 5;}return (num-n_units+n_pos);}function item(canvas, type, id, posx, posy, icon, text, status){var actColor = 'rgba(0,0,255,1)';var senColor = 'rgba(255,0,0,1)';var newSts;if (status == 1) { 	newSts = 0;	actColor = 'rgba(0,0,255,1)';	senColor = 'rgba(255,0,0,1)'; };if (status == 0) { 	newSts = 1; 	actColor = 'rgba(0,0,255,0.1)';	senColor = 'rgba(255,0,0,0.1)'; 	};if (type == 'A') {		var c = document.getElementById(canvas);		$(c).drawText({  		draggable: true,  		fillStyle: actColor,  		strokeStyle: 'black',  		x: posx, y: posy,  		fontSize: 16,  		fontFamily: 'Dhicon',  		text: String.fromCharCode(parseInt(icon, 16)),  		dragstop: function(layer) {		var x = snap(Math.round(layer.x));		var y = snap(Math.round(layer.y)); 		$.ajax({      		url: 'php/setposition.php',      		type: 'POST',      		data: { 'type': type, 'id': id, 'posx': x, 'posy': y, type: type }		}); //end update position		$(c).drawLayers();			return 'x: '+ x+',y: '+ y;  		}, //end dragstop  			  		dblclick: function(layer) { 		$.ajax({      		url: 'php/setpositionstatus.php',      		type: 'POST',      		data: { 'type': type, 'id': id, 'status': newSts }		}); //end update position			$(c).drawLayers();  		} //end doubleclick	}); } //end if if (type == 'S') {	 	var c = document.getElementById(canvas);	$(c).drawText({		draggable: true,  		fillStyle: senColor,  		strokeStyle: 'black',  		x: posx, y: posy,  		fontSize: 16,  		fontFamily: 'Dhicon',  		text: String.fromCharCode(parseInt(icon, 16)),  		dragstop: function(layer) {		var x = snap(Math.round(layer.x));		var y = snap(Math.round(layer.y)); 		$.ajax({      		url: 'php/setposition.php',      		type: 'POST',      		data: { 'type': type, 'id': id, 'posx': layer.x, 'posy': layer.y, type: type }		}); //end update position			return 'x: '+ x+',y: '+ y;		$(c).drawLayers();	  		}, //end dragstop  	  		dblclick: function(layer) { 		$.ajax({      		url: 'php/setpositionstatus.php',      		type: 'POST',      		data: { 'type': type, 'id': id, 'status': newSts }  		}); //end update position		$(c).drawLayers();			  		} //end doubleclick		}); } //end if}function room(canvas, width, height) {	var c = document.getElementById(canvas);			$(c).drawRect({  		layer: true,  		fillStyle: 'rgba(83,21,132,0.1)',  		//strokeStyle = 'rgba(83,21,132,0.5)',  		x: 0, y: 0,  		width: width*2, height: height*2		});		$(c).drawLayers();		} 		