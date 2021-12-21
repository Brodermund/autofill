let numBOLs = Number(window.prompt("Number of Orders"))
let BOLArr = []
let ACArr = []
let OtherArr = []
let pageNum = 1
for (let i = 0; i < numBOLs; i++) {
    let index = (i*4)+1
    
    let email = document.querySelector(`body > div:nth-child(${index}) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td:nth-child(1) > strong > font`).innerText
    if (String(email).includes("@AppliancesConnection.com")) {
        BOLArr.push(pageNum)
        let ACPush = `${pageNum + 1},${pageNum + 2}`
        ACArr.push(ACPush)
        pageNum = pageNum + 3
    }
    else{
        BOLArr.push(pageNum)
        let otherPush = pageNum + 1
        OtherArr.push(otherPush)
        pageNum = pageNum + 2
    }
}
console.log(BOLArr)
console.log(ACArr)
console.log(OtherArr)