import { Layers } from "lucide-react";
import { useSearchParams } from "react-router";
import { BreadcrumbMenus } from "@/components/breadcrumb-menus";
import Container from "@/components/container";
import TopBar from "@/components/containers/top-bar";
import FilterData from "@/components/filterdata";
import LoaderData from "@/components/loaderdata";
import ModalFailed from "@/components/modals/modal-failed";
import ModalSubmit from "@/components/modals/modal-submit";
import ModalSucces from "@/components/modals/modal-succes";
import Pagination from "@/components/pagination";
import { Search } from "@/components/search";
import { useGetProducts } from "@/domain/product/api/get-products";
import CreateProduct from "@/domain/product/components/create-product";
import ProductsTable from "@/domain/product/components/products-table";
import { useDebounceSearch } from "@/hooks/use-debounce-search";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { updateSearchParam } from "@/utils/url";

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: productsResponse,
    isFetching: productsLoading,
    isSuccess: productsSuccess,
  } = useGetProducts({
    queryParams: {
      q: searchParams.get("search") || undefined,
      skip: +(searchParams.get("skip") || 0),
      sortBy: searchParams.get("sortBy") || undefined,
      limit: +(searchParams.get("limit") || 10),
      order: (searchParams.get("order") as "asc" | "desc") || undefined,
    },
  });

  const handleSort = (field: string) => {
    const currentSort = searchParams.get("sortBy");
    const currentOrder = searchParams.get("order");

    const params = Object.fromEntries(searchParams);

    if (currentSort === field) {
      if (currentOrder === "asc") {
        params.sortBy = field;
        params.order = "desc";
      } else if (currentOrder === "desc") {
        delete params.sortBy;
        delete params.order;
      }
    } else {
      params.sortBy = field;
      params.order = "asc";
    }

    params.skip = "0";

    setSearchParams(params);
  };

  const allProduct = productsResponse?.products || [];
  const pagination = productsResponse
    ? {
        skip: productsResponse.skip,
        total: productsResponse.total,
        limit: productsResponse.limit,
      }
    : undefined;

  const modalSucces = useModalStore("modalSuccesProduct");
  const modalFailed = useModalStore("modalFailedProduct");
  const modalSubmit = useModalConfirmStore("modalSubmitProduct");

  const handleSearch = useDebounceSearch((search: string) => {
    setSearchParams(updateSearchParam("search", search, searchParams));
  });

  return (
    <div className="flex flex-col gap-2">
      <TopBar breadcrumb={<BreadcrumbMenus icon={Layers} data={[{ name: "Products" }]} />} />
      <Container>
        <div className="flex items-center justify-between">
          <p className="font-[600] text-[24px] text-black">Products</p>
          <CreateProduct />
        </div>
        <FilterData>
          <Search
            disabled={false}
            onChange={(e) => handleSearch(e.target.value.trim())}
            defaultValue={searchParams.get("search") || undefined}
            containerClassName="min-w-[256px]"
            placeholder="Search..."
          />
        </FilterData>
        <div className="flex flex-col gap-4">
          {!productsLoading && productsSuccess && allProduct.length > 0 && (
            <ProductsTable
              data={allProduct}
              sortBy={searchParams.get("sortBy") || undefined}
              order={(searchParams.get("order") as "asc" | "desc") || undefined}
              onSort={handleSort}
            />
          )}
          <LoaderData data={allProduct} isLoading={productsLoading} colCount={1} rowCount={5} bodyClassName="h-10" />
          <Pagination data={pagination} loading={productsLoading} />
        </div>
      </Container>
      <ModalFailed setOpen={modalFailed.hideModal} visible={modalFailed.visible} message={modalFailed.message} />
      <ModalSubmit
        onSubmit={modalSubmit.onConfirm}
        onCancel={modalSubmit.options.onCancel}
        visible={modalSubmit.visible}
        loading={modalSubmit.loading}
        message={modalSubmit.options.message}
        heading={modalSubmit.options.heading}
        btnText={modalSubmit.options.btnText}
      />
      <ModalSucces onClose={modalSucces.hideModal} visible={modalSucces.visible} message={modalSucces.message} />
    </div>
  );
}
