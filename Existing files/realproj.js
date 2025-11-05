
// File:   realproj.js
// Author: John Longley
// Date:   May 2020 (during lockdown)

// Javascript code for real projective plane applet

// globals

var lower = document.getElementById("projection-lower-canvas") ;
var mid = document.getElementById("projection-mid-canvas") ;
var higher = document.getElementById("projection-higher-canvas") ;
lower.setAttribute("width","500px") ;
lower.setAttribute("height","300px") ;
mid.setAttribute("width","500px") ;
mid.setAttribute("height","300px") ;
higher.setAttribute("width","500px") ;
higher.setAttribute("height","300px") ;
var lowerCtxt = lower.getContext("2d") ;
var midCtxt = mid.getContext("2d") ;
var higherCtxt = higher.getContext("2d") ;

var width = higher.width ;
var height = higher.height ;
var origX = 250 ;
var origY = 150 ;
var planeX1 = 100 ;
var planeX2 = 160 ;
var planeY11 = 50 ;
var planeY12 = 250 ;
var planeY21 = 90 ;
var planeY22 = 210 ;
var planeXmid = (planeX1+planeX2)/2 ;
var grd1 = (planeY21-planeY11)/(planeX2-planeX1) ;
var grd2 = (planeY22-planeY12)/(planeX2-planeX1) ;

// on initialization:
drawBackdrop() ;

function drawBackdrop() {
  // to do: use three canvases to get crossings right
  midCtxt.fillStyle = "#000000" ;  // black
  midCtxt.beginPath();
  midCtxt.arc(origX,origY,5,0,2*Math.PI);
  midCtxt.fill();
  midCtxt.strokeStyle = "#004400" ;
  midCtxt.lineWidth = 3 ;
  midCtxt.beginPath() ;
  midCtxt.moveTo(planeX1,planeY11-15) ;
  midCtxt.lineTo(planeX1,planeY12+15) ;
  midCtxt.moveTo(planeX1-15,planeY11-(15*grd1)) ;
  midCtxt.lineTo(planeX2+9,planeY21+(9*grd1)) ;
  midCtxt.moveTo(planeX2,planeY21-9) ;
  midCtxt.lineTo(planeX2,planeY22+9) ;
  midCtxt.moveTo(planeX1-15,planeY12-(15*grd2)) ;
  midCtxt.lineTo(planeX2+9,planeY22+(9*grd2)) ;
  midCtxt.stroke() ;
  // faint line marking vanishing of plane at infinity
  midCtxt.strokeStyle = "#90efef";
  midCtxt.beginPath() ;
  midCtxt.moveTo(origX,0) ;
  midCtxt.lineTo(origX,origY-10) ;
  midCtxt.moveTo(origX,origY+10) ;
  midCtxt.lineTo(origX,height) ;
  midCtxt.stroke() ;
}

// main code for points, rays, lines, planes

function withinWindow(x,y) {
  return (x > planeX1 && x < planeX2 && y > planeY11 && y < planeY12 &&
         (y - planeY11)/(x - planeX1) > (planeY21 - planeY11)/(planeX2 - planeX1) &&
         (y - planeY12)/(x - planeX1) < (planeY22 - planeY12)/(planeX2 - planeX1)) ;
}

var mode = 0 ; 
var displayChanged = false ;
var storedX = 130 ;
var storedY = 150 ;  // for now

function hexString(z) {
  var s = Math.round(z).toString(16) ;
  if (s.length == 2) {
    return s ;
  } else if (s.length == 1) {
    return "0" + s ;
//  } else if (s.length == 0) {
//    return "00" ;
  }
}

function distanceFactor(X) {
  // takes X coord within trapezium, returns beta in [-1,1]
  return (X - planeXmid) / (planeX2 - planeXmid) ;
}

function blueShade(t) {  
  // t=-1 darkest, t=1 lightest
  if (t>=1) {t=1 ;}
  if (t<=-1) {t=-1 ;}
  var RGcomp = (t+1) * 96 ;
  var RGstr = hexString(RGcomp) ;
  var Bcomp = 143 + (t * 112) ;
  var Bstr = hexString(Bcomp)
  return "#" + RGstr + RGstr + Bstr ;
}

