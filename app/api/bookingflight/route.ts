import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function formatDate(date: Date): Promise<string> {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

export async function GET(){
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }

        const bookingflight = await prismadb.bookingFlight.findMany({
        });

        // Chuyển đổi kiểu dữ liệu của startDate và endDate từ chuỗi sang Date
        const formattedBookings = await Promise.all(bookingflight.map(async (bookingFlight) => ({
          ...bookingFlight,
          bookedAt: await formatDate(bookingFlight.bookedAt)
        })));

        if (formattedBookings.length > 0) {
            return NextResponse.json(
                {
                    bookingflight: formattedBookings,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json({ msg: "No bookings Flight found." }, { status: 404 });
        }
        
    } catch (error) {
        console.log('Error at /api/bookingflight/', error)
        return new NextResponse('Internal Server Error', {status: 500})
    }
}
