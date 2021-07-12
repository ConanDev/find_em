import { Input } from './input_range';
const partners = require('./partners.json')

export function DisplayStats(){
    //display the first company only
    let allCompanies = []
    const p0 = partners[0] // TO REMOVE
    let coordinates = p0.offices[0].coordinates.split(',') //TO REMOVE
    const keys = Object.keys(p0)
    //####
    const organization = p0.organization
        //for each partner, we have "prop" =  {companyName, branches}
        //where branches is an array == [{location, address, coordinates}]
        let branches = []
        let prop = {organization: organization, branches : branches} //assuming branches to be passed by ref!
        //this is the inner ForEach for the branches
        const offices = p0.offices //did a mistake more than once: object[]

        offices.forEach(office => {
            //for each office, add its location, address, and coordinates
            branches.push({
                location : office.location,
                address : office.address,
                coordinates : office.coordinates.split(',')})
        })
    //####
    partners.forEach((p1, idx) => {
        const organization = p1.organization
        //for each partner, we have "prop" =  {companyName, branches}
        //where branches is an array == [{location, address, coordinates}]
        let branches = []
        let prop = {organization: organization, branches : branches} //assuming branches to be passed by ref!
        //this is the inner ForEach for the branches
        const offices = p1.offices //did a mistake more than once: object[]

        offices.forEach(office => {
            //for each office, add its location, address, and coordinates
            branches.push({
                location : office.location,
                address : office.address,
                coordinates : office.coordinates.split(',')})
        })
        allCompanies.push(prop)
    })
    //the following is not needed so far...
    const listItems = keys.map((key) => 
    {
        let res = null
        if(key !== 'offices'){
            if(key!=='willWorkRemotely'){
                //convert boolean to string
                res = <li>{key}: {p0[key]}</li>
            }
            else{
                res = <li>{key}: {p0[key] ? "Yes" : "No"}</li>
            }
        }
        else{
            //let's deal with offices later
            res = <li><ul>
                {/* {p0[key].map((office, index) => {
                    <li>office #{index+1}</li>
                })} */}
                <li>hello</li>
                <li>hello</li>
            </ul>
            </li>
        }
        return res
})
    return (
        <div>
        <h1>{p0.organization}</h1>
        <ul>
            {listItems}
        </ul>
        {/* for now, I am adding multiple props for testing purposes.
        Later only one should remain */}
        <Input coordinates={coordinates} partners={allCompanies} partner={prop} />
        </div>
    );
}