$.get("/sleep/data", function(data){
  for(var i = 0; i < data.length; i++){

  }
  alert(data); 
  var time = Date.parse(data[0].timeWakeUp["iso"])-Date.parse(data[0].timeAsleep["iso"]);
  alert(time);
});


var chart = c3.generate({
    bindto: '#loa_chart',
    data: {
        columns: [
            ['Hours of Sleep', 30, 200, 100, 400, 150, 250, 50]
        ]
    },
    axis: {
        x: {
            type: 'categorized',
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    }
});


var chart = c3.generate({
    bindto: '#sleep_chart',
    data: {
        columns: [
            ['Hours of Sleep', 30, 200, 10000, 400, 150, 250, 50]
        ]
    },
    axis: {
        x: {
            type: 'categorized',
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    }
});