document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-sorteador").addEventListener("submit", function(evento) {
        evento.preventDefault();
        let numeroMaximo = document.getElementById("numero-maximo").value;
        numeroMaximo = parseInt(numeroMaximo);

        // Gera um número aleatório entre 1 e o número máximo
        let numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;

        document.getElementById("resultado-valor").innerHTML = numeroAleatorio;
        document.querySelector(".resultado").style.display = "block";
    })
})
