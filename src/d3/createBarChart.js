import * as d3 from 'd3'
import calcBoundaries from './calcBoundaries'

const createBarChartSvg = ({barChartRef, rawData, autoSort}) => {

    const data = autoSort ? rawData.sort((a, b) => a.value - b.value) : rawData

    const yBoundaries = calcBoundaries({axis: 'value', data: data})
    const upperYBoundary = yBoundaries.upperBoundary
    const lowerYBoundary = yBoundaries.lowerBoundary


    // setting up container
        const width = 600
        const height = 300
        const svg = d3.select(barChartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style('background', 'rgba(0, 0, 0, 0.1)')
            .style('margin', '20 20 80 20')
            .style('padding', '20')
            .style('overflow', 'visible')

    // set up scale
        const xScale = d3.scaleBand()
            .domain(data.map((d, i) => d.label))
            .range([0 , width])
            .padding(0.2)
        const yScale = d3.scaleLinear()
            .domain([lowerYBoundary, upperYBoundary])
            .range([height, 0])

    // set up axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${height})`)
            .style("color", "white")
            .selectAll("text")
                .style("color", "white")
                .attr("transform", "translate(-10,0)rotate(-45)")      // rotate labels
                .style("text-anchor", "end");
        svg.append('g')
            .call(yAxis)
            .style("color", "white")

    // draw grid lines
        const yAxisGrid = d3.axisRight(yScale)
            .tickSize(width)
            .tickFormat('')
            .ticks(10)
        svg.append('g')
            .attr('class', 'grid-lines')
            .style("color", "white")
            .call(yAxisGrid);

    // set up data for svg
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
                .attr('x', (d, i) => xScale(d.label))
                .attr('y', (d, i) => yScale(d.value))
                .attr('width', xScale.bandwidth())
                .attr('height', d => { return (height - yScale(d.value))})
                .attr("fill", "white")
}


export default createBarChartSvg