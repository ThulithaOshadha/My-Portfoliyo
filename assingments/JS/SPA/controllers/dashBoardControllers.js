$(function first() {
    $('#mainMenu').css('display', 'block');
    $('#itemPG').css('display', 'none');
    $('#customerPG').css('display', 'none');
    $('#orderPg').css('display', 'none');
});

$('#homeBtn').click(function () {
    $('#mainMenu').css("display", "block");
    $('#itemPG').css("display", "none");
    $('#customerPG').css("display", "none");
    $('#orderPg').css("display", "none");
});

$('#itemBtn').click(function () {
    $('#mainMenu').css("display", "none");
    $('#itemPG').css("display", "block");
    $('#customerPG').css("display", "none");
    $('#orderPg').css("display", "none");
});

$('#customerBtn').click(function () {
    $('#mainMenu').css("display", "none");
    $('#itemPG').css("display", "none");
    $('#customerPG').css("display", "block");
    $('#orderPg').css("display", "none");
});

$('#orderBtn').click(function () {
    $('#mainMenu').css("visibility", "hide");
    $('#itemPG').css("display", "none");
    $('#customerPG').css("display", "none");
    $('#orderPg').css("display", "block");
});