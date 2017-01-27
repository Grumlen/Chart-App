define([],
  function() {
    if(localStorage.getItem("myChart")) {
      var sheetObj = JSON.parse(localStorage.getItem("myChart"));
    }
    else var sheetObj = {
      data: [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      columns: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      rows: ["Row1","Row2","Row3","Row4","Row5"]
    }
    function store(edit,type,index1,index2) {
      if (index2) sheetObj[type][index1][index2] = edit;
      else sheetObj[type][index1] = edit;
      localStorage.setItem("myChart", JSON.stringify(sheetObj));
    }
    function retrieve() {
      return sheetObj;
    }
    function add(type) {
      sheetObj[type].push("Untitled");
      if (type=="rows") {
        for(let i=0;i<sheetObj.columns.length;i++) {
          sheetObj.data[i].push(0);
        }
      } else {
        sheetObj.data.push(new Array(sheetObj.rows.length).fill(0));
      }
      console.log(sheetObj);
      localStorage.setItem("myChart", JSON.stringify(sheetObj));
    }
    function remove(type) {
      sheetObj[type].pop();
      if (type=="rows") {
        for(let i=0;i<sheetObj.columns.length;i++) {
          sheetObj.data[i].pop();
        }
      } else {
        sheetObj.data.pop();
      }
      console.log(sheetObj);
      localStorage.setItem("myChart", JSON.stringify(sheetObj));
    }
    return {
      store,
      retrieve,
      add,
      remove
    };
  }
);
