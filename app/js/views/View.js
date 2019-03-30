class View {
    constructor(seletor) {
        this._elemento = $(seletor);
    }
    templateUpdate(model) {
        this._elemento.html(this.template(model));
    }
}
