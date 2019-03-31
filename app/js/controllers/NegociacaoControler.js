System.register(["../models/index", "../views/index", "../helpers/decorators/index", "../services/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, NegociacaoControler, DiaDaSeamana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }
        ],
        execute: function () {
            NegociacaoControler = class NegociacaoControler {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_2.MensagemView('#mensagemView');
                    this._negociacaoService = new index_4.NegociacaoService();
                    this._negociacoesView.templateUpdate(this._negociacoes);
                }
                adiciona() {
                    let data = new Date(this._inputData.val().replace(/-g/, ','));
                    if (!this._eDiaUtil(data)) {
                        this._mensagemView.templateUpdate('Somente negociações em dias úteis');
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.templateUpdate(this._negociacoes);
                    this._mensagemView.templateUpdate('Negociação adicionada com sucesso');
                }
                _eDiaUtil(data) {
                    return data.getDay() != DiaDaSeamana.Sabado && data.getDay() != DiaDaSeamana.Domingo;
                }
                importaDados() {
                    const isOK = (res) => {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    };
                    this._negociacaoService.obterNegociacoes(isOK)
                        .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.templateUpdate(this._negociacoes);
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoControler.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoControler.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoControler.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoControler.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoControler.prototype, "importaDados", null);
            exports_1("NegociacaoControler", NegociacaoControler);
            (function (DiaDaSeamana) {
                DiaDaSeamana[DiaDaSeamana["Domingo"] = 0] = "Domingo";
                DiaDaSeamana[DiaDaSeamana["Segunda"] = 1] = "Segunda";
                DiaDaSeamana[DiaDaSeamana["Terca"] = 2] = "Terca";
                DiaDaSeamana[DiaDaSeamana["Quarta"] = 3] = "Quarta";
                DiaDaSeamana[DiaDaSeamana["Quinta"] = 4] = "Quinta";
                DiaDaSeamana[DiaDaSeamana["Sexta"] = 5] = "Sexta";
                DiaDaSeamana[DiaDaSeamana["Sabado"] = 6] = "Sabado";
            })(DiaDaSeamana || (DiaDaSeamana = {}));
        }
    };
});
