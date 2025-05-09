enum objetivo {
    ENTREGA,
    COLETA,
    NAOAPLICAVEL
}

interface Ligacao {
    vertice: Vertice, //Alcança esse vértice
    aresta: Aresta //Através dessa aresta
}


class Vertice {

    private nome: string;
    private alvo: boolean;
    private tipo: objetivo;
    private tempoDePermanencia: number;
    private verticesAlcancaveis: Map<string, Ligacao> = new Map<string, Ligacao>();
    private carga: number;
    private visitado: boolean;
   

    constructor(alvo: boolean, tipo: objetivo, tempoDePermanencia: number, carga: number ,verticesAlcancaveis?: [{nome: string, vertice: Ligacao}], nome?: string) {
        this.nome = "";
        this.alvo = false;
        this.tipo = objetivo.NAOAPLICAVEL;
        this.tempoDePermanencia = 0;
        this.carga = 0;
        this.visitado = false;


        try {
            if( !( !(alvo == undefined) && tempoDePermanencia) )
                throw new Error(`alvo: ${alvo}, tempoDePermanencia: ${tempoDePermanencia}`);

            this.setAlvo(alvo, tempoDePermanencia, carga, tipo);

            if(verticesAlcancaveis)
                this.setVerticesAlcancaveis(verticesAlcancaveis);

            if(nome)
                this.setNome(nome);

        } catch (error) {
            throw new Error(`Erro ao criar o vertice: ${error}`);
        }
        
    }

    public getAlvo(): boolean {
        return this.alvo;
    }

    public setAlvo(alvo: boolean, tempoDePermanencia: number, carga: number, tipo: objetivo): void {
        this.alvo = alvo;
        if(this.alvo){
            if( !(tempoDePermanencia && carga & tipo ))
                throw new Error(`tempoDePermanencia: ${tempoDePermanencia}, carga: ${carga}, tipo: ${tipo}`);
            this.setTipo(tipo);
            this.setCarga(carga);
            this.setTempoDePermanencia(tempoDePermanencia);
        } else {
            this.setTipo(objetivo.NAOAPLICAVEL);
            this.setCarga(0);
            this.setTempoDePermanencia(0);
        }
    }

    public getTipo(): objetivo {
        return this.tipo;
    }

    private setTipo(tipo: objetivo): void {
        this.tipo = tipo;
    }

    public getTempoDePermanencia(): number {
        return this.tempoDePermanencia;
    }
    public setTempoDePermanencia(tempoDePermanencia: number): void {
        this.tempoDePermanencia = tempoDePermanencia;
    }
    public getVerticesAlcancaveis(): Map<String, Ligacao> {
        return this.verticesAlcancaveis;
        
    }

    public setVerticesAlcancaveis(verticesAlcancaveis: [{nome: string, vertice: Ligacao}]): void {
            verticesAlcancaveis.forEach((verticeAlcancavel) => {
                if( !(verticeAlcancavel.nome && verticeAlcancavel.vertice) )
                    throw new Error(`nome: ${verticeAlcancavel.nome}, vertice: ${verticeAlcancavel.vertice}`);
                this.verticesAlcancaveis.set(verticeAlcancavel.nome, verticeAlcancavel.vertice);
            })
        
    }

    public addLigacao(aresta: Aresta, vertice: Vertice): void {
        try {
            if( !(aresta && vertice) )
                throw new Error(`aresta: ${aresta}, vertice: ${vertice}`);
            if(this.verticesAlcancaveis.get(vertice.getNome())?.aresta.getNome() == aresta.getNome())
                throw new Error(`A aresta ${aresta.getNome()} já existe para o vertice ${vertice.getNome()}`);
            this.verticesAlcancaveis.set(vertice.getNome(), { vertice: vertice, aresta: aresta });    
        } catch (error) {
            throw new Error(`Erro ao adicionar a ligacao: ${error}`);
        }
        
    }   

    public getCarga(): number {
        return this.carga;
    }

    public setCarga(carga: number): void {
        if(carga < 0)
            throw new Error(`Carga não pode ser negativa: ${carga}`);
        this.carga = carga;
    }

    public getCustoTotal(pesoTempo:  number, pesoCarga: number): number {
        if(pesoTempo <= 0 || !pesoTempo )
            pesoTempo = 1;
        if(pesoCarga <= 0 || !pesoCarga )
            pesoCarga = 1;
        return this.tempoDePermanencia * pesoTempo + this.carga * pesoCarga;
    }

    public setNome(nome: string): void {
        if(!nome)
            throw new Error(`Nome não pode ser vazio: ${nome}`);
        this.nome = nome;
    }

    public getNome(): string {
        return this.nome;
    }

    public setVisitado(visitado: boolean): void {
        this.visitado = visitado;
    }

    public getVisitado(): boolean {
        return this.visitado;
    }


}