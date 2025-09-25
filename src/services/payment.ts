import { preference } from "../libs/mercadopago";

export async function createCheckoutPreference(total: number, orderId: string) {
    const body = {
        items: [
            {
                id: "cart",
                title: "Carrinho de Compras",
                quantity: 1,
                unit_price: total,
                currency_id: "BRL",
            },
        ],
        back_urls: {
            success: "http://localhost:3000/payment-ok",
            failure: "http://localhost:3000/payment-error",
            pending: "http://localhost:3000/payment-pending",
        },
        external_reference: orderId,
        notification_url: "http://localhost:3000/webhook/mercadopago",
    };

    const result = await preference.create({ body });
    console.log(result);
    return {
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
    };
}
