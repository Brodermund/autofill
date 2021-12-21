let rawOrder = window.prompt("Enter Fedex String")
let values = rawOrder.split(";")
console.log(values)
let name = values[0]
let address = values[1]
let zip = values[2]
let phone = values[3]
let order = values[4]
let PoNum = values[5]
let city = values[6]
let state = values[7]
let numItems = values[8]
let destination = `${city.toUpperCase()}, ${state}`
console.log(destination)
document.getElementById('ctl00_cphBody_txtShipperName').value = "G0EDEKER, Inc."
document.getElementById('ctl00_cphBody_txtShipperAddress1').value = "3817 Millstone Parkway"
document.getElementById('ctl00_cphBody_shipper_country').value = "USA_True_5_NNNNN"
document.getElementById('ctl00_cphBody_txtShipperPhone').value = "(636) 207-7277"
document.getElementById('ctl00_cphBody_shipper_zip').value = 63301
document.getElementById('ctl00_cphBody_shipper_city').value = "SAINT CHARLES, MO"
document.getElementById('ctl00_cphBody_txtConsigneeName').value = name
document.getElementById('ctl00_cphBody_txtConsigneeAddress1').value = address
document.getElementById('ctl00_cphBody_txtConsigneePhone').value = phone
document.getElementById('ctl00_cphBody_rblPrepaidCollect_0').click()
document.getElementById('ctl00_cphBody_chkDestinationLiftgate').click()
document.getElementById('ctl00_cphBody_chkResAcccessDestination').click()
document.getElementById('ctl00_cphBody_chkDeliveryNotification').click()
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
        let rlclass = Number(item[0]).toFixed(1)
        let rawNMFC = item[2].split(",")
        let nmfcNum = Number(rawNMFC[0])
        let NMFC = pad(nmfcNum,6)
        let sub = rawNMFC[1] 
        let RLSKu = item[3]
        let qty = item[4]
        console.log(nmfcNum)
        console.log(NMFC)
        document.getElementById("item-pieces-1").value = qty
        document.getElementById("item-package-type-1").value = "PLT"
        document.getElementById("item-comments-1").value = RLSKu
    }
    else{
        let weight
        let rlclass = Number(item[0]).toFixed(1)
        let rawNMFC = item[2].split(",")
        let nmfcNum = Number(rawNMFC[0])
        let NMFC = pad(nmfcNum,6)
        let sub = rawNMFC[1] 
        let RLSKu = item[3]
        let qty = item[4]
        document.getElementById(`item-pieces-${y}`).value = qty
        document.getElementById(`item-package-type-${y}`).value = "PLT"
        document.getElementById(`item-comments-${y}`).value = RLSKu
    } 
}
