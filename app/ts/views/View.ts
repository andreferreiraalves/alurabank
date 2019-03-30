abstract class View<T> {
    private _elemento: Element;

    constructor(seletor: string) {
        this._elemento = document.querySelector(seletor);
    }

    protected templateUpdate(model: T): void {
        this._elemento.innerHTML = this.template(model);
    }

    abstract template(model: T): string;
}