$("#inputOrderID").focus();
var ordersArray = [];


let autoID = generateOrderId();
$("#inputOrderID").val(autoID);

function loadCusId() {
    $("#inputCusID").empty();
    for (let cus of customerArray) {
        $("#inputCusID").append(`<option>${cus.id}</option>`);
    }

}

function loadCusDetails(){
    let id = $("#inputCusID").val();
    if (id!=null){
        let customerDet = searchCustomer(id);
        if (customerDet!=null){
            $("#inputCusName").val(customerDet.name);
            $("#inputAddress").val(customerDet.address);
            $("#inputCusSalary").val(customerDet.salary);
        }
    }
}


$("#inputCusID").click(function (){
    loadCusDetails();
});




function loadItemId() {
    $("#inputItemID").empty();
    for (let item of itemArray) {
        $("#inputItemID").append(`<option>${item.id}</option>`);
    }

}


$("#inputItemID").click(function (){
    loadItemDetails();
});

function loadItemDetails(){
    let id = $("#inputItemID").val();
    if (id!=null){
        let itemDet = searchItem(id);
        if (itemDet!=null){
            $("#inputItemName").val(itemDet.name);
            $("#inputPrice").val(itemDet.price);
            $("#inputQty").val(itemDet.qty);
        }
    }
}

var orderItemArray = [];

function loadOrderTable(){
    $("#ordersTable").empty();

    let t;
    for (var item of orderItemArray){

        var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td><td>${item.total}</td></tr>`;
        $("#ordersTable").append(row);
        //var t = calculateTotal(item.total);

        var tot = t + item.total
        t= tot;
        console.log(tot);


    }
}

$("#btnAddCart").click(function (){
    let code = $("#inputItemID").val();
    let name = $("#inputItemName").val();
    let price = $("#inputPrice").val();
    let qty = $("#inputOrderQty").val();
    let total = price*qty;

    var orderItemOB = {
        id: code,
        name: name,
        price: price,
        qty: qty,
        total: total
    }

    orderItemArray.push(orderItemOB);
    loadOrderTable();
});

function calculateTotal(price){
    var tot ;
    var total = tot + price;
    tot = total;
    return tot;


}

$("#btnPurchase").click(function (){

    let id = $("#inputOrderID").val();
    let customer = $("#inputCusID").val();
    let items = orderItemArray;
    let total = "2000";
    let date = $("#inputDate").val();

   var orderOB = {
       id: id,
       customer: customer,
       items: items,
       total: total,
       date: date,
   }

   ordersArray.push(orderOB);
});

function generateOrderId(){
    if (ordersArray.length>0){
        let id = ordersArray[ordersArray.length-1].id;
        let [pre, frag] = id.split("-");
        let num = parseInt(frag) + 1;
        let count = num.toString().length;
        if (count == 1) {
            return pre + "-00" + num;
        } else if (count == 2) {
            return pre + "-0" + num;
        } else {
            return pre + "-" + num;
        }

    }else {
        return "R-001"
    }
}

