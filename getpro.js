let address = document.querySelector("#sales_order_view_tabs_order_info_content > section.admin__page-section.order-addresses > div.admin__page-section-content > div.admin__page-section-item.order-shipping-address > address").innerHTML
let addArr = address.split(",")
let formAdd = String(addArr[2]).split('<br>')
let zip = String(formAdd[0]).trim()
console.log(zip)
document.getElementById('history_status').value = terminal
document.getElementById("hlgreen").click()

async function downloadImage(imageSrc, name) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
let options = document.querySelector("#labelData\\.labelPagination").children
let valueArr = []
let urlValueArr = []
for (let i = 0; i < options.length; i++) {
    valueArr.push(options[i].value)
}
for (let i = 0; i < valueArr.length; i++) {
    let item = String(valueArr[i]).split(",")
    urlValueArr.push(item[1])
}
for (let i = 0; i < urlValueArr.length; i++) {
    let labelURL = `https://www.fedex.com/shipping/labelAction.handle?method=doGetLabelFromCache&isDecompressRequired=false&utype=null&cacheKey=${urlValueArr[i]}`
    downloadImage(labelURL,"10124225")
}
console.log(options)
console.log(valueArr)
console.log(urlValueArr)


