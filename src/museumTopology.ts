export class Topology {

    private adiacenze: Object;
    private inverso: Object;
    constructor(private object: Object, private inizio: string) {
        this.adiacenze = object;
        this.inverso = {};
    }

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
            if(this.adiacenze[src].length == 0)
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
