enum TipoDeLigacao {
    ORIGEM,
    DESTINO
}


interface verticeDeLigacao {
    tipo: TipoDeLigacao,
    vertice: Vertice
}


class Aresta {

    private nome: string;
    private tamanho: number;
    private tempoMinDeViagem: number;
    private VerticesDeLigacao: [verticeDeLigacao, verticeDeLigacao];

    constructor(tamanho: number, tempoMinDeViagem: number, verticeOrigem: Vertice, verticeDestino: Vertice, nome?: string) {
        this.nome = "";
        this.tamanho = 0;
        this.tempoMinDeViagem = 0;
        this.VerticesDeLigacao = [
            { tipo: TipoDeLigacao.ORIGEM, vertice: new Vertice(false, objetivo.NAOAPLICAVEL, 0, 0) },
            { tipo: TipoDeLigacao.DESTINO, vertice: new Vertice(false, objetivo.NAOAPLICAVEL, 0, 0) }
        ];
        try {
            if (!(tamanho && tempoMinDeViagem && verticeOrigem && verticeDestino))
                throw new Error(`tamanho: ${tamanho}, tempoMinDeViagem: ${tempoMinDeViagem}, verticeOrigem: ${verticeOrigem}, verticeDestino: ${verticeDestino}`);
            this.setTamanho(tamanho);
            this.setTempoMinDeViagem(tempoMinDeViagem);
            this.setVerticesDeLigacao(verticeOrigem, verticeDestino);
            if(!nome)
                nome = this.generateRandomName();
            this.setNome(nome);
        } catch (error) {
            throw new Error(`Erro ao criar a aresta: ${error}`);
        }
        
    }

    public getTamanho(): number {
        return this.tamanho;
    }
    public setTamanho(tamanho: number): void {
        if (tamanho <= 0)
            throw new Error(`tamanho: ${tamanho}`);
        this.tamanho = tamanho;
    }
    public getTempoMinDeViagem(): number {
        return this.tempoMinDeViagem;
    }
    public setTempoMinDeViagem(tempoMinDeViagem: number): void {
        if (tempoMinDeViagem <= 0)
            throw new Error(`tempoMinDeViagem: ${tempoMinDeViagem}`);
        this.tempoMinDeViagem = tempoMinDeViagem;
    }
    public getVerticesDeLigacao(): [{tipo: string , verticeOrigem: Vertice}, {tipo: string , verticeOrigem: Vertice}] {
        return [
            {
                tipo: this.VerticesDeLigacao[0].tipo.toString(),
                verticeOrigem: this.VerticesDeLigacao[0].vertice
            }, 
            {
                tipo: this.VerticesDeLigacao[1].tipo.toString(),
                verticeOrigem: this.VerticesDeLigacao[1].vertice
            }
        ]
    }
    public setVerticesDeLigacao(verticeOrigem: Vertice, verticeDestino: Vertice): void {
        if (!(verticeOrigem && verticeDestino))
            throw new Error(`verticeOrigem: ${verticeOrigem}, verticeDestino: ${verticeDestino}`);
        this.VerticesDeLigacao = [
            { tipo: TipoDeLigacao.ORIGEM, vertice: verticeOrigem },
            { tipo: TipoDeLigacao.DESTINO, vertice: verticeDestino }
        ];
    }

    public getCustoTotal(custoTamanho: number, custoVigagem: number): number {
        if( !custoTamanho || custoTamanho <= 0 )
            custoTamanho = 1;
        if( !custoVigagem || custoVigagem <= 0 )
            custoVigagem = 1;
        return this.tamanho + this.tempoMinDeViagem;
    }

    public getNome(): string {
        return this.nome;
    }
    public setNome(nome: string): void {
        if (!nome)
            throw new Error(`nome: ${nome}`);
        this.nome = nome;
    }

    private generateRandomName(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = 10;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}