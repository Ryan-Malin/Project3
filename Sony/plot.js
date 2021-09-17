// Init function takes ID num and sets them as
// options of the dropdown menu
function init(){
    let selector1 = d3.select("#selDataset1");
    d3.csv("Data/csh.csv").then(data =>{
            console.log("hi: ", data);
            data.columns.forEach(county => {
            selector1.append("option")
            .text(county);            
      });

      let newValue = data.columns[0];
      socioEconomic(newValue);
    });
};
    // Initialize the selection
    init();

  function optionChanged1(option1){
        socioEconomic(option1);
        console.log("Hello: ", option1);
    };
   
function socioEconomic(newValue){ 
    // console.log("Hell: ", newValue);
    d3.csv("Data/csh.csv").then(data =>{
    xValue =[]; yValue=[];    
    for(let i=0; i<data.length; i++){
        xValue.push(data[i].percent_frequent_mental_distress);
        // console.log("He: ", yValue);
        yValue.push(data[i][newValue]);        
    };
    
    console.log("size: ", yValue);
    let bubbleTrace = {        
        x: xValue,
        y: yValue,
        text: yValue,
        mode: 'markers',
        marker: {
          // Changing bubble size using Math.log function
          size: yValue.map(value =>Math.log(value)*10),
          color: yValue,
          colorscale: "Earth"         
        },
      };
      
      // Create the layout for the bubble chart.
    let bubbleLayout = {
        height: 500,
        width: 1135,
        title: "Mental health and Socio Economic Health Status of Communities ",
        
        yaxis: {title: newValue},
        xaxis: {title: "percent_frequent_mental_distress"},
        margin: {t: 50, b: 50},
        showlegend: false
      };
      
      // Plotly to plot the data with the layout.
      Plotly.react("bubble", [bubbleTrace], bubbleLayout); 
});
};

