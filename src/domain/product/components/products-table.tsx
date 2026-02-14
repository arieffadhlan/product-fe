import { Link } from "react-router";
import { Trash, EditIcon, Eye } from "lucide-react";
import UpdateProduct from "./update-product";
import DeleteProduct from "./delete-product";
import { Table, THead, TBody, Tr, Th, Td, SortableHeader } from "@/components/table";
import { Button } from "@/components/button";
import { useModalTable } from "@/hooks/use-modal-table";
import { IProductProps } from "../product";

interface ProductsTableProps {
  order?: "asc" | "desc";
  data: IProductProps[];
  sortBy?: string;
  onSort?: (field: string) => void;
}

export default function ProductsTable({ data, sortBy, order, onSort }: ProductsTableProps) {
  const { 
    modalData, 
    openModal, 
    hideModal, 
    isModalOpen, 
  } = useModalTable<IProductProps>();

  const onClose = () => hideModal();
  const onClickUpdate = (item: IProductProps) => openModal(item, "update");
  const onClickDelete = (item: IProductProps) => openModal(item, "delete");
  
  return (
    <>
      <Table>
        <THead>
          <Tr>
            <Th className="text-center">Action</Th>
            <SortableHeader field="sku" label="SKU" sortBy={sortBy} order={order} onSort={onSort} />
            <SortableHeader field="title" label="Title" sortBy={sortBy} order={order} onSort={onSort} />
            <SortableHeader field="category" label="Category" sortBy={sortBy} order={order} onSort={onSort} />
            <SortableHeader field="price" label="Price ($)" sortBy={sortBy} order={order} onSort={onSort} />
            <SortableHeader field="stock" label="Stock" sortBy={sortBy} order={order} onSort={onSort} />
            <SortableHeader field="brand" label="Brand" sortBy={sortBy} order={order} onSort={onSort} />
          </Tr>
        </THead>
        <TBody>
          {data.map((product) => (
            <Tr key={product.id}>
              <Td className="w-0">
                <div className="flex items-center justify-center gap-2">
                  <Button size="iconMd" variant="primary" asChild>
                    <Link to={`/admin/products/${product.id}`}>
                      {<Eye />}
                    </Link>
                  </Button>
                  <Button size="iconMd" variant="warning" onClick={() => onClickUpdate(product)} icon={<EditIcon />} />
                  <Button size="iconMd" variant="dangers" onClick={() => onClickDelete(product)} icon={<Trash />} />
                </div>
              </Td>
              <Td className="font-mono">{product.sku}</Td>
              <Td>{product.title}</Td>
              <Td className="capitalize">{product.category}</Td>
              <Td className="font-mono">{product.price}</Td>
              <Td className="font-mono">{product.stock}</Td>
              <Td>{product.brand || "-"}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      {isModalOpen("update") ? <UpdateProduct id={modalData?.id!} handleClosed={onClose} /> : null}
      {isModalOpen("delete") ? <DeleteProduct id={modalData?.id!} handleClosed={onClose} /> : null}
    </>
  );
}
