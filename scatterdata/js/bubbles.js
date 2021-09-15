let m = mhealth[0];
let d = data[0];
let n = nc[0];

function init() {
// dropdowns to select axis values
    let mhDropDownMenu = d3.select("#mhealthDataset");
        Object.keys(m).forEach(item => {
            mhDropDownMenu.append("option").text(item)
        });
    let compareDropDownMenu = d3.select("#compareDataset");
        Object.keys(d).forEach(item => {
            compareDropDownMenu.append("option").text(item)
    });

// initial scatter plot
    let x = Object.values(mhealth.map(item => item.average_number_of_mentally_unhealthy_days)[0]);
    let y = Object.values(data.map(item => item.total_population)[0]);
    let pop = Object.values(nc.map(item => item.population_density_per_sqmi)[0]);
    let lat = Object.values(nc.map(item => item.lat)[0]);
    let county = Object.values(nc.map(item => item.county)[0]);

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
            title: {text: "average_number_of_mentally_unhealthy_days"}
        },
        yaxis: {
            title: {text: "total_population"}
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
    let x = Object.values(m[mSelection]);
    let y = Object.values(d[dSelection]);
    let pop = Object.values(n.population_density_per_sqmi);
    let lat = Object.values(n.lat);
    let county = Object.values(n.county);
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
    Plotly.newPlot("scatter", newTrace, newLayout);
};

init();