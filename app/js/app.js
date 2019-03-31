System.register(["./controllers/NegociacaoControler"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegociacaoControler_1, controller;
    return {
        setters: [
            function (NegociacaoControler_1_1) {
                NegociacaoControler_1 = NegociacaoControler_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoControler_1.NegociacaoControler();
            $('.form').submit(controller.adiciona.bind(controller));
            $('#botao-importa').click(controller.importaDados.bind(controller));
        }
    };
});
