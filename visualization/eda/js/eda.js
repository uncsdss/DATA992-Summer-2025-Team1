let latestData = [];
let latestClusterSummary = [];

document.addEventListener('DOMContentLoaded', function () {
  d3.json('../data/doc_metadata.json').then(data => {

     latestData = data;  // <-- ADD THIS LINE so modal uses same dataset

    renderDocLengthHistogram(data);
    renderFileTypeDistribution(data);
    renderFileSizeDistribution(data);  


    renderHeaderHierarchyHistogram(data);
    renderLinkDensityHistogram(data);
    renderLinkDistributionBar(data);
    renderFilenameLengthHistogram(data);

    renderCodeDensityScatter(data);
    renderTopPrefixesBar(data)
    renderTopDirectoriesBar(data);
    renderCommonWordsBar(data);
    d3.json('../data/cluster_summary.json').then(clusterSummary => {
      latestClusterSummary = clusterSummary;
    renderFileClustersBarSummary(clusterSummary);
});


    renderDirectoryDepthPie(data);
    renderNamingConventionPie(data);

    renderWordCountBoxPlot(data);

    
    setupEDATabButtons();
    showEDATab('histogram');
  });
});

function setupEDATabButtons() {
  const tabMap = {
    'histogram': 'histogram-group',
    'scatter': 'scatter-group',
    'pie': 'pie-group',
    'boxplot': 'boxplot-group' 
  };

  document.querySelectorAll('.eda-ribbon button').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.eda-ribbon button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.eda-chart-group').forEach(g => g.classList.remove('active'));
      const key = this.id.replace('btn-', '');
      const groupId = tabMap[key];
      if (groupId) {
        document.getElementById(groupId).classList.add('active');
      }
    });
  });
}



function showEDATab(key) {
  document.getElementById('btn-' + key).click();
}

function attachTooltip(selection, getContent) {
  const tooltip = d3.select("#tooltip");
  selection
    .on("mouseover", function(event, d) {
      tooltip.transition().duration(100).style("opacity", 1);
      tooltip.html(getContent(d));
    })
    .on("mousemove", function(event) {
      tooltip.style("left", (event.pageX + 10) + "px")
             .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      tooltip.transition().duration(200).style("opacity", 0);
    });
}

function attachGlobalTooltip(selection, formatter) {
  const tooltip = d3.select("#tooltip");
  selection
    .on("mouseover", function(event, d) {
      d3.select(this).attr("opacity", 0.7);
      tooltip
        .style("opacity", 1)
        .html(formatter(d));
    })
    .on("mousemove", function(event) {
      tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("opacity", 1);
      tooltip.style("opacity", 0);
    });
}



// --------Modal View Section--------


const MODAL_WIDTH = 650;
const MODAL_HEIGHT = 450;


