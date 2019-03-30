class NegociacaoControler {
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.templateUpdate(this._negociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();

        const negociacao = new Negocicao(
            new Date(this._inputData.val().replace(/-g/, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.templateUpdate(this._negociacoes);
        this._mensagemView.templateUpdate('Negociação adicionada com sucesso');
    }
}