
// * Global Vars to plot the bubble chart */
let xValue = [12.991941864000001, 12.64790051, 13.974708160999999, 14.13761158, 12.870771852, 
  12.847703139000002, 13.621742115999998, 13.989007143, 14.399587875, 12.274530874000002, 
  12.615815754000002, 13.171927518, 11.607239035, 13.096168175999999, 11.377152156, 12.565017092, 
  13.205834800999998, 12.38122365, 11.988426175999999, 13.456708529, 14.105888647, 13.536837554000002, 
  13.76502995, 14.284448091, 12.391632145, 13.603953053, 11.639061989000002, 11.913193877000001, 
  12.933393882999999, 12.24523279, 15.41450113, 12.15033872, 15.240411415999999, 12.971380219, 
  13.278998272, 13.093077125999999, 12.237399915, 14.253374158, 12.33687524, 13.833691072, 
  12.494834470999999, 15.069834689, 13.074748052999999, 13.287080557000001, 11.892142208, 
  14.101998483, 14.068397160999998, 12.52668009, 12.140656809000001, 13.736873994000002, 
  12.503853845999998, 14.290934152, 12.878449881, 14.436683416, 12.548224942000001, 
  13.736653489000002, 13.238765795, 13.211704835, 14.428715777999999, 11.88356949, 12.893023705, 
  13.692964681, 12.299816387, 13.065973554000001, 13.170120954000001, 14.490212525, 12.695751477, 
  11.656032773, 12.843313499999999, 13.142134157000001, 12.594159176, 13.680488814, 13.381228668, 
  13.601058350999999, 12.060083728, 13.242477295999999, 14.911633719000001, 17.227353295, 
  13.570346369000001, 13.153078691, 14.074226765, 14.409221698, 15.481604804000002, 12.584144043, 
  12.506709281, 14.022947786, 15.375920622999999, 12.899642292000001, 14.433063506, 11.293316456, 
  14.819169645999999, 10.787134305999999, 14.306943165, 14.617046638, 14.476612023, 14.018984932999999, 
  13.773587529, 13.790906765, 13.338376063, 13.791327177000001
]; 
let yValue = [17.098560247, 16.568724467, 17.205321828, 20.217104679000002, 16.747418802000002, 17.385965386, 
  17.69732422, 19.953601249000002, 18.739880808, 14.995104748, 16.637681435999998, 17.303198204, 
  15.520446062000001, 16.720111688, 15.55760781, 15.646473990999999, 17.664689381, 16.024647963, 
  14.17891525, 17.350194997, 17.971445009, 16.310994291, 18.370495757, 19.205305092, 15.658887703, 
  18.090857472, 15.372268443, 15.757820204000001, 17.857970935999997, 15.073575689, 21.303396197999998, 
  14.789372254000002, 20.794787648, 18.379820476, 18.008536939000003, 16.768014654, 15.828558435, 
  18.298457598, 16.627128893, 19.773671306, 15.811453025, 20.236613403, 18.910360202, 18.181281242, 
  13.959955784000002, 19.332545586, 20.208121023, 17.312000945, 15.431593827999999, 17.5268077, 
  17.681758712, 18.612754764, 16.845355687999998, 19.316118167, 16.214111018, 18.565702742, 
  15.914126635, 16.834797645, 19.243701566, 13.91919475, 15.701850892000001, 17.544425581, 
  14.276149569000001, 18.299857696, 15.852352644000002, 19.471204783, 17.795532165, 14.241707251, 
  15.961985424000002, 18.119296578, 16.318567344, 16.788920865999998, 18.136629665999997, 17.373690184, 
  13.802679907, 18.01229409, 20.673412316, 24.057594215, 17.673989504, 17.125582841, 19.415269925, 
  19.070204933, 22.866670167, 16.708050684, 15.906936115999999, 17.195156723, 21.858117803000003, 
  15.696345978, 20.827439448, 14.670660455, 20.209525704, 12.194937751, 19.044592732, 18.811718772, 
  18.012060815, 17.654392519, 17.855462044, 18.060110062, 17.897245399000003, 16.81119175
];

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
        width: 1135,
        title: "Mental Health and Socio Economic Health Status of the Community ",
        font: {
          family: 'Courier New, monospace',
          size: 14,
          color: 'blue',
          align: "left"
        },
        yaxis: {title: yval.replace(/_/g, " ").toUpperCase()},
        xaxis: {title: xval.replace(/_/g, " ").toUpperCase()},
        margin: {l:50, r: 50, t: 50, b: 50},
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