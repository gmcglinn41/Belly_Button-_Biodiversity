
//Create the function to get the Demographics data
function getDemoInfo(sample) {
  
  //read the json file to get the data
  d3.json("samples.json").then((data) => {
        
    //Get the metadata info for the demographic panel
    var demoData= data.metadata;
    
    //Filter the data by the id.
    var resultsArray= demoData.filter(item => item.id == sample);
    var result= resultsArray[0];
  

    //Use d3 to select the demographic to put the data
    var PANEL = d3.select("#sample-metadata");

    //empty the demo info each time we get a new id.
    PANEL.html("");

    //tag each key, value in MetaData
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`);
    });
  });  
}
 
//updating plotly charts - bubble and bar charts
function updatecharts(sample) {
  
 
  //build a bubble chart to using the sample data

  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result= resultArray[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    })
  
  var bubbleTrace = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: "markers",
    marker: {
        size: sample.sample_values,
        color: sample.otu_ids,
        colorscale: "Earth"
    }      
  };
  // set the data for the bubble chart
  var bubbleData = [bubbleTrace];

  // layout for the bubble chart
  var bubbleLayout = {
    title: "Bacteria cultures per sample",
    margin: {t:0},
    hovermode: "closest",
    xaxis: { title: "otu_labels" },
    margin: { t:30},     
    };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
  //build a bar chart using the json data
  //get the data and see if it is pulling correctly.  Generating console logs
   var ids = sample.otu_ids;
   //console.log(ids);
   var sampleValues = sample.sample_values.slice(0,10).reverse();
   //console.log(sampleValues);
   var labels = sample.otu_labels.slice(0.10); 
   //console.log(labels);
   var otuidnames = sample.otu_ids.map((d) => {
    return `otu ${d}`;

   });

   var trace1 = {
    x: sample.sample_values.slice(0,10).reverse(),
    y: otuidnames.slice(0,10).reverse(),
    text: sample.otu_labels.slice(0,10).reverse(),
    name: "Greek",
    type: "bar",
    orientation: "h"
  };


  var databar = [trace1];

  var layout = {
    title: "Top 10 Bacteria Cultures Found ",
    margin: {t: 30, b: 150},
    font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" },
    yaxis: {
      type: "category"
    }

  };
  Plotly.newPlot("bar", databar, layout);  
};
  
 //Function  for the drop down menu.
function init ()  {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach(function(id) {        //exercise 14.1
      dropdownMenu.append("option").text(id).property("value",id); 
    });
    updatecharts(data.samples[0]);
    getDemoInfo(data.names[0]);
  });

};

//Event listener
function optionChanged(sampleid)  {
  console.log(sampleid);
  d3.json("samples.json").then((data) => {
    updatecharts(data.samples.filter(sample =>sample.id == sampleid)[0]);
    getDemoInfo(sampleid);
  });
 
};

init(); 
   

