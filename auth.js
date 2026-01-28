document.addEventListener('DOMContentLoaded', function() {

    const botoes = document.querySelectorAll('.categoria-btn');
    
  
    botoes.forEach(function(botao) {
        botao.addEventListener('click', function() {
        
            const categoria = this.getAttribute('data-categoria');
            
          
            abrirCategoria(categoria);
        });
    });
});


function abrirCategoria(categoriaSelecionada) {
   
    const botoes = document.querySelectorAll('.categoria-btn');
    botoes.forEach(function(botao) {
       
        botao.classList.remove('active');
    });
    
   
    const botaoAtivo = document.querySelector(`[data-categoria="${categoriaSelecionada}"]`);
    botaoAtivo.classList.add('active');
    
    
    const conteudos = document.querySelectorAll('.categoria-item');
    conteudos.forEach(function(conteudo) {
        conteudo.classList.remove('active');
    });
    
  
    const conteudoAtivo = document.querySelector(`[data-categoria="${categoriaSelecionada}"].categoria-item`);
    conteudoAtivo.classList.add('active');
}