function spotRadiusFor(X) {
  if (X < planeX1/2) {
    return 6 ;
  } else if (X < planeX1) {
    return 5 ;
  } else if (X < planeX2) {
    return 4 ;
  } else if (X < (planeX2+origX)/2) {
    return 3 ;
  } else if (X < (planeX2+3*origX)/4) {
    return 2 ;
  } else {
    return 1 ;
  }
}

function sq(x) {
  return x*x ;
}

function drawRayAndSpot(X,Y) {
    // draw ray, with color gradient to suggest third dimension
    var k = 1.80 ;
    // var l = Math.sqrt(sq(origX-X) + sq(origY-Y)) ;
    // var k = origX / l ; 
    var dX = k * (origX-X) ;
    var dY = k * (origY-Y) ;
    var beta = distanceFactor(X) ;
    var blueGrad = higherCtxt.createLinearGradient(origX-dX, origY, origX+dX, origY);
    blueGrad.addColorStop(0, blueShade(beta)) ;
    blueGrad.addColorStop(1, blueShade(-beta)) ;
    higherCtxt.strokeStyle = blueGrad ;
    higherCtxt.lineWidth = 2 ;
    higherCtxt.beginPath() ;
    higherCtxt.moveTo(X,Y) ;
    higherCtxt.lineTo (origX+dX, origY+dY) ;
    higherCtxt.stroke() ;
    lowerCtxt.strokeStyle = blueGrad ;
    lowerCtxt.lineWidth = 2 ;
    lowerCtxt.beginPath() ;
    lowerCtxt.moveTo(X,Y) ;
    lowerCtxt.lineTo (origX-dX, origY-dY) ;
    lowerCtxt.stroke() ;
    // highlight point of intersection with plane
    higherCtxt.fillStyle = "#FF0000" ;   // red
    higherCtxt.beginPath() ;
    higherCtxt.arc(X,Y,spotRadiusFor(X),0,2*Math.PI) ;
    higherCtxt.fill() ;
}

function dot(x1,y1,x2,y2) {
  return (x1*x2)+(y1*y2) ;
}

function avoidZero(z,d) {
  if (Math.abs(z) < 1) {
    return d ;
  } else {
    return z ;
  }
}

