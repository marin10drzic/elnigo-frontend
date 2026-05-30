"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, UtensilsCrossed } from "lucide-react";
import {
  useMenuCategories,
  useMenuItems,
  useCreateMenuCategory,
  useUpdateMenuCategory,
  useDeleteMenuCategory,
  useCreateMenuItem,
  useUpdateMenuItem,
  useDeleteMenuItem,
} from "@/entities/menu";
import type { MenuCategory, MenuItem, MenuCategoryInput, MenuItemInput } from "@/entities/menu";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Badge } from "@/shared/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
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

const TOKEN = "";

// ---- Category Dialog ----
type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: MenuCategory | null;
  onSave: (data: MenuCategoryInput) => void;
  isPending: boolean;
};

function CategoryDialog({ open, onOpenChange, initial, onSave, isPending }: CategoryDialogProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0));

  // sync when initial changes
  useState(() => {
    setName(initial?.name ?? "");
    setDescription(initial?.description ?? "");
    setSortOrder(String(initial?.sort_order ?? 0));
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name, description: description || undefined, sort_order: Number(sortOrder) });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white font-serif">
            {initial ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-stone-900 border-stone-700 text-stone-200"
              placeholder="Category name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-stone-900 border-stone-700 text-stone-200 resize-none"
              placeholder="Optional description"
              rows={2}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Sort Order</label>
            <Input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-stone-900 border-stone-700 text-stone-200"
            />
          </div>
          <DialogFooter className="border-t border-stone-800 bg-transparent -mx-4 -mb-4 px-4 py-3 flex-row justify-end gap-2">
            <DialogClose
              render={
                <Button variant="outline" className="border-stone-700 text-stone-300" />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending || !name}
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

// ---- Item Dialog ----
type ItemDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: MenuItem | null;
  categories: MenuCategory[];
  onSave: (data: MenuItemInput) => void;
  isPending: boolean;
};

function ItemDialog({ open, onOpenChange, initial, categories, onSave, isPending }: ItemDialogProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? "");
  const [isAvailable, setIsAvailable] = useState(initial?.is_available ?? true);
  const [allergens, setAllergens] = useState((initial?.allergens ?? []).join(", "));
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name,
      price: parseFloat(price),
      description: description || undefined,
      category_id: categoryId || undefined,
      is_available: isAvailable,
      allergens: allergens ? allergens.split(",").map((s) => s.trim()).filter(Boolean) : [],
      tags: tags ? tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white font-serif">
            {initial ? "Edit Item" : "Add Menu Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-xs text-stone-400 tracking-wide">Name *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-stone-900 border-stone-700 text-stone-200"
                placeholder="Item name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-stone-400 tracking-wide">Price (€) *</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="bg-stone-900 border-stone-700 text-stone-200"
                placeholder="0.00"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-stone-400 tracking-wide">Category</label>
              <Select value={categoryId} onValueChange={(v) => setCategoryId(v ?? "")}>
                <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-200 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-stone-900 border-stone-700 text-stone-200">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} className="focus:bg-stone-700">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-stone-900 border-stone-700 text-stone-200 resize-none"
              rows={2}
              placeholder="Optional description"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Allergens (comma-separated)</label>
            <Input
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
              className="bg-stone-900 border-stone-700 text-stone-200"
              placeholder="gluten, dairy, nuts"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-400 tracking-wide">Tags (comma-separated)</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-stone-900 border-stone-700 text-stone-200"
              placeholder="vegan, spicy, popular"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="available"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="accent-amber-500"
            />
            <label htmlFor="available" className="text-sm text-stone-300">Available</label>
          </div>
          <DialogFooter className="border-t border-stone-800 bg-transparent -mx-4 -mb-4 px-4 py-3 flex-row justify-end gap-2">
            <DialogClose
              render={
                <Button variant="outline" className="border-stone-700 text-stone-300" />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending || !name || !price}
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

// ---- Delete Confirm Dialog ----
type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  label: string;
  onConfirm: () => void;
  isPending: boolean;
};

