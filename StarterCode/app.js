
//updating plotly charts - bubble and bar charts
function updatecharts(sample) {
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

  var bubbleData = [bubbleTrace];

  var bubbleLayout = {
    title: "Bacteria cultures per sample",
    margin: {t:0},
    hovermode: "closest",
    xaxis: { title: "otu_labels" },
    margin: { t:30},     
    };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

};

function init ()  {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach(function(id) {
      dropdownMenu.append("option").text(id).property("value",id); 
    });
    updatecharts(data.samples[0]);
  });

};

init();

//Event listener
function optionChanged(sampleid)  {
  console.log(sampleid);
  d3.json("samples.json").then((data) => {
    updatecharts(data.samples.filter(sample =>sample.id == sampleid)[0]);
    
  });
}

  
  



