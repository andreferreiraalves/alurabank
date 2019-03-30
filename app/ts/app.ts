const controller = new NegociacaoControler();

$('.form').submit(controller.adiciona.bind(controller));