
const M = { top:20, right:20, bottom:20, left:20 };
const dx = 15, dy = 1000;

// load data and draw tree
d3.json('../data/repo-tree.json').then(data => {
  const root = d3.hierarchy(data);
  const tree = d3.tree().nodeSize([dx, dy]);
  tree(root);

  // bounds
  let x0=Infinity, x1=-Infinity, y0=Infinity, y1=-Infinity;
  root.each(d => {
    x0 = Math.min(x0, d.x);
    x1 = Math.max(x1, d.x);
    y0 = Math.min(y0, d.y);
    y1 = Math.max(y1, d.y);
  });

  const width  = y1-y0 + M.left + M.right;
  const height = x1-x0 + M.top + M.bottom;

  const svg = d3.select('#tree-container svg')
    .attr('viewBox', `${y0 - M.left} ${x0 - M.top} ${width} ${height}`);

  const g = svg.select('g')
    .attr('transform', `translate(${-y0 + M.left},${-x0 + M.top})`);

  // links
  g.append('g')
    .selectAll('path.link')
    .data(root.links())
    .join('path')
      .attr('class','link')
      .attr('d', d3.linkHorizontal().x(d=>d.y).y(d=>d.x));

  // nodes
  const nodes = g.append('g')
    .selectAll('g.node')
    .data(root.descendants())
    .join('g')
      .attr('class','node')
      .attr('transform', d=>`translate(${d.y},${d.x})`);

  nodes.append('circle')
    .attr('r',6)
    .style('cursor', d=>d.data.metadata?'pointer':'default')
    .on('click',(e,d)=>showMetadata(d.data))
    .append('title').text(d=>d.data.name);

  nodes.append('text')
    .attr('x',8).attr('dy','0.32em')
    .text(d=>d.data.name);

  // zoom/pan
  svg.call(d3.zoom()
    .scaleExtent([0.8,3])
    .translateExtent([[y0 - M.left, x0 - M.top],
                      [y1 + M.right, x1 + M.bottom]])
    .on('zoom', ({transform}) => g.attr('transform', transform))
  );

//   const initial = d3.zoomIdentity
//     .translate(-y0 + M.left, -(x0 - M.top) + 50)
//     .scale(1);

//   svg.call(zoom.transform, initial);

    const init = d3.zoomIdentity
        .translate(-y0 + M.left, -x0 + M.top + 50)
        .scale(1);
      svg.call(zoom.transform, init);
    }).catch(console.error);

// });

function showMetadata(d) {
  const panel = d3.select('#metadata-panel').html('');
  panel.append('h3').text(d.name);
  if (!d.metadata || Object.keys(d.metadata).length===0) {
    panel.append('p').text('No metadata available.');
  } else {
    Object.entries(d.metadata).forEach(([k,v]) =>
      panel.append('p').html(`<strong>${k}:</strong> ${v}`)
    );
  }
}


