//preloader
var loader = setInterval(function () {
  if(document.readyState !== "complete") return;
  clearInterval(loader);
  document.querySelector('.spinner-wrapper').style.display = "none";
}, 250);

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

var  m = 1000;
var Area = 1;
var n = 0.35;
var q = 0.08;
var Dstar = 0.00000864;
var alphaX = 5;
var R = 1;
var v = q/n;
var DL =  Dstar + (alphaX*v);
var vR = v/R;
var DR = DL/R;
var time = 100;
var distance = 50;

var lambda = 500;




var ctx2 = document.getElementById("canvas2");

var tValues = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 76, 81, 86, 91, 96, 100, 150, 200, 300, 500];

var tyValues = [];

for(let i =0; i<tValues.length; i++){
  var obj = {};
  obj.x = tValues[i];
  var a1 = m/Area/n/Math.sqrt(4*Math.PI*DR*tValues[i]);
  console.log(a1);
  var a2 = 0-((distance-vR*tValues[i])**2)/(4*DR*tValues[i]);
  console.log(a2);
  var C = a1*Math.exp(a2)*Math.exp(-Math.log(2)/lambda*tValues[i]);
  console.log(C);
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
        min: 0, max:600,
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
        max: 60.0,
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

var  m = 1000;
var Area = 1;
var n = 0.35;
var q = 0.08;
var Dstar = 0.00000864;
var alphaX = 5;
var R = 1;
var v = q/n;
var DL =  Dstar + (alphaX*v);
var vR = v/R;
var DR = DL/R;
var time = 50;
var distance = 50;

var lambda = 500;

var a1 = m/Area/n/Math.sqrt(4*Math.PI*DR*time);


var ctx1 = document.getElementById("canvas1").getContext("2d");

    const xValues = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40, 42.5, 45, 47.5, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];

var xyValues = [];

for(let i =0; i<xValues.length; i++){
  var obj = {};
  obj.x = xValues[i];
  var a2 = 0-((xValues[i]-vR*time)**2)/(4*DR*time);
  var C = a1*Math.exp(a2)*Math.exp(-Math.log(2)/lambda*time);
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
myTime.innerHTML = slider[2].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;
output[6].innerHTML = slider[6].value;
  //function slider

  function mychart(){
    let pos = $(document).scrollTop();
    chart1.destroy();

    //initial conditions (without sorption)
    var m = slider[0].value;
    var Area = slider[3].value;
    var n = 0.35;
    var q = slider[1].value;
    var Dstar = parseFloat(slider[6].value);
    var alphaX = 5;
    var R = slider[4].value;
    var v = q/n;
    var DL =  Dstar + (alphaX*v);
    var vR = v/R;
    var DR = DL/R;
    var time = slider[2].value;
    var lambda = slider[5].value;

    var a1 = m/Area/n/Math.sqrt(4*Math.PI*DR*time);

    
    const xValues = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40, 42.5, 45, 47.5, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];

    var xyValues = [];
    
    for(let i =0; i<xValues.length; i++){
      var obj = {};
      obj.x = xValues[i];
      var a2 = 0-((xValues[i]-vR*time)**2)/(4*DR*time);
      var C = a1*Math.exp(a2)*Math.exp(-Math.log(2)/lambda*time);
      obj.y = expo(C, 7);
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
  var m = slider[0].value;
  var q = slider[1].value;
  var distance = slider[2].value;
  var n = 0.35;
  v = q/n;
  var Area = slider[3].value;
  var R = slider[4].value;
  var lambda = slider[5].value;
  var vR = v/R;
  
  var Dstar = parseFloat(slider[6].value);

var alphaX = 5;
var DL =  Dstar + (alphaX*v);
var DR = DL/R;

  
  var tValues = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 76, 81, 86, 91, 96, 100, 150, 200, 300, 500];

  var tyValues = [];
  
  for(let i =0; i<tValues.length; i++){
    var obj = {};
    obj.x = tValues[i];
    var a1 = m/Area/n/Math.sqrt(4*Math.PI*DR*tValues[i]);
    console.log(a1);
    var a2 = 0-((distance-vR*tValues[i])**2)/(4*DR*tValues[i]);
    console.log(a2);
    var C = a1*Math.exp(a2)*Math.exp(-Math.log(2)/lambda*tValues[i]);
    console.log(C);
    obj.y = C;
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
          min: 0, max:600,
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
          max: 60.0,
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
