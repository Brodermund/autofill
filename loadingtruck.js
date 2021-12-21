let scans = Number(document.querySelector("#manfiest-history-log > table").rows.length) - 2
let orderArr =[]
let weightCount= 0
let pcCount = 0

let date = currentDate()
console.log(date)
for (let i = 0; i < scans; i++) {
    let index = i+2
    let scanDate = getScanDate(document.querySelector(`#manfiest-history-log > table > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerText)
    if (scanDate === date) {
        let order = document.querySelector(`#manfiest-history-log > table > tbody > tr:nth-child(${index}) > td:nth-child(4)`).innerText
        console.log(orderArr)
        if(orderArr.indexOf(order) !== -1){
            continue
        } else{
            orderArr.push(order)
        }
    }
    else if(scanDate === null){
        continue
    }
    else{
        continue
    }
}
let input = document.querySelector("body > table:nth-child(25) > tbody > tr:nth-child(2) > td:nth-child(1)").innerText
let inputArr = String(input).split('\n')
let numOrders = Number(inputArr[1])
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let index = (i*5)+2
    console.log(i)
    let orderNum = document.querySelector(`body > table:nth-child(28) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    let pcwtArr =  getWeight(document.querySelector(`body > table:nth-child(28) > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerHTML)
    let weight = pcwtArr[1]
    let pcs = pcwtArr[0]
    if(orderArr.indexOf(orderNum) !== -1){
        weightCount = Number(weightCount) + Number(weight)
        pcCount = Number(pcCount) + Number(pcs)
        document.querySelector(`body > table:nth-child(28) > tbody > tr:nth-child(${index}) > td:nth-child(5) > div > input`).click()
    } else{
        continue
    }
}
window.alert(`Pieces:${pcCount}\rWeight:${weightCount.toFixed(0)}`)
// console.log(`Pieces:${pcCount}`)
// console.log(`Weight:${weightCount.toFixed(0)}`)
let print = window.confirm("Print Loaded Orders?")
if (print == true) {
    document.querySelector("#num_bol_needed").value = 1
    document.querySelector("body > div:nth-child(10) > a").click()
  }

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
function currentDate(){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    getDate = String(new Date())
    dateArr = getDate.split(" ")
    let rawMonth = months.indexOf(dateArr[1])
    let m = rawMonth + 1 
    let d = dateArr[2]
    let y = dateArr[3]
    let date = `${m}/${d}/${y}`
    return date
  }
function getScanDate(str){
    let interArr = str.split(" ")
    let date = interArr[0]
    return date
}
document.querySelector("body > table:nth-child(27) > tbody > tr:nth-child(2) > td:nth-child(5) > div > input")