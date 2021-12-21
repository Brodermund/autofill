class Order{
    constructor(Order,Load,Manifest,Pieces,Weight,Status){
        this.Order = Order
        this.Load = Load
        this.Manifest = Manifest
        this.Pieces = Pieces
        this.Weight = Weight
        this.Status = Status
    }

}
var url = "POST https://script.googleapis.com/v1/scripts/1VWNXvVj1_WfBSbkbdUPvT0j9JQiAdawhL3sKHTk_ke4pyfUADTVuyOKc:run";
var xhr = new XMLHttpRequest();
xhr.open("POST", url);

let rawManifest = document.querySelector("body > table:nth-child(16) > tbody > tr > td:nth-child(2) > h3").innerHTML
let splitManifest = rawManifest.split(" ")
let rawCleanManifest = splitManifest[0]
let splitCleanManifest = rawCleanManifest.split(" ")
let finalManifest = splitCleanManifest[2]
let input = document.querySelector("body > table:nth-child(24) > tbody > tr:nth-child(2) > td:nth-child(1)").innerText
console.log(input)
let inputArr = String(input).split('\n')
let numOrders = Number(inputArr[1])
console.log(numOrders)
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let index = (i*5)+2
    let status
    let orderNum = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    let loadNum = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(1) > a`).innerText
    let pcwtArr =  getWeight(document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerHTML)
    let complete = formatStatus(document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > span`).innerText)
    if (complete === true) {
        status = "Yes"
    }
    else{
        status = "No"
    }
    let weight = pcwtArr[1]
    let pcs = pcwtArr[0]
    console.log(weight)


    
    let newOrder = new Order(orderNum,loadNum,finalManifest,pcs,weight,status)

    var data = {
        "function": "spreadsheet",
        "parameters": [
            {
            "Order": `${newOrder.Order}`,
            "Manifest": `${newOrder.Manifest}`,
            "Weight": `${newOrder.Weight}`,
            "Pcs": `${newOrder.Pieces}`,
            "Stop": `${newOrder.Load}`,
            "Status": `${newOrder.Status}`
            }
        ],
        "sessionState": 0,
        "devMode": true
      }

    xhr.send(data)
}

for (let i = 0; i < orderNumArr.length; i++) {
    const element = orderNumArr[i];
    let exportStr = `${element.Order},${element.Manifest},${element.Load},${element.Pieces},${element.Weight}`
    exportArr.push(exportStr)
}
let finalExport = exportArr.join('\n')
 download(finalExport,`Manifest-Load-${finalManifest}.csv`,'.text/csv;charset=windows-1252')


function getWeight(str){
    let split = String(str).split("<br>")
    let weightStr = split[3]
    let splitWeight = weightStr.split(": ")
    let weight = splitWeight[1]
    let pieceStr = split[2]
    let splitPcs = pieceStr.split(": ")
    let Pcs = splitPcs[1]
    return [Pcs,weight] 
}

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

// let orderStr = orderNumArr.join(',')

let finalexport = exportArr.join(",")
console.log(orderNumArr)

function formatStatus(str){
    if (String(str).includes("Complete") ) {
        return true
    }
    else{return false}
}