function DeleteDialog({ open, onOpenChange, label, onConfirm, isPending }: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white">Delete &ldquo;{label}&rdquo;?</DialogTitle>
        </DialogHeader>
        <p className="text-stone-400 text-sm">This action cannot be undone.</p>
        <DialogFooter className="border-t border-stone-800 bg-transparent -mx-4 -mb-4 px-4 py-3 flex-row justify-end gap-2">
          <DialogClose
            render={<Button variant="outline" className="border-stone-700 text-stone-300" />}
          >
            Cancel
          </DialogClose>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-800 hover:bg-red-700 text-white border-0"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Main View ----
export function MenuView() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Category dialog state
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [editCat, setEditCat] = useState<MenuCategory | null>(null);

  // Item dialog state
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "category" | "item"; id: string; name: string } | null>(null);

  const { data: categories = [], isLoading: catsLoading } = useMenuCategories();
  const { data: items = [], isLoading: itemsLoading } = useMenuItems(
    selectedCategoryId ? { categoryId: selectedCategoryId } : undefined
  );

  const createCat = useCreateMenuCategory(TOKEN);
  const updateCat = useUpdateMenuCategory(TOKEN);
  const deleteCat = useDeleteMenuCategory(TOKEN);
  const createItem = useCreateMenuItem(TOKEN);
  const updateItem = useUpdateMenuItem(TOKEN);
  const deleteItem = useDeleteMenuItem(TOKEN);

  // Category save
  function handleCatSave(data: MenuCategoryInput) {
    if (editCat) {
      updateCat.mutate({ id: editCat.id, data }, { onSuccess: () => setCatDialogOpen(false) });
    } else {
      createCat.mutate(data, { onSuccess: () => setCatDialogOpen(false) });
    }
  }

  // Item save
  function handleItemSave(data: MenuItemInput) {
    if (editItem) {
      updateItem.mutate({ id: editItem.id, data }, { onSuccess: () => setItemDialogOpen(false) });
    } else {
      createItem.mutate(data, { onSuccess: () => setItemDialogOpen(false) });
    }
  }

  // Delete confirm
  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    if (deleteTarget.type === "category") {
      deleteCat.mutate(deleteTarget.id, { onSuccess: () => setDeleteDialogOpen(false) });
    } else {
      deleteItem.mutate(deleteTarget.id, { onSuccess: () => setDeleteDialogOpen(false) });
    }
  }

  const deleteIsPending = deleteCat.isPending || deleteItem.isPending;

  function openEditCat(cat: MenuCategory) {
    setEditCat(cat);
    setCatDialogOpen(true);
  }

  function openDeleteCat(cat: MenuCategory) {
    setDeleteTarget({ type: "category", id: cat.id, name: cat.name });
    setDeleteDialogOpen(true);
  }

  function openEditItem(item: MenuItem) {
    setEditItem(item);
    setItemDialogOpen(true);
  }

  function openDeleteItem(item: MenuItem) {
    setDeleteTarget({ type: "item", id: item.id, name: item.name });
    setDeleteDialogOpen(true);
  }

  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? "—";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-serif text-white">Menu Management</h1>
          <p className="text-stone-500 text-sm mt-1">Manage categories and menu items</p>
        </div>
        <Button
          onClick={() => { setEditItem(null); setItemDialogOpen(true); }}
          className="bg-amber-600 hover:bg-amber-700 text-black font-medium border-0"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Categories panel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs text-stone-500 uppercase tracking-[0.2em]">Categories</h2>
            <Button
              size="xs"
              onClick={() => { setEditCat(null); setCatDialogOpen(true); }}
              className="bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700 border"
            >
              <Plus className="w-3 h-3" />
              Add
            </Button>
          </div>

          <div className="border border-stone-800 bg-[#0a0908]">
            {/* All items filter */}
            <button
              onClick={() => setSelectedCategoryId(null)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors border-b border-stone-800 ${
                selectedCategoryId === null
                  ? "bg-amber-950/30 text-amber-400"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <span>All items</span>
              <span className="text-xs text-stone-600">{items.length}</span>
            </button>

            {catsLoading ? (
              <div className="flex flex-col gap-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center px-3 py-2 border-b border-stone-800 last:border-0">
                    <Skeleton className="h-4 w-24 bg-stone-800" />
                  </div>
                ))}
              </div>
            ) : categories.length === 0 ? (
              <p className="px-3 py-4 text-xs text-stone-600 text-center">No categories yet</p>
            ) : (
              categories
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((cat) => (
                  <div
                    key={cat.id}
                    className={`flex items-center justify-between px-3 py-2 border-b border-stone-800 last:border-0 transition-colors group ${
                      selectedCategoryId === cat.id
                        ? "bg-amber-950/30"
                        : "hover:bg-stone-900"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedCategoryId(cat.id === selectedCategoryId ? null : cat.id)}
                      className={`flex-1 text-left text-sm transition-colors ${
                        selectedCategoryId === cat.id ? "text-amber-400" : "text-stone-400 hover:text-white"
                      }`}
                    >
                      {cat.name}
                    </button>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditCat(cat)}
                        className="p-1 text-stone-600 hover:text-stone-300 transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => openDeleteCat(cat)}
                        className="p-1 text-stone-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Items table */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs text-stone-500 uppercase tracking-[0.2em]">
            {selectedCategoryId
              ? categories.find((c) => c.id === selectedCategoryId)?.name ?? "Items"
              : "All Items"}
          </h2>

          <div className="border border-stone-800 bg-[#0a0908]">
            {itemsLoading ? (
              <div className="flex flex-col gap-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-stone-800">
                    <Skeleton className="h-4 w-32 bg-stone-800" />
                    <Skeleton className="h-4 w-20 bg-stone-800" />
                    <Skeleton className="h-4 w-14 bg-stone-800" />
                    <Skeleton className="h-5 w-16 bg-stone-800 rounded-full" />
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <UtensilsCrossed className="w-8 h-8 text-stone-700" />
                <p className="text-stone-600 text-sm">No items found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-stone-800 hover:bg-transparent">
                    <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Name</TableHead>
                    <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Price</TableHead>
                    <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider">Available</TableHead>
                    <TableHead className="text-stone-500 font-normal text-xs uppercase tracking-wider w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} className="border-stone-800 hover:bg-stone-900/50">
                      <TableCell className="text-stone-200 font-medium">{item.name}</TableCell>
                      <TableCell className="text-stone-500 text-xs">{getCategoryName(item.category_id)}</TableCell>
                      <TableCell className="text-amber-400 text-sm tabular-nums">
                        €{item.price.toFixed(2).replace(".", ",")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.is_available ? "default" : "outline"}
                          className={
                            item.is_available
                              ? "bg-emerald-900/40 text-emerald-400 border-emerald-800"
                              : "bg-stone-800 text-stone-500 border-stone-700"
                          }
                        >
                          {item.is_available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditItem(item)}
                            className="p-1.5 text-stone-600 hover:text-stone-300 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openDeleteItem(item)}
                            className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CategoryDialog
        open={catDialogOpen}
        onOpenChange={setCatDialogOpen}
        initial={editCat}
        onSave={handleCatSave}
        isPending={createCat.isPending || updateCat.isPending}
      />

      <ItemDialog
        open={itemDialogOpen}
        onOpenChange={setItemDialogOpen}
        initial={editItem}
        categories={categories}
        onSave={handleItemSave}
        isPending={createItem.isPending || updateItem.isPending}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        label={deleteTarget?.name ?? ""}
        onConfirm={handleDeleteConfirm}
        isPending={deleteIsPending}
      />
    </div>
  );
}
