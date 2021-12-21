let addy = document.querySelector("#sales_order_view_tabs_order_info_content > section.admin__page-section.order-addresses > div.admin__page-section-content > div.admin__page-section-item.order-shipping-address > address").innerText
let addyArr = addy.split("\n")
console.log(addyArr)
class Order{
    constructor(Name,Street,City,State,Zip,ID,Phone){
        this.Name = String(Name).replace(/['"]+/g, '')
        this.Street = String(Street).replace(/['"]+/g, '')
        this.City = String(City).replace(/['"]+/g, '')
        this.State = String(State).replace(/['"]+/g, '')
        this.Zip = String(Zip).replace(/['"]+/g, '')
        this.ID = String(ID).replace(/['"]+/g, '')
        this.Phone = String(Phone).replace(/['"]+/g, '')
    }
}
let stArr = getStateIndex(addyArr)
console.log(stArr)
let fullzip = zipformat(stArr[2])
let raworder = document.querySelector("#html-body > div.page-wrapper > header > div.page-header-hgroup.col-l-8.col-m-6 > div > h1").innerText
let idnum = raworder.replace('#',"")
let Item = new Order(addyArr[0],addyArr[1],stArr[0],stArr[1],fullzip,idnum,stArr[3])
console.log(Item)

function getStateIndex(arr){
    let StateIndex
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "United States") {
            StateIndex = i-1
        }
        else{continue}
    }
    let phone = arr[StateIndex + 2]
    let phoneArr = String(phone).split(": ")
     
    let stArr = String(addyArr[StateIndex]).split(", ")
    stArr.push(phoneArr[1])
    return stArr
}
function zipformat(str){
    let zipArr = String(str).split("-")
    let zipnum = Number(zipArr[0])
    num = String(zipnum)
    while (num.length < 5) num = "0" + num;
    return num;
}




