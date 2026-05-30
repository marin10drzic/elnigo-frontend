import { CalendarDays } from "lucide-react";

export function ReservationsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Reservations</h1>
        <p className="text-stone-500 text-sm mt-1">Manage restaurant reservations</p>
      </div>
      <div className="border border-amber-900/30 rounded-none p-16 flex flex-col items-center justify-center text-center">
        <CalendarDays className="w-10 h-10 text-amber-900/50 mb-4" />
        <p className="text-stone-400 text-sm font-medium mb-1">Still Building</p>
        <p className="text-stone-600 text-xs max-w-xs">Reservation management is currently under construction. Check back soon.</p>
      </div>
    </div>
  );
}
