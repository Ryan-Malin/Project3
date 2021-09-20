// // Init function takes ID num and sets them as
// // options of the dropdown menu
// function init(){
//     let selector1 = d3.select("#selDataset1");
//     d3.csv("Data/csh.csv").then(data =>{
//             console.log("hi: ", data);
//             data.columns.forEach(county => {
//             selector1.append("option")
//             .text(county);            
//       });

//       let newValue = data.columns[0];
//       socioEconomic(newValue);
//     });
// };
//     // Initialize the selection
//     init();

//   function optionChanged1(option1){
//         socioEconomic(option1);
//         console.log("Hello: ", option1);
//     };
   
// function socioEconomic(newValue){ 
//     // console.log("Hell: ", newValue);
//     d3.csv("Data/csh.csv").then(data =>{
//     xValue =[]; yValue=[];    
//     for(let i=0; i<data.length; i++){
//         xValue.push(data[i].percent_frequent_mental_distress);
//         // console.log("He: ", yValue);
//         yValue.push(data[i][newValue]);        
//     };
    
//     console.log("size: ", yValue);
//     let bubbleTrace = {        
//         x: xValue,
//         y: yValue,
//         text: yValue,
//         mode: 'markers',
//         marker: {
//           // Changing bubble size using Math.log function
//           size: yValue.map(value => {
//                       if(value <= 1) {
//                         return value * 80;
//                       } else if(value < 10 ){
//                         return value * 10;
//                       } else if(value < 1000){
//                         return value * 5;
//                       } else return Math.log(value)*5;
//                     }),
//           color: yValue,
//           colorscale: "Earth"         
//         },
//       };
      
//       // Create the layout for the bubble chart.
//     let bubbleLayout = {
//         height: 500,
//         width: 1135,
//         title: "Mental health and Socio Economic Health Status of Communities ",        
//         yaxis: {title: newValue.replace(/_/g, " ").toUpperCase()},
//         xaxis: {title: "percent_frequent_mental_distress".replace(/_/g, " ").toUpperCase()},
//         margin: {t: 50, b: 50},
//         showlegend: false
//       };
      
//       // Plotly to plot the data with the layout.
//       Plotly.react("bubble", [bubbleTrace], bubbleLayout); 
// });
// };







// * Global Vars to plot the bubble chart */
let xValue = []; let yValue = [];

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
    })
  // console.log("xvalue: ", xValue);
  socioHealthEco();
};

function optionChanged2(option2) {
  //this update only yValues
  // Making yValue empty for the next option
  yValue = []; yval=option2;
  d3.csv("Data/csh1.csv").then(data =>{
    for(let i=0; i<data.length; i++){
        yValue.push(parseFloat(data[i][option2]));
        };
    });
    // console.log("yvalue: ", yValue);
    socioHealthEco();
};

function socioHealthEco(){
    console.log("Helloooo: ", xValue);
    console.log("sizessss: ", yValue);
    // Bubble chart using plotly plot
    let bubbleTrace = {
        x: xValue,
        y: yValue,
        text: yValue,
        mode: 'markers',
        marker:{
          // Changing bubble size
          size: yValue.map(value => {
              if(value <= 1) {
              return value * 80;
              } else if(value < 10 ){
              return value * 10;
              } else if(value < 1000){
              return value * 5;
              } else return Math.log(value)*5;
          }),
          color: yValue,
          colorscale: "Earth"
        }
    };
      
    // Create the layout for the bubble chart.
    let bubbleLayout = {
        height: 500,
        width: 1135,
        title: "Mental health and Socio Economic Health Status of the Community ",
        yaxis: {title: yval.replace(/_/g, " ").toUpperCase()},
        xaxis: {title: xval.replace(/_/g, " ").toUpperCase()},
        margin: {t: 50, b: 50},
        showlegend: false,
    };
    
    // Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
};

// Initialize the selection
init();