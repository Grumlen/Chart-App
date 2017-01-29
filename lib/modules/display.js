define(["modules/Chart"],
  function(Chart) {
    var ctx = document.getElementById("myChart"),
        myChart;
    function genData (data,chartType="bar") { // Formats data in preparation for graphing
      var dataSet = [], i = 0;
          colors = ["red","blue","orange","purple","green","brown","magenta"];
      for (i=0;i<data.columns.length;i++) {
        let j = i%7;
        if (chartType=="Bar") {
          dataSet[i] = {
            label: data.columns[i],
            data: data.data[i],
            backgroundColor: colors[j]
          }
        } else if (chartType=="Line") {
          dataSet[i] = {
            label: data.columns[i],
            data: data.data[i],
            borderColor: colors[j],
            borderWidth: 4
          }
        } else if (chartType=="Radar") {
          dataSet[i] = {
            label: data.columns[i],
            data: data.data[i],
            borderColor: colors[i],
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: colors[j]
          }
        }
      }
      return dataSet;
    }
    function genLabels (data) { // Creates the labels for the graph
      var count = data.length,
          labels = [];
      for (let i=0;i<count;i++) {
        labels.push(data[i]);
      }
      return labels;
    }
    function graph(data,chartType,button) { // Graphs the chart
      if (myChart && button) { // Checks to see if just a number has been updated and simply updates the graph if that is true
        if (myChart.data.datasets.length != data.columns.length) myChart.data.datasets = genData(data,chartType);
        else {
          for (let i=0;i<data.columns.length;i++) {
            myChart.data.datasets[i].label = data.columns[i];
          }
        }
        return myChart.update();
      }
      if (!button) myChart.destroy(); // Clears the canvas if the type of chart is being changed
      myChart = new Chart(ctx, { // Creates a new chart, replacing the old one if the type has been changed
        type: chartType.toLowerCase(),
        data: {
          labels: data.rows, // Gets array of labels
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
