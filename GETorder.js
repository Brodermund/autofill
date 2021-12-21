class Order{
    constructor(Order,Load,Status,Export){
        this.Order = Order
        this.Load = Load
        this.Status = Status
        this.Export = Export
    }

}
let input = document.querySelector("body > table:nth-child(24) > tbody > tr:nth-child(2) > td:nth-child(1)").innerText
console.log(input)
let inputArr = String(input).split('\n')
let numOrders = Number(inputArr[1])
console.log(numOrders)
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let index = (i*5)+2
    let orderNum = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    let loadNum = document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(1) > a`).innerText
    let complete = formatStatus(document.querySelector(`body > table:nth-child(27) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > span`).innerText)
    let exportStr = `${orderNum}‰${loadNum}`
    if (complete === true) {
        orderNumArr.push(orderNum)
    }
    let newOrder = new Order(orderNum,loadNum,complete,exportStr)
    
    exportArr.push(exportStr)
}
let orderStr = orderNumArr.join(' ')

let finalexport = exportArr.join(", ")
console.log(orderStr)

function formatStatus(str){
    if (String(str).includes("Complete") ) {
        return true
    }
    else{return false}
}

document.querySelector("body > div:nth-child(1) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td:nth-child(1) > strong > font")
document.querySelector("body > div:nth-child(5) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td:nth-child(1) > strong > font")
document.querySelector("body > div:nth-child(9) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td:nth-child(1) > strong > font")
