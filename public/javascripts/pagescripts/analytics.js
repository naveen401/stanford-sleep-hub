var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

//Pull only for last 7 days

function createDailySleepTotalsGraph(){
  $.get("/sleep/data", function(data){
    data.sort(function(a,b){ return new Date(b.createdAt) - new Date(a.createdAt); });
    var dataArray = ['Hours of Sleep', 0, 0, 0, 0, 0, 0, 0];
    var dateArray = [];
    var currentDate = new Date();
    for(var i = 0; i < days.length; i++){
      dateArray.unshift(days[currentDate.getDay()]);
      currentDate.setDate(currentDate.getDate()-1);
    }
    if(data.length > 7) data = data.slice(0, 7);
    for(var i = 0; i < data.length; i++){
      var date = new Date(data[i].createdAt);
      dataArray[dateArray.indexOf(days[date.getUTCDay()])+1] = data[i].totalSleep;
    }
    var chart = c3.generate({
      bindto: '#sleep_chart',
      data: {
          columns: [
              dataArray
          ]
      },
      axis: {
          x: {
              type: 'categorized',
              categories: dateArray
          }
      }
    });
  });
}

function createDailyLOAGraph(){
  $.get("/alertness/data", function(data){
    data.sort(function(a,b){ return new Date(b.createdAt) - new Date(a.createdAt); });
    var dataArray = ['Hours of Sleep', 0, 0, 0, 0, 0, 0, 0];
    var dateArray = [];
    var currentDate = new Date();
    for(var i = 0; i < days.length; i++){
      dateArray.unshift(days[currentDate.getDay()]);
      currentDate.setDate(currentDate.getDate()-1);
    }
    console.log(data[i]);
    if(data.length > 7) data = data.slice(0, 7);
    for(var i = 0; i < data.length; i++){
      var date = new Date(data[i].createdAt);
      dataArray[dateArray.indexOf(days[date.getUTCDay()])+1] = data[i].numLOAlogged;
    }
    var chart = c3.generate({
      bindto: '#alert_chart',
      data: {
          columns: [
              dataArray
          ]
      },
      axis: {
          x: {
              type: 'categorized',
              categories: dateArray
          }
      }
    });
  });
}

function createDailyLOASleepComparisonGraph(){
  $.get("/alertness/data", function(data){
    data.sort(function(a,b){ return new Date(b.createdAt) - new Date(a.createdAt); });
    var dataArray1 = ['Hours of Sleep', 0, 0, 0, 0, 0, 0, 0];
    var dataArray2 = ['Levels of Alertness', 0, 0, 0, 0, 0, 0, 0];
    var dateArray = [];
    var currentDate = new Date();
    for(var i = 0; i < days.length; i++){
      dateArray.unshift(days[currentDate.getDay()]);
      currentDate.setDate(currentDate.getDate()-1);
    }
    console.log(data[i]);
    if(data.length > 7) data = data.slice(0, 7);
    for(var i = 0; i < data.length; i++){
      var date = new Date(data[i].createdAt);
      dataArray1[dateArray.indexOf(days[date.getUTCDay()])+1] = data[i].numLOAlogged;
      dataArray2[dateArray.indexOf(days[date.getUTCDay()])+1] = data[i].totalSleep;
    }
    var chart = c3.generate({
      bindto: '#comparison_chart',
      data: {
          columns: [
              dataArray1,
              dataArray2
          ]
      },
      axis: {
          x: {
              type: 'categorized',
              categories: dateArray
          }
      }
    });
  });
}

function createWeekSleepBreakdownGraph(){
  $.get("/breakdown/data", function(data){
    data.sort(function(a,b){ return new Date(b.createdAt) - new Date(a.createdAt); });
    var columnsArray = [];
    var dateArray = [];
    var currentDate = new Date();
    for(var i = 0; i < days.length; i++){
      dateArray.unshift(days[currentDate.getDay()]);
      currentDate.setDate(currentDate.getDate()-1);
    }
    if(data.length > 7) data = data.slice(0, 7);
    for(var i = 0; i < data.length; i++){
      var date = new Date(data[i].createdAt);
      columnsArray.push([dateArray[dateArray.indexOf(days[date.getUTCDay()])], data[i].totalSleep]);
    }
    var chart = c3.generate({
      bindto: '#breakdown_chart',
      data: {
          columns: columnsArray,
          type: 'pie',
      },
      axis: {
          x: {
              type: 'categorized',
              categories: dateArray
          }
      }
    });
  });
}



// var chart = c3.generate({
//     bindto: '#loa_chart',
//     data: {
//         columns: [
//             ['Hours of Sleep', 30, 200, 100, 400, 150, 250, 50]
//         ]
//     },
//     axis: {
//         x: {
//             type: 'categorized',
//             categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
//         }
//     }
// });


//var chart = c3.generate({
 //   bindto: '#sleep_chart',
  //  data: {
   //     columns: [
    //        ['Hours of Sleep', 30, 200, 10000, 400, 150, 250, 50]
     //   ]
  //},
   // axis: {
    //    x: {
     //       type: 'categorized',
      //      categories: days
       // }
    //}
//});