document.addEventListener('DOMContentLoaded', function () {
  d3.json('../data/doc_metadata.json').then(data => {
  const modal = document.getElementById("graph-modal");
  const modalBody = document.getElementById("graph-modal-body");
  const modalClose = document.querySelector(".graph-modal-close");

d3.selectAll(".eda-chart-card").on("click", function() {
  const cardId = this.id;  // e.g., "chart-doc-length"
  modal.style.display = "block";
  modalBody.innerHTML = "";  // Clear modal

  // Render corresponding chart directly at larger size
  if (cardId === "chart-doc-length") {
    renderDocLengthHistogramModal(MODAL_WIDTH, MODAL_HEIGHT);
    
  }else if (cardId === "chart-file-type") {
  renderFileTypeDistribution(latestData, "#graph-modal-body", MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-file-size") {
  renderFileSizeDistributionModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-filename-length") {
    renderFilenameLengthDistributionModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-header-hierarchy") {
  renderHeaderHierarchyHistogramModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-link-density") {
  renderLinkDensityHistogramModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-link-distribution") {
  renderLinkDistributionBarModal(MODAL_WIDTH, MODAL_HEIGHT);
  } else if (cardId === "chart-prefix") {
  renderTopPrefixesBarModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-top-directories") {
    renderTopDirectoriesBarModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-common-words") {
  renderCommonWordsBarModal(MODAL_WIDTH, MODAL_HEIGHT);
  } else if (cardId === "chart-file-clusters") {
  renderFileClustersBarSummaryModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-code-density") {
  renderCodeDensityScatterModal(MODAL_WIDTH, MODAL_HEIGHT);
  }else if (cardId === "chart-directory-depth") {
  renderDirectoryDepthPieModal(MODAL_WIDTH, MODAL_HEIGHT);
}else if (cardId === "chart-naming-convention") {
  renderNamingConventionPieModal(MODAL_WIDTH, MODAL_HEIGHT);
}else if (cardId === "chart-wordcount-boxplot") {
  renderWordCountBoxPlotModal(750, 500);
}





  // On Click handler
  window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalBody.innerHTML = "";  
  }
};

});
});

  modalClose.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

// Histogram: Document Length (Modal)
function renderDocLengthHistogramModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const docLengths = latestData.map(d => d.num_words);
  const margin = { top: 50, right: 60, bottom: 60, left: 80 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const x = d3.scaleLinear()
    .domain([0, d3.max(docLengths)]).nice()
    .range([margin.left, margin.left + plotWidth]);

  const bins = d3.bin()
    .domain(x.domain())
    .thresholds(30)(docLengths);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([margin.top + plotHeight, margin.top]);

  const bars = svg.append("g")
    .attr("fill", "#3f8efc")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
    .attr("height", d => y(0) - y(d.length));

  // 🔔 Hover tooltip identical to overview:
attachGlobalTooltip(bars, d =>
  `Documents: ${d.length}<br>Range: ${Math.round(d.x0)} – ${Math.round(d.x1)} words`
);


  svg.append("g")
    .attr("transform", `translate(0,${margin.top + plotHeight})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top + plotHeight + 40)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .text("Document Length (words)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .text("Number of Documents");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 18)
    .attr("font-weight", "bold")
    .text("Document Length Distribution");

  container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .text("The median file length is 415 words, with most documents having lengths below 1,000 words. A small number of outliers significantly exceed this, with word counts ranging up to nearly 40,000. These exceptions could pose problems for certain processing techniques.");
}




// Histogram: File Type Distrubtion (Modal)
function renderFileTypeDistribution(data, containerSelector = "#chart-file-type .chart", width = 360, height = 300) {
  const container = d3.select(containerSelector);
  container.html("");

  const countsMap = {};
  data.forEach(d => {
    const ext = d.extension ? d.extension.trim() : "unknown";
    countsMap[ext] = (countsMap[ext] || 0) + 1;
  });

  const counts = Object.entries(countsMap)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => d3.descending(a.value, b.value));

  const margin = { top: 30, right: 20, bottom: 60, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleBand()
    .domain(counts.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, d3.max(counts, d => d.value) * 1.1]).nice()
    .range([height - margin.bottom, margin.top]);

  const color = d3.scaleOrdinal()
    .domain(counts.map(d => d.key))
    .range(d3.schemeSet2);

const bars = svg.append("g")
  .selectAll("rect")
  .data(counts)
  .join("rect")
  .attr("x", d => x(d.key))
  .attr("y", d => y(d.value))
  .attr("width", x.bandwidth())
  .attr("height", d => y(0) - y(d.value))
  .attr("fill", d => color(d.key));

attachGlobalTooltip(bars, d =>
  `File type: ${d.key}<br>Count: ${d.value}`
);
  svg.append("g")
    .selectAll("text.label")
    .data(counts)
    .join("text")
    .attr("class", "label")
    .attr("x", d => x(d.key) + x.bandwidth() / 2)
    .attr("y", d => y(d.value) - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 11)
    .attr("fill", "#333")
    .text(d => d.value);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .attr("font-weight", "bold")
    .text("File Extension");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", 18)
    .attr("font-weight", "bold")
    .text("Number of Files");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 18)
    .attr("font-weight", "bold")
    .text("Number of Files");

const analysisContainer = container.append("div")
  .attr("class", "modal-analysis")
  .style("margin-top", "20px")
  .style("font-size", "14px")
  .style("line-height", "1.5")
  .style("max-width", "800px")  // Optional: constrain width for readability
  .style("text-align", "left")  // Ensure left-aligned text
  .html(`
    <h3>File Types</h3>
    <p>The repo consists of a total of five (5) file types:</p>
    <ul>
      <li>AsciiDoc (adoc)</li>
      <li>JSON</li>
      <li>YML</li>
      <li>YMAL</li>
      <li>MD (README)</li>
    </ul>
    <p>As can be seen in the below visualization, the preponderance of these files are adoc files. These represent the web pages of the official BlueXP-Automation API documentation. Because adoc files inherently have rich markup, these files will be critical to our strategy in conducting semantic understanding of the repo's/files' contents to generate enriched metadata.</p>
  `);

}

// Histogram: File size Distribution Modal
function renderFileSizeDistributionModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const fileSizes = latestData
    .map(d => d.size_bytes)
    .filter(d => d > 0)
    .map(d => Math.log10(d));

  const bins = d3.bin()
    .domain(d3.extent(fileSizes))
    .thresholds(20)(fileSizes);

  const median = d3.median(fileSizes);

  const margin = { top: 50, right: 30, bottom: 40, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleLinear()
    .domain(d3.extent(fileSizes)).nice()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

const bars = svg.append("g")
  .attr("fill", "lightgreen")
  .attr("stroke", "black")
  .selectAll("rect")
  .data(bins)
  .join("rect")
  .attr("x", d => x(d.x0))
  .attr("y", d => y(d.length))
  .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
  .attr("height", d => y(0) - y(d.length));

attachGlobalTooltip(bars, d =>
  `Files: ${d.length}<br>Size range: 10^${d.x0.toFixed(1)} – 10^${d.x1.toFixed(1)} bytes`
);


  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format(".1f")));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Add red median line
  svg.append("line")
    .attr("x1", x(median))
    .attr("x2", x(median))
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "4,2");

  svg.append("text")
    .attr("x", x(median))
    .attr("y", margin.top - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "red")
    .attr("font-size", 11)
    .text("Median");

  // Add axis labels
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("File Size (log10 bytes)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Frequency");

  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("File Size Distribution (Log Scale)");

const analysisContainer = container.append("div")
  .attr("class", "modal-analysis")
  .style("margin-top", "20px")
  .style("font-size", "14px")
  .style("line-height", "1.5")
  .style("max-width", "800px")  // Optional: constrain width for readability
  .style("text-align", "left")  // Ensure left-aligned text
  .html(`
    <h3 style="margin-bottom: 8px;">Directory Depth</h3>
    <p>
        File sizes are fairly regularly distributed with a mean of 3.9KB and a slight right skew. The files should be fairly handleable for mass processing and manipulation.
    </p>
  `);

}


// Histogram: File Name Length Distribution (Modal)
function renderFilenameLengthDistributionModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const lengths = latestData
    .map(d => d.filename ? d.filename.length : 0)
    .filter(d => d > 0);

  const bins = d3.bin()
    .domain(d3.extent(lengths))
    .thresholds(20)(lengths);

  const median = d3.median(lengths);

  const margin = { top: 50, right: 30, bottom: 40, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleLinear()
    .domain(d3.extent(lengths)).nice()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

const bars = svg.append("g")
  .attr("fill", "mediumseagreen")
  .attr("stroke", "black")
  .selectAll("rect")
  .data(bins)
  .join("rect")
  .attr("x", d => x(d.x0))
  .attr("y", d => y(d.length))
  .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
  .attr("height", d => y(0) - y(d.length));

attachGlobalTooltip(bars, d =>
  `Files: ${d.length}<br>Length range: ${Math.round(d.x0)}–${Math.round(d.x1)} chars`
);


  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("line")
    .attr("x1", x(median))
    .attr("x2", x(median))
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "4,2");

  svg.append("text")
    .attr("x", x(median))
    .attr("y", margin.top - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "red")
    .attr("font-size", 11)
    .text("Median");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Filename Length Distribution");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Filename Length (chars)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Frequency");

const analysisContainer = container.append("div")
  .attr("class", "modal-analysis")
  .style("margin-top", "20px")
  .style("font-size", "14px")
  .style("line-height", "1.5")
  .style("max-width", "800px")  // Optional: constrain width for readability
  .style("text-align", "left")  // Ensure left-aligned text
  .html(`
    <h3 style="margin-bottom: 8px;">Directory Depth</h3>
    <p>
        The length of filenames ranges from around 5 to 40 characters with a mean of 22.4. The distribution is irregular. Many of the longer filename lengths correspond to files that describe multi step technical processes.
    </p>
  `);

}

// Histogram: Header Hierarchy (Modal)
function renderHeaderHierarchyHistogramModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const headerLevels = [
    { key: "H1", value: d3.sum(latestData, d => d.h1_count) },
    { key: "H2", value: d3.sum(latestData, d => d.h2_count) },
    { key: "H3", value: d3.sum(latestData, d => d.h3_count) }
  ];

  const margin = { top: 50, right: 30, bottom: 40, left: 80 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const y = d3.scaleBand()
    .domain(headerLevels.map(d => d.key))
    .range([margin.top, height - margin.bottom])
    .padding(0.3);

  const x = d3.scaleLinear()
    .domain([0, d3.max(headerLevels, d => d.value)]).nice()
    .range([margin.left, width - margin.right]);

  // 🔥 Explicit hardcoded color array (same as overview)
  const colors = ["#66c2a5", "#fc8d62", "#8da0cb"];

const bars = svg.append("g")
  .selectAll("rect")
  .data(headerLevels)
  .join("rect")
  .attr("y", d => y(d.key))
  .attr("x", margin.left)
  .attr("height", y.bandwidth())
  .attr("width", d => x(d.value) - margin.left)
  .attr("fill", (d, i) => colors[i]);

attachGlobalTooltip(bars, d =>
  `Header Level: ${d.key}<br>Count: ${d.value}`
);


  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Header Hierarchy Usage");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Total Count");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Header Level");

const analysisContainer = container.append("div")
  .attr("class", "modal-analysis")
  .style("margin-top", "20px")
  .style("font-size", "14px")
  .style("line-height", "1.5")
  .style("max-width", "800px")
  .style("text-align", "left")
  .html(`
    <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Header Counts</h3>
    <p>
      Upon investigation, many of our files have numerous layers of headers (H1, H2, and H3). H3s dominate the count of headers across our files (specifically adoc files), reflecting that these files have depth in file contents and are likely well organized. This is beneficial for our task of analyzing the contents and prioritizing the various sections (headers).
    </p>
  `);

}

// Histogram: Link Density (Modal)
function renderLinkDensityHistogramModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  // const linkCounts = latestData.map(d => d.links || 0);

const rawLinks = latestData.map(d => d.links || 0);
const q95 = d3.quantile(rawLinks, 0.95); // Calculate 95th percentile
const linkCounts = rawLinks.filter(d => d <= q95); // Filter out top 5%


  const bins = d3.bin()
    .domain(d3.extent(linkCounts))
    .thresholds(20)(linkCounts);

  const margin = { top: 50, right: 30, bottom: 40, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);
  const x = d3.scaleLinear()
    .domain([0, d3.max(linkCounts)]).nice()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

const bars = svg.append("g")
  .attr("fill", "#e74c3c")
  .attr("stroke", "black")
  .selectAll("rect")
  .data(bins)
  .join("rect")
  .attr("x", d => x(d.x0))
  .attr("y", d => y(d.length))
  .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
  .attr("height", d => y(0) - y(d.length));

attachGlobalTooltip(bars, d =>
  `Link Count Range: ${d.x0} – ${d.x1}<br>Documents: ${d.length}`
);


  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Link Density by Documentation Section");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Links per Document");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Documents");

  const analysisContainer = container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .style("max-width", "800px")
    .style("text-align", "left")
    .html(`
      <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Link Analysis</h3>
      <p>
        Links can be a good indicator of a file's dependency on external sources, as well as be helpful establishing relationships with various files, concepts, or other resources. In the case of the BlueXP-Automation API, a large amount of the repo (61% of files) has links. Upon further analysis, however, the majority of those links are internal links, meaning the dependencies are within the repo.
      </p>
    `);

}

// Histogram: Link Distribution (Modal)
function renderLinkDistributionBarModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  // ✅ Use same aggregation fields as your working overview renderer
  const totalInternal = d3.sum(latestData, d => d.internal_links || 0);
  const totalExternal = d3.sum(latestData, d => d.external_links || 0);

  const linkData = [
    { type: "Internal Links", count: totalInternal },
    { type: "External Links", count: totalExternal }
  ];

  const margin = { top: 50, right: 30, bottom: 40, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);
  const x = d3.scaleBand()
    .domain(linkData.map(d => d.type))
    .range([margin.left, width - margin.right])
    .padding(0.4);

  const y = d3.scaleLinear()
    .domain([0, d3.max(linkData, d => d.count)]).nice()
    .range([height - margin.bottom, margin.top]);

  const color = d3.scaleOrdinal()
    .domain(linkData.map(d => d.type))
    .range(d3.schemeSet2);

const bars = svg.append("g")
  .selectAll("rect")
  .data(linkData)
  .join("rect")
  .attr("x", d => x(d.type))
  .attr("y", d => y(d.count))
  .attr("width", x.bandwidth())
  .attr("height", d => y(0) - y(d.count))
  .attr("fill", d => color(d.type));

attachGlobalTooltip(bars, d =>
  `Link Type: ${d.type}<br>Count: ${d.count}`
);



  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Link Distribution (Documentation Files)");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Link Type");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Total Count");

  const analysisContainer = container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .style("max-width", "800px")
    .style("text-align", "left")
    .html(`
      <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Link Analysis</h3>
      <p>
        Links can be a good indicator of a file's dependency on external sources, as well as be helpful establishing relationships with various files, concepts, or other resources. In the case of the BlueXP-Automation API, a large amount of the repo (61% of files) has links. Upon further analysis, however, the majority of those links are internal links, meaning the dependencies are within the repo.
      </p>
    `);

}

// Histogram: Top 10 Prefixes (Modal)
function renderTopPrefixesBarModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const getPrefix = filename => {
    if (!filename) return "";
    let match = filename.match(/^[^-_]+/);
    return match ? match[0] : "";
  };

  const prefixCounts = {};
  latestData.forEach(d => {
    const prefix = getPrefix(d.filename);
    if (prefix) prefixCounts[prefix] = (prefixCounts[prefix] || 0) + 1;
  });

  const prefixList = Object.entries(prefixCounts)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 10);

  const margin = { top: 50, right: 30, bottom: 60, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);
  const x = d3.scaleBand()
    .domain(prefixList.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(prefixList, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  const bars = svg.append("g")
    .attr("fill", "#f0627e")
    .selectAll("rect")
    .data(prefixList)
    .join("rect")
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.value));

    attachGlobalTooltip(bars, d =>
  `Prefix: ${d.key}<br>Frequency: ${d.value}`
);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Top 10 File Name Prefixes");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Prefix");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Frequency");

  container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .text("The wf_ prefix stands for ‘workflows’ and is by far the most common prefix. This makes sense given content of the repository, but it means that filename-based classification or tagging strategies may be less effective.");
}

// Histogram: Top Directories (Modal)
function renderTopDirectoriesBarModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const dirCounts = d3.rollups(
    latestData,
    v => v.length,
    d => d.directory
  )
  .sort((a, b) => d3.descending(a[1], b[1]))
  .slice(0, 10)
  .map(([key, value]) => ({ key, value }));

  const margin = { top: 50, right: 30, bottom: 40, left: 180 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const y = d3.scaleBand()
    .domain(dirCounts.map(d => d.key))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  const x = d3.scaleLinear()
    .domain([0, d3.max(dirCounts, d => d.value)]).nice()
    .range([margin.left, width - margin.right]);

 const color = d3.scaleOrdinal()
  .domain(dirCounts.map(d => d.key))
  .range(d3.schemeTableau10);   

 const bars = svg.append("g")
    .selectAll("rect")
    .data(dirCounts)
    .join("rect")
    .attr("x", x(0))
    .attr("y", d => y(d.key))
    .attr("width", d => x(d.value) - x(0))
    .attr("height", y.bandwidth())
    .attr("fill", d => color(d.key));  // Match overview color if needed\

        attachGlobalTooltip(bars, d =>
  `Files: ${d.key}<br>Directory: ${d.value}`
);

svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Top 10 Directories by File Count");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Number of Files");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Directory");

    const analysisContainer = container.append("div")
  .attr("class", "modal-analysis")
  .style("margin-top", "20px")
  .style("font-size", "14px")
  .style("line-height", "1.5")
  .style("max-width", "800px")
  .style("text-align", "left")
  .html(`
    <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Directories with the Highest File Count</h3>
    <p>
      The bar chart below shows the top 10 directories in the repository by file count. The <code>cm/</code> directory, short for Cloud Management, contains the overwhelming majority of files. It includes dozens of .adoc documents detailing workflows and API procedures for operating the BlueXP platform across cloud providers such as AWS, Azure, and Google Cloud. Since most of the documentation consists of technical task walkthroughs, we will tailor our metadata approach to reflect this structure and content focus.
    </p>
  `);
}

// Histogram: Most Common words (Modal)
function renderCommonWordsBarModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const wordCounts = {};
  latestData.forEach(d => {
    if (d.filename) {
      d.filename.split(/[^a-zA-Z0-9]+/).forEach(word => {
        const w = word.toLowerCase();
        if (w && w.length > 1) {
          wordCounts[w] = (wordCounts[w] || 0) + 1;
        }
      });
    }
  });

  const words = Object.entries(wordCounts)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 10);

  const margin = { top: 50, right: 30, bottom: 40, left: 120 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const y = d3.scaleBand()
    .domain(words.map(d => d.key).reverse())
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  const x = d3.scaleLinear()
    .domain([0, d3.max(words, d => d.value)]).nice()
    .range([margin.left, width - margin.right]);

  const bars = svg.append("g")
    .selectAll("rect")
    .data(words)
    .join("rect")
    .attr("x", x(0))
    .attr("y", d => y(d.key))
    .attr("width", d => x(d.value) - x(0))
    .attr("height", y.bandwidth())
    .attr("fill", "#4682b4");  // Match overview color if needed.

        attachGlobalTooltip(bars, d =>
  `Count: ${d.key}<br>Word: ${d.value}`
);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Most Common Words in File Names");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Frequency");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Word");

  container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .text("The most common words relate to cloud technologies and workflows. This illustrates the need for creative methods to separate documents which are so similar in content.");
}

function renderFileClustersBarSummaryModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const data = latestClusterSummary;

  const margin = { top: 50, right: 30, bottom: 60, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleBand()
    .domain(data.map(d => d.cluster))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)]).nice()
    .range([height - margin.bottom, margin.top]);

  const bars = svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.cluster))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.count))
    .attr("fill", "steelblue");

        attachGlobalTooltip(bars, d =>
  `Cluster: ${d.cluster}<br>Files: ${d.count}`
);


  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Files Grouped by Naming Pattern");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("File Cluster");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Number of Files");

  const analysisContainer = container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .style("max-width", "800px")
    .style("text-align", "left")
    .html(`
      <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Naming Convention Analysis</h3>
      <p>
        By extracting naming patterns we can see that common naming traits include a strong <code>wf_</code> prefix (workflows), and high occurrence of cloud-related terms like <code>ontap</code>, <code>get</code>, and <code>cloud</code>. The average filename is 22.4 characters long, and underscores are the dominant separator. The dominance of <code>wf_</code> as well as underscores should be kept in mind when using filename-based classification or tagging strategies.
      </p>

      <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Pattern-Based File Clustering</h3>
      <p>
      We grouped files based on naming conventions to infer their functional roles. The majority fall under the <code>workflows</code> cluster, indicating task specific procedures. Other clusters like <code>read_operations</code>, <code>create_operations</code>, and <code>api_reference</code> are far less common. While this clustering helps categorize the repository by purpose, the imbalance may present challenges when generalizing intent-based metadata across all files.
     </p>
    `);

}

// Scatter Plot: Code Density (Modal)
function renderCodeDensityScatterModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const margin = { top: 50, right: 30, bottom: 60, left: 80 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const points = latestData
    .filter(d => d.total_lines > 0)
    .map(d => ({
      size: d.num_words,
      density: d.code_lines / d.total_lines
    }));

  const x = d3.scaleLinear()
    .domain([0, d3.max(points, d => d.size)]).nice()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, 1]).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("g")
    .selectAll("circle")
    .data(points)
    .join("circle")
    .attr("cx", d => x(d.size))
    .attr("cy", d => y(d.density))
    .attr("r", 4)
    .attr("fill", "orange")
    .attr("opacity", 0.7);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Code Density vs Document Size");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Document Size (words)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Code Density");

  container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .text("This scatterplot shows the relationship between document size and the proportion of code lines.");
}

// Pie Chart: Directory Depth (Modal)
function renderDirectoryDepthPieModal(width, height) {
  
  const container = d3.select("#graph-modal-body");
  container.html("");

  const radius = Math.min(width, height) / 2 - 10;

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const depthCounts = d3.rollup(latestData, v => v.length, d => d.depth);
  const depthData = Array.from(depthCounts, ([key, value]) => ({ depth: key, count: value }))
    .sort((a, b) => a.depth - b.depth);

  const total = d3.sum(depthData, d => d.count);

  const color = d3.scaleOrdinal()
    .domain(depthData.map(d => d.depth))
    .range(d3.schemeSet2);  // 🔔 Ensure same scheme as overview

  const pie = d3.pie()
  .value(d => {
    const percent = d.count / total * 100;
    return percent < 5 ? d.count * 3 : d.count;
  })
  .sort(null)  // keep consistent ordering
  .startAngle(-Math.PI / 7.5);


  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
    

  const arcs = pie(depthData);

  svg.selectAll("path")
    .data(arcs)
    .join("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.depth))
    .attr("stroke", "white")
    .style("stroke-width", "2px");

  //  Add percentage labels inside slices like overview:
  svg.selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .attr("fill", "black")
    .text(d => `${((d.data.count / total) * 100).toFixed(1)}%`);

  svg.append("text")
    .attr("x", 0)
    .attr("y", -radius - 20)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Directory Depth Distribution");

    const analysisContainer = container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .style("max-width", "800px")  
    .style("text-align", "left")  
    .html(`
      <h3 style="margin-bottom: 8px;">Directory Depth</h3>
      <p>
        The repo consists of numerous subdirectories (15) and files (194). The vast majority of the files have a depth of 1, 
        meaning that they are nested in a subdirectory folder and therefore we will need to consider the appropriate methods 
        to crawl/walk through repo hierarchy to absorb file contents. Additionally, depth (nested files) are important when 
        considering graph modeling.
      </p>
    `);

// const analysisContainer = container.append("div")
//   .attr("class", "modal-analysis")
//   .style("margin-top", "20px")
//   .style("font-size", "14px")
//   .style("line-height", "1.5")
//   .style("max-width", "800px")
//   .style("text-align", "left")
//   .html(`
//     <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Directories with the Highest File Count</h3>
//     <p>
//       The bar chart below shows the top 10 directories in the repository by file count. The <code>cm/</code> directory, short for Cloud Management, contains the overwhelming majority of files. It includes dozens of .adoc documents detailing workflows and API procedures for operating the BlueXP platform across cloud providers such as AWS, Azure, and Google Cloud. Since most of the documentation consists of technical task walkthroughs, we will tailor our metadata approach to reflect this structure and content focus.
//     </p>
//   `);


}


// Pie Chart: Convention (Modal)
function renderNamingConventionPieModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const radius = Math.min(width, height) / 2 - 10;
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  let underscoreCount = 0;
  let dashCount = 0;

  latestData.forEach(d => {
    const filename = d.filename || "";
    const nameWithoutExt = filename.split(".")[0];
    underscoreCount += (nameWithoutExt.match(/_/g) || []).length;
    dashCount += (nameWithoutExt.match(/-/g) || []).length;
  });

  const total = underscoreCount + dashCount;

  const pieData = [
    { style: "Underscore (_)", count: underscoreCount },
    { style: "Hyphen (-)", count: dashCount }
  ].filter(d => d.count > 0);

  const color = d3.scaleOrdinal()
    .domain(pieData.map(d => d.style))
    .range(["#00BFFF", "#FFD700"]);  // Same colors as overview

  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);  // Ensure consistent slice order

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const outerArc = d3.arc()
    .innerRadius(radius * 1.2)
    .outerRadius(radius * 1.2);

  const arcs = svg.selectAll("arc")
    .data(pie(pieData))
    .join("g");

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.style))
    .attr("stroke", "white")
    .attr("stroke-width", 1);

  // Percentage inside slices
  arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .attr("fill", "#000")
    .text(d => `${((d.data.count / total) * 100).toFixed(1)}%`);

  // External labels for styles
  arcs.append("text")
    .attr("transform", d => `translate(${outerArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 11)
    .attr("fill", "#444")
    .text(d => d.data.style);

  svg.append("text")
    .attr("x", 0)
    .attr("y", -radius - 20)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Naming Convention Usage");

  container.append("div")
    .attr("class", "modal-analysis")
    .style("margin-top", "20px")
    .style("font-size", "14px")
    .style("line-height", "1.5")
    .text("This chart shows how filenames in this repository use underscores and hyphens.");
}

// Histogram: Box Plot (Modal)
function renderWordCountBoxPlotModal(width, height) {
  const container = d3.select("#graph-modal-body");
  container.html("");

  const wordCounts = latestData.map(d => d.num_words).filter(d => d > 0);
  const sorted = wordCounts.sort(d3.ascending);
  const q95 = d3.quantile(sorted, 0.95);
  const filtered = sorted.filter(d => d <= q95);

  const margin = { top: 60, right: 40, bottom: 60, left: 60 };
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const x = d3.scaleLinear()
    .domain([0, d3.max(filtered)]).nice()
    .range([margin.left, width - margin.right]);

  const centerY = margin.top + plotHeight / 2;
  const boxHeight = 40;

  const q1 = d3.quantile(filtered, 0.25);
  const median = d3.quantile(filtered, 0.5);
  const q3 = d3.quantile(filtered, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const min = d3.min(filtered.filter(d => d >= lowerFence));
  const max = d3.max(filtered.filter(d => d <= upperFence));
  const outliers = filtered.filter(d => d < min || d > max);

  // Box
  svg.append("rect")
    .attr("x", x(q1))
    .attr("y", centerY - boxHeight / 2)
    .attr("width", x(q3) - x(q1))
    .attr("height", boxHeight)
    .attr("stroke", "black")
    .attr("fill", "none");

  // Median line
  svg.append("line")
    .attr("x1", x(median))
    .attr("x2", x(median))
    .attr("y1", centerY - boxHeight / 2)
    .attr("y2", centerY + boxHeight / 2)
    .attr("stroke", "orange")
    .attr("stroke-width", 2);

  // Whiskers
  svg.append("line")
    .attr("x1", x(min))
    .attr("x2", x(q1))
    .attr("y1", centerY)
    .attr("y2", centerY)
    .attr("stroke", "black");

  svg.append("line")
    .attr("x1", x(q3))
    .attr("x2", x(max))
    .attr("y1", centerY)
    .attr("y2", centerY)
    .attr("stroke", "black");

  // Whisker caps
  svg.append("line")
    .attr("x1", x(min))
    .attr("x2", x(min))
    .attr("y1", centerY - boxHeight / 4)
    .attr("y2", centerY + boxHeight / 4)
    .attr("stroke", "black");

  svg.append("line")
    .attr("x1", x(max))
    .attr("x2", x(max))
    .attr("y1", centerY - boxHeight / 4)
    .attr("y2", centerY + boxHeight / 4)
    .attr("stroke", "black");

  // Outliers
  svg.append("g")
    .selectAll("circle")
    .data(outliers)
    .join("circle")
    .attr("cx", d => x(d))
    .attr("cy", centerY)
    .attr("r", 3)
    .attr("fill", "black");

  // Axis
  svg.append("g")
    .attr("transform", `translate(0,${centerY + boxHeight / 2 + 20})`)
    .call(d3.axisBottom(x).ticks(8));

  // Labels
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .text("Word Count Distribution (Box Plot)");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", centerY + boxHeight / 2 + 50)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Word Count (Excluding Top 5% Outliers)");

const analysisContainer = container.append("div")
  .attr("class", "modal-analysis")
  .style("margin-top", "20px")
  .style("font-size", "14px")
  .style("line-height", "1.5")
  .style("max-width", "800px")
  .style("text-align", "left")
  .html(`
    <h3 style="font-style: italic; font-weight: normal; margin-bottom: 8px;">Word Counts By File</h3>
    <p>
      The repo consists of numerous subdirectories (15) and files (194). The vast majority of the files have a depth of 1, meaning that they are nested in a subdirectory folder and therefore we will need to consider the appropriate methods to crawl/walk through the repo hierarchy to absorb file contents. Additionally, depth (nested files) is important when considering graph modeling.
    </p>
  `);

}



});

// --------Overview Section--------


const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 350;

//  Histogram: Document Length (Overview)

function renderDocLengthHistogram(data) {
  const container = d3.select("#chart-doc-length .chart");
  container.html("");

  const docLengths = data.map(d => d.num_words);

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleLinear()
    .domain([0, d3.max(docLengths)]).nice()
    .range([margin.left, width - margin.right]);

  const bins = d3.bin()
    .domain(x.domain())
    .thresholds(30)(docLengths);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

  const bars = svg.append("g")
    .attr("fill", "#3f8efc")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
    .attr("height", d => y(0) - y(d.length));

  // 🔔 Apply global tooltip helper:
  attachGlobalTooltip(bars, d => 
    `Documents: ${d.length}<br>Range: ${Math.round(d.x0)} – ${Math.round(d.x1)} words`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Document Length (words)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Documents");
}





//  Histogram: Document type (Overview)
function renderFileTypeDistribution(data) {
  const container = d3.select("#chart-file-type .chart");
  container.html("");

  const countsMap = {};
  data.forEach(d => {
    const ext = d.extension ? d.extension.trim() : "unknown";
    countsMap[ext] = (countsMap[ext] || 0) + 1;
  });

  const counts = Object.entries(countsMap)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => d3.descending(a.value, b.value));

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleBand()
    .domain(counts.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const yMax = d3.max(counts, d => d.value) || 1;
  const y = d3.scaleLinear()
    .domain([0, yMax * 1.1]).nice()
    .range([height - margin.bottom, margin.top]);

  const colorMap = {
    ".adoc": "#66c2a5",
    ".yml": "#fc8d62",
    ".json": "#8da0cb",
    ".md": "#e78ac3",
    ".yaml": "#a6d854",
    "unknown": "#999999"
  };

  const bars = svg.append("g")
    .selectAll("rect")
    .data(counts)
    .join("rect")
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.value))
    .attr("height", d => Math.max(0, y(0) - y(d.value)))
    .attr("width", x.bandwidth())
    .attr("fill", d => colorMap[d.key] || "#3f8efc");

  // 🔔 Apply global tooltip helper:
  attachGlobalTooltip(bars, d =>
    `File type: ${d.key}<br>Count: ${d.value}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("File Extension");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Files");
}









