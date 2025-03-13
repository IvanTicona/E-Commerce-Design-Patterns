abstract class Estado {
    abstract cancelar(): Estado;
    abstract proceder(): Estado;
}

class Preparando extends Estado {
    cancelar(): Estado {
        console.log("El pedido ha sido cancelado.");
        return new Cancelado();
    }

    proceder(): Estado {
        console.log("El pedido está ahora en envío.");
        return new EnEnvio();
    }
}

class EnEnvio extends Estado {
    cancelar(): Estado {
        console.warn("Advertencia: El pedido está en envío, ¿estás seguro de que deseas cancelarlo?");
        console.log("El pedido ha sido cancelado.");
        return new Cancelado();
    }

    proceder(): Estado {
        console.log("El pedido ha sido entregado.");
        return new Entregado();
    }
}

class Cancelado extends Estado {
    cancelar(): Estado {
        console.log("El pedido ya está cancelado, no se puede cancelar de nuevo.");
        return this;
    }

    proceder(): Estado {
        console.log("El pedido está cancelado, no se puede proceder.");
        return this;
    }
}

class Entregado extends Estado {
    cancelar(): Estado {
        alert("El pedido ya ha sido entregado, no se puede cancelar.");
        return this;
    }

    proceder(): Estado {
        console.log("El pedido ya ha sido entregado, no se puede proceder.");
        return this;
    }
}

export { Estado, Preparando, EnEnvio, Cancelado, Entregado };