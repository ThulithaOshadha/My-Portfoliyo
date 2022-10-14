$("#txtCustomerID").focus();
var customerArray = [];

$("#addCusBtn").click(function (){
    let cusID = $("#txtCustomerID").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalary").val();

    var customerOB = {
        id: cusID,
        name: cusName,
        address: cusAddress,
        salary: cusSalary
    }

    customerArray.push(customerOB);
    loadCustomerTable();
    bindRowClickEventsCustomer();
    loadCusId();
    clearAllTexts();
});

function loadCustomerTable(){
    $("#tblCustomer").empty();

    for (var cus of customerArray){
        var row = `<tr><td>${cus.id}</td><td>${cus.name}</td><td>${cus.address}</td><td>${cus.salary}</td></tr>`;
        $("#tblCustomer").append(row);
    }

}

function bindRowClickEventsCustomer(){
    $("#tblCustomer>tr").click(function (){

        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let salary = $(this).children(':eq(3)').text();

        $("#txtCustomerID").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);
    });
}

$("#tblCustomer>tr").on('dblclick',function (){
    $(this).remove();

});

<!--Input label Focus-->

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('keydown',function (event){

    if (event.key=='Tab'){
        event.preventDefault();
    }
});


//Item Form Validation

const cusIdReg = /^(C-)[0-9]{1,3}$/;
const cusNameReg = /^[A-z ]{3,20}$/;
const cusAddressReg = /^[A-z ]{3,20}$/;
const cusSalaryReg = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let cusValidationArray = [];
cusValidationArray.push({reg: cusIdReg, field: $('#txtCustomerID'),error:'Item Code Pattern is Wrong ! ex: I-001'});
cusValidationArray.push({reg: cusNameReg, field: $('#txtCustomerName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
cusValidationArray.push({reg: cusAddressReg, field: $('#txtCustomerAddress'),error:'Item Price Pattern is Wrong : 100 or 100.00'});
cusValidationArray.push({reg: cusSalaryReg, field: $('#txtCustomerSalary'),error:'Item QTY Pattern is Wrong :0-9'});


$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keyup', function (event) {
    checkValidity();
});

$("#txtCustomerID").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusIdReg, $("#txtCustomerID"))) {
        let code = $("#txtCustomerID").val();
        let availableCustomer = searchCustomer(code);
        if (availableCustomer!=null){
            $("#txtCustomerID").val(availableCustomer.id);
            $("#txtCustomerName").val(availableCustomer.name);
            $("#txtCustomerAddress").val(availableCustomer.address);
            $("#txtCustomerSalary").val(availableCustomer.salary);
        }


        $("#txtCustomerName").focus();
    } else {
        focusText($("#txtCustomerID"));
    }
});


$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameReg, $("#txtCustomerName"))) {
        focusText($("#txtCustomerAddress"));
    }
});


$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressReg, $("#txtCustomerAddress"))) {
        focusText($("#txtCustomerSalary"));
    }
});


$("#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusSalaryReg, $("#txtCustomerSalary"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            loadCustomerTable();
            clearAllTexts();

        }
    }
});


function checkValidity() {
    let errorCount=0;
    for (let validation of cusValidationArray) {
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
        $("#addCusBtn").attr('disabled',true);
    }else{
        $("#addCusBtn").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtCustomerID").focus();
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").val("");
    checkValidity();
}

//Item Details From Item Code

function searchCustomer(customerID) {
    for (let customer of customerArray) {
        if (customer.id == customerID){
            return customer;
        }
    }
    return null;
}

$("#deleteCusBtn").click(function (){
    let code = $("#txtCustomerID").val();
    deleteCustomer(code);
    loadCustomerTable();


});

function deleteCustomer(code){
    let customer = searchCustomer(code);
    if (customer != null){
        let indexNum = customerArray.indexOf(customer);
        customerArray.splice(indexNum,1);
        return true;
    }else {
        return false;
    }

}

$("#updateCusBtn").click(function (){
    let code = $("#txtCustomerID").val();
    let update = updateCustomer(code);
    if (update){
        alert("Customer details updated successfully");
        clearAllTexts();
    }else {
        alert("Something went wrong !");
    }

});

function updateCustomer(code){
    let customer = searchCustomer(code);
    if (customer != null) {
        customer.id = $('#txtCustomerID').val();
        customer.name = $('#txtCustomerName').val();
        customer.address = $('#txtCustomerAddress').val();
        customer.salary = $('#txtCustomerSalary').val();
        loadCustomerTable();
        return true;

    }else {
        return false;
    }
}

$("#btnCustomerSearch").click(function (){
    let code = $("#customerSearchInput").val();
    let availableCustomer = searchCustomer(code);
    if (availableCustomer!=null){
        $("#txtCustomerID").val(availableCustomer.id);
        $("#txtCustomerName").val(availableCustomer.name);
        $("#txtCustomerAddress").val(availableCustomer.address);
        $("#txtCustomerSalary").val(availableCustomer.salary);
    }
});


$("#customerClearBtn").click(function (){
    clearAllTexts();
});

