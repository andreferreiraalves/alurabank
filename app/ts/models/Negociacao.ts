import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao> {

    constructor(public readonly data: Date, public readonly quantidade: number, public readonly valor: number) { }

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('Impressão');
        console.log(`Data: ${this.data}
        Quantidade: ${this.quantidade}
        Valor: ${this.valor}
        Volume: ${this.volume}`
        );
    }

    ehIgual(objeto: Negociacao): boolean {
        return this.data.getDate() == objeto.data.getDate() &&
            this.data.getMonth() == objeto.data.getMonth() &&
            this.data.getFullYear() == objeto.data.getFullYear();
    }
}