//  Histogram: File size Distribution 
function renderFileSizeDistribution(data) {
  const container = d3.select("#chart-file-size .chart");
  container.html("");

  const fileSizes = data.map(d => d.size_bytes > 0 ? Math.log10(d.size_bytes) : 0);
  const median = d3.median(fileSizes);

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleLinear()
    .domain([d3.min(fileSizes), d3.max(fileSizes)]).nice()
    .range([margin.left, width - margin.right]);

  const bins = d3.bin()
    .domain(x.domain())
    .thresholds(30)(fileSizes);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

  const bars = svg.append("g")
    .attr("fill", "lightgreen")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
    .attr("height", d => y(0) - y(d.length));

  // 🔔 Apply global tooltip helper:
  attachGlobalTooltip(bars, d =>
    `Files: ${d.length}<br>Size range: 10^${d.x0.toFixed(1)} – 10^${d.x1.toFixed(1)} bytes`
  );

  // Median line
  svg.append("line")
    .attr("x1", x(median))
    .attr("x2", x(median))
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "4 2");

  svg.append("text")
    .attr("x", x(median) + 4)
    .attr("y", margin.top + 10)
    .attr("fill", "red")
    .attr("font-size", 12)
    .text("Median");

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat(d => `10^${d.toFixed(1)}`));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("File Size (log10 bytes)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Frequency");
}




