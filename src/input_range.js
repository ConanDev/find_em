import React, {useState} from 'react';

export function Input(props){
    //"data" is the calculated distance
    const [data, setData] = useState("empty default data")
    //"data2" is the maximum input range
    const [data2, setData2] = useState("empty default data (runtime)")
    let inputRange = null
    return(
        <div>
        <input type="number" placeholder="Enter Range (Km)" onChange={OnChangeHandle} />
        <h1>{"Calculated distance: " + data.toString() + " Km"}</h1>
        <button onClick={() => OnButtonClicked(props)}>Display</button>
        <ul>
            {PartnersInRange(props.partners) //should be changed to "partners"
            }
        </ul>
        </div>
    ); 

    function OnChangeHandle(inputData){
        inputRange = inputData.target.value
        setData2(inputRange)
        
    }

    function OnButtonClicked(props){
        const dist = CalculateDistance(props) //moved string conversion to later
        setData(dist)
        const text = parseFloat(data) <= parseFloat(data2) ? "Company is in range" : "Company is outside of range"
        alert(text)
    }

    function CalculateDistance(props){
        //bring json degree data from ManagePartners
        /**
         * What to do to handle all the companies?
         * Get an array of objects
         * each object is {companyName, offices} OR {companyName, [{location, address, coordinates}]}
         */
        let selfCoor = [51.5144636,-0.142571]
        selfCoor = selfCoor.map(deg => DegreesToRadians(deg))
        let targetCoor = props.coordinates.map(num => parseFloat(num, 10))
        targetCoor = targetCoor.map(deg => DegreesToRadians(deg))
        const dist = GCD(selfCoor, targetCoor) / 1000 //meters to Km
        return dist.toFixed(2);
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

    function PartnersInRange(partners){
        //only works on one partner for now, and doesn't check range
        return partners.map(DisplayPartner)
    }

    function DisplayPartner(partner){
        //displays Partner company name, location(s) and address(es)
        //partner =  {companyName, branches} branches is an array == [{location, address, coordinates}]
        //display in the following format:
        //company name
        // for each office:
        //  office#, address
        return(
            <li>
                <h2 align="left">{partner.organization}</h2>
                <ul align="left">
                    {partner.branches.map((branch, index) => {
                        return(//must label out-of-range office!
                        <li>Office #{index+1},
                        <ul>
                            <li>Location: {branch.location}</li>
                            <li>Address: {branch.address}</li>
                        </ul>
                        </li>
                        );
                    })}
                </ul>
            </li>
        );
    }
}

/**Your API should read the list of partners (from the attached JSON file), and return the company names
 *  and addresses of the matching partners (with offices within the given range in kilometers) 
 * SORTED BY COMPANY NAME IN ASCENDING ORDER. */