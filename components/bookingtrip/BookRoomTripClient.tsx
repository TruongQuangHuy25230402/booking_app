"use client";

import useBookTrip from "@/hooks/useBookTrip";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import RoomTripCard from "../roomtrip/RoomTripCard";
import { Elements } from "@stripe/react-stripe-js";
import RoomTripPaymentForm from "./RoomTripPaymentForm";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const BookRoomTripClient = () => {
  const { bookingRoomData, clientSecret } = useBookTrip();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [pageLoaded, setPageLoaded] = useState(false);

  const { theme } = useTheme();

  const router = useRouter();

  const topOfPageRef = useRef<HTMLDivElement>(null); // Create a ref

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };

  if (pageLoaded && !paymentSuccess && (!bookingRoomData || !clientSecret))
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-rose-500">
          Oops! This page could not be propery loaded...
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Go home
          </Button>
          <Button onClick={() => router.push("/my-bookings-trip")}>
            View Bookings Trip
          </Button>
        </div>
      </div>
    );

  if (paymentSuccess)
    return (
      <div className="flex items-center flex-col gap-4" ref={topOfPageRef}>
        <div className="text-teal-500 text-center">Payment Success</div>
        <Button onClick={() => router.push("/my-bookings-trip")}>
          View Bookings
        </Button>
      </div>
    );
  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && bookingRoomData && (
        <div>
          <h3 className="text-2xl font-semibold">
            Complete payment to reserve this room!
          </h3>

          <div className="mb-6">
            <RoomTripCard roomtrip={bookingRoomData.roomtrip} />
          </div>

          <Elements options={options} stripe={stripePromise}>
            <RoomTripPaymentForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default BookRoomTripClient;