// Histogram: File Name Distribution
function renderFilenameLengthHistogram(data) {
  const container = d3.select("#chart-filename-length .chart");
  container.html("");

  const filenameLengths = data.map(d => d.filename ? d.filename.length : 0);
  const median = d3.median(filenameLengths);

  let containerWidth = container.node().getBoundingClientRect().width;
  if (containerWidth === 0) containerWidth = 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleLinear()
    .domain([0, d3.max(filenameLengths)]).nice()
    .range([margin.left, width - margin.right]);

  const bins = d3.bin()
    .domain(x.domain())
    .thresholds(30)(filenameLengths);

  const y = d3.scaleLinear()
    .domain([0, 24])
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
    .attr("height", d => y(0) - y(d.length))
    .attr("fill", "#4CAF50") // Consistent green color
    .attr("stroke", "black")
    .attr("opacity", 1)
    .on("mouseover", function(event, d) {
      d3.select(this).attr("opacity", 0.7);
      d3.select("#tooltip")
        .style("opacity", 1)
        .html(`Files: ${d.length}<br>Length range: ${Math.round(d.x0)}–${Math.round(d.x1)} chars`);
    })
    .on("mousemove", function(event) {
      d3.select("#tooltip")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("opacity", 1);
      d3.select("#tooltip").style("opacity", 0);
    });

  // Median marker
  svg.append("line")
    .attr("x1", x(median))
    .attr("x2", x(median))
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "4 2");

  svg.append("text")
    .attr("x", x(median) + 4)
    .attr("y", margin.top + 10)
    .attr("fill", "red")
    .attr("font-size", 12)
    .text("Median");

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Filename Length (characters)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Frequency");
}






