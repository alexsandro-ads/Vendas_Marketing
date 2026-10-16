/* =========================================================
   MH Perfumaria
   CARRINHO + CHECKOUT + WHATSAPP
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const NUMERO_WHATSAPP = "5581995758108";


/* =========================================================
   CARRINHO
========================================================= */

let carrinho = [];


/* =========================================================
   ADICIONAR AO CARRINHO
========================================================= */

function adicionarCarrinho(nome, preco, imagem) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: Number(preco),

            imagem: imagem,

            quantidade: 1

        });

    }


    atualizarCarrinho();

    abrirCarrinho();

}


/* =========================================================
   ATUALIZAR CARRINHO
========================================================= */

function atualizarCarrinho() {

    const contador =
        document.getElementById(
            "contador-carrinho"
        );

    const lista =
        document.getElementById(
            "lista-carrinho"
        );

    const totalElemento =
        document.getElementById(
            "total-carrinho"
        );

    const botaoCheckout =
        document.getElementById(
            "btn-ir-checkout"
        );


    /* CONTADOR */

    const quantidadeTotal =
        carrinho.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );


    contador.textContent = quantidadeTotal;


    /* CARRINHO VAZIO */

    if (carrinho.length === 0) {

        lista.innerHTML = `

            <div class="carrinho-vazio">

                <p>
                    Seu carrinho está vazio.
                </p>

                <p>
                    Escolha um produto para começar.
                </p>

            </div>

        `;


        totalElemento.textContent =
            "R$ 0,00";


        botaoCheckout.disabled = true;

        return;
    }


    botaoCheckout.disabled = false;


    let html = "";

    let total = 0;


    carrinho.forEach(
        (produto, indice) => {

            const subtotal =
                produto.preco *
                produto.quantidade;


            total += subtotal;


            html += `

                <div class="carrinho-item">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >


                    <div>

                        <h4>
                            ${produto.nome}
                        </h4>


                        <p>
                            ${formatarMoeda(
                                produto.preco
                            )}
                            cada
                        </p>


                        <div class="carrinho-quantidade">

                            <button
                                class="quantidade-btn"
                                onclick="alterarQuantidade(
                                    ${indice},
                                    -1
                                )"
                            >
                                −
                            </button>


                            <span class="quantidade-numero">
                                ${produto.quantidade}
                            </span>


                            <button
                                class="quantidade-btn"
                                onclick="alterarQuantidade(
                                    ${indice},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>


                        <strong>
                            ${formatarMoeda(
                                subtotal
                            )}
                        </strong>

                    </div>


                    <button
                        class="carrinho-remover"
                        onclick="removerProduto(
                            ${indice}
                        )"
                    >
                        Remover
                    </button>

                </div>

            `;

        }
    );


    lista.innerHTML = html;


    totalElemento.textContent =
        formatarMoeda(total);

}


/* =========================================================
   ALTERAR QUANTIDADE
========================================================= */

function alterarQuantidade(indice, alteracao) {

    if (!carrinho[indice]) {
        return;
    }


    carrinho[indice].quantidade +=
        alteracao;


    if (
        carrinho[indice].quantidade <= 0
    ) {

        carrinho.splice(indice, 1);

    }


    atualizarCarrinho();

}


/* =========================================================
   REMOVER PRODUTO
========================================================= */

function removerProduto(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}


/* =========================================================
   FORMATAR MOEDA
========================================================= */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================================
   ABRIR CARRINHO
========================================================= */

function abrirCarrinho() {

    const modal =
        document.getElementById(
            "modal-carrinho"
        );


    modal.classList.add("ativo");


    atualizarCarrinho();

}


/* =========================================================
   FECHAR CARRINHO
========================================================= */

function fecharCarrinho() {

    const modal =
        document.getElementById(
            "modal-carrinho"
        );


    modal.classList.remove("ativo");

}


/* =========================================================
   DETALHES DO PRODUTO
========================================================= */

