import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_PRIVATE_KEY as string,
});

export const preference = new Preference(client);
