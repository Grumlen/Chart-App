define([],
  function() {
    if(localStorage.getItem("myChart")) {
      var sheetObj = JSON.parse(localStorage.getItem("myChart"));
    }
    else var sheetObj = {
      Sunday: [0,0,0,0,0],
      Monday: [0,0,0,0,0],
      Tuesday: [0,0,0,0,0],
      Wednesday: [0,0,0,0,0],
      Thursday: [0,0,0,0,0],
      Friday: [0,0,0,0,0],
      Saturday: [0,0,0,0,0]
    }
    function store(day,index,edit) {
      sheetObj[day][index] = edit;
      localStorage.setItem("myChart", JSON.stringify(sheetObj));
    }
    function retrieve() {
      return sheetObj;
    }
    return {
      store,
      retrieve
    };
  }
);
