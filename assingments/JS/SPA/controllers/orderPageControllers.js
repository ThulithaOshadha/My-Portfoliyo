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

