import React, {useState} from 'react';

export function Input(props){
    const [inputRange, setInputRange] = useState(0)
    const selfCoor = [51.5144636,-0.142571]
    const [inRangePartners, setInRangePartners] = useState(<div></div>)
    return(
        <div>
        <input type="number" placeholder="Enter Range (Km)" onChange={OnChangeHandle} />
        <button onClick={() => OnButtonClicked(props)}>Display</button>
        <ul>
            {inRangePartners}
        </ul>
        </div>
    ); 

    function OnChangeHandle(inputData){
        setInputRange(inputData.target.value)
    }

    function OnButtonClicked(props){
        setInRangePartners(PartnersInRange(props.partners))
    }

    function DegreesToRadians(deg){
        return deg * Math.PI / 180
    }

    function GCD(_p1, _p2){
        //calculates the Great Circle Distance between points _p1 and _p2
        //the latter need to be converted to radians
        const r = 6371009 // earth mean radius => minimized errors
        const p1 = _p1.map(DegreesToRadians)
        const p2 = _p2.map(DegreesToRadians)
        const a = Math.sin(p1[1]) * Math.sin(p2[1])
        const b = Math.cos(p1[1]) * Math.cos(p2[1])
        const c = Math.cos(p1[0] - p2[0])
        const del_sigma = Math.acos(a*b + c)
        const dist = r * del_sigma
        return dist / 1000 //meters to Km
    }

    function PartnersInRange(partners){
        //filters all partners according to range
        //returns an array of in-range partners
        //sorted according to company name
        let inRangePartners = partners.filter(CheckValidPartner)
        inRangePartners.forEach(EnsureValidOffices)
        inRangePartners.sort(SortPartners)
        return inRangePartners.map(DisplayPartner)
    }

    function CheckValidPartner(partner){
        //check if a certain (single) partner is in-range
        //must check all offices of this partner
        //if one is in range, then true. if none, false
        let isValid = false
        for (const branch of partner.branches){
            const dist = GCD(selfCoor, branch.coordinates.map(coor => parseFloat(coor)))
            if(dist <= inputRange){
                isValid = true
                break
            }
        }
        return isValid
    }

    function EnsureValidOffices(partner){
        //only accept in-range offices of a certain partner
        const validBranches = partner.branches.filter((branch) => {
            return GCD(branch.coordinates, selfCoor) <= inputRange
        })
        let res = partner
        res.branches = validBranches
        return res
    }

    function SortPartners(p1, p2){
        //sorts partners according to company name
        return p1.organization < p2.organization ? -1 : 1;
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