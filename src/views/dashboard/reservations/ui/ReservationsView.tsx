"use client";

import { useState } from "react";
import { MoreHorizontal, AlertTriangle, CalendarDays } from "lucide-react";
import {
  useReservations,
  useUpdateReservationStatus,
  useDeleteReservation,
} from "@/entities/reservation";
import type { Reservation, ReservationStatus } from "@/entities/reservation";
import { authStore } from "@/shared/lib/authStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { Input } from "@/shared/ui/input";

const STATUSES: ReservationStatus[] = ["pending", "confirmed", "cancelled", "completed"];

function statusBadgeClass(status: ReservationStatus) {
  switch (status) {
    case "confirmed":  return "bg-emerald-900/30 text-emerald-400 border-emerald-800";
    case "pending":    return "bg-amber-900/30 text-amber-400 border-amber-800";
    case "cancelled":  return "bg-red-900/30 text-red-400 border-red-800";
    case "completed":  return "bg-stone-800 text-stone-400 border-stone-700";
  }
}

function formatDateTime(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

type StatusDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  reservation: Reservation | null;
  onSave: (status: ReservationStatus) => void;
  isPending: boolean;
};

function StatusDialog({ open, onOpenChange, reservation, onSave, isPending }: StatusDialogProps) {
  const [status, setStatus] = useState<ReservationStatus>(reservation?.status ?? "pending");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(status);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white font-serif">Update Status</DialogTitle>
        </DialogHeader>
        {reservation && (
          <p className="text-stone-400 text-sm">
            Reservation for <span className="text-stone-200">{reservation.guest_name}</span>
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Status</label>
            <Select value={status} onValueChange={(v) => v && setStatus(v as ReservationStatus)}>
              <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-200 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700 text-stone-200">
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="focus:bg-stone-700 capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="border-t border-stone-800 bg-transparent -mx-4 -mb-4 px-4 py-3 flex-row justify-end gap-2">
            <DialogClose
              render={<Button variant="outline" className="border-stone-700 text-stone-300" />}
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-600 hover:bg-amber-700 text-black font-medium border-0"
            >
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  reservation: Reservation | null;
  onConfirm: () => void;
  isPending: boolean;
};

function DeleteDialog({ open, onOpenChange, reservation, onConfirm, isPending }: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white font-serif">Delete Reservation</DialogTitle>
        </DialogHeader>
        <p className="text-stone-400 text-sm">
          Delete reservation for <span className="text-stone-200">{reservation?.guest_name}</span>? This cannot be undone.
        </p>
        <DialogFooter className="border-t border-stone-800 bg-transparent -mx-4 -mb-4 px-4 py-3 flex-row justify-end gap-2">
          <DialogClose
            render={<Button variant="outline" className="border-stone-700 text-stone-300" />}
          >
            Cancel
          </DialogClose>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-700 hover:bg-red-800 text-white font-medium border-0"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ReservationsView() {
  const token = authStore.getToken() ?? "";

  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");

  const filters = {
    date: dateFilter || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  };

  const { data: reservations, isLoading, error } = useReservations(filters, token);
  const updateStatus = useUpdateReservationStatus(token);
  const deleteReservation = useDeleteReservation(token);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Reservation | null>(null);

  function openStatusDialog(r: Reservation) {
    setSelected(r);
    setStatusDialogOpen(true);
  }

  function openDeleteDialog(r: Reservation) {
    setSelected(r);
    setDeleteDialogOpen(true);
  }

  function handleStatusSave(status: ReservationStatus) {
    if (!selected) return;
    updateStatus.mutate(
      { id: selected.id, data: { status } },
      { onSuccess: () => setStatusDialogOpen(false) }
    );
  }

  function handleDelete() {
    if (!selected) return;
    deleteReservation.mutate(selected.id, {
      onSuccess: () => setDeleteDialogOpen(false),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Reservations</h1>
        <p className="text-stone-500 text-sm mt-1">Manage restaurant reservations</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 border border-amber-900/40 bg-amber-950/20 px-4 py-3 text-sm text-amber-400">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Authentication Required</p>
            <p className="text-amber-600 text-xs mt-0.5">
              Admin token is required to view reservations.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-stone-900 border-stone-700 text-stone-200 w-44 [color-scheme:dark]"
        />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ReservationStatus | "all")}>
          <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-200 w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent className="bg-stone-900 border-stone-700 text-stone-200">
            <SelectItem value="all" className="focus:bg-stone-700">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="focus:bg-stone-700 capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(dateFilter || statusFilter !== "all") && (
          <Button
            variant="outline"
            className="border-stone-700 text-stone-400 hover:text-stone-200"
            onClick={() => { setDateFilter(""); setStatusFilter("all"); }}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="border border-stone-800 bg-[#0a0908]">
        {isLoading ? (
          <div className="flex flex-col">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-stone-800">
                <div className="flex flex-col gap-1.5 flex-1">
                  <Skeleton className="h-3.5 w-32 bg-stone-800" />
                  <Skeleton className="h-3 w-48 bg-stone-800" />
                </div>
                <Skeleton className="h-5 w-20 bg-stone-800 rounded-full" />
                <Skeleton className="h-5 w-16 bg-stone-800 rounded-full" />
              </div>
            ))}
          </div>
        ) : !reservations || reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <CalendarDays className="w-8 h-8 text-stone-700" />
            <p className="text-stone-600 text-sm">
              {error ? "Unable to load reservations." : "No reservations found."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-stone-800 hover:bg-transparent">
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Guest</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Date & Time</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Party</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Notes</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((r) => (
                <TableRow key={r.id} className="border-stone-800 hover:bg-stone-900/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-stone-200 text-sm font-medium leading-tight">{r.guest_name}</span>
                      <span className="text-stone-600 text-xs">{r.guest_email}</span>
                      {r.guest_phone && (
                        <span className="text-stone-600 text-xs">{r.guest_phone}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-stone-400 text-xs tabular-nums whitespace-nowrap">
                    {formatDateTime(r.reserved_at)}
                    <span className="text-stone-600 ml-1">({r.duration_mins}min)</span>
                  </TableCell>
                  <TableCell className="text-stone-400 text-sm">
                    {r.party_size}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusBadgeClass(r.status)}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-stone-600 text-xs max-w-[160px] truncate">
                    {r.notes || "—"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <button className="p-1.5 text-stone-600 hover:text-stone-300 transition-colors rounded" />
                        }
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="bg-stone-900 border-stone-700 text-stone-200"
                        align="end"
                      >
                        <DropdownMenuItem
                          onClick={() => openStatusDialog(r)}
                          className="focus:bg-stone-700 cursor-pointer"
                        >
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(r)}
                          className="focus:bg-red-900/40 text-red-400 cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <StatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        reservation={selected}
        onSave={handleStatusSave}
        isPending={updateStatus.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        reservation={selected}
        onConfirm={handleDelete}
        isPending={deleteReservation.isPending}
      />
    </div>
  );
}