function mostrarDetalhes(
    nome,
    descricao,
    preco,
    imagem
) {

    const modal =
        document.getElementById(
            "modal-detalhes"
        );


    const detalhes =
        document.getElementById(
            "detalhes-produto"
        );


    detalhes.innerHTML = `

        <div class="detalhes-produto">

            <img
                src="${imagem}"
                alt="${nome}"
            >


            <div>

                <span class="produto-categoria">
                    PERFUME
                </span>


                <h2>
                    ${nome}
                </h2>


                <p>
                    ${descricao}
                </p>


                <div class="avaliacao">
                    ⭐⭐⭐⭐⭐
                </div>


                <div class="detalhes-preco">

                    ${formatarMoeda(preco)}

                </div>


                <button
                    class="btn-produto"
                    style="width: 100%;"
                    onclick="adicionarCarrinho(
                        '${nome}',
                        ${preco},
                        '${imagem}'
                    ); fecharDetalhes();"
                >

                    🛒 Adicionar ao carrinho

                </button>

            </div>

        </div>

    `;


    modal.classList.add("ativo");

}


/* =========================================================
   FECHAR DETALHES
========================================================= */

function fecharDetalhes() {

    const modal =
        document.getElementById(
            "modal-detalhes"
        );


    modal.classList.remove("ativo");

}


/* =========================================================
   ABRIR CHECKOUT
========================================================= */

function abrirCheckout() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    fecharCarrinho();


    atualizarResumoCheckout();


    const modal =
        document.getElementById(
            "modal-checkout"
        );


    modal.classList.add("ativo");

}


/* =========================================================
   FECHAR CHECKOUT
========================================================= */

function fecharCheckout() {

    const modal =
        document.getElementById(
            "modal-checkout"
        );


    modal.classList.remove("ativo");

}


/* =========================================================
   ATUALIZAR RESUMO DO CHECKOUT
========================================================= */

function atualizarResumoCheckout() {

    const container =
        document.getElementById(
            "checkout-resumo-itens"
        );


    const totalElemento =
        document.getElementById(
            "checkout-total"
        );


    let html = "";

    let total = 0;


    carrinho.forEach(
        produto => {

            const subtotal =
                produto.preco *
                produto.quantidade;


            total += subtotal;


            html += `

                <div class="checkout-resumo-item">

                    <span>

                        ${produto.nome}
                        × ${produto.quantidade}

                    </span>


                    <strong>

                        ${formatarMoeda(
                            subtotal
                        )}

                    </strong>

                </div>

            `;

        }
    );


    container.innerHTML = html;


    totalElemento.textContent =
        formatarMoeda(total);

}


/* =========================================================
   TIPO DE ENTREGA
========================================================= */

function alterarTipoEntrega() {

    const tipoSelecionado =
        document.querySelector(
            'input[name="tipo-entrega"]:checked'
        );


    const endereco =
        document.getElementById(
            "endereco-container"
        );


    if (
        tipoSelecionado &&
        tipoSelecionado.value === "Retirada"
    ) {

        endereco.style.display = "none";


        tornarCamposEnderecoOpcionais(
            true
        );

    } else {

        endereco.style.display = "block";


        tornarCamposEnderecoOpcionais(
            false
        );

    }

}


/* =========================================================
   CAMPOS DE ENDEREÇO
========================================================= */

function tornarCamposEnderecoOpcionais(
    opcional
) {

    const campos = [

        "endereco-rua",

        "endereco-numero",

        "endereco-cep",

        "endereco-bairro",

        "endereco-cidade",

        "endereco-estado"

    ];


    campos.forEach(
        id => {

            const campo =
                document.getElementById(id);


            if (opcional) {

                campo.removeAttribute(
                    "required"
                );

            } else {

                campo.setAttribute(
                    "required",
                    "required"
                );

            }

        }
    );

}


/* =========================================================
   ENVIAR PEDIDO
========================================================= */

