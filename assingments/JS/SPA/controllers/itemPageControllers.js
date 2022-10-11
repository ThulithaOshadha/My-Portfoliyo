$("#txtItemCode").focus();
var itemArray = [];

$("#addItemBtn").click(function (){
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQty = $("#txtItemQty").val();

    var itemOB = {
        id: itemCode,
        name: itemName,
        price: itemPrice,
        qty: itemQty
    }

    itemArray.push(itemOB);
    loadItemTable();
    bindRowClickEvents();
    loadCusId();
});

function loadItemTable(){
    $("#itemTable").empty();

    for (var item of itemArray){
        var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
        $("#itemTable").append(row);
    }

}

function bindRowClickEvents(){
    $("#itemTable>tr").click(function (){

        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let price = $(this).children(':eq(2)').text();
        let qty = $(this).children(':eq(3)').text();

        $("#txtItemCode").val(id);
        $("#txtItemName").val(name);
        $("#txtItemPrice").val(price);
        $("#txtItemQty").val(qty);
    });
}

$("#itemTable>tr").on('dblclick',function (){
    $(this).remove();

});

<!--Input label Focus-->

$('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty').on('keydown',function (event){

    if (event.key=='Tab'){
        event.preventDefault();
    }
});


//Item Form Validation

const itemCodeReg = /^(I-)[0-9]{1,3}$/;
const itemNameReg = /^[A-z ]{3,20}$/;
const itemPriceReg = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQtyReg = /^[0-9]{1,5}$/;

let validationArray = [];
validationArray.push({reg: itemCodeReg, field: $('#txtItemCode'),error:'Item Code Pattern is Wrong ! ex: I-001'});
validationArray.push({reg: itemNameReg, field: $('#txtItemName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
validationArray.push({reg: itemPriceReg, field: $('#txtItemPrice'),error:'Item Price Pattern is Wrong : 100 or 100.00'});
validationArray.push({reg: itemQtyReg, field: $('#txtItemQty'),error:'Item QTY Pattern is Wrong :0-9'});


$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").on('keyup', function (event) {
    checkValidity();
});

$("#txtItemCode").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemCodeReg, $("#txtItemCode"))) {
        let code = $("#txtItemCode").val();
        console.log(code);
        let availableItem = searchItem(code);
        if (availableItem!=null){
            $("#txtItemCode").val(availableItem.id);
            $("#txtItemName").val(availableItem.name);
            $("#txtItemPrice").val(availableItem.price);
            $("#txtItemQty").val(availableItem.qty);
        }


        $("#txtItemName").focus();
    } else {
        focusText($("#txtItemCode"));
    }
});


$("#txtItemName").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameReg, $("#txtItemName"))) {
        focusText($("#txtItemPrice"));
    }
});


$("#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemPriceReg, $("#txtItemPrice"))) {
        focusText($("#txtItemQty"));
    }
});


$("#txtItemQty").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQtyReg, $("#txtItemQty"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            clearAllTexts();
            loadItemTable();
        }
    }
});


function checkValidity() {
    let errorCount=0;
    for (let validation of validationArray) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#addItemBtn").attr('disabled',true);
    }else{
        $("#addItemBtn").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtItemCode").focus();
    $("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").val("");
    checkValidity();
}

//Item Details From Item Code

function searchItem(itemCode) {
    for (let item of itemArray) {
        if (item.id == itemCode){
            return item;
        }
    }
    return null;
}

$("#deleteItemBtn").click(function (){
    let code = $("#txtItemCode").val();
    deleteItem(code);
    loadItemTable();
    set

});

function deleteItem(itemCode){
    let item = searchItem(itemCode);
    if (item != null){
        let indexNum = itemArray.indexOf(item);
        itemArray.splice(indexNum,1);
        return true;
    }else {
        return false;
    }

}

$("#updateItemBtn").click(function (){
    let code = $("#txtItemCode").val();
    let update = updateItem(code);
    if (update){
        alert("Item details updated successfully");
        clearAllTexts();
    }else {
        alert("Something went wrong !");
    }

});

function updateItem(itemCode){
    let item = searchItem(itemCode);
    if (item != null) {
        item.id = $('#txtItemCode').val();
        item.name = $('#txtItemName').val();
        item.price = $('#txtItemPrice').val();
        item.qty = $('#txtItemQty').val();
        loadItemTable();
        return true;

    }else {
        return false;
    }
}