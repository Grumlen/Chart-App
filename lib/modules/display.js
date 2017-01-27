define(["modules/Chart"],
  function(Chart) {
    var ctx = document.getElementById("myChart"),
        myChart;
    function genData (data,chartType="bar") { // Formats data in preparation for graphing
      var dataSet = [], i = 0;
          colors = ["red","blue","orange","purple","green","brown","magenta"];
      for (var header in data) {
        if (chartType=="Bar") {
          dataSet.push({
            label: header,
            data: data[header],
            backgroundColor: colors[i]
          })
        } else if (chartType=="Line") {
          dataSet.push({
            label: header,
            data: data[header],
            borderColor: colors[i],
            borderWidth: 4
          })
        } else if (chartType=="Radar") {
          dataSet.push({
            label: header,
            data: data[header],
            borderColor: colors[i],
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: colors[i]
          })
        }
        i++;
        if (i>6) i=0;
      }
      return dataSet;
    }
    function genLabels (data) { // Creates the labels for the graph
      var count = data[Object.keys(data)[1]].length,
          labels = [];
      for (let i=0;i<count;i++) {
        labels.push("Row "+(i+1));
      }
      return labels;
    }
    function graph(data,chartType,button) { // Graphs the chart
      if (myChart && button) return myChart.update(); // Checks to see if just a number has been updated and simply updates the graph if that is true
      if (!button) myChart.destroy(); // Clears the canvas if the type of chart is being changed
      myChart = new Chart(ctx, { // Creates a new chart, replacing the old one if the type has been changed
        type: chartType.toLowerCase(),
        data: {
          labels: genLabels(data), // Gets array of labels
          datasets: genData(data,chartType) // Gets formatted data
        },
        options: {
          title: {
            display: true,
            text: chartType + " Graph"
          },
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
