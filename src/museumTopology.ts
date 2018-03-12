import { logger } from './config/logger';

export class Topology {

    private adiacenze: object;
    private inverso: object;
    constructor(private object: object, private inizio: string) {
        this.adiacenze = object;
        this.inverso = {};
    }

    public preprocess2() {
        // crea lista di arch inversi
        Object.keys(this.adiacenze).forEach((src) => {
            const lista = this.adiacenze[src];
            lista.forEach((target) => {
                this.inverso[target] = src;
            });
        });
        logger.debug(this.adiacenze);
        logger.debug(this.inverso);

        const grey = [];
        const black = [];
        // Aggiungi alla lista grigia le foglie
        Object.keys(this.adiacenze).forEach((src) => {
            if (this.adiacenze[src].length === 0) {
                grey.push(src);
            }
        });
        while (grey.length !== 0) {
            const nodo = grey.shift();
            const prev = this.inverso[nodo];

            this.recursiveLink2(prev, nodo, grey, black);
            black.push(nodo);
        }
        return this.adiacenze;
    }

    private recursiveLink2(nodoCorrente, foglia, grey, black) {
        if (nodoCorrente === this.inizio) {
            this.adiacenze[foglia].push(nodoCorrente);
            return;
        }

        // se il nodo ha piu di un figlio, allora e' un bivio
        if (this.adiacenze[nodoCorrente].length > 1) {
            this.adiacenze[foglia].push(nodoCorrente);
            if (!grey.includes(nodoCorrente) && !black.includes(nodoCorrente)) {
                grey.push(nodoCorrente);
            }
            return;
        }
        const parent = this.inverso[nodoCorrente];
        this.recursiveLink2(parent, foglia, grey, black);
    }

}
