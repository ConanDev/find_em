import React, {useState} from 'react';

//FRONTEND VERSION
export default function Input(){ //added default
    const [inputRange, setInputRange] = useState(0)
    //<BE> -- or is it?
    const [inRangePartners, setInRangePartners] = useState(<div></div>)
    //</BE>
    return(
        <div>
        <input type="number" placeholder="Enter Range (Km)" onChange={OnChangeHandle} />
        <button onClick={() => OnButtonClicked()}>Display</button>
        <br/>
        <ul>
            {inRangePartners}
        </ul>
        </div>
    ); 

    function OnChangeHandle(inputData){
        setInputRange(inputData.target.value)
    }

    function OnButtonClicked(){
        //BE
        //setInRangePartners(PartnersInRange(props.partners))
        //instead of this, use setInRangePartners(data received from api)
        //API
        //call the url: /api/rangedata (or something similiar)
        const url = "/api/" + inputRange.toString()
        const apiPort = 5000
        // window.open("http://localhost:" + apiPort.toString() + url)
        // //the file validPartners.json MUST exist (initiate to empty)
        // //empty gives an error
        // let validPartners = null
        // fetch('../api/validPartners.json').then( (response) => {
        //     return response.json()
        // }).then((json) => {
        //     validPartners = json
        // })
        let validPartners = null
        //fetch got rid of the new window entirely!
        // fetch("http://localhost:" + apiPort.toString() + url, {mode : 'no-cors'})
        // .then( () => {
        //     validPartners = require('../api/validPartners.json')
        // }).catch((err) => {
        //     console.log('Fetch problem: ' + err.message);
        //   })
        async function JustDoIt(){
            await fetch("http://localhost:" + apiPort.toString() + url, {mode : 'no-cors'})
            
        } 
        let myPromise = new Promise(() => {
            window.open("http://localhost:" + apiPort.toString() + url, {mode : 'no-cors'})
        })
        function success(){
            validPartners = require('../api/validPartners.json')
            console.log('operation succeeded !!')
        }
        function fail(){
            console.log("operation failed !!")
        }
        myPromise.then(success, fail)

        console.log("The valid partners are:\n")
        console.log(validPartners)
    }
   
    function DisplayPartner(partner){
        //displays Partner company name, location(s) and address(es)
        //partner =  {organization (companyName), branches} 
        //where branches is an array == [{location, address, coordinates}]
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
                        <li>Office #{index+1}
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