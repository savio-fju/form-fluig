// FUNÇÃO QUE FAZ A CHAMADA DO WEBSERVICE PARA TRAZER O ENDEREÇO PELO CEP
$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#address").val("");
        $("#district-address").val("");
        $("#city-address").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#address").val("...");
                $("#district-address").val("...");
                $("#city-address").val("...");


                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#address").val(dados.logradouro);
                        $("#district-address").val(dados.bairro);
                        $("#city-address").val(dados.localidade);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});

// --------------------------------MASCARA CPF/CNPJ  ---------------------------------------------

// MASCARA DE CPF/CNPJ 
function mascaraMutuarioCpf(o, f) {
    v_obj = o
    v_fun = f
    setTimeout('execmascaracpf()', 1)
}

function execmascaracpf() {
    v_obj.value = v_fun(v_obj.value)
}

function cpfCnpj(v) {

    // Remove tudo o que não é dígito
    v = v.replace(/\D/g, "")

    if (v.length <= 13) { // CPF

        // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, "$1.$2")

        // Coloca um ponto entre o terceiro e o quarto dígitos
        // de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d)/, "$1.$2")

        // Coloca um hífen entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    } else { // CNPJ

        // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})(\d)/, "$1.$2")

        // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")

        // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")

        // Coloca um hífen depois do bloco de quatro dígitos
        v = v.replace(/(\d{4})(\d)/, "$1-$2")

    }

    return v

}
// FIM MASCARA DE CPF/CNPJ


// -------------------------------- CALCULAR DIFERENÇA ENTRE DATA  ---------------------------------------------

function betweenDates() {
    //instantaneos do objeto Date, veja explicação no final da resposta
    var dataUm = new Date(document.getElementById("date-emissao").value);
    var dataDois = new Date(document.getElementById("date-due-date").value);

    return parseInt((dataUm - dataDois) / (24 * 3600 * 1000));
}

function chamar() {
    document.getElementById("days-due-date").value = isNaN(betweenDates()) ? "Selecione a outra data" : betweenDates();
}

// -------------------------------- ADD PRODUTOS  ---------------------------------------------

function AddTableRow() {
    var newRow = $("<tr>");
    var cols = "";

    cols += '<td><input type="text" name="code[]" id="code" class="code" placeholder="C&oacute;digo Produto">        </td>';
    cols += '<td><input type="text" name="description[]" id="description" class="description" placeholder="Descri&ccedil;&atilde;o Produto"></td>';
    cols += '<td><input onblur="calcula(this);" type="text" name="quantity[]" id="quantity" class="quantity" placeholder="0,00"></td>';
    cols += '<td><input onblur="calcula(this);" type="text" name="amount[]" id="amount" class="amount" placeholder="0,00"></td>';
    cols += '<td><input type="text" name="total[]" id="total" class="total" placeholder="0,00"></td>';
    cols += '<td><input type="text" name="tax[]" id="tax" class="tax" placeholder="0,00"></td>';
    cols += '<td>';
    cols += '<button id="remove" onclick="RemoveTableRow(this)" type="button">Remover</button>';
    cols += '</td>';

    newRow.append(cols);
    $("#data-table").append(newRow);

    return false;
}

// -------------------------------- REMOVER PRODUTOS  ---------------------------------------------


function RemoveTableRow(item) {
    calcQuantity()
    var tr = $(item).closest('tr');

    tr.fadeOut(400, function() {
        tr.remove();
    });

    return false;
}


// -------------------------------- CALCULAR O SUBTOTAL  ---------------------------------------------

function calc(item) {

    amount = document.getElementById("amount").value;
    quantity = document.getElementById("quantity").value;

    total = amount * quantity;

    document.getElementById("total").value = total;
}

function calc2(item) {

    amount = document.getElementById("amount2").value;
    quantity = document.getElementById("quantity2").value;

    total = amount * quantity;

    document.getElementById("total2").value = total;
}

function calc3(item) {

    amount = document.getElementById("amount3").value;
    quantity = document.getElementById("quantity3").value;

    total = amount * quantity;

    document.getElementById("total3").value = total;

    calcQuantity()
    maskMoney()
}

// -------------------------------- CALCULAR O TOTAL  ---------------------------------------------


function calcQuantity() {


    quantity = document.getElementById("quantity").value;
    quantity2 = document.getElementById("quantity2").value;
    quantity3 = document.getElementById("quantity3").value;

    total = Number(quantity) + Number(quantity2) + Number(quantity3);

    document.getElementById("total-quantity").value = total;

    calcTax()
    calcTotal()
}

function calcTotal() {

    total = document.getElementById("total").value;
    total2 = document.getElementById("total2").value;
    total3 = document.getElementById("total3").value;

    soma = Number(total) + Number(total2) + Number(total3);

    document.getElementById("total-amount").value = soma;
}

function calcTax() {

    tax = document.getElementById("tax").value;
    tax2 = document.getElementById("tax2").value;
    tax3 = document.getElementById("tax3").value;

    soma = Number(tax) + Number(tax2) + Number(tax3);

    document.getElementById("total-tax").value = soma;

}

// --------------------------------ARRAY DOS PRODUTOS  ---------------------------------------------

let product = {
    code: ['000001', '000002', '000003'],
    description: ["Notebook", "Teclado", "Mouse"],
    amount: [3000, 150, 80],
    tax: [15, 10, 5]
}

document.getElementById("code").value = product.code[0];
document.getElementById("code2").value = product.code[1];
document.getElementById("code3").value = product.code[2];

document.getElementById("description").value = product.description[0];
document.getElementById("description2").value = product.description[1];
document.getElementById("description3").value = product.description[2];

document.getElementById("amount").value = product.amount[0];
document.getElementById("amount2").value = product.amount[1];
document.getElementById("amount3").value = product.amount[2];

document.getElementById("tax").value = product.tax[0];
document.getElementById("tax2").value = product.tax[1];
document.getElementById("tax3").value = product.tax[2];


// -------------------------------- MASK MONEY  ---------------------------------------------

function maskMoney() {

    var valor = document.getElementById("amount").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("amount").value = valorFormatado;

    var valor = document.getElementById("total").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("total").value = valorFormatado;


    var valor = document.getElementById("amount2").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("amount2").value = valorFormatado;

    var valor = document.getElementById("total2").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("total2").value = valorFormatado;


    var valor = document.getElementById("amount3").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("amount3").value = valorFormatado;

    var valor = document.getElementById("total3").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("total3").value = valorFormatado;


    var valor = document.getElementById("total-amount").value;
    //Valor com cifrão
    var valorFormatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(valorFormatado);
    document.getElementById("total-amount").value = valorFormatado;

}