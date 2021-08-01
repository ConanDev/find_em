//endpoint with url "api/x" handles processing input range with value = x
//supposedly, output data (i.e. offices in range) should be sent back to
//main page, for it (and not the api page) to display them. I am not sure of this yet...

// const fs = require('fs')

const express = require('express')
const Router = express.Router()
const selfCoor = [51.5144636,-0.142571]
const partners = require('./partners.json')
const allCompanies = DisplayStats()
let validPartners
const fs = require('fs')
let inputRange = -1
function ReturnValidPartners(){
  return validPartners
}

function DisplayStats(){
  let allCompanies = []
  partners.forEach((p1) => {
      const organization = p1.organization
      //for each partner, we have "prop" =  {companyName, branches}
      //where branches is an array == [{location, address, coordinates}]
      let branches = []
      let prop = {organization: organization, branches : branches}
      //this is the inner ForEach for the branches
      const offices = p1.offices

      offices.forEach(office => {
          //for each office, add its location, address, and coordinates
          branches.push({
              location : office.location,
              address : office.address,
              coordinates : office.coordinates.split(',')})
      })
      allCompanies.push(prop)
  })
  return allCompanies
}

Router.get('/:resource', (req, res) => {
  inputRange = parseFloat(req.params.resource)
  res.json({
        data : inputRange,
        confirmation : 'success'
    })
    validPartners = PartnersInRange(allCompanies)
    validPartners = JSON.stringify(validPartners)
    fs.writeFile('validPartners.json', validPartners, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
  });
})


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
    return inRangePartners//.map(DisplayPartner) this is the frontend job
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

module.exports = Router

// module.exports = ReturnValidPartners
// export {Router} //doesn't work
// const x = ''
// module.exports = x