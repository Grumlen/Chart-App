define(["modules/Chart"],
  function(Chart) {
    var ctx = document.getElementById("myChart"),
        myChart;
    function genData (data,chartType="bar") {
      var result = [], i = 0,
          colors = ["red","blue","orange","purple","green","brown","magenta"];
      for (var header in data) {
        if (chartType=="bar") {
          result.push({
            label: header,
            data: data[header],
            backgroundColor: colors[i]
          })
        } else if (chartType=="line" || chartType=="radar") {
          result.push({
            label: header,
            data: data[header],
            borderColor: colors[i],
            borderWidth: 5
          })
        }
        i++;
      }
      return result;
    }
    function graph(data,chartType,button) {
      if (myChart && button) return myChart.update();
      if (!button) myChart.destroy();
      myChart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"],
          datasets: genData(data,chartType)
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    }
    return {
      graph
    }
  }
);
