$("#inputOrderID").focus();

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

