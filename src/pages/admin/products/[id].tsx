import { ArrowLeft, Box, Calendar, DollarSign, Layers, Package, ShoppingCart, Star, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbMenus } from "@/components/breadcrumb-menus";
import { Button } from "@/components/button";
import Container from "@/components/container";
import TopBar from "@/components/containers/top-bar";
import { useProductDetail } from "@/domain/product/api/detail-product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProductDetail({ id: Number(id) });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <TopBar
          breadcrumb={
            <BreadcrumbMenus
              icon={Layers}
              data={[{ name: "Products", link: "/admin/products" }, { name: "Loading..." }]}
            />
          }
        />
        <Container>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col gap-2">
        <TopBar
          breadcrumb={
            <BreadcrumbMenus
              icon={Layers}
              data={[{ name: "Products", link: "/admin/products" }, { name: "Not Found" }]}
            />
          }
        />
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
            <Button onClick={() => navigate("/admin/products")} text="Back to Products" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <TopBar
        breadcrumb={
          <BreadcrumbMenus
            icon={Layers}
            data={[{ name: "Products", link: "/admin/products" }, { name: product.title }]}
          />
        }
      />
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              size="iconMd"
              variant="outline"
              icon={<ArrowLeft size={20} />}
              onClick={() => navigate("/admin/products")}
              title="Back to Products"
            />
            <h1 className="font-semibold text-3xl text-gray-900">{product.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="grid grid-cols-3 gap-2">
                {product.images.slice(0, 3).map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${product.title} ${idx + 1}`}
                    className="w-full h-20 object-cover rounded border border-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">SKU</p>
                    <p className="font-semibold text-gray-900 font-mono">{product.sku}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900 capitalize">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-gray-900">${product.price}</p>
                    {product.discountPercentage > 0 && (
                      <p className="text-sm text-green-600">-{product.discountPercentage}% discount</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Box className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Stock</p>
                    <p className="font-semibold text-gray-900">{product.stock} units</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-gray-900">{product.rating} / 5</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShoppingCart className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Min. Order</p>
                    <p className="font-semibold text-gray-900">{product.minimumOrderQuantity} units</p>
                  </div>
                </div>
              </div>

              {product.brand && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Brand</p>
                  <p className="font-semibold text-gray-900">{product.brand}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold text-gray-900">{product.weight} kg</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="font-semibold text-gray-900">
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Warranty</span>
                  <span className="font-semibold text-gray-900">{product.warrantyInformation}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">{product.shippingInformation}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-semibold text-gray-900">{product.availabilityStatus}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Return Policy</span>
                  <span className="font-semibold text-gray-900">{product.returnPolicy}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
                <div className="space-y-4">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{review.rating}</span>
                        </div>
                        <span className="text-gray-600">•</span>
                        <span className="font-medium text-gray-900">{review.reviewerName}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Metadata</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="font-semibold text-gray-900">{new Date(product.meta.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Updated At</p>
                    <p className="font-semibold text-gray-900">{new Date(product.meta.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Barcode</p>
                    <p className="font-semibold text-gray-900 font-mono">{product.meta.barcode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
