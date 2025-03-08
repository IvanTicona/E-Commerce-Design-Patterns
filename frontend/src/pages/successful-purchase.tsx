/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router";
import emailjs from "emailjs-com";

const SuccessfulPurchase = () => {
  const navigate = useNavigate();
  const addressDetails = JSON.parse(sessionStorage.getItem("addressDetails") || "{}");
  const paymentDetails = JSON.parse(sessionStorage.getItem("paymentDetails") || "{}");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const orderTotal = parseFloat(sessionStorage.getItem("orderTotal") || "0").toFixed(2);
  const orderTotalWithDiscount = parseFloat(sessionStorage.getItem("orderTotalWithDiscount") || "0").toFixed(2);

  const cartItems = () => {
    let str = "";
    cart.map((item: { nombre: string; quantity: number; precio: number }) => {
      str += `Producto: ${item.nombre}\nCantidad: ${item.quantity}\nPrecio Unitario: $${item.precio.toFixed(2)}\n\n`
    });
    return str;
  };

  const handleSendInvoice = () => {

    if (!addressDetails || !paymentDetails || !cart) {
      console.error("Faltan datos para enviar el correo");

      return;
    }

    const templateParams = {
      user_name: addressDetails.fullName,
      products_list: cartItems(),
      total_price: orderTotal,
      total_discounted: orderTotalWithDiscount,
      full_name: addressDetails.fullName,
      address1: addressDetails.address1,
      address2: addressDetails.address2 || "",
      city: addressDetails.city,
      state: addressDetails.state,
      country: addressDetails.country,
      postal_code: addressDetails.postalCode,
      cardNumber: paymentDetails.cardNumber,
      email: addressDetails.email,
    };
    console.log(templateParams.products_list);

    emailjs
      .send(
        "service_3qwm64h", // Reemplaza con tu Service ID de EmailJS
        "template_dhl5avq", // Reemplaza con tu Template ID de EmailJS
        templateParams,
        "QjyWbZpW_irFXuKY4" // Reemplaza con tu Public Key de EmailJS
      )
      .then((response) => {
        console.log("Correo enviado con éxito:", response);
        alert("Factura enviada a tu correo 📩");
      })
      .catch((error) => {
        console.error("Error al enviar correo:", error);
      });

    setTimeout(() => {
      localStorage.removeItem("cart");
      localStorage.removeItem("isQuickBuy")
      sessionStorage.removeItem("addressDetails");
      sessionStorage.removeItem("paymentDetails");
      sessionStorage.removeItem("orderTotal");
      sessionStorage.removeItem("orderTotalWithDiscount");
      navigate("/");
    }, 8000);
  };

  const handleContinueShopping = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("isQuickBuy")
    sessionStorage.removeItem("addressDetails");
    sessionStorage.removeItem("paymentDetails");
    sessionStorage.removeItem("orderTotal");
    sessionStorage.removeItem("orderTotalWithDiscount");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-800">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-2xl dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-green-600">¡Compra Exitosa! 🎉</h2>
        <p className="mt-4 text-gray-600">Gracias por tu compra, {addressDetails?.fullName}.</p>
        <p className="text-gray-600"> Tu pedido ha sido procesado con éxito.</p>
        <p className="text-lg font-bold mt-2">Total pagado: ${orderTotalWithDiscount}</p>
        <p className="text-sm text-gray-500">(Precio original: ${orderTotal})</p>

        {/* Mostrar productos */}
        <div className="mt-6 space-y-6 ">
          {cart.map((item: { nombre: string; quantity: number; precio: number; imagen: string }, index: number) => (
            <div key={index} className="flex justify-center items-center space-x-6 bg-gray-50 p-4 rounded-lg shadow-md dark:bg-slate-800">
              <img
                alt={item.nombre}
                className="w-24 h-24 object-cover rounded-md"
                src={item.imagen}
              />
              <div className="text-left">
                <p><strong>Producto:</strong> {item.nombre}</p>
                <p><strong>Cantidad:</strong> {item.quantity}</p>
                <p><strong>Precio Unitario:</strong> ${item.precio.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botones centrados */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            onClick={handleContinueShopping}
          >
            Continuar Comprando
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            onClick={handleSendInvoice}
          >
            Enviar Factura a mi Correo
          </button>
        </div>
      </div>
    </div>

  );
};

export default SuccessfulPurchase;