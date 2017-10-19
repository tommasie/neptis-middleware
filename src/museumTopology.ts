var cytoscape = require('cytoscape');


export class Topology {
    /*let obj = {foo: 'bar'};
    Object.keys(obj).forEach(key => {
        map.set(key, obj[key]);
    });*/
    private cy;
    private mst;

    private adiacenze: Object;
    private inverso: Object;
    constructor(private object: Object, private inizio: string, private fine: string) {
        this.adiacenze = object;
        this.inverso = {};
         this.cy = cytoscape();
    }

    /*parseGraph() {
        Object.keys(this.object).forEach(key => {
            this.cy.add({
                group: "nodes",
                data: { id: key }
            });
        });
        Object.keys(this.object).forEach(key => {
            this.object[key].forEach(dest => {
                this.cy.add({
                    group: "edges",
                    data: {source: key, target: dest}
                });
            });
        });
        this.mst = this.cy.elements().kruskal();
    }

    preprocess() {
        let grey = [];
        let black = [];
        this.mst.nodes().leaves().forEach(leaf => {
            grey.push(leaf);
        });
        while(grey.length != 0) {
            let node = grey.shift();
            console.log(node.json());
            // console.log(node.predecessors().jsons());
            console.log(node.predecessors()[0].source().json());
            // console.log("\n\n");
            console.log(node.predecessors()[0].source().successors().length);
            console.log("\n\n\n");
        }

    }

    exec() {
        this.parseGraph();
        this.preprocess();

    }*/

    private recursiveLink2(nodoCorrente, foglia, grey, black) {
        if(nodoCorrente == this.inizio) {
            this.adiacenze[foglia].push(nodoCorrente);
            return;
        }

        //se il nodo ha piu di un figlio, allora e' un bivio
        if(this.adiacenze[nodoCorrente].length > 1) {
            this.adiacenze[foglia].push(nodoCorrente);
            if(!grey.includes(nodoCorrente) && !black.includes(nodoCorrente))
                grey.push(nodoCorrente);
            return;
        }
        let parent = this.inverso[nodoCorrente];
        this.recursiveLink2(parent, foglia, grey, black);
    }

    preprocess2() {
        //crea lista di arch inversi
        Object.keys(this.adiacenze).forEach(src => {
            let lista = this.adiacenze[src];
            lista.forEach(target => {
                this.inverso[target] = src;
            });
        });
        console.log(this.adiacenze);
        console.log(this.inverso);

        let grey = [];
        let black = [];
        //Aggiungi alla lista grigia le foglie
        Object.keys(this.adiacenze).forEach(src => {
            if(this.adiacenze[src].length == 0 || src != this.fine)
                grey.push(src);
        });
        while(grey.length != 0) {
            let nodo = grey.shift();
            let prev = this.inverso[nodo];

            this.recursiveLink2(prev, nodo, grey, black);
            black.push(nodo);
        }
        return this.adiacenze;
    }

}
