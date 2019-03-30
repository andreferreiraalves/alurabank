import { Negociacao, Negociacoes } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { domInject } from '../helpers/decorators/index';

export class NegociacaoControler {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._negociacoesView.templateUpdate(this._negociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();
        
        let data = new Date(this._inputData.val().replace(/-g/, ','));

        if (!this._eDiaUtil(data)) {
            this._mensagemView.templateUpdate('Somente negociações em dias úteis');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.templateUpdate(this._negociacoes);
        this._mensagemView.templateUpdate('Negociação adicionada com sucesso');
    }

    private _eDiaUtil(data: Date) {
        return data.getDay() != DiaDaSeamana.Sabado && data.getDay() != DiaDaSeamana.Domingo;
    }
}

enum DiaDaSeamana {
    // Domingo = 2,
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}