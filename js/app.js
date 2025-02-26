document.addEventListener("DOMContentLoaded", () => {

    const inputPreco = document.getElementById("preco");

    SimpleMaskMoney.setMask(inputPreco, {
        prefix: "R$ ",
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ",",
        thousandsSeparator: ".",
        cursor: "end"
    });

    // Adicionando validação nos campos Nome e Quantidade
    document.getElementById("nome").addEventListener("blur", (event) => {
        valida(event.target);
    });

    document.getElementById("quantidade").addEventListener("blur", (event) => {
        valida(event.target);
    });
});

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}

const tiposDeErro = ["valueMissing"];

const mensagensDeErro = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio."
    },
    quantidade: {
        valueMissing: "O campo de quantidade não pode estar vazio."
    }
};

const validadores = {};

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = "";
    tiposDeErro.forEach((erro) => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro];
        }
    });

    return mensagem;
}
