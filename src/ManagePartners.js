let partners = require('./partners.json')

export function DisplayStats(){
    //display the first company only
    let p1 = partners[0]
    let keys = Object.keys(p1)
    let companyName = p1.organization
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
        <h1>{companyName}</h1>
        <ul>
            {listItems}
        </ul>
        </div>
    );
}