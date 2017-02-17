require(["modules/Chart","modules/spreadsheet"],
  function(Chart,spreadsheet) {
    var sheet = document.getElementById("sheet"),
        chartButtons = document.getElementById("chartButtons"),
        menu = document.getElementById("menu");
    sheet.appendChild(spreadsheet.generateSheet());
    spreadsheet.chart();
    sheet.addEventListener("input", function(e) {
      var tags = e.target.id.split(" ");
      spreadsheet.update(e.target.value,tags[0],tags[1],tags[2]);
    });
    chartButtons.addEventListener("click", function(e) {
      if (e.target.tagName=="A") {
        var children = e.target.parentNode.children;
         spreadsheet.chart(false,e.target.id);
         for (let i=0;i<children.length;i++) {
           if (children[i].tagName=="A") children[i].className = "item";
         }
         e.target.className = "active item";
       }
    });
    menu.addEventListener("click", function(e) {
      if(e.target.className=="item") {
        var tags = e.target.id.split(" "),
            spread = document.getElementsByTagName("table"),
            active = document.getElementsByClassName("active")[0].id;
            console.log(active);
        spread[0].remove();
        spreadsheet.edit(tags[0],tags[1],active);
        sheet.appendChild(spreadsheet.generateSheet());
      }
    });
  }
);
