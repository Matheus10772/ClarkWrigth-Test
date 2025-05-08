enum grafoType {
    ORIENTADO,
    NAO_ORIENTADO
}


class Grafo {

    private vertices: Map<string, Vertice>;
    private arestas: Map<string, Aresta>;

    private tipo: grafoType;

    constructor(tipo: grafoType) {
        try {
            if(!tipo)
                throw new Error("O tipo do grafo não pode ser nulo.");
            this.vertices = new Map<string, Vertice>();
            this.arestas = new Map<string, Aresta>();
            this.tipo = tipo;
        } catch (error) {
            throw new Error("Erro ao criar o grafo: " + error);
        }
        
    }


    public addVertice(alvo: boolean, tipo: objetivo, tempoDePermanencia: number, carga: number ,verticesAlcancaveis?: [{nome: string, vertice: Ligacao}], nome?: string) {

        try {
            let vertice: Vertice = new Vertice(alvo, tipo, tempoDePermanencia, carga, verticesAlcancaveis=verticesAlcancaveis, nome);
            if(this.vertices.has(vertice.getNome()))
                throw new Error("O vertice já existe no grafo.");
            this.vertices.set( vertice.getNome(), vertice);
        } catch (error) {
            throw new Error("Erro ao adicionar o vertice: " + error);
        }
    }

    public addAresta(tamanho: number, tempoMinDeViagem: number, verticeOrigem: Vertice, verticeDestino: Vertice, nome?: string) {
        try {
            if(!verticeOrigem || !verticeDestino)
                throw new Error("Os vertices de origem e destino não podem ser nulos.");
            if(!this.vertices.has(verticeOrigem.getNome()) || !this.vertices.has(verticeDestino.getNome()))
                throw new Error("Os vertices de origem e destino não estão definidos no grafo.");

            let aresta: Aresta = new Aresta(tamanho, tempoMinDeViagem, verticeOrigem, verticeDestino, nome);
            if(this.arestas.has(aresta.getNome()))
                throw new Error("A aresta já existe no grafo.");
            this.arestas.set( aresta.getNome(), aresta);
            verticeOrigem.addLigacao(aresta, verticeDestino);
            if(this.tipo == grafoType.NAO_ORIENTADO)
                verticeDestino.addLigacao(aresta, verticeOrigem);
        } catch (error) {
            throw new Error("Erro ao adicionar a aresta: " + error);
        }
    }

    public getVertices(): Map<string, Vertice> {
        return this.vertices;
    }

    public getArestas(): Map<string, Aresta> {
        return this.arestas;
    }

}

export default Grafo;