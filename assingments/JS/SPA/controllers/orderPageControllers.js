
var ordersArray = [];
$('#btnAddCart').attr('disabled',true);
$('#btnPurchase').attr('disabled',true);


let autoID = generateOrderId();
$("#inputOrderID").val(autoID);

$("#inputOrderID").on('keydown', function (event) {
    if (event.key == "Enter" ) {
        let x = $("#inputOrderID").val();
        let y= searchOrder(x);
        if (x==y.id){
            $("#inputDate").val(y.date);
            $("#inputCusID").val(y.customer);
            loadCusDetails();

            y.items.forEach(i => {
                    var TableRow=`<tr><td>${i.id}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
                    $('#ordersTable').append(TableRow);
                }
            )




        }
    }
});



function searCartArrayFromOrderArray(){
    let s = $("#inputOrderID").val();
    for (let i of ordersArray){
        if (i.item().orderId==s){
            return i.item;
            console.log('fff'+i.item);

        }
    }
}

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
    let orderId = $("#inputOrderID").val();
    let code = $("#inputItemID").val();
    let name = $("#inputItemName").val();
    let price = $("#inputPrice").val();
    let qty = $("#inputOrderQty").val();
    let total = price*qty;

    var orderItemOB = {
        orderId:orderId,
        id: code,
        name: name,
        price: price,
        qty: qty,
        total: total
    }

    orderItemArray.push(orderItemOB);
    loadOrderTable();
    let calc = calculateTotal();
    setTotalToLabel(calc);
    $("#totalLabel").val(calc);

});

function setTotalToLabel(t){
    document.getElementById('subTotalLabel').innerHTML = 'Sub Total = '+t;
}

$("#inputCash").on('keydown', function (event) {
    if (event.key == "Enter"){
        let cash = $("#inputCash").val();
        let finalTotal = calculateTotal();
        console.log(finalTotal);
        let balance = cash - finalTotal;
        $("#inputBalance").val(balance);
        if (cash>finalTotal){
            $('#inputDiscount').focus();
        }else {
            $('#btnPurchase').attr('disabled',true);
        }
    }

});

$("#inputDiscount").on('keydown', function (event) {
    if (event.key == "Enter"){
       let dis = $("#inputDiscount").val();
        let finalTotal = calculateTotal();
        document.getElementById('subTotalLabel').innerHTML = 'Sub Total = '+finalTotal;
        document.getElementById('totalLabel').innerHTML = 'Total = '+(finalTotal-dis);
        if (dis>null){
            $('#btnPurchase').attr('disabled',false);
        }else {
            $('#btnPurchase').attr('disabled',true);
        }
    }
});

function calculateTotal(){
    let total = 0;
    orderItemArray.forEach((item) => {
        total += item.total;
    });
    return total;

}

$("#btnPurchase").click(function (){

    let id = $("#inputOrderID").val();
    let customer = $("#inputCusID").val();
    let items = orderItemArray;
    let finalTotal = document.getElementById('totalLabel').textContent;
    let total = finalTotal;
    let date = $("#inputDate").val();

   var orderOB = {
       id: id,
       customer: customer,
       items: items,
       total: total,
       date: date,
   }

   ordersArray.push(orderOB);
   console.log(ordersArray);
    $("#ordersTable").empty();

   clearAllTexts();
    let genID = generateOrderId();
    $("#inputOrderID").val(genID);


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
        return "R-001";
    }
}


//Update Item Qty
$("#inputOrderQty").on('keydown', function (event) {
    let x = $("#inputCash").val();
    if (x!=null){
        $('#btnAddCart').attr('disabled',false);

    }
    if (event.key == "Enter") {
        $("#inputCash").focus();
    }
});



$("#btnAddCart").click(function (){
    let code = $("#inputItemID").val();
    let currentQt = $("#inputQty").val();
    let orderQt = $("#inputOrderQty").val();
    let q = currentQt-orderQt;
    let update = updateItemQty(code,q);
    clearAllTextsInitemDet()
    if (update){
        alert('added successfully');
    }

});

function updateItemQty(itemCode,orderQt){
    let item = searchItem(itemCode);
    if (item != null) {
        item.qty = orderQt;
        loadItemTable();
        bindRowClickEvents();
        return true;

    }else {
        return false;
    }
}

//search order
function searchOrder(orderID) {
    for (let order of ordersArray) {
        if (order.id == orderID){
            return order;
        }
    }
    return null;
}

/*function loadTableFromOrderID(id){
    $("#ordersTable").empty();
    let i = searCartArrayFromOrderArray();
    console.log(i);


    for (var item of i){

        var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td><td>${item.total}</td></tr>`;
        $("#ordersTable").append(row);
        //var t = calculateTotal(item.total);



    }
}*/

function clearAllTexts(){
    $("#inputOrderID").val("");
    $("#inputDate").val("");
    $("#inputCusID").val("");
    $("#inputCusSalary").val("");
    $("#inputCusName").val("");
    $("#inputAddress").val("");
    $("#inputCash").val("");
    $("#inputDiscount").val("");
    $("#inputBalance").val("");
    document.getElementById('subTotalLabel').innerHTML = 'Sub Total = ';
    document.getElementById('totalLabel').innerHTML = 'Total = ';

    clearAllTextsInitemDet();

}
function clearAllTextsInitemDet() {
    $("#inputItemID").val("");
    $("#inputItemName").val("");
    $("#inputPrice").val("");
    $("#inputQty").val("");
    $("#inputOrderQty").val("");
}

