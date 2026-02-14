# DummyJSON Products API Integration

## 📋 Overview

Implementasi lengkap dari [DummyJSON Products API](https://dummyjson.com/docs/products) dengan semua fitur yang tersedia.

## 🎯 Features Implemented

### ✅ Core CRUD Operations
1. **Get All Products** - Fetch products dengan pagination
2. **Get Single Product** - Detail produk berdasarkan ID
3. **Create Product** - Tambah produk baru (cukup title saja)
4. **Update Product** - Update produk existing
5. **Delete Product** - Hapus produk

### ✅ Advanced Features
6. **Search Products** - Cari produk by query
7. **Filter by Category** - Filter produk by kategori
8. **Pagination** - Limit & Skip support
9. **Sort Products** - Sort by field (asc/desc)
10. **Get Categories** - List semua kategori
11. **Select Fields** - Select specific fields only

## 📁 File Structure

```
src/domain/product/
├── product.ts                      # Types & Interfaces
├── product-validation.ts           # Validation schema (title only)
├── api/
│   ├── get-products.ts            # Get all products dengan pagination
│   ├── detail-product.ts          # Get single product
│   ├── create-product.ts          # Create new product
│   ├── update-product.ts          # Update existing product
│   ├── delete-product.ts          # Delete product
│   ├── search-products.ts         # Search & filter by category
│   └── get-categories.ts          # Get all categories
└── components/
    ├── products-table.tsx         # Table display dengan actions
    ├── create-product.tsx         # Create form (title only)
    ├── update-product.tsx         # Update form
    └── delete-product.tsx         # Delete confirmation
```

## 🔧 API Endpoints

### 1. Get All Products
```typescript
import { useGetProducts } from "@/domain/product/api/get-products";

const { data } = useGetProducts({
  queryParams: {
    limit: 10,
    skip: 0,
    sortBy: "title",
    order: "asc",
    select: "title,price,stock"
  }
});

// Response:
// {
//   products: [...],
//   total: 194,
//   skip: 0,
//   limit: 10
// }
```

### 2. Get Single Product
```typescript
import { useProductDetail } from "@/domain/product/api/detail-product";

const { data } = useProductDetail({ 
  id: 1 
});

// Response: Full product object
```

### 3. Search Products
```typescript
import { useSearchProducts } from "@/domain/product/api/search-products";

const { data } = useSearchProducts({
  queryParams: {
    q: "phone",
    limit: 20
  }
});
```

### 4. Filter by Category
```typescript
import { useProductsByCategory } from "@/domain/product/api/search-products";

const { data } = useProductsByCategory({
  category: "smartphones",
  params: { limit: 10 }
});
```

### 5. Get Categories
```typescript
import { useProductCategories } from "@/domain/product/api/get-categories";

const { data: categories } = useProductCategories();

// Response:
// [
//   { slug: "beauty", name: "Beauty", url: "..." },
//   { slug: "fragrances", name: "Fragrances", url: "..." },
//   ...
// ]
```

### 6. Get Category List (Simple)
```typescript
import { useProductCategoryList } from "@/domain/product/api/get-categories";

const { data: categoryList } = useProductCategoryList();

// Response: ["beauty", "fragrances", "furniture", ...]
```

### 7. Create Product
```typescript
import { useCreateProduct } from "@/domain/product/api/create-product";

const mutation = useCreateProduct({});

await mutation.mutateAsync({
  data: {
    title: "New Product Name"
  }
});
```

### 8. Update Product
```typescript
import { useUpdateProduct } from "@/domain/product/api/update-product";

const mutation = useUpdateProduct({});

await mutation.mutateAsync({
  id: 1,
  updatedData: {
    title: "Updated Product Name"
  }
});
```

### 9. Delete Product
```typescript
import { useDeleteProduct } from "@/domain/product/api/delete-product";

const mutation = useDeleteProduct({});

await mutation.mutateAsync({ id: 1 });

// Response: { id: 1, isDeleted: true, deletedOn: "..." }
```

## 📊 Data Types

### Product Interface
```typescript
interface IProductProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}
```

### Query Parameters
```typescript
interface IProductQuery {
  q?: string;              // Search query
  limit?: number;          // Items per page (default: 30)
  skip?: number;           // Skip items (for pagination)
  select?: string;         // Comma-separated fields
  sortBy?: string;         // Field to sort by
  order?: "asc" | "desc";  // Sort order
}
```

## 🎨 Components Usage

### Products Table
```tsx
import ProductsTable from "@/domain/product/components/products-table";

<ProductsTable data={products} />
```

**Features:**
- Display products in table format
- Update button (opens modal)
- Delete button (opens confirmation)
- Shows: Title, Price, Stock, Category, Brand

### Create Product Button
```tsx
import CreateProduct from "@/domain/product/components/create-product";

<CreateProduct />
```

**Features:**
- Opens modal with form
- Title input only (as requested)
- Validation with Valibot
- Success/Error notifications

## 🔄 Pagination

Pagination otomatis convert dari DummyJSON format ke format app:

**DummyJSON Format:**
```typescript
{
  total: 194,
  skip: 0,
  limit: 30
}
```

**App Format (converted):**
```typescript
{
  page: 1,
  totalPages: 7,
  prevPage: null,
  nextPage: 2
}
```

Converter ada di `src/utils/pagination.ts`.

## 🎯 Usage Examples

### Example 1: Products Page with Search & Pagination
```tsx
import { useSearchParams } from "react-router";
import { useGetProducts } from "@/domain/product/api/get-products";
import { convertPagination } from "@/utils/pagination";

function ProductsPage() {
  const [params] = useSearchParams();
  
  const { data: response, isLoading } = useGetProducts({
    queryParams: {
      q: params.get("search") || undefined,
      limit: 10,
      skip: (Number(params.get("page") || 1) - 1) * 10,
    }
  });

  const products = response?.products || [];
  const pagination = response ? convertPagination(response) : undefined;

  return (
    <>
      <ProductsTable data={products} />
      <Pagination data={pagination} loading={isLoading} />
    </>
  );
}
```

### Example 2: Category Filter
```tsx
import { useProductsByCategory } from "@/domain/product/api/search-products";
import { useProductCategories } from "@/domain/product/api/get-categories";

function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories } = useProductCategories();
  
  const { data: products } = useProductsByCategory({
    category: selectedCategory,
    params: { limit: 20 }
  });

  return (
    <>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories?.map(cat => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      
      <ProductsTable data={products?.products || []} />
    </>
  );
}
```

### Example 3: Advanced Search with Sort
```tsx
const { data } = useGetProducts({
  queryParams: {
    q: "phone",
    sortBy: "price",
    order: "asc",
    limit: 20,
    select: "title,price,rating"
  }
});
```

## 🚀 Features in Current Implementation

✅ **Implemented:**
- Get all products dengan pagination
- Search products by query
- Filter products by category
- Sort products (sortBy, order)
- Select specific fields
- Create product (title only)
- Update product
- Delete product
- Get product detail
- Get all categories
- Get category list
- Pagination converter
- Error handling utility
- Loading & empty states

## 📝 Validation

Product validation cukup **title only** sesuai permintaan:

```typescript
// src/domain/product/product-validation.ts
export const ProductSchema = v.object({
  title: v.pipe(v.string("Required"), v.minLength(1, "Required")),
});
```

## 🎨 UI Components

### Table Columns
- Action buttons (Update & Delete)
- Title
- Price (formatted dengan $)
- Stock
- Category (capitalized)
- Brand (atau "-" jika null)

### Modals
- **Create Modal**: Form untuk create product
- **Update Modal**: Form untuk update product dengan pre-filled data
- **Delete Modal**: Confirmation dialog
- **Success Modal**: Notifikasi sukses
- **Error Modal**: Notifikasi error
- **Submit Modal**: Loading state saat submit

## ⚡ Performance Optimizations

1. **Query Caching:**
   - Categories: 1 hour staleTime (jarang berubah)
   - Products: Default React Query cache

2. **Pagination:**
   - Efficient skip/limit calculation
   - Automatic page recalculation

3. **Search:**
   - Debounced search input (useDebounceSearch)
   - Only fetch when query exists

4. **Query Key Management:**
   - Proper invalidation setelah mutations
   - Separate keys untuk different query types

## 🧪 Testing

Test dengan DummyJSON API:

```bash
# Get all products
curl https://dummyjson.com/products

# Search products
curl https://dummyjson.com/products/search?q=phone

# Get product by ID
curl https://dummyjson.com/products/1

# Get by category
curl https://dummyjson.com/products/category/smartphones

# Create product
curl -X POST https://dummyjson.com/products/add \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Product"}'
```

## 🔧 Customization

### Mengubah Limit Default
```typescript
// di pages/products/index.tsx
const { data } = useGetProducts({
  queryParams: {
    limit: 25, // ubah dari 10 ke 25
    skip: ...
  }
});
```

### Menambah Field di Table
```tsx
// di components/products-table.tsx
<Th>Description</Th>
...
<Td>{product.description}</Td>
```

### Menambah Validation Field
```typescript
// di product-validation.ts
export const ProductSchema = v.object({
  title: v.pipe(v.string("Required"), v.minLength(1, "Required")),
  price: v.optional(v.number()),
  stock: v.optional(v.number()),
});
```

## 📚 Additional Resources

- [DummyJSON Products Docs](https://dummyjson.com/docs/products)
- [React Query Docs](https://tanstack.com/query/latest)
- [Valibot Docs](https://valibot.dev/)

## ✨ Summary

Semua endpoint dari DummyJSON Products API sudah diimplementasikan dengan lengkap:
- ✅ CRUD operations
- ✅ Search & filter
- ✅ Pagination
- ✅ Sort
- ✅ Categories
- ✅ Proper error handling
- ✅ Type safety
- ✅ UI components

Semuanya sudah terintegrasi dengan baik dan siap digunakan! 🎉