// Histogram: Header Hierarchy 
function renderHeaderHierarchyHistogram(data) {
  const container = d3.select("#chart-header-hierarchy .chart");
  container.html("");

  if (!data || data.length === 0) {
    console.warn("No data provided for Header Hierarchy Usage");
    return;
  }

  const headerLevels = [
    { key: "H1", value: d3.sum(data, d => d.h1_count || 0) },
    { key: "H2", value: d3.sum(data, d => d.h2_count || 0) },
    { key: "H3", value: d3.sum(data, d => d.h3_count || 0) }
  ].filter(d => d.value > 0);

  let containerWidth = container.node().getBoundingClientRect().width;
  if (containerWidth === 0) containerWidth = 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const y = d3.scaleBand()
    .domain(headerLevels.map(d => d.key))
    .range([margin.top, height - margin.bottom])
    .padding(0.3);

  const xMax = d3.max(headerLevels, d => d.value) || 1;
  const x = d3.scaleLinear()
    .domain([0, xMax * 1.1]).nice()
    .range([margin.left, width - margin.right]);

  const colors = ["#66c2a5", "#fc8d62", "#8da0cb"];

  const bars = svg.append("g")
    .selectAll("rect")
    .data(headerLevels)
    .join("rect")
    .attr("y", d => y(d.key))
    .attr("x", x(0))
    .attr("width", d => Math.max(0, x(d.value) - x(0)))
    .attr("height", y.bandwidth())
    .attr("fill", (d, i) => colors[i]);

  // 🔔 Attach tooltip hover interaction here
  attachGlobalTooltip(bars, d =>
    `Header Level: ${d.key}<br>Count: ${d.value}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Total Count");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Header Level");
}






//  Histogram: Link Density 
function renderLinkDensityHistogram(data) {
  const container = d3.select("#chart-link-density .chart");
  container.html("");

  // const linkCounts = data.map(d => d.links || 0);

  const rawLinks = data.map(d => d.links || 0);
  const q95 = d3.quantile(rawLinks, 0.95);
  const linkCounts = rawLinks.filter(d => d <= q95);

  let containerWidth = container.node().getBoundingClientRect().width;
  if (containerWidth === 0) containerWidth = 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleLinear()
    .domain([0, d3.max(linkCounts)]).nice()
    .range([margin.left, width - margin.right]);

  const bins = d3.bin()
    .domain(x.domain())
    .thresholds(20)(linkCounts);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

  const bars = svg.append("g")
    .attr("fill", "#e78ac3")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
    .attr("height", d => y(0) - y(d.length));

  // ✅ Attach global tooltip:
  attachGlobalTooltip(bars, d =>
    `Link Range: ${d.x0} – ${d.x1}<br>Count: ${d.length}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Link Count");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Files");
}




