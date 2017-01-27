require(["modules/Chart","modules/spreadsheet"],
  function(Chart,spreadsheet) {
    var table = document.getElementById("sheet"),
        chartButtons = document.getElementById("chartButtons"),
        menu = document.getElementById("menu");
    table.appendChild(spreadsheet.generateSheet());
    spreadsheet.chart();
    table.addEventListener("input", function(e) {
      var tags = e.target.id.split(" ");
      spreadsheet.update(e.target.value,tags[0],tags[1],tags[2]);
    });
    chartButtons.addEventListener("click", function(e) {
      if (e.target.tagName=="A") {
        var children = e.target.parentNode.children;
         spreadsheet.chart(e.target.id,false);
         for (let i=0;i<children.length;i++) {
           if (children[i].tagName=="A") children[i].className = "item";
         }
         e.target.className = "active item";
       }
    });
    menu.addEventListener("click", function(e) {
      if(e.target.className=="item") {
        var tags = e.target.id.split(" ");
        console.log(tags);
        spreadsheet.edit(tags[0],tags[1]);
      }
    });
  }
);
