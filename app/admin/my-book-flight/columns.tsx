"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export type FlightBookings = {
  id: string;
  userName: string;
  userEmail: string;
  adultCount: number;
  childrenCount: number;
  availableSeats: number; // Thêm trường số lượng chỗ trống
  bookedAt: Date;
  totalPrice: number;
  paymentStatus: Boolean;
};

export const columns: ColumnDef<FlightBookings>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userName",
    header: "UserName",
  },
  {
    accessorKey: "userEmail",
    header: "Email",
  },
  {
    accessorKey: "adultCount",
    header: "adultCount",
  },
  {
    accessorKey: "childrenCount",
    header: "childrenCount",
  },
  {
    accessorKey: "availableSeats",
    header: "Available Seats",
  },

  {
    accessorKey: "bookedAt",
    header: "BookedAt",
  },

  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Status",
  },
];
