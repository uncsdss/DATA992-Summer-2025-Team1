document.addEventListener('DOMContentLoaded', function () {
  d3.json('../data/doc_metadata.json').then(data => {
    renderDocLengthHistogram(data);
    renderHeaderHierarchyHistogram(data);
    renderLinkDensityHistogram(data);
    renderCodeDensityScatter(data);
    renderTopPrefixesBar(data)
    setupEDATabButtons();
    showEDATab('histogram');
  });
});

function setupEDATabButtons() {
  const tabMap = {
    'histogram': 'histogram-group',
    'scatter': 'scatter-group'
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

//  Histogram: Document Length 
function renderDocLengthHistogram(data) {
  const container = d3.select("#chart-doc-length .chart");
  container.html(""); 
  const docLengths = data.map(d => d.num_words);
  const width = 360, height = 300, margin = {top: 20, right: 30, bottom: 40, left: 60};
  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);
  const x = d3.scaleLinear()
      .domain([0, d3.max(docLengths)]).nice()
      .range([margin.left, width - margin.right]);
  const bins = d3.bin()
      .domain(x.domain())
      .thresholds(30)(docLengths);
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)]).nice()
      .range([height - margin.bottom, margin.top]);
  svg.append("g")
    .attr("fill", "#3f8efc")
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("y", d => y(d.length))
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr("height", d => y(0) - y(d.length));
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

// Histogram: Header Hierarchy 
function renderHeaderHierarchyHistogram(data) {
  const container = d3.select("#chart-header-hierarchy .chart");
  container.html(""); 
  const headerLevels = [
    { key: "H1", value: d3.sum(data, d => d.h1_count) },
    { key: "H2", value: d3.sum(data, d => d.h2_count) },
    { key: "H3", value: d3.sum(data, d => d.h3_count) }
  ];
  const width = 360, height = 300, margin = {top: 20, right: 30, bottom: 40, left: 60};
  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);
  const x = d3.scaleBand()
      .domain(headerLevels.map(d => d.key))
      .range([margin.left, width - margin.right])
      .padding(0.3);
  const y = d3.scaleLinear()
      .domain([0, d3.max(headerLevels, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);
  svg.append("g")
    .attr("fill", "#69b3a2")
    .selectAll("rect")
    .data(headerLevels)
    .join("rect")
      .attr("x", d => x(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value));
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
    .text("Header Level");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Total Count");
}

//  Histogram: Link Density 
function renderLinkDensityHistogram(data) {
  const container = d3.select("#chart-link-density .chart");
  container.html(""); 
  const linkCounts = data.map(d => d.links || 0);
  const width = 360, height = 300, margin = {top: 20, right: 30, bottom: 40, left: 60};
  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);
  const x = d3.scaleLinear()
      .domain([0, d3.max(linkCounts)]).nice()
      .range([margin.left, width - margin.right]);
  const bins = d3.bin()
      .domain(x.domain())
      .thresholds(20)(linkCounts);
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)]).nice()
      .range([height - margin.bottom, margin.top]);
  svg.append("g")
    .attr("fill", "#e55353")
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("y", d => y(d.length))
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr("height", d => y(0) - y(d.length));
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
    .text("Links per Document");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", 13)
    .text("Number of Documents");
}

// Histogram: Top 10 Prefixes 

function renderTopPrefixesBar(data) {
  // Extract prefix from filename using the first "_" or "-"
  const getPrefix = filename => {
    if (!filename) return "";
    let match = filename.match(/^[^-_]+/);
    return match ? match[0] : "";
  };

  // Count prefixes
  const prefixCounts = {};
  data.forEach(d => {
    const prefix = getPrefix(d.filename);
    if (prefix) prefixCounts[prefix] = (prefixCounts[prefix] || 0) + 1;
  });

  // Convert to array, sort, take top 10
  const prefixList = Object.entries(prefixCounts)
    .map(([key, value]) => ({key, value}))
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 10);

  const width = 340, height = 300, margin = {top: 20, right: 30, bottom: 60, left: 60};
  const svg = d3.select("#chart-prefix .chart").html("")
    .append("svg").attr("width", width).attr("height", height);

  const x = d3.scaleBand()
    .domain(prefixList.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(prefixList, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("fill", "#f0627e")
    .selectAll("rect")
    .data(prefixList)
    .join("rect")
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.value));

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)).selectAll("text")
    .attr("transform", "rotate(-30)").attr("dx", "-.8em").attr("dy", ".15em").style("text-anchor", "end");
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width/2).attr("y", height-10).attr("text-anchor", "middle")
    .text("Prefix");
  svg.append("text")
    .attr("transform", "rotate(-90)").attr("x", -height/2).attr("y", 15).attr("text-anchor", "middle")
    .text("Frequency");
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
  const width = 360, height = 300, margin = {top: 20, right: 30, bottom: 40, left: 60};
  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);
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
