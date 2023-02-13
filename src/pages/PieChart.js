import React, { useState, useRef, useEffect } from 'react'
import createPieChartSvg from '../d3/createPieChart'

const PieChart = () => {

    const pieChartRef = useRef()
    const [data, setData] = useState([{value: 25, label: 'Mali'}, {value: 48, label: 'South-Africa'}, {value: 9, label: 'Morocco'}, {value: 31, label: 'Uganda'}, {value: 71, label: 'Botswana'}, {value: 73, label: 'Congo'}, {value: 6, label: 'Eritrea'}, {value: 33, label: 'Senegal'}, {value: 81, label: 'Algeria'}, {value: 77, label: 'Libya'}, {value: 12, label: 'Sudan'}, {value: 63, label: 'Mozambique'}])

    useEffect(() => {
        createPieChartSvg({
            pieChartRef: pieChartRef,
            rawData: data,
        })
    }, [data])


    return (
        <section style={{ width: '100%', margin: '5rem auto', maxWidth: '70rem'}}>
            <div style={{margin: '2rem 6vw'}}>
                <div style={{ margin: '2rem auto',  backgroundColor: '#191F45'}}>
                    <svg ref={pieChartRef}></svg> 
                </div>
                <div>ALLO</div>
            </div>
        </section>
    )
}

export default PieChart