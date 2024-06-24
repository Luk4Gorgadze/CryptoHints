import client from "../../../../utils/paypal/client";
import paypal from '@paypal/checkout-server-sdk'
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const { orderID } = req.body
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})
    const response = await PaypalClient.execute(request)
    if (!response) {
        return res.status(500).json({ success: false, message: "Some Error Occured at backend" })
    }
    return NextResponse.json({ message: "Succesfull captureOrder" }, { status: 200 });

}