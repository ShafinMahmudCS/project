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

var myZoom = false;

var C0 = 25;

var q = 0.2;

var n = 0.35;
var v = q / n;
var R = 1;
var vR = v / R;
var alpha = 1;

var Dstar = 0.0000000001;
var D = Dstar + (alpha * v);

var DR = D / R;

var distance = 80;

var lambda = 90;

var ctx2 = document.getElementById("canvas2");

const tValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 240, 280, 320, 360, 440, 520, 600, 680, 840, 1000];

var tyValues = [];

for (let i = 0; i < tValues.length; i++) {
  var obj = {};
  obj.x = tValues[i];
  var C2 = (C0 / 2) * (ERFC((distance - vR * tValues[i]) / (2 * Math.sqrt(DR * tValues[i]))) - (Math.exp(vR * distance / DR)) * (ERFC((distance + vR * tValues[i]) / (2 * Math.sqrt(DR * tValues[i]))))) * (Math.exp((-Math.log(2) / lambda) * tValues[i]));
  obj.y = C2.toFixed(2);
  console.log(C2);
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
        min: 0, max:1000,
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
        max: 35.0,
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
        x: {min: 0, max: 1000},
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

var C0 = 25;

var q = 0.2;

var n = 0.35;
var v = q/n;
var R = 1;
var vR = v/R;
var alpha = 1;

var Dstar = 0.0000000001;
var D =  Dstar + (alpha*v);

var DR = D/R;

var lambda = 90;
var time = 80;

var ctx1 = document.getElementById("canvas1").getContext("2d");

  const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

  var xyValues = [];

  console.log(Math.exp(-Math.log10(2)/lambda*time));
  for(let i =0; i<xValues.length; i++){
    var obj = {};
    obj.x = xValues[i];
    var C = (C0/2)*(ERFC((xValues[i]-vR*time)/(2*Math.sqrt(DR*time)))-(Math.exp(vR*xValues[i]/DR)*(ERFC((xValues[i]+vR*time)/(2*Math.sqrt(DR*time))))))*(Math.exp(-(Math.log(2)/lambda*time)));
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
        max: 35.0,
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


  // console.log(chart1.options.scales.yAxes[0].ticks.max);


var str; 

var slider = document.querySelectorAll(".slider");
var output = document.querySelectorAll(".demo");
var myTime = document.querySelector(".myTime");

output[0].innerHTML = slider[0].value;
output[1].innerHTML = slider[1].value + " m/day, Pore water velocity (v) : " + v.toFixed(2) + " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
myTime.innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;
  //function slider

  function mychart(){
    let pos = $(document).scrollTop();
    chart1.destroy();

    //initial conditions (without sorption)
    var C0 = parseFloat(slider[0].value);
    var q = parseFloat(slider[1].value);
    var alpha = 1;
  
    var n = 0.35;
    v = q / n;
    var R = parseFloat(slider[4].value);
    var vR = v / R;
    var Dstar = parseFloat(slider[2].value);
    var D = Dstar + (alpha * v);
    var DR = D / R;
    var time = parseFloat(slider[3].value);
    var lambda = parseFloat(slider[5].value);
    
    const xValues = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];
    
    var xyValues = [];
    
    for(let i =0; i<xValues.length; i++){
      var obj = {};
      obj.x = xValues[i];
      var C = (C0/2)*(ERFC((xValues[i]-vR*time)/(2*Math.sqrt(DR*time)))-(Math.exp(vR*xValues[i]/DR)*(ERFC((xValues[i]+vR*time)/(2*Math.sqrt(DR*time))))))*(Math.exp(-(Math.log(2)/lambda*time)));
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
          max: 35.0,
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

  function mychart2(){
    let pos = $(document).scrollTop();
    chart2.destroy();

    //initial conditions (without sorption)
    var C0 = parseFloat(slider[0].value);
    var q = parseFloat(slider[1].value);
    var alpha = 1;
  
    var n = 0.35;
    var v = q / n;
    var R = parseFloat(slider[4].value);
    var vR = v / R;
    var Dstar = parseFloat(slider[2].value);
    var D = Dstar + (alpha * v);
    var DR = D / R;
    var distance = parseFloat(slider[3].value);
    var lambda = parseFloat(slider[5].value);
  
  const tValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 240, 280, 320, 360, 440, 520, 600, 680, 840, 1000];

  var tyValues = [];
  
  for (let i = 0; i < tValues.length; i++) {
    var obj = {};
    obj.x = tValues[i];
    var C2 = (C0 / 2) * (ERFC((distance - vR * tValues[i]) / (2 * Math.sqrt(DR * tValues[i]))) - (Math.exp(vR * distance / DR)) * (ERFC((distance + vR * tValues[i]) / (2 * Math.sqrt(DR * tValues[i]))))) * (Math.exp((-Math.log(2) / lambda) * tValues[i]));
    obj.y = C2.toFixed(2);
    console.log(C2);
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
          min: 0, max:1000,
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
          max: 35.0,
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
          x: {min: 0, max: 1000},
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
            
  // $("#canvas1").load(" #canvas1");

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
