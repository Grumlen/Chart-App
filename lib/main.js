require(["modules/Chart","modules/spreadsheet"],
  function(Chart,spreadsheet) {
    var table = document.getElementById("chart"),
        buttons = document.getElementById("buttons");
    table.appendChild(spreadsheet.generateSheet());
    spreadsheet.chart();
    table.addEventListener("input", function(e) {
      var tags = e.target.id.split(" ");
      spreadsheet.update(tags[0],tags[1],e.target.value);
    });
    buttons.addEventListener("click", function (e){
      if (e.target.tagName=="BUTTON") spreadsheet.chart(e.target.id,false);
    });
  }
);
