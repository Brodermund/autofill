class Order{
    constructor(Order,Load,Manifest,Pieces,Weight,Sku){
        this.Order = Order
        this.Load = Load
        this.Sku = Sku
        this.Manifest = Manifest
        this.Pieces = Pieces
        this.Weight = Weight
    }

}
let rawManifest = document.querySelector("body > table:nth-child(16) > tbody > tr > td:nth-child(2) > h3").innerHTML
let splitManifest = rawManifest.split("&nbsp;")
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
    let complete = formatStatus(document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > span`).innerText)
    if (complete === true) {
        continue
    }
    let orderNum = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    let loadNum = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(1) > a`).innerText
    let pcwtArr =  getWeight(document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerHTML)
    let weight = pcwtArr[1]
    let pcs = pcwtArr[0]
    let skuArr = getSku(i,pcs)

    for (let m = 0; m < skuArr.length; m++) {
        let newOrder = new Order(orderNum,loadNum,finalManifest,pcs,weight,skuArr[m])
        orderNumArr.push(newOrder)
    }
}

for (let i = 0; i < orderNumArr.length; i++) {
    const element = orderNumArr[i];
    let exportStr = `${element.Order},${element.Sku},${element.Load},${element.Weight},${element.Manifest}`
    exportArr.push(exportStr)
}
let finalExport = exportArr.join('\n')
 download(finalExport,`Picklist-${finalManifest}.csv`,'.text/csv;charset=windows-1252')


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

function getSku(m,pie){
    let interArr = []
    let index = (m*5)+3
    let rows = (document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td > b > table > tbody`).rows.length)-1
    let item = Math.min(Number(rows),Number(pie))

    for (let i = 0; i < item; i++) {
        let pullrow = i+2
        let sku = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td > b > table > tbody > tr:nth-child(${pullrow}) > td:nth-child(2) > div`).innerText
        interArr.push(sku)
    }
    return interArr
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
