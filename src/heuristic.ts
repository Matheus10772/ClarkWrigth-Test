import grafo from './grafo/grafo';



class roteirizador{

    private calculateMinCost( verticeOrigem: Vertice  ,VerticeAtual: Vertice, lambdaF: number, costMatrix: Map<Vertice, Map<Vertice, {custo: number, predecessor: Vertice}>>, fila: Vertice[]): void {

        for(let verticeVizinho of VerticeAtual.getVerticesAlcancaveis()){

            const custoAtual = costMatrix.get(verticeOrigem)!.get(verticeVizinho[1].vertice)?.custo!; //-> dist[v]

            const custoAtualizado = costMatrix.get(verticeOrigem)!.get(VerticeAtual)?.custo! + verticeVizinho[1].aresta.getCustoTotal(1, 1) + verticeVizinho[1].aresta.getTempoMinDeViagem() * lambdaF;  //-> dist[u] + custo(u,v)
            if( verticeVizinho[1].vertice.getVisitado() == false && ( custoAtual == -1 || custoAtualizado == -1 || custoAtualizado < custoAtual) ){
                
                costMatrix.get(verticeOrigem)!.set(verticeVizinho[1].vertice, {custo: custoAtualizado, predecessor: VerticeAtual});
                fila.push(verticeVizinho[1].vertice);

                /*if ( !(costMatrix.get(verticeOrigem)!.has(verticeVizinho[1].vertice)) ) {
                    
                } else {
                    costMatrix.get(verticeOrigem)?.set(verticeVizinho[1].vertice, custoAtualizado);
                }*/
            }

        }

    }

    private calculateCostMatrixDijkstra(grafo: grafo, lambdaF: number): Map<Vertice, Map<Vertice, {custo: number, predecessor: Vertice}>>{
        const matrixSize = grafo.getVertices().size;
        const costMatrix: Map<Vertice, Map<Vertice, {custo: number, predecessor: Vertice}>> = new Map<Vertice, Map<Vertice, {custo: number, predecessor: Vertice}>>();

        
        for(let vertice of grafo.getVertices()){

            if(!costMatrix.has(vertice[1]))
                costMatrix.set(vertice[1], new Map<Vertice, {custo: number, predecessor: Vertice}>());
            

            let fila: Vertice[] = [];
            fila.push(vertice[1]);

            while (fila.length > 0) {
                let verticeAtual = fila.shift();
                if (!verticeAtual)
                    throw new Error("Erro ao retirar um vértice da fila.");    
                verticeAtual?.setVisitado(true);
                this.calculateMinCost(vertice[1], verticeAtual, lambdaF, costMatrix, fila);
                
                
            }
          
        }

        return costMatrix;

    }



    private calculateSavings(verticesDosClientes: Vertice[], verticesDosDepositos: Vertice[], costMatrix: Map<Vertice, Map<Vertice, {custo: number, predecessor: Vertice}>>) {
            const savingMatrixSize: number = grafo.getVertices().size;


        
            for (let j = 0; j < N; j++) {
                if (i!=j && (proposedCentroids[i].identifier != 0 && proposedCentroids[j].identifier != 0) && (proposedCentroids[i].identifier != -1 && proposedCentroids[j].identifier != -1)) {
                    const saving = lambdaF*costMatrix[i][N-1]+ lambdaI*costMatrix[0][j] - lambdaM*costMatrix[i][j];
                    savings[`${i}-${j}`] = saving;
                }
            }
        

        const sortedSavings = Object.keys(savings).sort((a,b) => savings[b] - savings[a]).map(key => key.split('-').map(Number));
        return sortedSavings
    }

}


class clarkWright{
    private grafo: grafo;
    private vertices: Map<string, Vertice>;
    private arestas: Map<string, Aresta>;
    private rotas: Map<string, Rota>;
    private rotasOtimizadas: Map<string, Rota>;
    private rotasOtimizadasComCusto: Map<string, number>;
    private rotasOtimizadasComCustoFinal: Map<string, number>;

    constructor(grafo: grafo) {
        this.grafo = grafo;
        this.vertices = grafo.getVertices();
        this.arestas = grafo.getArestas();
        this.rotas = new Map<string, Rota>();
        this.rotasOtimizadas = new Map<string, Rota>();
        this.rotasOtimizadasComCusto = new Map<string, number>();
        this.rotasOtimizadasComCustoFinal = new Map<string, number>();
    }
}