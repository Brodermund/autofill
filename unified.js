let test = document.getElementById("ctl00_cphBody_txtPickupDate")
let BOLtest = document.getElementById("ctl00_cphBody_txtBOLDate")
let successTest = document.getElementById("ctl00_cphBody_pnlBOLResults")
async function downloadImage(imageSrc, name) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
if(test != null){
    let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split("‰")
    console.log(values)
    let customer = values[0]
    let address = values[1]
    let zip = values[2]
    let phone = values[3]
    let order = values[4]
    let PoNum = values[5]
    let city = String(values[6]).toUpperCase()
    let state = values[7]
    let numItems = values[8]
    let destination = city  + ", " + state
    console.log(destination)
    document.getElementById('ctl00_cphBody_txtOriginZipCode').value = 63301
    document.getElementById('ddlOriginCity').value = "SAINT CHARLES, MO"
    document.getElementById("ctl00_cphBody_txtDestinationZipCode").value = zip
    document.getElementById("ctl00_cphBody_txtDestinationZipCode").dispatchEvent(new Event('input',{bubbles:true}));
    for(let i = 0; i < numItems ; i++){
        let x = i+9
        let y = i+1
        let item = values[x].split(":")
        if(i === 0){
            let weight
            let qty = Number(item[4])
            let rlclass = Number(item[0]).toFixed(1)
            document.getElementById("class-1").value = rlclass
            if(item[1] < 30){
                weight = item[1] * qty
            }
            else{
                weight = (Number(item[1]) + 40)* qty
            }
            document.getElementById("weight-1").value = weight
        }
        else{
            let weight
            let qty = Number(item[4])
            let rlclass = Number(item[0]).toFixed(1)
            document.querySelector("#add-another > a").click()
            document.getElementById(`class-${y}`).value = rlclass
            if(item[1] < 30){
                weight = item[1] * qty
            }
            else{
                weight = (Number(item[1]) + 40)* qty
            }
            document.getElementById(`weight-${y}`).value = weight
        } 
        
    }
    document.getElementById('destination-liftgate').click()
    document.getElementById('residential-delivery').click()
    document.getElementById('delivery-notification').click()
    document.getElementById("ctl00_cphBody_txtDestinationZipCode").focus()
    document.getElementById("ddlDestinationCity").value = destination
    setTimeout(function(){document.getElementById("ctl00_cphBody_btnSubmitRateQuote").click()}, 1000);
    }
else if(test === null && BOLtest === null && successTest === null){
    let quote = document.getElementById("NetChargeValue").innerHTML
    alert(`${quote}`)
    setTimeout(function(){document.querySelector("#ship-123-col > div > div:nth-child(3) > a").click()}, 4000);
}
else if (successTest != null) {
    let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split("‰")
    let order = values[4]
    let pdf = document.querySelector("#print-BOL > div > div:nth-child(1) > a").href
    downloadImage(pdf,`${order} RL`)
}
else if(BOLtest != null){
    let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split("‰")
    console.log(values)
    let customer = values[0]
    let fulladdress = String(values[1]).split("{")
    let address1 = fulladdress[0]
    let address2
    if (fulladdress[1] === undefined) {
        address2 = ""
    }
    else{address2 = fulladdress[1]}
    let zip = values[2]
    let phone = values[3]
    let order = values[4]
    let PoNum = values[5]
    let city = values[6]
    let state = values[7]
    let numItems = values[8]
    document.getElementById('ctl00_cphBody_txtShipperName').value = "G0EDEKER, Inc."
    document.getElementById('ctl00_cphBody_txtShipperAddress1').value = "3817 Millstone Parkway"
    document.getElementById('ctl00_cphBody_shipper_country').value = "USA_True_5_NNNNN"
    document.getElementById('ctl00_cphBody_txtShipperPhone').value = "(636) 207-7277"
    document.getElementById('ctl00_cphBody_shipper_zip').value = 63301
    document.getElementById('ctl00_cphBody_shipper_city').value = "SAINT CHARLES, MO"
    document.getElementById('ctl00_cphBody_txtConsigneeName').value = customer
    document.getElementById('ctl00_cphBody_txtConsigneeAddress1').value = address1
    document.getElementById('ctl00_cphBody_txtConsigneeAddress2').value = address2
    document.getElementById('ctl00_cphBody_txtConsigneePhone').value = phone
    document.getElementById('ctl00_cphBody_rblPrepaidCollect_0').click()
    document.getElementById('ctl00_cphBody_txtPONumber').value = PoNum
    document.getElementById('ctl00_cphBody_txtShipperNumber').value = order
    function pad(num, size) {
        num = String(num)
        console.log(num)
        while (num.length < size) num = "0" + num;
        return num;
    }
    for(let i = 0; i < numItems ; i++){
        let x = i+9
        let y = i+1
        let item = values[x].split(":")
        console.log(item)
        if(i === 0){
            let weight
            let rlclass = Number(item[0]).toFixed(0)
            let rawNMFC = item[2].split("/")
            let nmfcNum = Number(rawNMFC[0])
            let NMFC = pad(nmfcNum,6)
            let presub = Number(rawNMFC[1])
            let sub = `${pad(presub, 2)}_${rlclass}`
            console.log(sub)     
            let RLSKu = item[3]
            let qty = item[4]
            document.getElementById("item-pieces-1").value = qty
            document.getElementById("item-package-type-1").value = "PLT"
            document.getElementById("item-comments-1").value = RLSKu
            document.getElementById("item-nmfc-item-1").value = NMFC
            document.getElementById("item-nmfc-item-1").dispatchEvent(new Event('blur', {bubbles:true}))
           
            
        }
        else{
            let weight
            let rlclass = Number(item[0]).toFixed(0)
            let rawNMFC = item[2].split("/")
            let nmfcNum = Number(rawNMFC[0])
            let NMFC = pad(nmfcNum,6)
            let presub = Number(rawNMFC[1])
            let sub = `${pad(presub, 2)}_${rlclass}`
            console.log(sub)   
            let RLSKu = item[3]
            let qty = item[4]
            document.getElementById(`item-pieces-${y}`).value = qty
            document.getElementById(`item-package-type-${y}`).value = "PLT"
            document.getElementById(`item-comments-${y}`).value = RLSKu
            document.getElementById(`item-nmfc-item-${y}`).value = NMFC
            document.getElementById(`item-nmfc-item-${y}`).dispatchEvent(new Event('blur', {bubbles:true}))    
        } 
    }
}
