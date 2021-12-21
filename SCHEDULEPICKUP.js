let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split("‰")
    console.log(values)
    let cust = values[0]
    let fulladdress = String(values[1]).split("{")
    let address1 = fulladdress[0]
    let address2
    if (fulladdress[1] === undefined) {
        address2 = ""
    }
    else{address2 = fulladdress[1]}
    let zip = values[2]
    let city = String(values[3]).toUpperCase()
    let state = values[4]
    let phone = values[5]
    let order = values[6]
    let numItems = Number(values[7])
    document.getElementById('address.accountAddressLink').click()
    

    document.getElementById('address.alternate.company').value = ""
    document.getElementById('addressInfo.altAddr1').value = address1
    document.getElementById('addressInfo.altAddr2').value = address2
    document.getElementById('address.alternate.contactName').value = cust
    document.getElementById('addressInfo.altZip').value = zip
    document.getElementById('addressInfo.altCityNm').value = city
    document.getElementById('addressInfo.altStateCd').value = state
    document.getElementById('addressInfo.phoneNumber').value = phone
    document.getElementById('address.residential').click()
    document.getElementById('package.ground.field').click()
    setTimeout(function(){
        document.getElementById('package.ground.totalPackages').value = 3
        document.getElementById('package.ground.totalWeight').value = 31
    }, 1000);

