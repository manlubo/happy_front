'use client'

import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/stores"
import { useSelector } from "react-redux"
import { closeModal } from "@/stores/uiSlice";
import { useRouter } from "next/navigation";
import Button from "../common/Button";

export default function GlobalModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, payload } = useSelector((state: RootState) => state.ui.modal);
  const router = useRouter();
  if (!isOpen || !payload) return null;

  const modalHandler = () => {
    if (payload.modalType === "link") {
      router.push(payload.modalProps?.link);
    }
    dispatch(closeModal());
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative bg-white rounded-xl w-full p-4 md:p-6 min-w-80 max-w-md z-10 m-4">

        {payload.modalProps?.title && (
            <h2 className="text-lg font-bold mb-4 text-center">{payload.modalProps?.title}</h2>
        )}
        {payload.modalProps?.message && <p className="text-center py-2 whitespace-pre-line">{payload.modalProps?.message}</p>}
        <div className="flex gap-2 md:gap-4 mt-8 w-full">
          {payload.modalType !== "alert" && (
            <Button
              onClick={modalHandler}
              buttonColor="blue"
              buttonStyle="solid"
              fullWidth={true}
              >
              {payload.modalProps?.linkText ? payload.modalProps?.linkText : payload.modalProps?.title}
            </Button>
          )}
          <Button
            onClick={() => dispatch(closeModal())}
            buttonColor="lightGray"
            buttonStyle="solid"
            fullWidth={true}
            >
            {payload.modalType === "alert" ? "확인" : payload.modalProps?.cancelText ? payload.modalProps?.cancelText : "취소"}
          </Button>
        </div>
      </div>
    </div>
  );
}