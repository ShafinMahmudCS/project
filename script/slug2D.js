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

function toggleZoom1(){
  if(myZoom==true){
    myZoom = false;
  }else{
  myZoom = true;
  }
  mychart();
}

function toggleZoom2(){
  if(myZoom==true){
    myZoom = false;
  }else{
  myZoom = true;
  }
  mychart2();
}

// Initial Concentration vs Time graph on page load

var myZoom = false;
var C0 = 650;
var q = 4;
var n = 0.3;
var v = q/n;
var R = 1;
var vR = v/R;

var Dstar = 0.0000000001;
var alphaX = 1;
var alphaY = 0.1;
var DL =  Dstar + (alphaX*v);
var Dt = Dstar + (alphaY*v);
var DLR = DL/R;
var DtR = Dt/R;

var lambda = 1;

var x = 22;
var y = 5;
var Area = 5;

var ctx2 = document.getElementById("canvas2");

var tValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

var tyValues = [];

for(let i =0; i<tValues.length; i++){
  var obj = {};
  obj.x = tValues[i];
  var C = C0*Area/(4*(Math.PI)*tValues[i]*Math.sqrt(DtR*DLR))*Math.exp(-((x-vR*tValues[i])**2)/(4*DLR*tValues[i])-y**2/(4*DtR*tValues[i]))*(Math.exp(-(Math.log(2)/lambda*tValues[i])));
  obj.y = C;
  tyValues.push(obj);
}

