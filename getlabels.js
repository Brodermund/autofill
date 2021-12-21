let commentNum = document.getElementsByClassName("note-list-comment")
console.log(commentNum)
let commentArr = []
let rawOrder = document.querySelector("#html-body > div.page-wrapper > header > div.page-header-hgroup.col-l-8.col-m-6 > div > h1").innerHTML
let orderNum = rawOrder.replace("#","")
console.log(orderNum)
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
for(let i = 0; i < commentNum.length;i++){
    if(String(commentNum[i].innerHTML).includes("XPO Labels:")){
        let commentIn = i+1
        let labelnum = document.querySelector(`#order_history_block > ul > li:nth-child(${commentIn}) > div.note-list-comment`).childElementCount
        let loopnum = (labelnum - 1)/4
        console.log(labelnum)
        if(loopnum === 1){
            let comment = document.querySelector(`#order_history_block > ul > li:nth-child(${commentIn}) > div.note-list-comment > a:nth-child(2)`).href
            downloadImage(comment,orderNum)
        }
        else{
            for (let i = 2; i < labelnum; i++) {
                    let comment = document.querySelector(`#order_history_block > ul > li:nth-child(${commentIn}) > div.note-list-comment > a:nth-child(${i})`).href
                    downloadImage(comment,orderNum)
                i++
                i++
                i++
            }
        }
    }
    else{continue}
}