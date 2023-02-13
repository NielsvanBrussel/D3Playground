import * as d3 from 'd3'


const createPieChart = ({ rawData, pieChartRef }) => {
    const width = 500
    const height = 500
    const radius = width / 2

    
//set up svg container
    const svg = d3.select(pieChartRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style('background', 'rgba(0, 0, 0, 0.1)')
        .style('padding', '3% 30% 3% 3%')
        .style('overflow', 'visible')


// set up chart 
    const formattedData = d3.pie().value(d => d.value)(rawData)
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
    const color = d3.scaleOrdinal().range(d3.schemeSet2)


// set up svg data
    svg.selectAll()
        .data(formattedData)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.value))
        .style('opacity', 0.7)
        .attr('transform', 'translate(' + (width/2) +  ',' + height/2 +')');


// set up annotation    
    svg.selectAll()
        .data(formattedData)
        .join('text')
            .text(d => {return (`${d.data.label}: ${d.data.value}`)})
            .attr('transform', (d, index) => 'translate(' + (30 + width) +  ',' + (25 + (index * 20)) +')')
            .style("stroke", d => color(d.value))
            .style('text-anchor', 'start')
            .style('padding', 10)

}



export default createPieChart