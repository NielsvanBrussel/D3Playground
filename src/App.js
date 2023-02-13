import './App.css';
import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom"
import { GlobalContext } from "./context/GlobalState";
import styles from "./styles/App.module.css"


import Test from './pages/Test';
import LineChart from './pages/LineChart';
import BarChart from './pages/BarChart';
import PieChart from './pages/PieChart'
import Test4 from './pages/Test4';

import Home from './pages/Home';

function App() {
  return (
<>
            <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh'}}>
                <header className={styles.header}>
                    <div>
                        <nav>
                            <div>
                                <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/">home</NavLink>
                            </div>
                            <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
                                <li className={styles.nav__sidebar__li}>
                                    <NavLink className={({ isActive }) => isActive ? styles.nav__sidebar__navlink__active : styles.nav__sidebar__navlink} to="/test">test</NavLink>
                                </li>
                                <li className={styles.nav__sidebar__li}>
                                    <NavLink className={({ isActive }) => isActive ? styles.nav__sidebar__navlink__active : styles.nav__sidebar__navlink} to="/linechart">linechart</NavLink>
                                </li>
                                <li className={styles.nav__sidebar__li}>
                                    <NavLink className={({ isActive }) => isActive ? styles.nav__sidebar__navlink__active : styles.nav__sidebar__navlink} to="/barchart">barchart</NavLink>
                                </li>
                                <li className={styles.nav__sidebar__li}>
                                    <NavLink className={({ isActive }) => isActive ? styles.nav__sidebar__navlink__active : styles.nav__sidebar__navlink} to="/piechart">piechart</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main style={{width: '100%', marginLeft: '15rem'}}>
                    <div>
                    <div>
                        <Routes>
                            <Route path='/' element={<Home />}>
                                <Route path='/test' element={<Test />} /> 
                            </Route>
                            <Route path='/linechart' element={<LineChart />} />
                            <Route path='/barchart' element={<BarChart />} />
                            <Route path='/piechart' element={<PieChart />} />
                            <Route path="*" element={<Navigate to="/" />}/> 
                        </Routes>
                    </div>
                    </div>
                </main>
            </div>
        </>
  );
}

export default App;
