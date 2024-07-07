import client from "../../../../utils/paypal/client";
import paypal from '@paypal/checkout-server-sdk'
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const body = await req.json();
    const { orderID } = body
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    // request.requestBody({})
    const response = await PaypalClient.execute(request)
    if (!response) {
        return NextResponse.json({ message: "Some Error Occured at backend" }, { status: 500 })
    }
    // update user's subscription here
    await prisma.user.update({
        where: { id: user?.id },
        data: { subscriptionPlan: 'A' },
    });
    // update end
    return NextResponse.json({ message: "Succesfull captureOrder", operationDone: true }, { status: 200 });

}