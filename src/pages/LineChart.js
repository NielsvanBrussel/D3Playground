import React, { useState, useRef, useEffect } from 'react'
import createLineChartSvg from '../d3/createLineChart'
import createScatterPlot from '../d3/createScatterPlot';
import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, IconButton } from '@mui/material';
import DataInput from '../components/DataInput';
import styles from '../styles/LineChart.module.css'
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai'

import InputField from '../components/InputField';

const LineChart = () => {

    const tabid = uuidv4()

    const [colours, setColours] = useState(['#68c479', '#962ce8', '#7f1f13', '#17cbd4', '#675104', '#ea990c'])
    const lineChartRef = useRef()
    const [xAxisUnit, setXAxisUnit] = useState("x")
    const [yAxisUnit, setYAxisUnit] = useState("y")
    const [autoSort, setAutoSort] = useState(true)
    const [lineChartMode, setLineChartMode] = useState(true)
    const [activeTab, setActiveTab] = useState(tabid)
    const [tabs, setTabs] = useState([{graphid: tabid, colour: colours[0], title: 'Line 1'}])
    const [data, setData] = useState([])
    

    useEffect(() => {

        // remove old svg
        const svg = d3.select(lineChartRef.current)
        svg.selectAll("*").remove()

        // create new one
        if (lineChartMode) {
            createLineChartSvg({
                lineChartRef: lineChartRef,
                rawData: data,
                xAxisUnit: xAxisUnit,
                yAxisUnit: yAxisUnit,
                autoSort: autoSort,
                tabs: tabs,
            })   
        } else {
            createScatterPlot({
                lineChartRef: lineChartRef,
                rawData: data,
                xAxisUnit: xAxisUnit,
                yAxisUnit: yAxisUnit,
                autoSort: autoSort,
            })              
        }
  

    }, [data, autoSort, xAxisUnit, yAxisUnit, lineChartMode, tabs])

    useEffect(() => {
        // change active tab when a new one gets created or an old one gets removed
        setActiveTab(tabs[tabs.length - 1].graphid) 
    }, [tabs.length])
    
    
    const createTab = () => {
        setTabs([...tabs, {graphid: uuidv4(), colour: colours[tabs.length], title: `Line ${tabs.length + 1}`}])
    }

    const removeTab = ({index, graphid}) => {
        const filteredData = data.filter(item => item.graphid !== graphid)
        setData(filteredData)

        let copyColours = [...colours]
        copyColours.push(copyColours.splice(index, 1)[0])
        setColours(copyColours)

        const copy = [...tabs]
        copy.splice(index, 1)
        setTabs(copy)
    }

    const addData = ({graphid, colour}) => {
        const id = uuidv4()
        setData([...data, {x: 0, y: 0, id: id, graphid: graphid, colour: colour}])
    }

    const removeDataInput = (id) => {
        const filteredData = data.filter(item => item.id !== id)
        setData(filteredData)
    }

    const toggleAutosort = () => {
        setAutoSort(prevState => !prevState)
    }

    const toggleMode = () => {
        setLineChartMode(prevState => !prevState)
    }

    const TabContent = ({graphid, colour}) => {
        return(
            <div className={graphid === activeTab ? styles.tabs__content__item__active : styles.tabs__content__item}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '1rem'}}>
                    <div className={styles.button__container}>
                        <button className={styles.button} onClick={() => addData({graphid, colour})} type="submit">ADD DATA</button>
                    </div>              
                </div>
            </div>
        )
    }

    const TabNavItem = ({active, item, index}) => {
   
        const [title, setTitle] = useState(item.title)
        const [edit, setEdit] = useState(false)

        const changeTabTitle = () => {
            setEdit(false)
            const array = [...tabs]
            array[index].title = title
            setTabs(array)
        }

        return (
            <div className={active ? styles.tabs__nav__item__active : styles.tabs__nav__item} onClick={() => {!active && setActiveTab(item.graphid)}}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', width: '100%'}}>                                    
                    <div style={{ backgroundColor: item.colour, height: '1rem', width: '1rem', minHeight: '1rem', minWidth: '1rem'}}></div>
                    {edit ?
                        <div className={styles.tab__title}>
                            <input className={styles.input} type="title" autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={title}></input>
                        </div>
                    :
                        <div className={styles.tab__title}>
                            <p style={{ fontSize: '1.25rem', padding: 0, margin: 0, overflow: 'hidden', maxWidth: `calc(16rem - (2.2 * ${tabs.length}rem))`}}>{title}</p>
                        </div>
                    }
                </div>
                {edit ? 
                    active ? <AiOutlineCheck size={20} style={{cursor: 'pointer'}} onClick={() => changeTabTitle()}/> : null
                :
                    active ? <AiOutlineEdit size={20} style={{cursor: 'pointer'}} onClick={() => setEdit(true)}/> : null
                }
                {active && tabs.length > 1 && <IoCloseOutline size={28} className={styles.tabs__nav__item__icon} style={{ cursor: 'pointer' }} onClick={() => removeTab({index: index, graphid: item.graphid})} />}
            </div>
        )
    }

    return (
        <section style={{ width: '100%', margin: '3rem auto', maxWidth: '70rem'}}>
            <div style={{margin: '2rem 4vw'}}>
                <div style={{ margin: '2rem auto',  backgroundColor: '#191F45'}}>
                    <svg style={{clear: "both"}} ref={lineChartRef}></svg> 
                </div>
                <div className={styles.controls__container}>
                    <div className={styles.controls__container__checkboxes}>
                        { autoSort ?
                            <div className={styles.checkbox__container__outer}>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxChecked onClick={toggleAutosort} className={styles.checkbox}/>
                                    <p>sort X values</p>
                                </div>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxUnchecked onClick={toggleAutosort} className={styles.checkbox}/>
                                    <p>don't sort X values</p>
                                </div>
                            </div>
                        : 
                            <div className={styles.checkbox__container__outer}>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxUnchecked onClick={toggleAutosort} className={styles.checkbox}/>
                                    <p>sort X values</p>
                                </div>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxChecked onClick={toggleAutosort} className={styles.checkbox}/>
                                    <p>don't sort X values</p>
                                </div>
                            </div>
                        }
                        { lineChartMode ?
                            <div className={styles.checkbox__container__outer}>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxChecked onClick={toggleMode} className={styles.checkbox}/>
                                    <p>linechart</p>
                                </div>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxUnchecked onClick={toggleMode} className={styles.checkbox}/>
                                    <p>scatterplot</p>
                                </div>
                            </div>
                        : 
                            <div className={styles.checkbox__container__outer}>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxUnchecked onClick={toggleMode} className={styles.checkbox}/>
                                    <p>linechart</p>
                                </div>
                                <div className={styles.checkbox__container__inner}>
                                    <ImCheckboxChecked onClick={toggleMode} className={styles.checkbox}/>
                                    <p>scatterplot</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={styles.controls__container__inputs}>
                        <div className={styles.input__container}>
                            <InputField 
                                label="X-axis unit"
                                value={xAxisUnit}
                                setValue={setXAxisUnit}
                                placeholder="enter X unit"
                                variant='inverted'
                            />
                        </div>
                        <div className={styles.input__container}>
                            <InputField 
                                label="Y-axis unit"
                                value={yAxisUnit}
                                setValue={setYAxisUnit}
                                placeholder="enter Y unit"
                                variant='inverted'
                            />
                        </div>
                    </div>
             
                </div>
                <div className={styles.tabs__container}>
                    <div className={styles.tabs__nav}>
                        {tabs.map((item, index) => {
                            const active = item.graphid === activeTab ? true : false
                            return (
                                <TabNavItem 
                                    active={active}
                                    item={item}
                                    key={index}
                                    index={index}
                                />
                            )
                        })}
                        {tabs.length < 6 && <div className={styles.tabs__nav__item__add} onClick={createTab}><IoAddOutline size={20} className={styles.tabs__nav__item__icon} /></div>}
                    </div>
                    <div className={styles.tabs__content}>
                        {tabs.map((item, index) => 
                            <TabContent 
                                graphid={item.graphid}
                                colour={item.colour}
                                key={index}
                            />
                        )}
                        <div className={styles.tabs__content__flex}>
                            {data.map((item, i) =>
                                    <>
                                        <DataInput 
                                            key={item.id} 
                                            item={item}
                                            active={item.graphid === activeTab}
                                            removeDataInput={removeDataInput} 
                                            setData={setData} 
                                            data={data}
                                        />                                       
                                    </>                       
                            )}                      
                        </div>  
                    </div>
                </div>                
            </div>
        </section>
    )
}

export default LineChart