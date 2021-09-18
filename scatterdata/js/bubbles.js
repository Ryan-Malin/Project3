let m = mhealth;
let t = topcats;
let o = others;
let d = data[0];

function init() {
// dropdowns to select axis values
    let mhDropDownMenu = d3.select("#mhealthDataset");
    m.forEach(item => {
        mhDropDownMenu.append("option").text(item)
    });
    let compareDropDownMenu = d3.select("#compareDataset");
    t.forEach(item => {
        compareDropDownMenu.append("option").text(item)
    });
    compareDropDownMenu.append("hr");
    o.forEach(item => {
        compareDropDownMenu.append("option").text(item)
    });

// initial scatter plot
    let x = Object.values(data.map(item => item["Average Number Of Mentally Unhealthy Days"])[0]);
    let y = Object.values(data.map(item => item["Average Number Of Physically Unhealthy Days"])[0]);
    let pop = Object.values(data.map(item => item["Population Density Per Sqmi"])[0]);
    let lat = Object.values(data.map(item => item["Lon"])[0]);
    let county = Object.values(data.map(item => item["County"])[0]);

    let trace = [{
        x: x,
        y: y,
        mode: "markers",
        text: county,
        marker: {
            size: pop.map(item => Math.sqrt(item)),
            color: lat,
            colorscale: "Jet"
        }
    }];
    let layout = {
        xaxis: {
            title: {text: "Average Number Of Mentally Unhealthy Days"}
        },
        yaxis: {
            title: {text: "Average Number Of Physically Unhealthy Days"}
        }
    };
    Plotly.newPlot("scatter", trace, layout);
};

// update plot on change in dropdown option
d3.selectAll(".selDataset").on("click", optionChanged);
function optionChanged(){
// currently selected choices for each menu
    let mSelection = d3.selectAll(".selDataset")["_groups"][0][0].value;
    let dSelection = d3.selectAll(".selDataset")["_groups"][0][1].value;

// redefine x and y values to match dropdown
    let x = Object.values(d[mSelection]);
    let y = Object.values(d[dSelection]);
    let pop = Object.values(d["Population Density Per Sqmi"]);
    let lat = Object.values(d["Lon"]);
    let county = Object.values(d["County"]);
    let newTrace = [{
        x: x,
        y: y,
        mode: "markers",
        text: county,
        marker: {
            size: pop.map(item => Math.sqrt(item)),
            color: lat,
            colorscale: "Jet"
        }
    }];
// update axis labels
    let newLayout = {
        xaxis: {
            title: {text: mSelection}
        },
        yaxis: {
            title: {text: dSelection}
        }
    };
    Plotly.react("scatter", newTrace, newLayout);
};

init();