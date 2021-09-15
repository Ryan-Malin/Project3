let h = health[0];
let e = economy[0];
let i = ncCounties[0];

function init() {
// dropdowns to select axis values
    let healthDropDownMenu = d3.select("#healthDataset");
        Object.keys(h).forEach(item => {
            healthDropDownMenu.append("option").text(item)
        });
    let economyDropDownMenu = d3.select("#economyDataset");
        Object.keys(e).forEach(item => {
            economyDropDownMenu.append("option").text(item)
    });

// initial scatter plot
    let x = Object.values(health.map(item => item.average_number_of_physically_unhealthy_days)[0]);
    let y = Object.values(economy.map(item => item.percent_children_in_poverty)[0]);
    let pop = Object.values(ncCounties.map(item => item.population_density_per_sqmi)[0]);
    let lat = Object.values(ncCounties.map(item => item.lat)[0]);
    let county = Object.values(ncCounties.map(item => item.county)[0]);
    console.log(pop);
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
            title: {text: "average_number_of_physically_unhealthy_days"}
        },
        yaxis: {
            title: {text: "percent_children_in_poverty"}
        }
    };
    Plotly.newPlot("scatter", trace, layout);
};

// update plot on change in dropdown option
d3.selectAll(".selDataset").on("click", optionChanged);
function optionChanged(){
// currently selected choices for each menu
    let healthSelection = d3.selectAll(".selDataset")["_groups"][0][0].value;
    let economySelection = d3.selectAll(".selDataset")["_groups"][0][1].value;

// redefine x and y values to match dropdown
    let x = Object.values(h[healthSelection]);
    let y = Object.values(e[economySelection]);
    let pop = Object.values(i.population_density_per_sqmi);
    let lat = Object.values(i.lat);
    let county = Object.values(i.county);
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
            title: {text: healthSelection}
        },
        yaxis: {
            title: {text: economySelection}
        }
    };
    Plotly.newPlot("scatter", newTrace, newLayout);
};

init();