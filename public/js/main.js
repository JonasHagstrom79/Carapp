window.onload = loadCars();

// Read cars with AJAX
function loadCars() {
    // AJAX call that will return JSON
    $.getJSON("http://localhost:3000/api/cars", function(data) {        
        
        // Clear the list before initiating
        $("#carlist").html("");
        for( let obj of data) {            
            $("#carlist").append("<li>" + obj.id + ": " + obj.make + " " + obj.model + " (" +obj.color + ") - <span onclick='deleteCar("+obj.id+")'>Delete</li>");            
        }      
       
    });   
}

// Delete car
function deleteCar(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/api/cars/delete/" + id
    }).done(function(response) {
        console.log(response);
        // Reload the list
        loadCars();
    });
}