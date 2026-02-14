import { useModal } from "@/hooks/use-modal";
import { Table, TBody, Td, THead, Th, Tr } from "../table";
import ModalDetail from "./modal-detail";

export default function ModalLegend() {
  const modalLegend = useModal();

  return (
    <>
      <span className="text-sm text-[#2866C8] italic underline cursor-pointer" onClick={() => modalLegend.openModal()}>
        Legend
      </span>
      <ModalDetail heading="Legend" visible={modalLegend.visible} onClose={modalLegend.hideModal}>
        <div className="flex flex-col gap-3">
          <Table>
            <THead>
              <Tr>
                <Th>Code</Th>
                <Th>Explanation</Th>
                <Th>Quantity (Pcs)</Th>
                <Th>Note</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>SM</Td>
                <Td>Start Machine</Td>
                <Td>3</Td>
                <Td>All Item Checking</Td>
              </Tr>
              <Tr>
                <Td>CM</Td>
                <Td>Change Material / Dies Repair</Td>
                <Td>1</Td>
                <Td>All Item Checking</Td>
              </Tr>
              <Tr>
                <Td>CR</Td>
                <Td>Critical Check</Td>
                <Td>1</Td>
                <Td>Critical point onlu (Mark)</Td>
              </Tr>
              <Tr>
                <Td>ST</Td>
                <Td>Setting</Td>
                <Td>1</Td>
                <Td>All Item Checking</Td>
              </Tr>
              <Tr>
                <Td>RD</Td>
                <Td>Repair Dies</Td>
                <Td>1</Td>
                <Td>All Item Checking</Td>
              </Tr>
              <Tr>
                <Td>RM</Td>
                <Td>Repair Machine</Td>
                <Td>1</Td>
                <Td>All Item Checking</Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </ModalDetail>
    </>
  );
}
