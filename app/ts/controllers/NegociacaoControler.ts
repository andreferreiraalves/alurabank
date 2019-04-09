import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index';

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
    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.templateUpdate(this._negociacoes);
    }

    @throttle()
    adiciona() {
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

        imprime(negociacao, this._negociacoes);
        this._negociacoesView.templateUpdate(this._negociacoes);
        this._mensagemView.templateUpdate('Negociação adicionada com sucesso');
    }

    private _eDiaUtil(data: Date) {
        return data.getDay() != DiaDaSeamana.Sabado && data.getDay() != DiaDaSeamana.Domingo;
    }

    @throttle()
    async importaDados() {
        const isOK: HandlerFunction = (res: Response) => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        };

        // this._negociacaoService
        // .obterNegociacoes(res => {

        //     if (res.ok) {
        //         return res;
        //     } else {
        //         throw new Error(res.statusText);
        //     }
        // })
        // .then(negociacoesParaImportar => {

        //     const negociacoesJaImportadas = this._negociacoes.paraArray();

        //     negociacoesParaImportar
        //         .filter(negociacao =>
        //             !negociacoesJaImportadas.some(jaImportada =>
        //                 negociacao.ehIgual(jaImportada)))
        //         .forEach(negociacao =>
        //             this._negociacoes.adiciona(negociacao));

        //     this._negociacoesView.templateUpdate(this._negociacoes);
        // })
        // .catch(err => {
        //     this._mensagemView.templateUpdate(err.message);
        // });

        try {
            const negociacoesParaImportar = await this._negociacaoService
                .obterNegociacoes(res => {

                    if (res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                })

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));

            this._negociacoesView.templateUpdate(this._negociacoes);
        } catch (err) {
            this._mensagemView.templateUpdate(err.message);
        }
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