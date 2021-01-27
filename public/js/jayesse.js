const { response } = require("express");

window.onload = () => {
    const urlBase = "http//localhost:4000";


    const btnRegister = document.getElementById("btnRegister");


    btnRegister.addEventListener("click", () => {
        swal({
            title: "Novo Registo",
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nome">' +
                '<input id="swal-input2" class="swal2-input" placeholder="E-mail">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Password" type="password">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Telefone">',
            showCancelButton: true,
            confirmButtonText: "Registar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const nome = document.getElementById("swal-input1").value;
                const email = document.getElementById("swal-input2").value;
                const password = document.getElementById("swal-input3").value;
                const telefone = document.getElementById("swal-input4").value;
                return fetch('${urlBase}/api/user/register', {
                    headers: {
                        "Content-Type": "application.json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        nome: '${nome}',
                        email: '${email}',
                        password: '${password}',
                        telefone: '${telefone}',
                    }),
                })
                    .then((response) => {
                        if(response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        swal.showValidationError('Request failed: ${error}');
                    });
            },
            allowOutsideClick: () => !swal.isLoading(),
        }).then((result) => {
            swal({ title: '${result.value.message'});
        });
    });
}