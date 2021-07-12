import React, {useState} from 'react';

export function Input(){
    const [data, setData] = useState("empty default data")
    const [tempData, setTemp] = useState(null)
    const [data2, setData2] = useState("empty default data (runtime)")
    let inputText = "empty input textt"
    return(
        <div>
        <input type="text" placeholder="enter range" onChange={OnChangeHandle} />
        <h1>{"outputText: " + data}</h1>
        <h1>{"runtime output:" + data2}</h1>
        <button onClick={OnButtonClicked}>Display</button>
        </div>
    ); 

    function OnChangeHandle(inputData){
        inputText = inputData.target.value
        setData2(inputText)
    }

    function OnButtonClicked(){
        alert(`inputText: ${inputText}`)
        setData(data2)
    }
}