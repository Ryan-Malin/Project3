
// * Global Vars to plot the bubble chart */
let xValue = []; 
let yValue = [];

// This Global variables are used to change xaxis and yaxis 
// titles dianamically in the plot,  
let xval = ""; let yval = "";

// Init function takes ID num and sets them as
// options of the dropdown menu
function init(){
  let selector1 = d3.select("#selDataset1");
  let selector2 = d3.select("#selDataset2");

  //  Load csh2.csv file and append columns to the first selection
  d3.csv("Data/csh2.csv").then(data1 =>{
      console.log("hi: ", data1);
      data1.columns.forEach(count => {
            selector1.append("option")
            .text(count);
      });
          
  });
  // Load csh1.csv file and append columns to the second selection
  d3.csv("Data/csh1.csv").then(data2 =>{
      console.log("hi: ", data2);
      data2.columns.forEach(count => {
            selector2.append("option")
           .text(count);
      });
  });                 
    
};


function optionChanged1(option1) {
  // Here you read the data for the x values only
  // Making xValue empty for the next option
  xValue = []; xval=option1;
  d3.csv("Data/csh2.csv").then(data =>{
    for(let i=0; i<data.length; i++){
        xValue.push(parseFloat(data[i][option1]));
    }
    // console.log("xvalue: ", xValue);
    socioHealthEco();
  })
};

function optionChanged2(option2) {
  //this update only yValues
  // Making yValue empty for the next option
  yValue = []; yval=option2;
  d3.csv("Data/csh1.csv").then(data =>{
    for(let i=0; i<data.length; i++){
      yValue.push(parseFloat(data[i][option2]));
    };
    // console.log("yvalue: ", yValue);
    socioHealthEco();
  });  
};

function socioHealthEco(){
    console.log("Helloooo: ", xValue);
    console.log("sizessss: ", yValue);
    // Bubble chart using plotly plot
    let bubbleTrace = {         
        x:xValue,
        y: yValue,
        text: [yValue, "2"],
        text: [yValue],
        mode: 'markers',
        marker:{
          // Changing bubble size
          size: yValue.map(value => {
              if(value <= 1) {
              return value * 50;
              } else if(value < 10 ){
              return value * 5;
              } else if(value < 1000){
              return value * 2;
              } else return Math.log(value)*2;
          }),
          type: "scatter",
          color: yValue,
          colorscale: "Earth"
        }
    };
      
    // Create the layout for the bubble chart.
    let bubbleLayout = {
        height: 500,
        width: 1080,
        title: "Mental Health and Socio Economic Health Status of the Community ",
        font: {
          family: 'Courier New, monospace',
          size: 14,
          color: 'blue',
          align: "left"
        },
        yaxis: {title: yval.replace(/_/g, " ").toUpperCase()},
        xaxis: {title: xval.replace(/_/g, " ").toUpperCase()},
        margin: {l:100, r: 50, t: 50, b: 50},
        showlegend: false,
    };
    
    // Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout); 
    
    // let yticks = yValue.slice(0,7).sort((a, b) => b-a);
    // console.log("yticks: =>", yticks);
    // let xticks = xValue.slice(0,7).sort((a,b) =>b-a);
    // console.log("xticks =>", xticks);

    // let barTrace = {
    //   x: xticks,
    //   y: yticks,
    //   type: 'bar',
    //   orientation: 'h',
    //   // text: labels,
    //   marker: {
    //       color: "#9FE2BF"            
    //   }
    // };
    // // Create the layout for the bar chart. 
    // let barLayout = {
    //  height:500,
    //  width:400, 
    //  title: "Mentally unhealthy days",
    // };
    // // Plotly to plot the data with the layout. 
    // Plotly.newPlot("bar", [barTrace], barLayout);
}

// Initialize the selection
init();