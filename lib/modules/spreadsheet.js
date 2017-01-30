define(["modules/storage","modules/display"],
  function(storage,display) {
    function createCell(sheet,tr,type,column,row) { // Creates the individual cells of the table
      var cell, div, input;
      if (type=="columns") cell = document.createElement("th")
      else  cell = document.createElement("td")
      tr.appendChild(cell);
      cell.appendChild(div = document.createElement("div"));
      div.className = `ui fluid input ${type}`;
      div.appendChild(input = document.createElement("input"));
      if (type=="data") {
        input.id = `${type} ${column} ${row}`;
        input.type = "number";
        input.value = sheet[type][column][row];
      }
      else {
        input.id = `${type} ${column}`;
        input.type = "text";
        input.value = sheet[type][column];
      }
    }
    function generateSheet() { // Generates the interactive table from localStorage
      console.log("Ran generateSheet");
      var sheet = storage.retrieve(),
          table = document.createElement("table"),
          thead, trhead, blank;
      table.className = "ui celled striped inverted brown unstackable compact table";
      table.appendChild(thead = document.createElement("thead"));
      thead.appendChild(trhead = document.createElement("tr"));
      trhead.appendChild(blank = document.createElement("th"));
      for (let i=0;i<sheet.columns.length;i++) {
        createCell(sheet,trhead,"columns",i);
      }
      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
      for (let i=0;i<sheet.rows.length;i++) {
        let tr;
        tbody.appendChild(tr = document.createElement("tr"));
        createCell(sheet,tr,"rows",i);
        let j=0;
        for (var column in sheet.columns) {
          createCell(sheet,tr,"data",j,i);
          j++;
        }
      }
      return table;
    }
    function update(edit,type,column,row) { // Updates localStorage and passes command to update the chart
      storage.store(edit,type,column,row);
      chart();
    }
    function chart(button=true,chartType="Bar") { // Delegates initial create of chart and changing of the chart
      display.graph(storage.retrieve(),chartType,button)
    }
    function edit(action,type,active="Bar") {
      if (action=="add") storage.add(type);
      else storage.remove(type);
      chart(true,active);
    }
    return {
      generateSheet,
      update,
      chart,
      edit
    }
  }
);
