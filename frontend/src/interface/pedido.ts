import { Estado, Preparando } from './estado';

class Pedido {
    private estado: Estado;

    constructor() {
        this.estado = new Preparando(); // Estado inicial
    }

    cancelar(): void {
        this.estado = this.estado.cancelar();
    }

    proceder(): void {
        this.estado = this.estado.proceder();
    }

    obtenerEstado(): string {
        return this.estado.constructor.name;
    }
}

export default Pedido;