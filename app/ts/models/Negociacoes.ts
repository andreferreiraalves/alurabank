class Negociacoes {
    private _negociacoes: Negocicao[] = [];

    adiciona(negociacao: Negocicao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negocicao[] {
        return [].concat(this._negociacoes);
    }
}