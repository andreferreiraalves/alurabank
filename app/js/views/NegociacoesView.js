class NegociacoesView extends View {
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
            </tbody>
            ${model.paraArray().map(negociacoa => `
                        <tr>
                            <td>${negociacoa.data.getDate()} / ${negociacoa.data.getMonth() + 1} / ${negociacoa.data.getFullYear()}</td>
                            <td>${negociacoa.quantidade}</td>
                            <td>${negociacoa.valor}</td>
                            <td>${negociacoa.volume}</td>
                        </tr>
                    `).join('')}

            <tfoot>
            </tfoot>
        </table>`;
    }
}
