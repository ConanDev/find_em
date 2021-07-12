import { Input } from './input_range';
const partners = require('./partners.json')

export function DisplayStats(){
    //display the first company only
    const p1 = partners[0]
    const keys = Object.keys(p1)
    const organization = p1.organization
    let coordinates = p1.offices[0].coordinates.split(',') //assuming to be only 1 office for now
    const listItems = keys.map((key) => 
    {
        let res = null
        if(key !== 'offices'){
            if(key!=='willWorkRemotely'){
                //convert boolean to string
                res = <li>{key}: {p1[key]}</li>
            }
            else{
                res = <li>{key}: {p1[key] ? "Yes" : "No"}</li>
            }
        }
        else{
            //let's deal with offices later
            res = <li><ul>
                {/* {p1[key].map((office, index) => {
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
        <h1>{organization}</h1>
        <ul>
            {listItems}
        </ul>
        <Input coordinates={coordinates}/>
        </div>
    );
}