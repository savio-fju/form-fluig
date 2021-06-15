// FUNÇÃO QUE FAZ A CHAMADA DO WEBSERVICE PARA TRAZER O ENDEREÇO PELO CEP
$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#address").val("");
        $("#district-address").val("");
        $("#city-address").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

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
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

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
    var dataUm = new Date(document.getElementById("date-due-date").value);
    var dataDois = new Date(document.getElementById("date-emissao").value);

    return parseInt((dataUm - dataDois) / (24 * 3600 * 1000));
}

function chamar() {
    document.getElementById("days-due-date").value = isNaN(betweenDates()) ? "Selecione a outra data" : betweenDates();
}

// -------------------------------- ADD PRODUTOS  ---------------------------------------------

function AddTableRow(index) {
    let product = {
        code: ['000001', '000002', '000003'],
        description: ["Notebook", "Teclado", "Mouse"],
        amount: [3000, 150, 80],
        tax: [15, 10, 5]
    }

    const html = `
    <td>
    <input type="text" name="code" id="code" class="code" value="${product.code[0]}" placeholder="C&oacute;digo Produto"></td>
    <td><input type="text" name="description" id="description" class="description" value="${product.description[0]}" placeholder="Descri&ccedil;&atilde;o Produto"></td>
    <td><input onblur="calcula(this);" type="text" name="quantity" id="quantity" class="quantity" value="" placeholder="0,00"></td>
    <td><input onblur="calcula(this);" type="text" name="amount" id="amount" class="amount" value="${product.amount[0]}" placeholder="0,00"></td>
    <td><input type="text" name="total" id="total" class="total" value=""  placeholder="0,00"></td>
    <td><input type="text" name="tax" id="tax" class="tax" value="${product.tax[0]}" placeholder="0,00"></td>
    <td><button id="remove" onclick="RemoveTableRow(this)" type="button">Remover</button></td>
    `

    const tb = document.querySelector('#data-table tbody')
    const tr = document.createElement('tr')
    tr.innerHTML = html
    tr.dataset.index = index
    tb.appendChild(tr)

}


// -------------------------------- REMOVER PRODUTOS  ---------------------------------------------

function RemoveTableRow(item) {
    var tr = $(item).closest('tr');

    tr.fadeOut(400, function () {
        tr.remove();
    });

    return false;
}

// -------------------------------- CALCULAR O SUBTOTAL  ---------------------------------------------



// -------------------------------- CALCULAR O TOTAL  ---------------------------------------------




// -------------------------------- MASK MONEY  ---------------------------------------------



