import client from "../../../../utils/paypal/client";
import paypal from '@paypal/checkout-server-sdk'
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const PaypalClient = client()
        //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
        const request = new paypal.orders.OrdersCreateRequest()
        const body = await req.json();
        const { user_id, order_price } = body;
        console.log("USER ID: ", user_id, order_price)
        request.headers['prefer'] = 'return=representation'
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: order_price + "",
                    },
                },
            ],
        })
        const response = await PaypalClient.execute(request)
        if (response.statusCode !== 201) {
            console.log("RES: ", response)
            return NextResponse.json({ message: "Some Error Occured at backend" }, { status: 500 })
        }
        const order = response.result;
        console.log("Order: ", order)
        return NextResponse.json({ message: "Succesfully created order", data: { order } }, { status: 200 });
    }
    catch (err) {
        console.log("Err at Create Order: ", err)
        return NextResponse.json({ message: "Failed purchase" }, { status: 401 });
    }
}