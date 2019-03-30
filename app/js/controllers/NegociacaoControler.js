class NegociacaoControler {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView('#mensagemView');
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.templateUpdate(this._negociacoes);
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = new Negocicao(new Date(this._inputData.val().replace(/-g/, ',')), parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.templateUpdate(this._negociacoes);
        this._mensagemView.templateUpdate('Negociação adicionada com sucesso');
    }
}
