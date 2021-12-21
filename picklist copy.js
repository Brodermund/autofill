if(document.querySelector("body > table > tbody > tr:nth-child(1) > td:nth-child(1)").innerText === "Line"){
    class Line{
        constructor(Number,Sku,Stop,Bin,Qty){
            this.Number = Number
            this.Sku = Sku
            this.Bin = Bin
            this.Category = Stop
            this.Qty = Qty
    
        }
    }
    let Carrier 
    if (window.confirm("FragilePak?")) {
        Carrier = "FragilePak";
    }
    else if (window.confirm("Odyssey?")) {
        Carrier = "Odyssey";
    }
    else if (window.confirm("UPS?")) {
        Carrier = "UPS";
    }
    else if (window.confirm("Fedex?")) {
        Carrier = "Fedex";
    }      
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let getDate = String(new Date())
        dateArr = getDate.split(" ")
        let rawMonth = months.indexOf(dateArr[1])
        let m = rawMonth + 1 
        let d = dateArr[2]
        let date = `${m}/${d}`
    let rawManifestNum = document.querySelector("body > b").innerText
    let manifestArr = String(rawManifestNum).split(':')
    console.log(manifestArr)
    let interManifestNum = String(manifestArr[1]).replace(" [",'')
    let finalManifestNum = String(interManifestNum).replace("]",'')
    let listArr = document.getElementsByClassName("bigger-font")
    let LineArr = []
    let FinalArr = []
    for (let i = 0; i < listArr.length; i++) {
        let line = []
        const ele = listArr[i];
        let newEle = ele.innerHTML.replace(/ /gi, '');
        let finalEle = String(newEle).replace(' style="font-weight: 700; text-align: center;"','')
        console.log(finalEle)
        let preStrArr = String(finalEle).split('</td>')
        let strArr = []
        for (let n = 0; n < preStrArr.length; n++) {
            const element = preStrArr[n];
            let interArr = String(element).split('td>')
            strArr.push(interArr[1])
        }
        console.log(strArr)
        let binArr = String(strArr[2]).split("<br>")
        let finBinArr = []
        for (let l = 0; l < binArr.length; l++) {
            const element = binArr[l];
            finBinArr.push(element)
        }
        let stopArr = String(strArr[4]).split("\n")
        let finalStopArr = []
        for (let l = 0; l < stopArr.length; l++) {
            const element = stopArr[l];
            let internalArr = String(element).split("<br>")
            let stopPush = internalArr.join('')
            console.log(stopPush)
            finalStopArr.push(stopPush)            
        }
        let skuArr = strArr[1].split('(')
        let sku = skuArr[0]
        let catArr = skuArr[1].split(')')
        let cat = catArr[0]
        let BinStr = finBinArr.join(' ')
        let stopStr = finalStopArr.join('&')
        let newOrder = new Line(strArr[0],sku,cat,BinStr,strArr[7])
        LineArr.push(newOrder)
    }
    for (let i = 0; i < LineArr.length; i++) {
        const ele = LineArr[i];
        let pushStr = `${ele.Number},${ele.Sku},${ele.Category},${ele.Qty},${ele.Bin},${finalManifestNum}`
        FinalArr.push(pushStr)
    }
    let finalExport = FinalArr.join('\n')
    download(finalExport,`Picklist-${finalManifestNum}.csv`,'.text/csv;charset=windows-1252')
    
    function download(data, filename, type) {
        let file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
    console.log(LineArr)
    }
    else{console.log("ERROR")}