// Histogram: Link Distribution
function renderLinkDistributionBar(data) {
  const container = d3.select("#chart-link-distribution .chart");
  container.html("");

  const totalInternal = d3.sum(data, d => d.internal_links || 0);
  const totalExternal = d3.sum(data, d => d.external_links || 0);

  const linkData = [
    { type: "Internal Links", count: totalInternal },
    { type: "External Links", count: totalExternal }
  ];

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, width / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleBand()
    .domain(linkData.map(d => d.type))
    .range([margin.left, width - margin.right])
    .padding(0.4);

  const y = d3.scaleLinear()
    .domain([0, d3.max(linkData, d => d.count) * 1.1]).nice()
    .range([height - margin.bottom, margin.top]);

  const color = d3.scaleOrdinal()
    .domain(linkData.map(d => d.type))
    .range(d3.schemeSet2);

  const bars = svg.append("g")
    .selectAll("rect")
    .data(linkData)
    .join("rect")
    .attr("x", d => x(d.type))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.count))
    .attr("fill", d => color(d.type));

  // ✅ Global hover and tooltip:
  attachGlobalTooltip(bars, d =>
    `Link Type: ${d.type}<br>Count: ${d.count}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Link Type");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Total Count");
}





// Histogram: Top 10 Prefixes 

function renderTopPrefixesBar(data) {
  const container = d3.select("#chart-prefix .chart");
  container.html("");

  const getPrefix = filename => {
    if (!filename) return "";
    let match = filename.match(/^[^-_]+/);
    return match ? match[0] : "";
  };

  const prefixCounts = {};
  data.forEach(d => {
    const prefix = getPrefix(d.filename);
    if (prefix) prefixCounts[prefix] = (prefixCounts[prefix] || 0) + 1;
  });

  const prefixList = Object.entries(prefixCounts)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 10);

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, width / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 60, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleBand()
    .domain(prefixList.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(prefixList, d => d.value) * 1.1]).nice()
    .range([height - margin.bottom, margin.top]);

  const bars = svg.append("g")
    .attr("fill", "#f0627e")
    .selectAll("rect")
    .data(prefixList)
    .join("rect")
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => Math.max(0, y(0) - y(d.value)));

  // ✅ Attach hover and tooltip globally consistent:
  attachGlobalTooltip(bars, d =>
    `Prefix: ${d.key}<br>Count: ${d.value}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-30)")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Prefix");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Frequency");
}



