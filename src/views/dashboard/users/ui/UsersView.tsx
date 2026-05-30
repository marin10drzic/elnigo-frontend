"use client";

import { useState } from "react";
import { MoreHorizontal, AlertTriangle } from "lucide-react";
import { useUsers, useUpdateUserRole } from "@/entities/user";
import type { UserProfile, UserRole } from "@/entities/user";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";

const TOKEN = "";

function roleBadgeClass(role: UserRole) {
  switch (role) {
    case "superadmin":
      return "bg-rose-900/30 text-rose-400 border-rose-800";
    case "admin":
      return "bg-amber-900/30 text-amber-400 border-amber-800";
    default:
      return "bg-stone-800 text-stone-400 border-stone-700";
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

type ChangeRoleDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserProfile | null;
  onSave: (role: UserRole) => void;
  isPending: boolean;
};

function ChangeRoleDialog({ open, onOpenChange, user, onSave, isPending }: ChangeRoleDialogProps) {
  const [role, setRole] = useState<UserRole>(user?.role ?? "guest");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(role);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white font-serif">Change Role</DialogTitle>
        </DialogHeader>
        {user && (
          <p className="text-stone-400 text-sm">
            Updating role for <span className="text-stone-200">{user.full_name}</span>
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Role</label>
            <Select value={role} onValueChange={(v) => v && setRole(v as UserRole)}>
              <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-200 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700 text-stone-200">
                <SelectItem value="guest" className="focus:bg-stone-700">Guest</SelectItem>
                <SelectItem value="admin" className="focus:bg-stone-700">Admin</SelectItem>
                <SelectItem value="superadmin" className="focus:bg-stone-700">Superadmin</SelectItem>
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

export function UsersView() {
  const { data: users, isLoading, error } = useUsers(undefined, TOKEN || undefined);
  const updateRole = useUpdateUserRole(TOKEN);

  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  function openRoleDialog(user: UserProfile) {
    setSelectedUser(user);
    setRoleDialogOpen(true);
  }

  function handleRoleSave(role: UserRole) {
    if (!selectedUser) return;
    updateRole.mutate(
      { id: selectedUser.id, data: { role } },
      { onSuccess: () => setRoleDialogOpen(false) }
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-serif text-white">Users</h1>
        <p className="text-stone-500 text-sm mt-1">Manage user accounts and roles</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 border border-amber-900/40 bg-amber-950/20 px-4 py-3 text-sm text-amber-400">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Authentication Required</p>
            <p className="text-amber-600 text-xs mt-0.5">
              Admin token is required to view users. Once authentication is implemented, this view will show all accounts.
            </p>
          </div>
        </div>
      )}

      <div className="border border-stone-800 bg-[#0a0908]">
        {isLoading ? (
          <div className="flex flex-col">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-stone-800">
                <Skeleton className="w-8 h-8 rounded-full bg-stone-800" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-32 bg-stone-800" />
                  <Skeleton className="h-3 w-40 bg-stone-800" />
                </div>
                <Skeleton className="h-5 w-16 bg-stone-800 rounded-full ml-auto" />
              </div>
            ))}
          </div>
        ) : !users || users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-stone-600 text-sm">
              {error ? "Unable to load users." : "No users found."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-stone-800 hover:bg-transparent">
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">User</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Role</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Joined</TableHead>
                <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-stone-800 hover:bg-stone-900/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        {user.avatar_url && <AvatarImage src={user.avatar_url} alt={user.full_name} />}
                        <AvatarFallback className="bg-stone-800 text-stone-400 text-xs">
                          {getInitials(user.full_name || "?")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-stone-200 text-sm font-medium leading-tight">
                          {user.full_name || "—"}
                        </span>
                        {user.phone && (
                          <span className="text-stone-600 text-xs">{user.phone}</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={roleBadgeClass(user.role)}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-stone-500 text-xs tabular-nums">
                    {formatDate(user.created_at)}
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
                          onClick={() => openRoleDialog(user)}
                          className="focus:bg-stone-700 cursor-pointer"
                        >
                          Change Role
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

      <ChangeRoleDialog
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        user={selectedUser}
        onSave={handleRoleSave}
        isPending={updateRole.isPending}
      />
    </div>
  );
}