function enviarPedido(event) {

    event.preventDefault();


    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        fecharCheckout();

        return;
    }


    /* =====================================================
       DADOS DO CLIENTE
    ===================================================== */

    const nome =
        document.getElementById(
            "cliente-nome"
        ).value.trim();


    const whatsapp =
        document.getElementById(
            "cliente-whatsapp"
        ).value.trim();


    const email =
        document.getElementById(
            "cliente-email"
        ).value.trim();


    /* =====================================================
       ENTREGA
    ===================================================== */

    const tipoEntrega =
        document.querySelector(
            'input[name="tipo-entrega"]:checked'
        ).value;


    let enderecoTexto = "";


    if (
        tipoEntrega === "Entrega"
    ) {

        const rua =
            document.getElementById(
                "endereco-rua"
            ).value.trim();


        const numero =
            document.getElementById(
                "endereco-numero"
            ).value.trim();


        const cep =
            document.getElementById(
                "endereco-cep"
            ).value.trim();


        const bairro =
            document.getElementById(
                "endereco-bairro"
            ).value.trim();


        const cidade =
            document.getElementById(
                "endereco-cidade"
            ).value.trim();


        const estado =
            document.getElementById(
                "endereco-estado"
            ).value;


        const complemento =
            document.getElementById(
                "endereco-complemento"
            ).value.trim();


        enderecoTexto =
            `Rua: ${rua}%0A` +
            `Número: ${numero}%0A` +
            `Bairro: ${bairro}%0A` +
            `Cidade: ${cidade} - ${estado}%0A` +
            `CEP: ${cep}`;


        if (complemento) {

            enderecoTexto +=
                `%0AComplemento: ${complemento}`;

        }

    } else {

        enderecoTexto =
            "Cliente optou por retirada.";

    }


    /* =====================================================
       PAGAMENTO
    ===================================================== */

    const pagamento =
        document.querySelector(
            'input[name="pagamento"]:checked'
        ).value;


    /* =====================================================
       OBSERVAÇÕES
    ===================================================== */

    const observacoes =
        document.getElementById(
            "observacoes"
        ).value.trim();


    /* =====================================================
       PRODUTOS
    ===================================================== */

    let produtosTexto = "";

    let total = 0;


    carrinho.forEach(
        produto => {

            const subtotal =
                produto.preco *
                produto.quantidade;


            total += subtotal;


            produtosTexto +=
                `• ${produto.nome} - ` +
                `${produto.quantidade}x - ` +
                `${formatarMoeda(subtotal)}%0A`;

        }
    );


    /* =====================================================
       MENSAGEM
    ===================================================== */

    let mensagem =
        "🛍️ *NOVO PEDIDO - VENDA RÁPIDA*%0A%0A";


    mensagem +=
        "👤 *DADOS DO CLIENTE*%0A";


    mensagem +=
        `Nome: ${nome}%0A`;


    mensagem +=
        `WhatsApp: ${whatsapp}%0A`;


    if (email) {

        mensagem +=
            `E-mail: ${email}%0A`;

    }


    mensagem +=
        `%0A📦 *ENTREGA*%0A`;


    mensagem +=
        `${tipoEntrega}%0A%0A`;


    mensagem +=
        `📍 *ENDEREÇO*%0A`;


    mensagem +=
        `${enderecoTexto}%0A%0A`;


    mensagem +=
        "💳 *PAGAMENTO*%0A";


    mensagem +=
        `${pagamento}%0A%0A`;


    mensagem +=
        "🛒 *PRODUTOS*%0A";


    mensagem +=
        produtosTexto;


    mensagem +=
        `%0A💰 *TOTAL DO PEDIDO:* `;


    mensagem +=
        `*${formatarMoeda(total)}*`;


    if (observacoes) {

        mensagem +=
            `%0A%0A📝 *OBSERVAÇÕES*%0A` +
            `${observacoes}`;

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    const url =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   FECHAR MODAIS CLICANDO FORA
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const modalDetalhes =
            document.getElementById(
                "modal-detalhes"
            );


        const modalCarrinho =
            document.getElementById(
                "modal-carrinho"
            );


        const modalCheckout =
            document.getElementById(
                "modal-checkout"
            );


        if (
            event.target ===
            modalDetalhes
        ) {

            fecharDetalhes();

        }


        if (
            event.target ===
            modalCarrinho
        ) {

            fecharCarrinho();

        }


        if (
            event.target ===
            modalCheckout
        ) {

            fecharCheckout();

        }

    }
);


/* =========================================================
   ESC PARA FECHAR
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            fecharDetalhes();

            fecharCarrinho();

            fecharCheckout();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

        alterarTipoEntrega();

    }
);