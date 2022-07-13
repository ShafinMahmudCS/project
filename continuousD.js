
function ERFC(value1){
  return 1-math.erf(value1);
}

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

  const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

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
        backgroundColor: '#4775c9',
        borderColor: '#4775c9',
        borderWidth:1.2,
        pointRadius:2.5,
        pointBackgroundColor: '#4775c9',
        data: xyValues,
        fill: false,
        showLine: true
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Concentration with Distance",
        fontSize: 20
      },
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
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Distance (m)',
            fontSize: 17
          },
            ticks: {min: 0, max:600, fontSize: 13.5}
      }],
        yAxes: [{
          display: true,
          precision: 0.00,
          scaleLabel: {
            display: true,
            labelString: 'Concentration (mg/L)',
            fontSize: 17
          },
          ticks: {
            min: 0,
             max:30,
             fontSize: 13.5,
             callback: function(value, index, values) {
              return value + ".00";
          }}
        }]
      }
    }
  });


var str; 

var slider = document.querySelectorAll(".slider");
var output = document.querySelectorAll(".demo");

output[0].innerHTML = slider[0].value;
output[1].innerHTML = slider[1].value + " m/day, velocity = " + v.toFixed(2) + " m/day";
output[2].innerHTML = slider[2].value;
output[3].innerHTML = slider[3].value;
output[4].innerHTML = slider[4].value;
output[5].innerHTML = slider[5].value;

  //function slider

