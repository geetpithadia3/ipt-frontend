
import { LineChart,ColumnChart, PieChart } from 'react-chartkick'
import 'chart.js'
import React, { Component } from "react";

function Barchart(props){
    return (<ColumnChart data={props.data} />)
}


export default Barchart
