import React, {useState} from 'react';

export function Input(props){
    const [data, setData] = useState("empty default data")
    const [data2, setData2] = useState("empty default data (runtime)")
    let inputText = "empty input textt"
    return(
        <div>
        <input type="number" placeholder="Range (Km)" onChange={OnChangeHandle} />
        <h1>{"Calculated distance: " + data}</h1>
        <button onClick={() => OnButtonClicked(props)}>Display</button>
        </div>
    ); 

    function OnChangeHandle(inputData){
        inputText = inputData.target.value
        setData2(inputText)
    }

    function OnButtonClicked(props){
        const dist = CalculateDistance(props)
        setData(dist)
    }

    function CalculateDistance(props){
        //bring json degree data from ManagePartners
        let selfCoor = [51.5144636,-0.142571]
        selfCoor = selfCoor.map(deg => DegreesToRadians(deg))
        let targetCoor = props.coordinates
        alert(typeof(targetCoor))
        targetCoor = targetCoor.map(deg => DegreesToRadians(deg))
        const dist = GCD(selfCoor, targetCoor)
        return dist
    }

    function DegreesToRadians(deg){
        return deg * Math.PI / 180
    }

    function GCD(p1, p2){
        //calculates the Great Circle Distance between points p1 and p2
        const r = 6371009 // earth mean radius => minimized errors
        const a = Math.sin(p1[1]) * Math.sin(p2[1])
        const b = Math.cos(p1[1]) * Math.cos(p2[1])
        const c = Math.cos(p1[0] - p2[0])
        const del_sigma = Math.acos(a*b + c)
        const dist = r * del_sigma
        return dist
    }
}

/**Your API should read the list of partners (from the attached JSON file), and return the company names
 *  and addresses of the matching partners (with offices within the given range in kilometers) 
 * SORTED BY COMPANY NAME IN ASCENDING ORDER. */