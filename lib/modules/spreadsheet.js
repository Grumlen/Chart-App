define(["modules/storage","modules/display"],
  function(storage,display) {
    function createCell(sheet,tr,column,i) { // Creates the individual cells of the table
      var td, div, input;
      tr.appendChild(td = document.createElement("td"));
      td.appendChild(div = document.createElement("div"));
      div.className = "ui fluid input";
      div.appendChild(input = document.createElement("input"));
      input.id = column+" "+i;
      input.type = "number";
      input.value = sheet[column][i];
    }
    function generateSheet() { // Generates the interactive table from localStorage
      var sheet = storage.retrieve(),
          table = document.createElement("table"),
          thead, trhead, blank;
      table.className = "ui celled striped inverted brown unstackable table";
      table.appendChild(thead = document.createElement("thead"));
      thead.appendChild(trhead = document.createElement("tr"));
      trhead.appendChild(blank = document.createElement("th"));
      for (var column in sheet) {
        var th;
        trhead.appendChild(th = document.createElement("th"));
        th.textContent = column;
      }
      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
      for (let i=0;i<sheet[Object.keys(sheet)[i]].length;i++) {
        let tr, tdtitle;
        tbody.appendChild(tr = document.createElement("tr"));
        tr.appendChild(tdtitle = document.createElement("td"));
        tdtitle.textContent = "Row "+i;
        for (var column in sheet) {
          createCell(sheet,tr,column,i);
        }
      }
      return table;
    }
    function update(column,row,edit) { // Updates localStorage and passes command to update the chart
      storage.store(column,row,edit);
      chart();
    }
    function chart(chartType="bar",button=true) { // Delegates initial create of chart and changing of the chart
      display.graph(storage.retrieve(),chartType,button)
    }
    return {
      generateSheet,
      update,
      chart
    }
  }
);
