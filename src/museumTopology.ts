import { logger } from './config/logger';

export class Topology {

    private adiacenze: Map<number, number[]>;
    private inverso: Map<number, number>;
    private shortcut: Map<number, number>;
    constructor(object: Map<number, number[]>, private inizio: number) {
        this.adiacenze = object;
        this.inverso = new Map<number, number>();
        this.shortcut = new Map<number, number>();
    }

    public preprocess() {
        // crea lista di arch inversi
        this.adiacenze.forEach((targets, src) => {
            targets.forEach((target: number) => {
                this.inverso.set(target, src);
            });
        });
        logger.debug(this.adiacenze);

        const grey: number[] = [];
        const black: number[] = [];
        // Aggiungi alla lista grigia le foglie
        this.adiacenze.forEach((targets, src) => {
            if (targets.length === 0) {
                grey.push(src);
            }
        });
        while (grey.length !== 0) {
            const nodo = grey.shift();
            const prev = this.inverso.get(nodo);

            this.recursiveLink(prev, nodo, grey, black);
            black.push(nodo);
        }
        logger.debug(this.shortcut);
        return this.shortcut;
    }

    private recursiveLink(nodoCorrente: number, foglia: number, grey: number[], black: number[]) {
        if (nodoCorrente === this.inizio) {
            this.shortcut.set(foglia, nodoCorrente);
            return;
        }

        // se il nodo ha piu di un figlio, allora e' un bivio
        if (this.adiacenze.get(nodoCorrente).length > 1) {
            this.shortcut.set(foglia, nodoCorrente);
            if (!grey.some((n) => n === nodoCorrente) && !black.some((n) => n === nodoCorrente)) {
                grey.push(nodoCorrente);
            }
            return;
        }
        const parent = this.inverso.get(nodoCorrente);
        this.recursiveLink(parent, foglia, grey, black);
    }

}
