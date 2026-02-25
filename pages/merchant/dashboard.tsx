import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  sales: number;
}

export default function MerchantDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all products from the DB
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/merchant/products');
      if (!res.ok) throw new Error('Failed to fetch');
      const raw: Product[] = await res.json();
      // Prisma returns `price` as a Decimal object, not a plain JS number.
      // Normalise it here so all downstream arithmetic and formatting works correctly.
      const data: Product[] = raw.map(p => ({ ...p, price: Number(p.price) }));
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = products.reduce((acc, p) => acc + (p.sales * p.price), 0);
  const totalSales = products.reduce((acc, p) => acc + p.sales, 0);

  /** Handle file selection — create a local preview URL */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setNewProduct(prev => ({ ...prev, image: '' })); // clear any previous URL
    } else {
      setImagePreview('');
    }
  };

  /** Upload the selected file to /api/merchant/upload and return the public URL */
  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return newProduct.image; // fall back to manually typed URL
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const res = await fetch('/api/merchant/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      return url as string;
    } finally {
      setUploading(false);
    }
  };

  /** Reset image-related state after the dialog closes */
  const resetImageState = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    try {
      const imageUrl = await uploadImage();
      const res = await fetch('/api/merchant/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock || '0', 10),
          image: imageUrl,
          sales: 0,
        }),
      });
      if (!res.ok) throw new Error('Failed to create product');
      setIsAddOpen(false);
      setNewProduct({ name: '', price: '', stock: '', image: '' });
      resetImageState();
      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/merchant/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      const res = await fetch('/api/merchant/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      if (!res.ok) throw new Error('Failed to update product');
      setIsEditOpen(false);
      setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const downloadReport = () => {
    const headers = ["ID", "Name", "Price", "Stock", "Sales", "Revenue"];
    const rows = products.map(p => [
      p.id,
      p.name,
      p.price,
      p.stock,
      p.sales,
      (p.sales * p.price).toFixed(2),
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `merchant_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-col md:flex">
      <Head>
        <title>Merchant Dashboard | Forge Store</title>
      </Head>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search products..."
              className="md:w-[100px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={downloadReport} disabled={loading}>Download Report</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? '—' : `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </div>
                  <p className="text-xs text-muted-foreground">Based on all product sales</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? '—' : `+${totalSales.toLocaleString()}`}</div>
                  <p className="text-xs text-muted-foreground">Units sold across all products</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? '—' : products.length}</div>
                  <p className="text-xs text-muted-foreground">Currently listed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? '—' : products.filter(p => p.stock < 30).length}</div>
                  <p className="text-xs text-muted-foreground">Below 30 units — needs attention</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sales by Product</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview products={products} loading={loading} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>
                    {loading ? 'Loading…' : `${totalSales.toLocaleString()} total units sold`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales products={products} loading={loading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue by Product</CardTitle>
                  <CardDescription>
                    Revenue contribution per product (sales × price).
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview products={products} loading={loading} mode="revenue" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Stock Levels</CardTitle>
                  <CardDescription>
                    Current inventory across all products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {loading ? (
                      <p className="text-sm text-muted-foreground italic">Loading…</p>
                    ) : (
                      [...products]
                        .sort((a, b) => a.stock - b.stock)
                        .slice(0, 8)
                        .map((p) => {
                          const maxStock = Math.max(...products.map(x => x.stock), 1);
                          return (
                            <div key={p.id} className="flex items-center gap-3">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-medium truncate max-w-[160px]">{p.name}</span>
                                  <span className="text-muted-foreground ml-2">{p.stock} units</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-secondary">
                                  <div
                                    className={`h-full rounded-full transition-all ${p.stock < 30 ? 'bg-red-500' : 'bg-primary'}`}
                                    style={{ width: `${(p.stock / maxStock) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? '—' : `$${(totalRevenue / (totalSales || 1)).toFixed(2)}`}
                  </div>
                  <p className="text-xs text-muted-foreground">Revenue ÷ total units sold</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Best Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold truncate">
                    {loading || products.length === 0 ? '—' : products[0].name}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {loading || products.length === 0 ? '' : `${products[0].sales} units sold`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? '—' : products.reduce((a, p) => a + p.stock, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Units across all products</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {loading ? '—' : products.filter(p => p.stock < 30).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Products below 30 units</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your store catalog here.</CardDescription>
                </div>
                <Dialog
                  open={isAddOpen}
                  onOpenChange={(open) => {
                    setIsAddOpen(open);
                    if (!open) {
                      setNewProduct({ name: '', price: '', stock: '', image: '' });
                      resetImageState();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button>Add Product</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="stock">Stock</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* ── Image upload ── */}
                      <div className="grid gap-2">
                        <Label>Product Image</Label>

                        {/* Hidden native file input */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        {/* Clickable upload area */}
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 p-4 cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-colors"
                        >
                          {imagePreview ? (
                            /* Live preview of the selected image */
                            <div className="relative w-full h-40 rounded-md overflow-hidden">
                              <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-contain"
                                unoptimized // blob URL — skip Next.js optimisation
                              />
                            </div>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-muted-foreground/50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                              </svg>
                              <p className="text-sm text-muted-foreground">Click to upload an image</p>
                              <p className="text-xs text-muted-foreground/60">PNG, JPG, WEBP up to 5 MB</p>
                            </>
                          )}
                        </div>

                        {/* Show selected filename + clear button */}
                        {imageFile && (
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                            <span className="truncate max-w-[220px]">{imageFile.name}</span>
                            <button
                              type="button"
                              className="ml-2 text-red-500 hover:underline shrink-0"
                              onClick={() => {
                                resetImageState();
                                setNewProduct(prev => ({ ...prev, image: '' }));
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        {/* Fallback: manual URL input */}
                        {!imageFile && (
                          <div className="w-full mt-1">
                            <Input
                              placeholder="…or paste an image URL"
                              value={newProduct.image}
                              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleAddProduct}
                        disabled={!newProduct.name || !newProduct.price || uploading}
                      >
                        {uploading ? 'Uploading…' : 'Save Product'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isEditOpen}
                  onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) setEditingProduct(null);
                  }}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    {editingProduct && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-name">Product Name</Label>
                          <Input
                            id="edit-name"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-price">Price ($)</Label>
                            <Input
                              id="edit-price"
                              type="number"
                              value={editingProduct.price}
                              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-stock">Stock</Label>
                            <Input
                              id="edit-stock"
                              type="number"
                              value={editingProduct.stock}
                              onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) || 0 })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                      <Button onClick={handleUpdateProduct}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-sm text-muted-foreground italic py-8 text-center">Loading products…</p>
                ) : (
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 text-left">
                          <th className="h-12 px-4 font-medium w-12">Image</th>
                          <th className="h-12 px-4 font-medium">Name</th>
                          <th className="h-12 px-4 font-medium text-right">Price</th>
                          <th className="h-12 px-4 font-medium text-right">Stock</th>
                          <th className="h-12 px-4 font-medium text-right">Sales</th>
                          <th className="h-12 px-4 font-medium text-right">Revenue</th>
                          <th className="h-12 px-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 text-left">
                            {/* Product thumbnail */}
                            <td className="p-4">
                              {product.image ? (
                                <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted shrink-0">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    unoptimized={product.image.startsWith('/uploads/')}
                                  />
                                </div>
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground/40">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18" />
                                  </svg>
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4 text-right">${product.price.toFixed(2)}</td>
                            <td className="p-4 text-right">
                              <Badge variant={product.stock < 30 ? "destructive" : "secondary"}>
                                {product.stock} in stock
                              </Badge>
                            </td>
                            <td className="p-4 text-right">{product.sales.toLocaleString()}</td>
                            <td className="p-4 text-right">${(product.sales * product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                className="h-8 mr-2"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsEditOpen(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                className="text-red-600 h-8"
                                onClick={() => handleDelete(product.id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-muted-foreground italic">
                              No products found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
