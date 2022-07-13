function ERFC(value1){
  return 1-math.erf(value1);
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

var myZoom = false;
var C0 = 1000;
var q = 4;
var n = 0.3;
var v = q/n;

var Dstar = 0.0000000001;
var alphaX = 1;
var alphaY = 0.1;
var DL =  Dstar + (alphaX*v);
var Dt = Dstar + (alphaY*v);
var time = 22.22;

var x = 75;
var y = 20;
var Area = 5;

var ctx1 = document.getElementById("canvas1").getContext("2d");

const tValues = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];

var tyValues = [];

for(let i =0; i<tValues.length; i++){
  var obj = {};
  obj.x = tValues[i];
  var C2 = C0*Area/(4*(Math.PI)*tValues[i]*Math.sqrt(Dt*DL))*Math.exp(-((x-v*tValues[i])**2)/(4*DL*tValues[i])-y**2/(4*Dt*tValues[i]));
  obj.y = C2;
  tyValues.push(obj);
}

var chart1 = new Chart(ctx1,{
  type: 'scatter',
  data: {
    datasets: [{
      backgroundColor: '#4775c9',
      borderColor: '#4775c9',
      borderWidth:1.2,
      pointRadius:2.5,
      pointBackgroundColor: '#4775c9',
      data: tyValues,
      fill: false,
      showLine: true,
      tension:0.4
    }]
  },
  options: {
    scales: {
      x: {
        position: 'bottom',
        min: 0, max:35,
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 15
        }
      }
      },
      y:{
        position: 'left',
        title: {
          display: true,
          text: 'Distance',
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
        y: {min: 0, max: 10}
      },
      pan: {
        enabled: true,
        mode: 'y',
      },
      zoom: {
        wheel: {
          enabled: true,
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

  function resetZoom() {
    chart1.resetZoom();
  }

  // console.log(chart1.options.scales.yAxes[0].ticks.max);
//   console.log(chart1);
//   const zoomStatus = (chart) => (chart.options.plugins ? 'enabled' : 'disabled') + ' (' + chart.getZoomLevel() + 'x)';
// console.log(zoomStatus(chart1));
// console.log(chart1.getZoomLevel());
// chart1.zoom(1.7);
// console.log(chart1.getZoomLevel());
var str; 

var slider = document.querySelectorAll(".slider");
var output = document.querySelectorAll(".demo");

output[0].innerHTML = slider[0].value;
output[1].innerHTML = slider[1].value + " m/day, velocity = " + v.toFixed(2) + " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;

function enableZoom(value){
chart1.zoom(value);
console.log(chart1.getZoomLevel());
}

var zoomLvL;

  //function slider
  function mychart(){
    zoomLvL = chart1.getZoomLevel();
    let pos = $(document).scrollTop();
    chart1.destroy();

    //initial conditions (without sorption)
    C0 = slider[0].value;
    q = slider[1].value;
    var n = 0.3;
    var v = q/n;
    
    var Dstar = parseFloat(slider[2].value);
    var alphaX = 1;
    var alphaY = 0.1;
    var DL =  Dstar + (alphaX*v);
    var Dt = Dstar + (alphaY*v);
    var x = slider[3].value;
    var y = slider[4].value;
    var Area = slider[5].value;
  
      output[0].innerHTML = slider[0].value;
  
      const tValues = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
  
  var tyValues = [];
  
  for(let i =0; i<tValues.length; i++){
    var obj = {};
    obj.x = tValues[i];
    var C2 = C0*Area/(4*(Math.PI)*tValues[i]*Math.sqrt(Dt*DL))*Math.exp(-((x-v*tValues[i])**2)/(4*DL*tValues[i])-y**2/(4*Dt*tValues[i]));
    obj.y = expo(C2, 4);
    tyValues.push(obj);
  }
  
  chart1 = new Chart(ctx1,{
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor: '#4775c9',
        borderColor: '#4775c9',
        borderWidth:1.2,
        pointRadius:2.5,
        pointBackgroundColor: '#4775c9',
        data: tyValues,
        fill: false,
        showLine: true,
        tension:0.4
      }]
    },
    options: {
      animation: false,
      legend:{
          display:false
      },
      tooltips: {
        mode: 'label',
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        x: {
        min: 0, max:35,
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 15
        }
      }
      },
      y:{
        min: 0,
           max:0.00080,
           title: {
            display: true,
            text: 'Distance',
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
        y: {min: 0, max: 10}
      },
      pan: {
        enabled: true,
        mode: 'y',
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: false
        },
        mode: 'y',
      }
    }
  }
    }
  });
  $(document).scrollTop(pos);
  chart1.zoom(zoomLvL);
  }

  slider[0].oninput = function() {
    mychart();
    console.log(chart1.options.scales.yAxes[0].ticks.max);
    console.log(zoomStatus(ctx1.chart1));
   output[0].innerHTML = slider[0].value;
     }
   
   slider[1].oninput = function() {
    mychart();
   output[1].innerHTML = slider[1].value;
     }
   
   slider[2].oninput = function() {
    mychart();
   output[2].innerHTML = slider[2].value;
     }
   
   slider[3].oninput = function() {
    mychart();
   output[3].innerHTML = slider[3].value;
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
   
   slider[7].oninput = function() {
    mychart();
   output[7].innerHTML = slider[7].value;
     }