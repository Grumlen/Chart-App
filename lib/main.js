require(["modules/Chart","modules/spreadsheet"],
  function(Chart,spreadsheet) {
    var table = document.getElementById("sheet"),
        chartButtons = document.getElementById("chartButtons");
    table.appendChild(spreadsheet.generateSheet());
    spreadsheet.chart();
    table.addEventListener("input", function(e) {
      var tags = e.target.id.split(" ");
      spreadsheet.update(tags[0],tags[1],e.target.value);
    });
    chartButtons.addEventListener("click", function (e){
      if (e.target.tagName=="A") {
        var children = e.target.parentNode.children;
         spreadsheet.chart(e.target.id,false);
         for (let i=0;i<children.length;i++) {
           if (children[i].tagName=="A") children[i].className = "item";
         }
         e.target.className = "active item";
       }
    });
  }
);
