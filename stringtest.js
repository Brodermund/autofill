let originalStr = "85zynx2"
let newArr = []
for (let i = 0; i < originalStr.length; i++) {
    let ele = originalStr[i]
    if (Number(ele) === NaN) {
        continue
    }
    else{newArr.push(ele)}
}
let finalStr = newArr.join('')
let finalResult = Number(finalStr) * originalStr.length