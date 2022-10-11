function loadCusId(){
    $('#inputCusID').empty();
    for (let item of itemArray) {
        $("#inputCusID").append('<option>${item.id}</option>');
    }

}
