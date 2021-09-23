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
        compareDropDownMenu.append("option").text(item);
    });
    compareDropDownMenu.append("hr");
    o.forEach(item => {
        compareDropDownMenu.append("option").text(item)
    });
// plot as dots or bubbles
    let markerType = d3.select("#scattertype");
    markerType.append("option").text("Point");
    markerType.append("option").text("Bubble");
// Initial plots
    let x1 = "Average Number Of Mentally Unhealthy Days";
    let y1 = "Average Number Of Physically Unhealthy Days";
    bubblePlot(x1, y1, "Point")
    mapMarkers("markers1", x1);
    mapMarkers("markers2", y1);
};

// update plot on change in dropdown option
d3.selectAll(".selDataset").on("click", optionChanged);
d3.select("#scattertype").on("click", optionChanged);
function optionChanged(){
// currently selected choices for each menu
    let mSelection = d3.selectAll(".selDataset")["_groups"][0][0].value;
    let dSelection = d3.selectAll(".selDataset")["_groups"][0][1].value;
    let dotType = d3.select("#scattertype")["_groups"][0][0].value;
// use as inputs to update plots
    bubblePlot(mSelection, dSelection, dotType);
    mapMarkers("markers1", mSelection);
    mapMarkers("markers2", dSelection);
};

// bubble plot - 
function bubblePlot(xcol, ycol, dots) {
    let x = Object.values(d[xcol]);
    let y = Object.values(d[ycol]);
    let pop = Object.values(d["Population 2"]);
    let lon = Object.values(d["Lon"]);
    let county = Object.values(d["County"]);
// regression line slope and r2
    let linreg = d3.select("#r2");
    linreg.html("");
    let nums = r2[`${xcol}, ${ycol}`];
    linreg.append("p").html(`<b>r<sup>2</sup>:</b> ${nums["r2"]}<br><b>slope:</b> ${nums["slope"]}`);
// plot layout and trace
    let layout = {
        xaxis: {title: {text: xcol}},
        yaxis: {title: {text: ycol}}
    };
    if (dots == "Bubble") {
        let bubbleTrace = [{
            x: x,
            y: y,
            mode: "markers",
            text: county,
            marker: {
                size: pop.map(item => Math.sqrt(item)/20),
                color: lon,
                colorscale: "Jet",
                colorbar: {
                    title: {text: "Longitude"},
                    tickmode: "array",
                    tickvals: [-76, -84],
                    ticktext: ["East", "West"]
                }
            }
        }];
        d3.select("#bubblesize").html("<br>Larger Marker :<br>Higher Population")
        Plotly.react("scatter", bubbleTrace, layout);
    }
    else if (dots == "Point") {
        let pointTrace = [{
            x: x,
            y: y,
            mode: "markers",
            text: county
        }];
        d3.select("#bubblesize").html("")
        Plotly.react("scatter", pointTrace, layout);
    };
};

// map of counties with highest and lowest values for selected categories
function mapMarkers(tag, col) {
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
};

init();