// Histogram: Top 10 Directories
function renderTopDirectoriesBar(data) {
  const container = d3.select("#chart-top-directories .chart");
  container.html("");

  // Aggregate counts by directory
  const dirCounts = d3.rollups(
    data,
    v => v.length,
    d => d.directory || "Unknown"
  ).map(([directory, count]) => ({ directory, count }))
   .sort((a, b) => d3.descending(a.count, b.count))
   .slice(0, 10);

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(250, width / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 120 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const y = d3.scaleBand()
    .domain(dirCounts.map(d => d.directory))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  const x = d3.scaleLinear()
    .domain([0, d3.max(dirCounts, d => d.count) * 1.1]).nice()
    .range([margin.left, width - margin.right]);

  const color = d3.scaleOrdinal()
    .domain(dirCounts.map(d => d.directory))
    .range(d3.schemeTableau10);

  const bars = svg.append("g")
    .selectAll("rect")
    .data(dirCounts)
    .join("rect")
    .attr("x", margin.left)
    .attr("y", d => y(d.directory))
    .attr("height", y.bandwidth())
    .attr("width", d => x(d.count) - margin.left)
    .attr("fill", d => color(d.directory));

  // ✅ Attach consistent global tooltip
  attachGlobalTooltip(bars, d =>
    `Directory: ${d.directory}<br>File Count: ${d.count}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Files");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Directory");
}



// Histogram: Most Common Words
function renderCommonWordsBar(data) {
  const container = d3.select("#chart-common-words .chart");
  container.html("");

  if (!data || data.length === 0) {
    console.warn("No data provided for Common Words Bar");
    return;
  }

  const wordCounts = {};
  data.forEach(d => {
    if (d.filename) {
      d.filename.split(/[^a-zA-Z0-9]+/).forEach(w => {
        const word = w.toLowerCase();
        if (word && word.length > 1) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    }
  });

  const words = Object.entries(wordCounts)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 10);

  let containerWidth = container.node().getBoundingClientRect().width || 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, width / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 40, left: 100 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const y = d3.scaleBand()
    .domain(words.map(d => d.key).reverse())
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  const xMax = d3.max(words, d => d.value) || 1;
  const x = d3.scaleLinear()
    .domain([0, xMax * 1.1]).nice()
    .range([margin.left, width - margin.right]);

  const bars = svg.append("g")
    .attr("fill", "#4682b4")
    .selectAll("rect")
    .data(words)
    .join("rect")
    .attr("y", d => y(d.key))
    .attr("x", x(0))
    .attr("width", d => Math.max(0, x(d.value) - x(0)))
    .attr("height", y.bandwidth());

  // ✅ Attach global hover/tooltip behavior:
  attachGlobalTooltip(bars, d =>
    `Word: ${d.key}<br>Count: ${d.value}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Frequency");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Word");
}



// Histogram: File Clusters
function renderFileClustersBarSummary(data) {
  const container = d3.select("#chart-file-clusters .chart");
  container.html("");

  if (!data || data.length === 0) {
    console.warn("No data provided for File Clusters");
    return;
  }

  let containerWidth = container.node().getBoundingClientRect().width;
  if (containerWidth === 0) containerWidth = 400;
  const aspectRatio = 4 / 3;
  const width = containerWidth;
  const height = Math.max(200, containerWidth / aspectRatio);
  const margin = { top: 20, right: 30, bottom: 80, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);

  const x = d3.scaleBand()
    .domain(data.map(d => d.cluster))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count) * 1.1]).nice()
    .range([height - margin.bottom, margin.top]);

  // draw bars and capture selection
  const bars = svg.append("g")
    .attr("fill", "#3f8efc")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.cluster))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.count));

  // ✨ attach the global tooltip helper here
  attachGlobalTooltip(bars, d =>
    `Cluster: ${d.cluster}<br>Files: ${d.count}`
  );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("File Cluster");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Files");
}










