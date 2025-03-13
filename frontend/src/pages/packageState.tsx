import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import { useState } from "react";
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

    // Función para determinar el tamaño y color del círculo según el estado
    const getCircleClasses = (index: number) => {
        switch (estadoActual) {
            case 'Preparando':
                return index === 0 ? 'scale-125 bg-blue-500' : 'scale-100 bg-gray-600';
            case 'EnEnvio':
                return index === 1 ? 'scale-125 bg-blue-500' : 'scale-100 bg-gray-600';
            case 'Entregado':
                return 'scale-125 bg-green-500'; //Verde todo
            case 'Cancelado':
                return index === 3 ? 'scale-125 bg-red-500' : 'scale-100 bg-gray-600';
            default:
                return 'scale-100 bg-gray-600';
        }
    };

    return (
        <DefaultLayout>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 m-10" style={{ whiteSpace: 'pre-line' }}>
                Seguimiento de su pedido:
            </h1>

            <div className="bg-white-800 dark:bg-neutral-900 max-w-4xl mx-auto p-12 rounded-lg shadow-md">
                <b className="text-xl">Estado actual del pedido:</b>
                <p className="text-lg mb-4">{estadoActual}</p>

                <div className="flex items-center justify-center mb-6">
                    <div className={`w-12 h-12 rounded-full transition-transform duration-300 ${getCircleClasses(0)} ${estadoActual === 'Cancelado' ? 'hidden' : 'block'}`}>
                        <span className="text-gray text-xs font-bold flex items-center justify-center h-full">
                            Preparando
                        </span>
                    </div>
                    <div className={`w-12 h-1 bg-gray-500 mx-2 ${estadoActual === 'Cancelado' ? 'hidden' : 'block'}`}></div>
                    <div className={`w-12 h-12 rounded-full transition-transform duration-300 ${getCircleClasses(1)} ${estadoActual === 'Cancelado' ? 'hidden' : 'block'}`}>
                        <span className="text-gray text-xs font-bold flex items-center justify-center h-full">
                            En Envío
                        </span>
                    </div>
                    <div className={`w-12 h-1 bg-gray-500 mx-2 ${estadoActual === 'Cancelado' ? 'hidden' : 'block'}`}></div>
                    <div className={`w-12 h-12 rounded-full transition-transform duration-300 ${getCircleClasses(2)} ${estadoActual === 'Cancelado' ? 'hidden' : 'block'}`}>
                        <span className="text-gray text-xs font-bold flex items-center justify-center h-full">
                            Entregado
                        </span>
                    </div>
                    <div className={`w-12 h-12 rounded-full transition-transform duration-300 ${getCircleClasses(3)} ${estadoActual === 'Cancelado' ? 'block' : 'hidden'}`}>
                        <span className="text-gray text-xs font-bold flex items-center justify-center h-full">
                            Cancelado
                        </span>
                    </div>
                </div>

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