function showRay(event) {
  var X = event.offsetX ;
  var Y = event.offsetY ;
  if (mode==2) {
    return ;
  }
  if ((displayChanged && X<origX) || withinWindow(X,Y)) { 
    higherCtxt.clearRect(0,0,width,height) ;
    lowerCtxt.clearRect(0,0,origX,height) ;
    if (mode==1) {
      // computing color gradient for filled triangles
      var Xs = storedX, Ys = storedY ;
      var beta = distanceFactor(X) ;
      var betas = distanceFactor(Xs) ;
      // shift to coordinates centered on origin
      var x = X-origX, xs = Xs-origX, y = Y-origY, ys = Ys-origY ;
      // some linear algebra magic:
      var det = avoidZero((x*ys)-(y*xs),1) ;
      var A = (ys*beta)-(y*betas), B = (x*betas)-(xs*beta) ;
      // so (A,B) is the grad vector for colour
      var xm, ym, betam ;
      if (Math.abs(dot(A,B,x,y)) > Math.abs(dot(A,B,xs,ys))) {
        xm = x ; ym = y ; betam = beta ; 
      } else {
        xm = xs ; ym = ys ; betam = betas ; 
      }
      var ABlength = avoidZero (Math.sqrt((A*A)+(B*B)),1) ;
      var a = A / ABlength, b = B / ABlength ;
      var abDist = dot(xm,ym,a,b) ;
      var A1 = a * abDist, B1 = b * abDist ;
      // now ready to set up the color gradient
      var blueAreaGrad = 
          higherCtxt.createLinearGradient (origX+A1,origY+B1,origX-A1,origY-B1);
      blueAreaGrad.addColorStop(0, blueShade(betam));
      blueAreaGrad.addColorStop(1, blueShade(-betam));
      higherCtxt.fillStyle = blueAreaGrad ;
      // first triangle:
      higherCtxt.beginPath() ;
      higherCtxt.moveTo(origX,origY) ;
      higherCtxt.lineTo(Xs,Ys) ;
      higherCtxt.lineTo(X,Y) ;
      higherCtxt.closePath() ;
      higherCtxt.fill() ;
      // alternate triangle:
      higherCtxt.beginPath() ;
      higherCtxt.moveTo(origX,origY) ;
      higherCtxt.lineTo(origX*2-Xs,origY*2-Ys) ;
      higherCtxt.lineTo(origX*2-X,origY*2-Y) ;
      higherCtxt.closePath() ;
      higherCtxt.fill() ;
      // two more blue lines to complete the parallelogram
      higherCtxt.strokeStyle = blueAreaGrad ;
      higherCtxt.beginPath() ;
      higherCtxt.moveTo(X,Y);
      higherCtxt.lineTo(origX*2-Xs,origY*2-Ys) ;
      higherCtxt.moveTo(Xs,Ys);
      higherCtxt.lineTo(origX*2-X,origY*2-Y) ;
      higherCtxt.stroke() ;
      // add red line
      var redGrad = higherCtxt.createLinearGradient (planeX2,0,origX,0);
      redGrad.addColorStop(0, "#FF0000");
      redGrad.addColorStop(1, "#FFFFFF");
      higherCtxt.strokeStyle = redGrad ;
      // higherCtxt.strokeStyle = "#FF0000" ;
      higherCtxt.lineWidth = 3 ;
      higherCtxt.beginPath() ;
      higherCtxt.moveTo(Xs,Ys) ;
      higherCtxt.lineTo(X,Y) ;
      higherCtxt.stroke() ;
      // continuations of red line
      if (Math.abs(Xs-X) > 4 || Math.abs(Ys-Y) > 4) {
        higherCtxt.lineWidth = 1 ;
        higherCtxt.beginPath() ;
        if (Ys==Y) {  // treated as special case
          var Xmax = Math.max(X,Xs), Xmin = Math.min(X,Xs) ;
          if (Xmax < origX-10) {
            higherCtxt.moveTo(Xmax,Y) ;
            higherCtxt.lineTo(origX-10,Y) ;
          }
          higherCtxt.moveTo(Xmin,Y) ;
          higherCtxt.lineTo(0,Y) ;
        } else {
          var Xhi,Yhi,Xlo,Ylo ;
          if (Ys<Y) {
            Xhi=Xs; Yhi=Ys; Xlo=X; Ylo=Y;
          } else {
            Xhi=X; Yhi=Y; Xlo=Xs; Ylo=Ys;
          }
          var Ydiff = Ylo-Yhi, Xdiff = Xlo-Xhi;  // so Ydiff>0
          if (Xhi < origX-10) {
            // add higher line
            higherCtxt.moveTo(Xhi,Yhi) ;
            var Xtop = Xhi - (Yhi * Xdiff/Ydiff) ;
            if (Xtop >= origX-10) {
              higherCtxt.lineTo(origX-10,Yhi+(origX-10-Xhi)*Ydiff/Xdiff) ;
            } else {
              higherCtxt.lineTo(Xtop,0) ;  // won't matter if Xtop<0
            }
          }
          if (Xlo < origX-10) {
            // add lower line
            higherCtxt.moveTo(Xlo,Ylo) ;
            var Xbot = Xlo + ((height-Ylo) * Xdiff/Ydiff) ;
            if (Xbot >= origX-10) {
              higherCtxt.lineTo(origX-10,Ylo+(origX-10-Xlo)*Ydiff/Xdiff) ;
            } else {
              higherCtxt.lineTo(Xbot,height) ; // again, ok if Xbot<0
            }
          }
        }
        higherCtxt.stroke() ;
      }
      drawRayAndSpot(Xs,Ys) ;

    }
    drawRayAndSpot(X,Y) ;
    displayChanged = true ;
  } else if (displayChanged) {
    higherCtxt.clearRect(0,0,width,height) ;
    lowerCtxt.clearRect(0,0,origX,height) ;

    if (mode==1) {
      drawRayAndSpot(storedX,storedY) ;
    }
    // displayChanged = false ;
  }
}

function switchMode(event) {
  var X = event.offsetX ;
  var Y = event.offsetY ;
  if (mode==0) {
    if (X<origX && displayChanged) { // was: withinWindow(X,Y)
      mode=1 ;
      storedX = X ;
      storedY = Y ;
    } else {
      displayChanged = false ;
    }
  } else {
    mode=0 ;
    if (withinWindow(X,Y)) {
      showRay(event) ;
    } else {
      higherCtxt.clearRect(0,0,width,height) ;
      lowerCtxt.clearRect(0,0,origX,height) ;
      displayChanged = false ;
    }
  }
}

