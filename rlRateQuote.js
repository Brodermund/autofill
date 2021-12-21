let rawOrder = window.prompt("Enter Fedex String")
let values = rawOrder.split(";")
console.log(values)
let zip = Number(values[2])
let city = String(values[6]).toUpperCase()
let state = String(values[7])
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
        let rlclass = Number(item[0]).toFixed(1)
        document.getElementById("class-1").value = rlclass
        if(item[1] < 30){
            weight = item[1]
        }
        else{
            weight = Number(item[1]) + 40
        }
        document.getElementById("weight-1").value = weight
    }
    else{
        let weight
        let rlclass = Number(item[0]).toFixed(1)
        document.querySelector("#add-another > a").click()
        document.getElementById(`class-${y}`).value = rlclass
        if(item[1] < 30){
            weight = item[1]
        }
        else{
            weight = Number(item[1]) + 40
        }
        document.getElementById(`weight-${y}`).value = weight
    } 
    
}
document.getElementById('destination-liftgate').click()
document.getElementById('residential-delivery').click()
document.getElementById('delivery-notification').click()
document.getElementById("ctl00_cphBody_txtDestinationZipCode").focus()
setTimeout(function(){document.getElementById("ctl00_cphBody_btnSubmitRateQuote").click()}, 1000);
