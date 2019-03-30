class MensagemView extends View {
    templateUpdate(model) {
        this._elemento.innerHTML = this.template(model);
    }
    template(model) {
        return `<p class="alert alert-info">${model}</p>`;
    }
}
