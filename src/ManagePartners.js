let partners = require('./partners.json')

export function DisplayStats(){
    //display the first company only
    let p1 = partners[0]
    let keys = Object.keys(p1)
    let companyName = p1.organization
    const listItems = keys.map((key) => 
    {
        let res = null
        if(key != 'offices'){
            res = <li>{key}: {p1[key]}</li>
        }
        else{
            res = <li><ul>
                {/* {p1[key].map((office, index) => {
                    <li>office #{index+1}</li>
                })} */}
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