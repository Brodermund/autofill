let order = document.getElementById("order-id-text").innerHTML
let manifest = document.querySelector("#tracking_num_box > fieldset > b > a").innerText
window.open(`https://staff.eshopperpro.com/manifest.php?id=${manifest}&edit=true&pickmanifest=true&is_return_page=true&show_order=${order}`)




document.querySelector("body > table:nth-child(27) > tbody > tr:nth-child(3) > td > b > table > tbody > tr:nth-child(2)")
let length = document.querySelector("body > table:nth-child(27) > tbody > tr:nth-child(3) > td > b > table")
POST 

var url = "https://script.googleapis.com/v1/scripts/1VWNXvVj1_WfBSbkbdUPvT0j9JQiAdawhL3sKHTk_ke4pyfUADTVuyOKc:run";
var xhr = new XMLHttpRequest();
xhr.open("POST", url);
var data = `{
    "Order": 12345,
    "Customer": "John Smith",
    "Quantity": 1,
    "Price": 10.00
  }`;
