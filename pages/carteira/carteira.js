document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ativos').addEventListener('click', exibirTelaAtivos);
    document.getElementById('historico-transacoes').addEventListener('click', exibirTelaHistoricoTransacoes);
    document.getElementById('cadastrar-ativos').addEventListener('click', exibirTelaCadastrarAtivos);
    

    function exibirTelaAtivos() {
        let secaoAtivos = document.getElementById('secao-ativos');
        let secaoHistoricoTransacoes = document.getElementById('secao-historico-transacao');
        
        if (!secaoHistoricoTransacoes.classList.contains('hidden'))
            secaoHistoricoTransacoes.classList.add('hidden');

        secaoAtivos.classList.remove('hidden')
    }

    function exibirTelaHistoricoTransacoes() {
        let secaoAtivos = document.getElementById('secao-ativos');
        let secaoHistoricoTransacoes = document.getElementById('secao-historico-transacao');
        
        if (!secaoAtivos.classList.contains('hidden'))
            secaoAtivos.classList.add('hidden');

        secaoHistoricoTransacoes.classList.remove('hidden')
    }
    
    // Função para exibir a tela de cadastrar ativos
    function exibirTelaCadastrarAtivos() {
        // Verificar se o modal já foi adicionado para não duplicar
        if (document.getElementById('modalToggle')) {
            document.getElementById('modalToggle').checked = true;
            return;
        }
        
        // Criar o container div onde o modal será adicionado
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
        <input type="checkbox" id="modalToggle" class="modal-toggle" hidden>
        <div class="modal">
            <div class="modal-content">
                <label for="modalToggle" class="close-button">&times;</label>
                <h2>Cadastrar Ativo</h2>
                <form id="formCadastrarAtivo">
                    <label for="nomeAtivo">Nome do Ativo:</label>
                    <input type="text" id="nomeAtivo" required>
                    
                    <label for="tipoAtivo">Tipo de Ativo:</label>
                    <select id="tipoAtivo" required>
                        <option value="acao">Ação</option>
                        <option value="cripto">Criptoativo</option>
                        <option value="fii">Fundo Imobiliário</option>
                    </select>
                    
                    <label for="quantidade">Quantidade:</label>
                    <input type="number" id="quantidade" required>
                    
                    <label for="valorPago">Valor do ativo (R$):</label>
                    <input type="number" id="valorPago" step="0.01" required>
                    
                    <label for="dataCompra">Data da Compra:</label>
                    <input type="date" id="dataCompra" required>
                    
                    <label for="anotacao">Anotações:</label>
                    <input type="text" id="anotacao">
                    
                    <button type="submit" id="cadastrarAtivo">Cadastrar</button>
                </form>
            </div>
        </div>
        `;
        
        // Adicionar o modal no body da página
        document.body.appendChild(modalDiv);
        
        // Abrir o modal
        document.getElementById('modalToggle').checked = true;
    
        // Impedir que o clique dentro do modal feche o modal
        document.querySelector('.modal-content').addEventListener('click', function(event) {
            event.stopPropagation();  // Impede o clique de fechar o modal ao clicar dentro do conteúdo
        });
    
        // Adicionar evento de submissão para o formulário (opcional)
        document.getElementById('formCadastrarAtivo').addEventListener('submit', function(event) {
            event.preventDefault();
            alert("Ativo cadastrado com sucesso!");
            document.getElementById('modalToggle').checked = false;
        });
    }
    
    
    // Função para adicionar o evento de edição em cada linha
    const ativarBotoesEditar = () => {
        const botoesEditar = document.querySelectorAll('.btn-acao.editar');
        botoesEditar.forEach((botao) => {
            botao.addEventListener('click', function () {
                const linha = this.closest('tr'); // Seleciona a linha do ativo
                editarAtivo(linha);
            });
        });
    };

    // Função para adicionar o evento de exclusão em cada linha
    const ativarBotoesExcluir = () => {
        const botoesExcluir = document.querySelectorAll('.btn-acao.excluir');
        botoesExcluir.forEach((botao) => {
            botao.addEventListener('click', function () {
                const linha = this.closest('tr'); // Seleciona a linha do ativo
                excluirAtivo(linha);
            });
        });
    };

    // Função para editar ativo
    const editarAtivo = (linha) => {
        const celulas = linha.querySelectorAll('td:not(.td-botoes)'); // Seleciona todas as células exceto os botões
        const botoes = linha.querySelector('.td-botoes'); // Botões na célula final da linha
        
        celulas.forEach((celula) => {
            const valorAtual = celula.innerText;
            const input = document.createElement('input');
            input.value = valorAtual;
            input.type = 'text';
            celula.innerText = '';
            celula.appendChild(input);
        });

        // Substituir os botões por um botão de salvar
        botoes.innerHTML = `<button class="btn-acao salvar" title="Salvar alterações">Salvar</button>`;
        const botaoSalvar = botoes.querySelector('.btn-acao.salvar');
        botaoSalvar.addEventListener('click', function () {
            salvarAlteracoes(linha);
        });
    };

    // Função para salvar as alterações
    const salvarAlteracoes = (linha) => {
        const inputs = linha.querySelectorAll('input');
        inputs.forEach((input) => {
            const valorAtualizado = input.value;
            const celula = input.closest('td');
            celula.innerText = valorAtualizado; // Atualiza a célula com o novo valor
        });

        const botoes = linha.querySelector('.td-botoes');
        botoes.innerHTML = `
            <button class="btn-acao vender" id="vender-ativo"></button>
            <button class="btn-acao editar" id="editar-ativo" title="Editar ativo"></button>
            <button class="btn-acao excluir" id="excluir-ativo" title="Excluir ativo"></button>
        `;

        ativarBotoesEditar();
        ativarBotoesExcluir();
    };

    // Função para excluir o ativo
    const excluirAtivo = (linha) => {
        if (confirm('Tem certeza que deseja excluir este ativo?')) {
            linha.remove(); // Remove a linha da tabela
        }
    };

    // Inicializa os botões ao carregar a página
    ativarBotoesEditar();
    ativarBotoesExcluir();


    // Script para exibir o modal de vender ativo
    document.querySelectorAll('.btn-acao.vender').forEach(button => {
        button.addEventListener('click', function() {
            const modalToggle = document.getElementById('modalVenderToggle');
            modalToggle.checked = true;  // Exibe o modal
        });
    });

    // Fechar o modal ao clicar no botão de fechar
    document.querySelector('.close-button').addEventListener('click', function(event) {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent.contains(event.target)) {
            document.getElementById('modalToggle').checked = false;
        }
    });
    
    // Fechar o modal ao clicar fora da área de conteúdo do modal
    document.querySelector('.modal').addEventListener('click', function(event) {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent.contains(event.target)) {
            document.getElementById('modalToggle').checked = false;
        }
    });
})

