import grafo from './grafo/grafo';



class roteirizador{

    private calculateCostMatrixDijkstra(grafo: grafo, lambdaF: number) {
        const matrixSize = grafo.getVertices().size;
        const costMatrix: {vertice: Vertice, custo: number}[][] = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));

        
        for(let vertice of grafo.getVertices()){

            let fila: Vertice[] = [];
            fila.push(vertice[1]);
            while (fila.length > 0) {
                let verticeAtual = fila.shift() ;
                if(verticeAtual){
                    
                }
                
            }
          
        }

        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                if (i != j) {
                    costMatrix[i][j] = grafo.getArestas().get(`${i}-${j}`)?.getCustoTotal(lambdaF, 1) || 0;
                }
            }
        }

        return { costMatrix, proposedCentroids, savings };
    }

    private calculateMinCost(vertice: Vertice, lambdaF: number, custoAnterior: number): number {
        let custoAtual: number = -1;
        if(custoAnterior == -1)
            custoAtual = custoAnterior;
        for(let verticeVizinho of vertice.getVerticesAlcancaveis()){
            const custo = vertice.getCustoTotal(1, 1) + verticeVizinho[1].aresta.getCustoTotal(1, 1) + verticeVizinho[1].aresta.getTamanho() * lambdaF;
            if(custoAtual == -1 || custo < custoAtual){
                custoAtual = custo;
            }
        }

        return custoAtual;
    }


    private calculateSavings(grafo: grafo) {

        
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