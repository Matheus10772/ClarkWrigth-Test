import grafo from './grafo/grafo';


type Custo = Map<Vertice, {custo: number, predecessor: Vertice}>;
type Saving = {verticeClienteI: Vertice, verticeClienteJ: Vertice, custo: number};
class roteirizador{

    private calculateMinCost( verticeOrigem: Vertice  ,VerticeAtual: Vertice, lambdaF: number, costMatrix: Map<Vertice, Custo>, fila: Vertice[]): void {

        for(let verticeVizinho of VerticeAtual.getVerticesAlcancaveis()){

            const custoAtual = costMatrix.get(verticeOrigem)!.get(verticeVizinho[1].vertice)?.custo!; //-> dist[v]

            const custoAtualizado = costMatrix.get(verticeOrigem)!.get(VerticeAtual)?.custo! + verticeVizinho[1].aresta.getCustoTotal(1, 1) + verticeVizinho[1].aresta.getTempoMinDeViagem() * lambdaF;  //-> dist[u] + custo(u,v)
            if( verticeVizinho[1].vertice.getVisitado() == false && ( custoAtual == -1 || custoAtualizado == -1 || custoAtualizado < custoAtual) ){
                
                costMatrix.get(verticeOrigem)!.set(verticeVizinho[1].vertice, {custo: custoAtualizado, predecessor: VerticeAtual});
                fila.push(verticeVizinho[1].vertice);
            }

        }

    }

    private calculateCostMatrixDijkstra(grafo: grafo, lambdaF: number): Map<Vertice, Custo>{
        const matrixSize = grafo.getVertices().size;
        const costMatrix: Map<Vertice, Custo> = new Map<Vertice, Map<Vertice, {custo: number, predecessor: Vertice}>>();

        
        for(let vertice of grafo.getVertices()){

            if(!costMatrix.has(vertice[1]))
                costMatrix.set(vertice[1], new Map<Vertice, {custo: number, predecessor: Vertice}>());
            

            let fila: Vertice[] = [];
            fila.push(vertice[1]);

            while (fila.length > 0) {
                let verticeAtual = fila.shift();
                if (!verticeAtual)
                    throw new Error("Erro ao retirar um vértice da fila.");    
                verticeAtual!.setVisitado(true);
                this.calculateMinCost(vertice[1], verticeAtual, lambdaF, costMatrix, fila);
                
                
            }
          
        }

        return costMatrix;

    }



    private calculateSavings(verticesDosClientes: Vertice[], verticeDoDeposito: Vertice, costMatrix: Map<Vertice, Custo>): Saving[] {

        const savings: Saving[] = [];

        for(let verticeClienteI of verticesDosClientes){
            for(let verticeClienteJ of verticesDosClientes){

                if(verticeClienteI.getNome() != verticeClienteJ.getNome()) {
                    const custoClienteDeposito = costMatrix.get(verticeClienteI)!.get(verticeDoDeposito)?.custo!;
                    const custoDepositoCliente = costMatrix.get(verticeClienteJ)!.get(verticeDoDeposito)?.custo!;
                    const custoClienteIClienteJ = costMatrix.get(verticeClienteI)!.get(verticeClienteJ)?.custo!;

                    const saving = custoClienteDeposito + custoDepositoCliente - custoClienteIClienteJ;

                    savings.push({verticeClienteI, verticeClienteJ, custo: saving});
                }
                    
                
            }
        }

        return savings;
    }


    private sortSavings(savings: Saving[]): Saving[] {
        savings.sort((a, b) => b.custo - a.custo); //Concertar isso
        return savings;
    }

    private makeFusions(savings: {verticeClienteI: Vertice, verticeClienteJ: Vertice, custo: number}[], deposito: Vertice) {
        const listaDeRota: {Vertice: Vertice[], id: number}[] = [];

        for(let saving of savings){
            

            if()
        }
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