// Scatterplot: Code Density vs Document Size 
function renderCodeDensityScatter(data) {
  const container = d3.select("#chart-code-density .chart");
  container.html(""); 
  const points = data
    .filter(d => d.total_lines > 0)
    .map(d => ({
      size: d.num_words,
      density: d.code_lines / d.total_lines
    }));
  const width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, margin = {top: 20, right: 30, bottom: 40, left: 60};
  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true);
  const x = d3.scaleLinear()
      .domain([0, d3.max(points, d => d.size)]).nice()
      .range([margin.left, width - margin.right]);
  const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - margin.bottom, margin.top]);
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(d3.format(".0%")));
  svg.append("g")
    .selectAll("circle")
    .data(points)
    .join("circle")
      .attr("cx", d => x(d.size))
      .attr("cy", d => y(d.density))
      .attr("r", 4)
      .attr("fill", "#ff9800")
      .attr("opacity", 0.6);
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Document Length (words)");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Code Density");
}



// Pie Chart: directory depth
function renderDirectoryDepthPie(data) {
  const container = d3.select("#chart-directory-depth .chart");
  container.html("");

  const depthCounts = d3.rollups(
    data,
    v => v.length,
    d => d.depth
  ).map(([key, value]) => ({ key: String(key), value }))
   .sort((a, b) => +a.key - +b.key);

  const totalFiles = d3.sum(depthCounts, d => d.value);

  const width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT;
  const radius = Math.min(width, height) / 2;

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(depthCounts.map(d => d.key))
    .range(d3.schemeSet2);

  // 🔔 Exaggerate small slices (< 5%) by 3x
  const pie = d3.pie()
    .value(d => {
      const percent = d.value / totalFiles * 100;
      return percent < 5 ? d.value * 3 : d.value;
    });

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 10);

  const labelArc = d3.arc()
    .innerRadius(radius * 0.85)
    .outerRadius(radius * 0.85);

  const arcs = svg.selectAll("arc")
    .data(pie(depthCounts))
    .join("g");

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.key))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  // Percentage labels (based on true values, not exaggerated ones)
  arcs.append("text")
    .attr("transform", d => `translate(${labelArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 11)
    .attr("fill", "#333")
    .text(d => {
      const actualPercent = (d.data.value / totalFiles) * 100;
      return actualPercent >= 1 ? `${actualPercent.toFixed(1)}%` : "";
    });

  svg.append("text")
    .attr("x", 0)
    .attr("y", radius + 20)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Depth Level");
}

// Pie Chart: Naming Conventions
function renderNamingConventionPie(data) {
  const container = d3.select("#chart-naming-convention .chart");
  container.html("");

  let underscoreCount = 0;
  let dashCount = 0;

  data.forEach(d => {
    const filename = d.filename || "";
    const nameWithoutExt = filename.split(".")[0];
    underscoreCount += (nameWithoutExt.match(/_/g) || []).length;
    dashCount += (nameWithoutExt.match(/-/g) || []).length;
  });

  const total = underscoreCount + dashCount;
  const pieData = [
    { style: "Underscore (_)", count: underscoreCount },
    { style: "Hyphen (-)", count: dashCount }
  ].filter(d => d.count > 0);

  const width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT;
  const radius = Math.min(width, height) / 2;

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Custom color assignment for consistent styling
  const color = d3.scaleOrdinal()
    .domain(["Underscore (_)", "Hyphen (-)"])
    .range(["#00BFFF", "#FFD700"]);  // Light blue, Yellow

  const pie = d3.pie()
    .value(d => d.count);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 10);

  const outerArc = d3.arc()
    .innerRadius(radius * 1.1)
    .outerRadius(radius * 1.1);

  const arcs = svg.selectAll("arc")
    .data(pie(pieData))
    .join("g");

  // Pie slices
  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.style));

  // Percentage inside slices
  arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("fill", "#000")
    .text(d => {
      const percent = (d.data.count / total) * 100;
      return `${percent.toFixed(1)}%`;
    });

  // External labels for styles
  arcs.append("text")
    .attr("transform", d => `translate(${outerArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 9)
    .attr("fill", "#444")
    .text(d => d.data.style);
}





// Box Plot
function renderWordCountBoxPlot(data) {
  const container = d3.select("#chart-wordcount-boxplot .chart");
  container.html("");

  const wordCounts = data.map(d => d.num_words).filter(d => d > 0);
  const q95 = d3.quantile(wordCounts.sort(d3.ascending), 0.95);

  const filtered = wordCounts.filter(d => d <= q95);
  const width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT;
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)

  const x = d3.scaleLinear()
    .domain([0, d3.max(filtered)]).nice()
    .range([margin.left, width - margin.right]);

  const center = (height - margin.top - margin.bottom) / 2 + margin.top;
  const boxWidth = 40;

  const sorted = filtered.sort(d3.ascending);
  const q1 = d3.quantile(sorted, 0.25);
  const median = d3.quantile(sorted, 0.5);
  const q3 = d3.quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const min = d3.min(sorted.filter(d => d >= lowerFence));
  const max = d3.max(sorted.filter(d => d <= upperFence));

  // Box
  svg.append("rect")
    .attr("x", x(q1))
    .attr("y", center - boxWidth / 2)
    .attr("width", x(q3) - x(q1))
    .attr("height", boxWidth)
    .attr("stroke", "black")
    .attr("fill", "none");  // No gray fill for closer match (optional)

  // Median line (orange/yellow)
  svg.append("line")
    .attr("x1", x(median))
    .attr("x2", x(median))
    .attr("y1", center - boxWidth / 2)
    .attr("y2", center + boxWidth / 2)
    .attr("stroke", "orange")
    .attr("stroke-width", 2);

  // Whisker caps (just endpoints, no horizontal line through box)
  svg.append("line")
    .attr("x1", x(min))
    .attr("x2", x(min))
    .attr("y1", center - boxWidth / 4)
    .attr("y2", center + boxWidth / 4)
    .attr("stroke", "black");

  svg.append("line")
    .attr("x1", x(max))
    .attr("x2", x(max))
    .attr("y1", center - boxWidth / 4)
    .attr("y2", center + boxWidth / 4)
    .attr("stroke", "black");

  // Vertical whisker line (optional: add if you want the whisker)
  svg.append("line")
    .attr("x1", x(min))
    .attr("x2", x(q1))
    .attr("y1", center)
    .attr("y2", center)
    .attr("stroke", "black");

  svg.append("line")
    .attr("x1", x(q3))
    .attr("x2", x(max))
    .attr("y1", center)
    .attr("y2", center)
    .attr("stroke", "black");

  // Outlier points
  const outliers = filtered.filter(d => d < min || d > max);
  svg.append("g")
    .selectAll("circle")
    .data(outliers)
    .join("circle")
      .attr("cx", d => x(d))
      .attr("cy", center)
      .attr("r", 3)
      .attr("fill", "black");

  // Axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text("Word Count (Excluding Top 5% Outliers)");
}



