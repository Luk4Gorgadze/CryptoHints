import client from "../../../../utils/paypal/client";
import paypal from '@paypal/checkout-server-sdk'
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { orderID } = body
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    // request.requestBody({})
    const response = await PaypalClient.execute(request)
    if (!response) {
        return NextResponse.json({ message: "Some Error Occured at backend" }, { status: 500 })
    }
    return NextResponse.json({ message: "Succesfull captureOrder" }, { status: 200 });

}