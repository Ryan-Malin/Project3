
// * Global Vars to plot the bubble chart */
let xValue = [4.0615290111, 4.0862960785, 4.3936263065, 4.3910868782, 4.1031839631, 4.139821632, 4.2524445756,
  4.2974752446, 4.4394985992, 3.9787653801999996, 4.1121226304, 4.129971869599999, 3.7427972513,
  4.1630504549000005, 3.7555797592, 4.1895301195, 4.181045524, 4.0328480751999995, 3.8790673389999997,
  4.3453741993, 4.3335928714, 4.3242134677, 4.3274043058, 4.4240996505000005, 4.0131570626999995, 
  4.3730241156, 3.8174449159, 3.8748374343000003, 4.1193972537, 4.0169407504, 4.5923053644, 3.8291224158999997,
  4.7198945359, 4.2488692844, 4.2767347245, 4.2624994688, 3.9311520213, 4.4397865082, 3.9512149571,
  4.2342770648000005, 3.8833376619999997, 4.6707571242000006, 4.1774614142, 4.374666082, 3.8162357035000003,
  4.3190879158, 4.3477730399, 3.9994542855, 4.063579624, 4.4044633531, 4.0202548461, 4.4330986551,
  4.045640839, 4.4982958932, 4.1039071681, 4.4950636853, 4.254176505299999, 4.2244350944999995,
  4.4862055779, 3.7573152060000004, 4.1346984572, 4.2708547029, 3.9907644559, 4.1377069969999996, 
  4.2683146795999996, 4.455588585, 4.1401958215, 3.7300769556, 4.125336658, 4.1860348439, 4.1983579761000005,
  4.2757474401, 4.3068208053, 4.1449189414, 3.9339967714, 4.2101746596, 4.5608276825, 5.2095052356, 4.368295370899999,
  4.283802553999999, 4.4874834507, 4.3700376976, 4.7568595199, 4.0355329275, 4.1079247455, 4.5196172977,
  4.7550984842, 4.0807201637, 4.4057244485, 3.7338203996, 4.5744838895, 3.463126103, 4.4180294966,
  4.54142224, 4.5564770338, 4.4574759231, 4.2954937235, 4.3726535038, 4.2476568086, 4.3946948051
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
        width: 1100,
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
}

// Initialize the selection
init();