slider[0].oninput = function() {
 
  chart1.destroy();

  //initial conditions (without sorption)
  C0 = parseFloat(slider[0].value);
  q = parseFloat(slider[1].value);
  alpha = 1;

  var n = 0.35;
  var v = q / n;
  var R = parseFloat(slider[4].value);
  var vR = v / R;
  var Dstar = parseFloat(slider[2].value);
  var D = Dstar + (alpha * v);
  var DR = D / R;
  time = parseFloat(slider[3].value);
  var lambda = parseFloat(slider[5].value);

    output[0].innerHTML = slider[0].value;

    const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];

    var xyValues = [];
  
    console.log(Math.exp(-Math.log10(2)/lambda*time));
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
          backgroundColor: '#4775c9',
          borderColor: '#4775c9',
          borderWidth:1.2,
          pointRadius:2.5,
          pointBackgroundColor: '#4775c9',
          data: xyValues,
          fill: false,
          showLine: true
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Concentration with Distance",
          fontSize: 20
        },
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
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Distance (m)',
              fontSize: 17
            },
              ticks: {min: 0, max:600, fontSize: 13.5}
        }],
          yAxes: [{
            display: true,
            precision: 0.00,
            scaleLabel: {
              display: true,
              labelString: 'Concentration (mg/L)',
              fontSize: 17
            },
            ticks: {
              min: 0,
               max:30,
               fontSize: 13.5,
               callback: function(value, index, values) {
                return value + ".00";
            }}
          }]
        }
      }
    });
  }

  slider[1].oninput = function() {
 
    chart1.destroy();
  
    //initial conditions (without sorption)
    C0 = parseFloat(slider[0].value);
    q = parseFloat(slider[1].value);
    alpha = 1;
  
    var n = 0.35;
    var v = q / n;
    var R = parseFloat(slider[4].value);
    var vR = v / R;
    var Dstar = parseFloat(slider[2].value);
    var D = Dstar + (alpha * v);
    var DR = D / R;
    time = parseFloat(slider[3].value);
    var lambda = parseFloat(slider[5].value);
  
      output[1].innerHTML = slider[1].value + " m/day, velocity = " + v.toFixed(2) + " m/day";
  
      const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];
  
      var xyValues = [];
    
      console.log(Math.exp(-Math.log10(2)/lambda*time));
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
            backgroundColor: '#4775c9',
            borderColor: '#4775c9',
            borderWidth:1.2,
            pointRadius:2.5,
            pointBackgroundColor: '#4775c9',
            data: xyValues,
            fill: false,
            showLine: true
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Concentration with Distance",
            fontSize: 20
          },
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
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Distance (m)',
                fontSize: 17
              },
                ticks: {min: 0, max:600, fontSize: 13.5}
          }],
            yAxes: [{
              display: true,
              precision: 0.00,
              scaleLabel: {
                display: true,
                labelString: 'Concentration (mg/L)',
                fontSize: 17
              },
              ticks: {
                min: 0,
                 max:30,
                 fontSize: 13.5,
                 callback: function(value, index, values) {
                  return value + ".00";
              }}
            }]
          }
        }
      });
    }
  

    slider[2].oninput = function() {
 
      chart1.destroy();
    
      //initial conditions (without sorption)
      C0 = parseFloat(slider[0].value);
      q = parseFloat(slider[1].value);
      alpha = 1;
    
      var n = 0.35;
      var v = q / n;
      var R = parseFloat(slider[4].value);
      var vR = v / R;
      var Dstar = parseFloat(slider[2].value);
      var D = Dstar + (alpha * v);
      var DR = D / R;
      time = parseFloat(slider[3].value);
      var lambda = parseFloat(slider[5].value);
    
        output[2].innerHTML = slider[2].value;
    
        const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];
    
        var xyValues = [];
      
        console.log(Math.exp(-Math.log10(2)/lambda*time));
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
              backgroundColor: '#4775c9',
              borderColor: '#4775c9',
              borderWidth:1.2,
              pointRadius:2.5,
              pointBackgroundColor: '#4775c9',
              data: xyValues,
              fill: false,
              showLine: true
            }]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: "Concentration with Distance",
              fontSize: 20
            },
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
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Distance (m)',
                  fontSize: 17
                },
                  ticks: {min: 0, max:600, fontSize: 13.5}
            }],
              yAxes: [{
                display: true,
                precision: 0.00,
                scaleLabel: {
                  display: true,
                  labelString: 'Concentration (mg/L)',
                  fontSize: 17
                },
                ticks: {
                  min: 0,
                   max:30,
                   fontSize: 13.5,
                   callback: function(value, index, values) {
                    return value + ".00";
                }}
              }]
            }
          }
        });
      }
    
      slider[3].oninput = function() {
 
        chart1.destroy();
      
        //initial conditions (without sorption)
        C0 = parseFloat(slider[0].value);
        q = parseFloat(slider[1].value);
        alpha = 1;
      
        var n = 0.35;
        var v = q / n;
        var R = parseFloat(slider[4].value);
        var vR = v / R;
        var Dstar = parseFloat(slider[2].value);
        var D = Dstar + (alpha * v);
        var DR = D / R;
        time = parseFloat(slider[3].value);
        var lambda = parseFloat(slider[5].value);
      
          output[3].innerHTML = slider[3].value;
      
          const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];
      
          var xyValues = [];
        
          console.log(Math.exp(-Math.log10(2)/lambda*time));
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
                backgroundColor: '#4775c9',
                borderColor: '#4775c9',
                borderWidth:1.2,
                pointRadius:2.5,
                pointBackgroundColor: '#4775c9',
                data: xyValues,
                fill: false,
                showLine: true
              }]
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: "Concentration with Distance",
                fontSize: 20
              },
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
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Distance (m)',
                    fontSize: 17
                  },
                    ticks: {min: 0, max:600, fontSize: 13.5}
              }],
                yAxes: [{
                  display: true,
                  precision: 0.00,
                  scaleLabel: {
                    display: true,
                    labelString: 'Concentration (mg/L)',
                    fontSize: 17
                  },
                  ticks: {
                    min: 0,
                     max:30,
                     fontSize: 13.5,
                     callback: function(value, index, values) {
                      return value + ".00";
                  }}
                }]
              }
            }
          });
        }

        slider[4].oninput = function() {
 
          chart1.destroy();
        
          //initial conditions (without sorption)
          C0 = parseFloat(slider[0].value);
          q = parseFloat(slider[1].value);
          alpha = 1;
        
          var n = 0.35;
          var v = q / n;
          var R = parseFloat(slider[4].value);
          var vR = v / R;
          var Dstar = parseFloat(slider[2].value);
          var D = Dstar + (alpha * v);
          var DR = D / R;
          time = parseFloat(slider[3].value);
          var lambda = parseFloat(slider[5].value);
        
            output[4].innerHTML = slider[4].value;
        
            const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];
        
            var xyValues = [];
          
            console.log(Math.exp(-Math.log10(2)/lambda*time));
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
                  backgroundColor: '#4775c9',
                  borderColor: '#4775c9',
                  borderWidth:1.2,
                  pointRadius:2.5,
                  pointBackgroundColor: '#4775c9',
                  data: xyValues,
                  fill: false,
                  showLine: true
                }]
              },
              options: {
                responsive: true,
                title: {
                  display: true,
                  text: "Concentration with Distance",
                  fontSize: 20
                },
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
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Distance (m)',
                      fontSize: 17
                    },
                      ticks: {min: 0, max:600, fontSize: 13.5}
                }],
                  yAxes: [{
                    display: true,
                    precision: 0.00,
                    scaleLabel: {
                      display: true,
                      labelString: 'Concentration (mg/L)',
                      fontSize: 17
                    },
                    ticks: {
                      min: 0,
                       max:30,
                       fontSize: 13.5,
                       callback: function(value, index, values) {
                        return value + ".00";
                    }}
                  }]
                }
              }
            });
          }

          slider[5].oninput = function() {
 
            chart1.destroy();
          
            //initial conditions (without sorption)
            C0 = parseFloat(slider[0].value);
            q = parseFloat(slider[1].value);
            alpha = 1;
          
            var n = 0.35;
            var v = q / n;
            var R = parseFloat(slider[4].value);
            var vR = v / R;
            var Dstar = parseFloat(slider[2].value);
            var D = Dstar + (alpha * v);
            var DR = D / R;
            time = parseFloat(slider[3].value);
            var lambda = parseFloat(slider[5].value);
          
              output[5].innerHTML = slider[5].value;
          
              const xValues = [0, 1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 420, 460, 500];
          
              var xyValues = [];
            
              console.log(Math.exp(-Math.log10(2)/lambda*time));
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
                    backgroundColor: '#4775c9',
                    borderColor: '#4775c9',
                    borderWidth:1.2,
                    pointRadius:2.5,
                    pointBackgroundColor: '#4775c9',
                    data: xyValues,
                    fill: false,
                    showLine: true
                  }]
                },
                options: {
                  responsive: true,
                  title: {
                    display: true,
                    text: "Concentration with Distance",
                    fontSize: 20
                  },
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
                    xAxes: [{
                      display: true,
                      scaleLabel: {
                        display: true,
                        labelString: 'Distance (m)',
                        fontSize: 17
                      },
                        ticks: {min: 0, max:600, fontSize: 13.5}
                  }],
                    yAxes: [{
                      display: true,
                      precision: 0.00,
                      scaleLabel: {
                        display: true,
                        labelString: 'Concentration (mg/L)',
                        fontSize: 17
                      },
                      ticks: {
                        min: 0,
                         max:30,
                         fontSize: 13.5,
                         callback: function(value, index, values) {
                          return value + ".00";
                      }}
                    }]
                  }
                }
              });
            }          
      
  $("#canvas1").load(" #canvas1");
