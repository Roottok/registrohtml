$(document).ready(function() {
    var userList = [];

    function validateForm() {
        var nombre = $("#nombre").val().trim();
        var apellido = $("#apellido").val().trim();
        var fechaNacimiento = new Date($("#fecha-nacimiento").val());
        var email = $("#email").val().trim();
        var cargo = $("#cargo").val();
        var fechaIngreso = new Date($("#fecha-ingreso").val());

        var emailExists = userList.some(function(user) {
            return user.email === email;
        });

        if (emailExists) {
            alert("El correo electrónico ya está registrado.");
            return false;
        }

        var edadMinima = new Date(fechaNacimiento);
        edadMinima.setFullYear(edadMinima.getFullYear() + 18);

        if (fechaIngreso < edadMinima) {
            alert("La fecha de ingreso no puede ser antes de los 18 años de edad.");
            return false;
        }

        var newUser = {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            email: email,
            cargo: cargo,
            fechaIngreso: fechaIngreso
        };

        userList.push(newUser);
        updateUsersGrid();
        $("#userListModal").modal("show");
        return true;
    }

    function updateUsersGrid() {
        var gridContainer = $("#userGrid");
        gridContainer.empty();

        userList.forEach(function(user) {
            var userCard = $("<div class='col-md-3 mb-3'></div>");
            var cardBody = $("<div class='card-body'></div>");
            var deleteButton = $("<button type='button' class='btn btn-danger btn-sm float-right'>Eliminar</button>");

            deleteButton.click(function() {
                var index = userList.indexOf(user);
                userList.splice(index, 1);
                updateUsersGrid();
            });

            cardBody.append("<h5 class='card-title'>" + user.nombre + " " + user.apellido + "</h5>");
            cardBody.append("<p class='card-text'>" + user.email + "<br>" + user.cargo + "<br>" + user.fechaIngreso.toDateString() + "</p>");
            cardBody.append(deleteButton);
            userCard.append(cardBody);
            gridContainer.append(userCard);
        });
    }

    $("#user-registration-form").submit(function(event) {
        event.preventDefault();
        if (validateForm()) {
            this.reset();
        }
    });
});

