let m = mhealth;
let t = topcats;
let o = others;
let d = data[0];
let r2 = regression[0];

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
    let lon = Object.values(data.map(item => item["Lon"])[0]);
    let county = Object.values(data.map(item => item["County"])[0]);

    let trace = [{
        x: x,
        y: y,
        mode: "markers",
        text: county,
        marker: {
            size: pop.map(item => Math.sqrt(item)),
            color: lon,
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
    markersInit("markers1", "Average Number Of Mentally Unhealthy Days");
    markersInit("markers2", "Average Number Of Physically Unhealthy Days");
};

// update plot on change in dropdown option
d3.selectAll(".selDataset").on("click", optionChanged);
function optionChanged(){
// currently selected choices for each menu
    let mSelection = d3.selectAll(".selDataset")["_groups"][0][0].value;
    let dSelection = d3.selectAll(".selDataset")["_groups"][0][1].value;

// regression line slope and r2
    let linreg = d3.select("#r2");
    linreg.html("");
    let nums = r2[`${mSelection}, ${dSelection}`];
    linreg.append("p").html(`<b>r<sup>2</sup>:</b> ${nums["r2"]}<br><b>slope:</b> ${nums["slope"]}`);

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
    markersInit("markers1", mSelection);
    markersInit("markers2", dSelection);
};

function markersInit(tag, col) {
    // tag: html tag
    // col: category
        if (tag === "markers1") {
            d3.select("#markerstitle1").text(col);
            if (L.DomUtil.get('markers1') != null) {
                L.DomUtil.get('markers1')._leaflet_id = null;
            }
        }
        else if (tag === "markers2") {
            d3.select("#markerstitle2").text(col);
            if (L.DomUtil.get('markers2') != null) {
                L.DomUtil.get('markers2')._leaflet_id = null;
            }
        };

        let myMap = L.map(tag, {
            center: [35.7079, -79.8136],
            zoom: 6
        });       
    // Adding the tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);   
    // orange: top 10 counties
    // blue: bottom 10 counties
    let l = Object.values(d[col]).sort((a, b) => (a - b));
    let lowVal = l[10];
    let highVal = l[l.length-10];
        for (let i = 0; i < Object.values(d["County"]).length; i++) {
            let u = Object.values(d[col])[i];
            let r = Object.values(d["Area Sqmi"])[i] * 25;
            let c = 0;
        if (u < lowVal) {
            c = "blue"
        }
        else if (u >= highVal) {
            c = "orange"
        }
        if (c != 0) {
            L.circle([Object.values(d["Lat"])[i], Object.values(d["Lon"])[i]], {
                color: c,
                fillColor: c,
                fillOpacity: 0.5,
                radius: r
            }).bindPopup(
                `<b>${Object.values(d["County"])[i]} County<hr>${col}:<br>${u}`
            ).addTo(myMap);
        }
    }
}

init();