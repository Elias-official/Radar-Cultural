// ===== EXPLICAÇÃO BÁSICA DE JAVASCRIPT =====
// JavaScript é uma linguagem que torna sua página INTERATIVA
// Ela roda no navegador do usuário e reage a ações (cliques, scroll, etc)

// document = toda a página HTML
// document.querySelector() = encontra um elemento específico
// document.querySelectorAll() = encontra VÁRIOS elementos

// ===== CÓDIGO PARA AS ABAS DE CATEGORIA =====

// Quando a página carrega, executa este código
document.addEventListener('DOMContentLoaded', function() {
    // Pega TODOS os botões de categoria
    // querySelectorAll retorna uma lista de elementos
    const botoes = document.querySelectorAll('.categoria-btn');
    
    // Para CADA botão, adiciona um "ouvinte de evento"
    // addEventListener = fica esperando o usuário clicar
    botoes.forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Pega o valor do atributo "data-categoria" do botão
            // Por exemplo: <button data-categoria="filmes">
            const categoria = this.getAttribute('data-categoria');
            
            // Chama a função que muda as abas
            abrirCategoria(categoria);
        });
    });
});

// ===== FUNÇÃO PRINCIPAL =====
function abrirCategoria(categoriaSelecionada) {
    // 1) DESATIVA todos os botões
    const botoes = document.querySelectorAll('.categoria-btn');
    botoes.forEach(function(botao) {
        // remove = tira a classe
        botao.classList.remove('active');
    });
    
    // 2) ATIVA o botão que foi clicado
    const botaoAtivo = document.querySelector(`[data-categoria="${categoriaSelecionada}"]`);
    botaoAtivo.classList.add('active');
    
    // 3) ESCONDE todos os conteúdos
    const conteudos = document.querySelectorAll('.categoria-item');
    conteudos.forEach(function(conteudo) {
        conteudo.classList.remove('active');
    });
    
    // 4) MOSTRA apenas o conteúdo selecionado
    const conteudoAtivo = document.querySelector(`[data-categoria="${categoriaSelecionada}"].categoria-item`);
    conteudoAtivo.classList.add('active');
}

// ===== COMO FUNCIONA (passo a passo) =====
// 1. Usuario clica em um botão de categoria
// 2. addEventListener detecta o clique
// 3. Pega qual categoria foi clicada (data-categoria)
// 4. Chama abrirCategoria() com essa categoria
// 5. Remove a classe "active" de TODOS os botões e conteúdos
// 6. Adiciona a classe "active" APENAS no que foi clicado
// 7. O CSS mostra/esconde usando .active
