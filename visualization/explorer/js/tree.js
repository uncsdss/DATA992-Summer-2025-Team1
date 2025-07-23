
const M = { top:20, right:20, bottom:20, left:20 };
const dx = 15, dy = 1000;

function buildHierarchyFromFlatList(flatList) {
  const root = { name: "root", children: [] };

  flatList.forEach(item => {
    const parts = item.file_path.split('/');
    let current = root;

    parts.forEach((part, idx) => {
      let existing = current.children.find(c => c.name === part);
      if (!existing) {
        existing = {
          name: part,
          children: [],
        };
        current.children.push(existing);
      }

      if (idx === parts.length - 1) {
        // Attach metadata at leaf
        existing.metadata = item;
      }

      current = existing;
    });
  });

  return root;
}

// load data and draw tree
d3.json('../data/cell_3_extracted_metadata.json').then(flatList => {
  const data = buildHierarchyFromFlatList(flatList);
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

  if (!d.metadata || Object.keys(d.metadata).length === 0) {
    panel.append('h3').text(d.name);
    panel.append('p').text('No metadata available.');
    return;
  }

  const md = d.metadata;
  panel.append('h2').text(md.title || d.name);

  if (md.uuid) panel.append('p').html(`<strong>UUID:</strong> ${md.uuid}`);
  if (md.persona) panel.append('p').html(`<strong>Persona:</strong> ${md.persona}`);
  if (md.doc_type) panel.append('p').html(`<strong>Doc Type:</strong> ${md.doc_type}`);
  if (md.file_name) panel.append('p').html(`<strong>File:</strong> ${md.file_name}`);
  if (md.last_modified) panel.append('p').html(`<strong>Last Modified:</strong> ${md.last_modified}`);
  if (md.summary) panel.append('p').html(`<strong>Summary:</strong> ${md.summary}`);

  if (md.synonym_data && md.synonym_data.length) {
    const text = Array.isArray(md.synonym_data) ? md.synonym_data.join(', ') : md.synonym_data;
    panel.append('p').html(`<strong>Synonyms:</strong> ${text}`);
  }

  if (md.section_headings && typeof md.section_headings === 'string') {
    const sections = md.section_headings.split(',').map(s => s.trim());
    panel.append('p').html('<strong>Section Headings</strong>');
    panel.append('ul')
      .selectAll('li')
      .data(sections)
      .join('li')
      .text(d => d);
  }

  if (md.keywords && md.keywords.length) {
    panel.append('p').html('<strong>Keywords</strong>');
    panel.append('ul')
      .selectAll('li')
      .data(md.keywords)
      .join('li')
      .text(d => d);
  }

  if (md.tags && md.tags.length) {
    panel.append('p').html('<strong>Tags</strong>');
    panel.append('ul')
      .selectAll('li')
      .data(md.tags)
      .join('li')
      .text(d => d);
  }
}





