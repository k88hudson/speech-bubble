function speechBubble( id, args ) {

  var textbox = document.getElementById(id),
      innerText = textbox.querySelector("div"),
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext('2d'), 
      w = textbox.offsetWidth,
      h = textbox.offsetHeight,
      shadow = args.shadow || 0,
      border = args.borderWidth,
      triangleHeight = args.triangleHeight || 30,
      triangleWidth = args.triangleWidth || 1,
      radius = args.radius || 30,
      flipCode = args.flipCode || 1;

      console.log( w, h );

      //In case it is 0
      (border === undefined) && (border = 2);

  //Add styling for canvas so it fits around the textbox
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.width = w + (border*2) + shadow;
  canvas.height = h + (border+2) + triangleHeight + shadow;

  //Make sure inner text is on top
  innerText.style.position = "relative";
  innerText.style.zIndex = 2000;

  function flip(transX, transY, scaleX, scaleY) {
    ctx.translate(transX, transY);
    ctx.scale(scaleX, scaleY);
  }

  //Main bubble drawing function, original idea from http://www.scriptol.com/html5/canvas/speech-bubble.php
  function drawBubble(ctx, x, y, w, h, radius, triangleHeight, triangleWidth, border) {
    var r = x + w,
        b = y + h;

    ctx.beginPath();

    ctx.moveTo(x+radius, y);
    ctx.lineTo(x+radius / (2*triangleWidth), y-triangleHeight);
    ctx.lineTo(x+radius * (2*triangleWidth), y);
    ctx.lineTo(r-radius, y);
    ctx.quadraticCurveTo(r, y, r, y+radius);
    ctx.lineTo(r, y+h-radius);
    ctx.quadraticCurveTo(r, b, r-radius, b);
    ctx.lineTo(x+radius, b);
    ctx.quadraticCurveTo(x, b, x, b-radius);
    ctx.lineTo(x, y+radius);
    ctx.quadraticCurveTo(x, y, x+radius, y);

    ctx.shadowOffsetX = shadow/2;
    ctx.shadowOffsetY = shadow/2;
    ctx.shadowBlur = shadow;
    ctx.shadowColor = "rgba(0,0,0,.4)";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();

    if(border !== 0){ 
    	ctx.shadowColor = 0;  
			ctx.shadowBlur    = 0;  
			ctx.shadowOffsetX = 0;  
			ctx.shadowOffsetY = 0; 

      ctx.strokeStyle = "rgb(0,0,0)";
      ctx.lineWidth = border;
      ctx.stroke();
    }

  }

  //Handle orientation
  (flipCode === 1 ) && flip(0, 0, 1, 1); //triangle top left
  (flipCode === 2 ) && flip(w+(border*2), h+triangleHeight+(border*2), -1, -1); //triangle at bottom right
  (flipCode === 3 ) &&flip(0, h+triangleHeight+(border*2), 1, -1); //triangle at bottom left
  (flipCode === 4 ) && flip(w+(border*2), 0, -1, 1); //triangle at top right
  if(flipCode === 1 || flipCode === 4 ){
    canvas.style.top = -(triangleHeight+border)+"px";
  }
  
  //Ok, draw.
  drawBubble(ctx,border,triangleHeight+border,w,h,radius,triangleHeight, triangleWidth, border);
  textbox.appendChild( canvas );
}