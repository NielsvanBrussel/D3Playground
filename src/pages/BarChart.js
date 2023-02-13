import React, { useState, useRef, useEffect } from 'react'
import createBarChartSvg from '../d3/createBarChart'
import InputField from '../components/InputField'

const BarChart = () => {
    const [data, setData] = useState([{value: 25, label: 'Mali'}, {value: 48, label: 'South-Africa'}, {value: 9, label: 'Morocco'}, {value: 31, label: 'Uganda'}, {value: 71, label: 'Botswana'}, {value: 73, label: 'Congo'}, {value: 19, label: 'Egypt'}])
    const barChartRef = useRef()
    const [autoSort, setAutoSort] = useState(true)
    const [test, setTest] = useState("")

    useEffect(() => {
        createBarChartSvg({
            barChartRef: barChartRef,
            rawData: data,
            autoSort: autoSort,
        })
    }, [data])


    useEffect(() => {
        console.log(test)
    }, [test])
    


    return (
        <section style={{ width: '100%', margin: '3rem auto', maxWidth: '70rem'}}>
            <div style={{margin: '2rem 6vw'}}>
                <div style={{ margin: '2rem auto',  backgroundColor: '#191F45'}}>
                    <svg ref={barChartRef}></svg> 
                </div>
                <InputField label="hallo"
                            value={test}
                            setValue={setTest}
                            placeholder="enter value"
                            variant='default'
                />
            </div>
        </section>
    )
}

export default BarChart