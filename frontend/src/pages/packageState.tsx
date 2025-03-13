import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import Pedido from "@/interface/pedido";

const PackageState = () => {
    const [pedido] = useState(new Pedido());
    const [estadoActual, setEstadoActual] = useState(pedido.obtenerEstado());

    const handleCancelar = () => {
        if (pedido.obtenerEstado() === 'EnEnvio') {
            const confirmacion = window.confirm("Este pedido ya está enviándose ¿Estás seguro que quieres cancelarlo?");
            if (!confirmacion) return;
        }
        pedido.cancelar();
        setEstadoActual(pedido.obtenerEstado());
    };

    const handleProceed = () => {
        pedido.proceder();
        setEstadoActual(pedido.obtenerEstado());
    };

    return (
        <DefaultLayout>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 m-10" style={{ whiteSpace: 'pre-line' }}>
                Seguimiento de su pedido:
            </h1>

            <div className="bg-white-800 dark:bg-neutral-900 max-w-4xl mx-auto p-12 rounded-lg">
                <b className="text-xl">Estado actual del pedido:</b>
                <p className="text-lg mb-4">{estadoActual}
                </p>
                <div className="flex justify-center space-x-4">
                    <Button
                        color="primary"
                        radius="full"
                        size="lg"
                        onPress={handleProceed} 
                        isDisabled={estadoActual === 'Cancelado' || estadoActual === 'Entregado'}
                        className="mx-4">
                        Simular avance
                    </Button>
                    <Button 
                        color="danger"
                        radius="full"
                        size="lg"
                        onPress={handleCancelar} 
                        isDisabled={estadoActual === 'Cancelado'}
                        className="mx-4">
                        Cancelar Pedido
                    </Button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PackageState;