var chart2 = new Chart(ctx2,{
  type: 'scatter',
  data: {
    datasets: [{
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor:'rgb(255, 99, 132)',
      borderWidth:1.2,
      pointRadius:2.5,
      pointBackgroundColor: 'rgb(255, 99, 132)',
      data: tyValues,
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
        min: 0, max:35,
        title: {
          display: true,
          text: 'Time (days)',
          font: {
            size: 15
        }
      }
      },
      y:{
        min: 0,
        max: 10.0,
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
          text: 'Concentration with Time',
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
          enabled: myZoom,
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

// Initial Concentration vs Distance graph on page load

var C0 = 650;
var q = 4;
var n = 0.3;
var v = q/n;
var R = 1;
var vR = v/R;

var Dstar = 0.0000000001;
var alphaX = 1;
var alphaY = 0.1;
var DL =  Dstar + (alphaX*v);
var Dt = Dstar + (alphaY*v);
var DLR = DL/R;
var DtR = Dt/R;
var time = 20;
var lambda = 1;

var x = 75;
var y = 20;
var Area = 5;

var ctx1 = document.getElementById("canvas1").getContext("2d");

    const xValues = [0.01, 1, 5, 10, 20, 30, 40, 50, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500];

var xyValues = [];

for(let i =0; i<xValues.length; i++){
  var obj = {};
  obj.x = xValues[i];
  var C = C0*Area/(4*(Math.PI)*time*Math.sqrt(DtR*DLR))*Math.exp(-((xValues[i]-vR*time)**2)/(4*DLR*time)-y**2/(4*DtR*time))*(Math.exp(-(Math.log(2)/lambda*time)));
  obj.y = expo(C, 7);
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
        max: 20.0,
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
          enabled: myZoom,
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
var myTime = document.querySelector(".myTime");

output[0].innerHTML = slider[0].value;
output[1].innerHTML = slider[1].value + " m/day, Pore water velocity (v) : " + v.toFixed(2) + " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
myTime.innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;
output[6].innerHTML = slider[6].value;
output[7].innerHTML = slider[7].value;
 
// Updating Concentration vs Distance graph

  function mychart(){
    let pos = $(document).scrollTop();
    chart1.destroy();

    //initial conditions (without sorption)
    var C0 = slider[0].value;
    var q = slider[1].value;
    var n = 0.3;
    var v = q/n;
    var R = slider[6].value;
    var vR = v/R;
    
    var Dstar = parseFloat(slider[2].value);
    var alphaX = 1;
    var alphaY = 0.1;
    var DL =  Dstar + (alphaX*v);
    var Dt = Dstar + (alphaY*v);
    var DLR = DL/R;
    var DtR = Dt/R;
    var time = slider[3].value;
    var lambda = slider[7].value;
    
    var x = 75;
    var y = slider[4].value;
    var Area = slider[5].value;
    
        const xValues = [0.01, 1, 5, 10, 20, 30, 40, 50, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500];
    
    var xyValues = [];
    
    for(let i =0; i<xValues.length; i++){
      var obj = {};
      obj.x = xValues[i];
      var C = C0*Area/(4*(Math.PI)*time*Math.sqrt(DtR*DLR))*Math.exp(-((xValues[i]-vR*time)**2)/(4*DLR*time)-y**2/(4*DtR*time))*(Math.exp(-(Math.log(2)/lambda*time)));
      obj.y = expo(C, 4);
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
          max: 20.0,
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
          y: {min: 0, max: 200}
        },
        pan: {
          enabled: true,
          mode: 'y',
        },
        zoom: {
          wheel: {
            enabled: myZoom,
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

  // Updating Concentration vs Time graph

  function mychart2(){
    let pos = $(document).scrollTop();
    chart2.destroy();

    //initial conditions (without sorption)
  var C0 = slider[0].value;
  var q = slider[1].value;
  var n = 0.3;
  v = q/n;
  var R = slider[6].value;
  var vR = v/R;
  
  var Dstar = parseFloat(slider[2].value);
  var alphaX = 1;
  var alphaY = 0.1;
  var DL =  Dstar + (alphaX*v);
  var Dt = Dstar + (alphaY*v);
  var DLR = DL/R;
  var DtR = Dt/R;
  var x = slider[3].value;
  var lambda = slider[7].value;
  
  var y = slider[4].value;
  var Area = slider[5].value;
  
  var tValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  
  var tyValues = [];
  
  for(let i =0; i<tValues.length; i++){
    var obj = {};
    obj.x = tValues[i];
    var C = C0*Area/(4*(Math.PI)*tValues[i]*Math.sqrt(DtR*DLR))*Math.exp(-((x-vR*tValues[i])**2)/(4*DLR*tValues[i])-y**2/(4*DtR*tValues[i]))*(Math.exp(-(Math.log(2)/lambda*tValues[i])));
    obj.y = expo(C, 4);
    tyValues.push(obj);
  }
  
  chart2 = new Chart(ctx2,{
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor:'rgb(255, 99, 132)',
        borderWidth:1.2,
        pointRadius:2.5,
        pointBackgroundColor: 'rgb(255, 99, 132)',
        data: tyValues,
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
          min: 0, max:35,
          title: {
            display: true,
            text: 'Time (days)',
            font: {
              size: 15
          }
        }
        },
        y:{
          min: 0,
          max: 10.0,
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
            text: 'Concentration with Time',
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
            enabled: myZoom,
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
 mychart2();
output[0].innerHTML = slider[0].value;
  }

slider[1].oninput = function() {
 mychart();
 mychart2();
output[1].innerHTML = slider[1].value + " m/day, Pore water velocity (v) : " + v.toFixed(2) + " m/day";;
  }

slider[2].oninput = function() {
 mychart();
 mychart2();
output[2].innerHTML = slider[2].value;
  }

slider[3].oninput = function() {
 mychart();
 mychart2();
 output[3].innerHTML = slider[3].value;
 myTime.innerHTML = slider[3].value;
  }

slider[4].oninput = function() {
 mychart();
 mychart2();
output[4].innerHTML = slider[4].value;
  }

slider[5].oninput = function() {
 mychart();
 mychart2();
output[5].innerHTML = slider[5].value;
  }

slider[6].oninput = function() {
 mychart();
 mychart2();
output[6].innerHTML = slider[6].value;
  }

slider[7].oninput = function() {
 mychart();
 mychart2();
output[7].innerHTML = slider[7].value;
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
