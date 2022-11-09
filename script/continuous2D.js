//preloader
var loader = setInterval(function () {
  if(document.readyState !== "complete") return;
  clearInterval(loader);
  document.querySelector('.spinner-wrapper').style.display = "none";
}, 250);

//helper functions
function ERFC(value1){
  return 1-math.erf(value1);
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

var myZoom1 = false;
var myZoom2 = false;

function toggleZoom1(){
  if(myZoom1==true){
    myZoom1 = false;
  }else{
  myZoom1 = true;
  }
  mychart();
}

function toggleZoom2(){
  if(myZoom2==true){
    myZoom2 = false;
  }else{
  myZoom2 = true;
  }
}

// Initial Concentration vs Time graph on page load

var Q = 3.66; 
var b = 1.75; 
var c = 133; 
var Area = 20;
var n = 0.35;
var q = Q/Area; 
var v = 0.187;
var Dstar = 0.0000000001; 
var alphaX = 4.919;
var alphaY = 0.4919;
var DL = (alphaX*v) + Dstar;
var DT = (alphaY*v) + Dstar
var R = 1; 
var DLR = DL/R;
var DTR = DT/R;
var vR = v/R;

var lambda = 10000; 
var y = 16; 
var x = 123;
var time = 10; 

var ctx1 = document.getElementById("canvas1").getContext("2d");

  const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

  var xyValues = [];

  for(let i =0; i<xValues.length; i++){

    var obj = {};
    obj.x = xValues[i];
    var a1 = Q*c/b/(2*Math.PI*(DTR*DLR)**0.5)*Math.exp(vR*xValues[i]/(2*DLR));
    var a2 = ((vR**2)/(4*DLR)*(((xValues[i]**2)/DLR)+(y**2)/DTR))**0.5;
    var C = a1*BESSEL.besselk(a2,0)*Math.exp((-Math.log(2)/lambda)*time);
    obj.y = C.toFixed(2);
    xyValues.push(obj);
  }


var chart1 = new Chart(ctx1,{
  type: 'scatter',
  data: {
    datasets: [{
      backgroundColor: 'rgb(153, 102, 255)',
      borderColor: 'rgb(153, 102, 255)',
      borderWidth:1.2,
      pointRadius:2.5,
      pointBackgroundColor: 'rgb(153, 102, 255)',
      data: xyValues,
      fill: false,
      showLine: true,
      tension:0.4
    }]
  },
  options: {
    animation: false,
    scales: {
      x: {
        position: 'bottom',
        min: 0, max:600,
        title: {
          display: true,
          text: 'Distance (m)',
          font: {
            size: 15
        }
      }
      },
      y:{
        min: 0,
        max: 100.0,
        position: 'left',
        title: {
          display: true,
          text: 'Concentration (mg/L)',
          font: {
            size: 15
        }
      }
    }
  },
  responsive: true,
    plugins: {
      title: {
          display: true,
          text: 'Concentration with Distance',
          font: {
            size: 17
        }
      },
      legend: {
        display: false
    },
    zoom: {
      limits: {
        x: {min: 0, max: 600},
        y: {min: 0}
      },
      pan: {
        enabled: true,
        mode: 'y',
      },
      zoom: {
        wheel: {
          enabled: myZoom1,
          speed:0.05
        },
        pinch: {
          enabled: false
        },
        mode: 'y',
      }
    }
  }
}});



var str; 

var slider = document.querySelectorAll(".slider"); // all the sliders from HTML
var output = document.querySelectorAll(".demo");  // all the output fields from HTML
var flow = document.querySelector(".flow");

output[0].innerHTML = slider[0].value;
output[1].innerHTML = slider[1].value;
flow.innerHTML = "Darcy velocity (q): " + q.toFixed(2) + " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;
output[6].innerHTML = slider[6].value;

  // Updating Concentration vs Distance graph

  function mychart(){
    let pos = $(document).scrollTop();
    chart1.destroy();
    
    //initial conditions (without sorption)
    var Area = 20; // area constant cause area not in equation
    var n = 0.35;

    var alphaX = 4.919;
    var alphaY = 0.4919;

    var c = parseFloat(slider[0].value);
    var Q = parseFloat(slider[1].value);
    var R = parseFloat(slider[2].value);  
    var b = parseFloat(slider[3].value); 
    var y = parseFloat(slider[4].value); 
    var lambda = parseFloat(slider[5].value); 
    var Dstar = parseFloat(slider[6].value);

    q = Q/Area; 
    v = 0.187;
    var DL = (alphaX*v) + Dstar;
    var DT = (alphaY*v) + Dstar;
    var DLR = DL/R;
    var DTR = DT/R;
    var vR = v/R;
    

    
    const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

    var xyValues = [];
  
    for(let i =0; i<xValues.length; i++){
  
      var obj = {};
      obj.x = xValues[i];
      var a1 = Q*c/b/(2*Math.PI*(DTR*DLR)**0.5)*Math.exp(vR*xValues[i]/(2*DLR));
      var a2 = ((vR**2)/(4*DLR)*(((xValues[i]**2)/DLR)+(y**2)/DTR))**0.5;
      var C = a1*BESSEL.besselk(a2,0)*Math.exp((-Math.log(2)/lambda)*time);
      obj.y = C.toFixed(2);
      xyValues.push(obj);
    }
  
  chart1 = new Chart(ctx1,{
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth:1.2,
        pointRadius:2.5,
        pointBackgroundColor: 'rgb(153, 102, 255)',
        data: xyValues,
        fill: false,
        showLine: true,
        tension:0.4
      }]
    },
    options: {
      animation: false,
      scales: {
        x: {
          position: 'bottom',
          min: 0, max:600,
          title: {
            display: true,
            text: 'Distance (m)',
            font: {
              size: 15
          }
        }
        },
        y:{
          min: 0,
          max: 100.0,
          position: 'left',
          title: {
            display: true,
            text: 'Concentration (mg/L)',
            font: {
              size: 15
          }
        }
      }
    },
    responsive: true,
      plugins: {
        title: {
            display: true,
            text: 'Concentration with Distance',
            font: {
              size: 17
          }
        },
        legend: {
          display: false
      },
      zoom: {
        limits: {
          x: {min: 0, max: 35},
          y: {min: 0}
        },
        pan: {
          enabled: true,
          mode: 'y',
        },
        zoom: {
          wheel: {
            enabled: myZoom1,
            speed:0.05
          },
          pinch: {
            enabled: false
          },
          mode: 'y',
        }
      }
    }
  }});
  $(document).scrollTop(pos);
  }

//sliders
slider[0].oninput = function() {
 mychart();
output[0].innerHTML = slider[0].value;
  }

slider[1].oninput = function() {
 mychart();
output[1].innerHTML = slider[1].value;
flow.innerHTML = "Darcy velocity (q): " + q.toFixed(2) + " m/day";
  }

slider[2].oninput = function() {
 mychart();
output[2].innerHTML = slider[2].value;
  }

slider[3].oninput = function() {
 mychart();
 output[3].innerHTML = slider[3].value;
 myTime.innerHTML = slider[3].value;
  }

slider[4].oninput = function() {
 mychart();
output[4].innerHTML = slider[4].value;
  }

slider[5].oninput = function() {
 mychart();
output[5].innerHTML = slider[5].value;
  }

slider[6].oninput = function() {
  mychart();

  output[6].innerHTML = slider[6].value;
    }

  //button
  $(".btn").mousedown(function(){
    $(this).addClass("pressed");
});

$(".btn").mouseup(function(){
    $(this).removeClass("pressed");
});



$(".btn").on("tap",function(){
    $(this).removeClass("pressed");
});

$(".btn").mouseout(function(){
    $(this).removeClass("pressed");
});
