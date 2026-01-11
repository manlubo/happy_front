'use client'

import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/stores"
import { useSelector } from "react-redux"
import { closeModal } from "@/stores/uiSlice";
import { useRouter } from "next/navigation";

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
        {payload.modalProps?.message && <p className="text-center py-2">{payload.modalProps?.message}</p>}
        <div className="flex gap-2 md:gap-4 mt-8 w-full">
          {payload.modalType !== "alert" && (
            <button
              onClick={modalHandler}
              className="py-3 bg-blue-500 font-medium text-white flex-1 rounded-md cursor-pointer hover:bg-blue-600 transition"
              >
              {payload.modalProps?.title}
            </button>
          )}
          <button
            onClick={() => dispatch(closeModal())}
            className={`py-3 flex-1 font-medium rounded-md cursor-pointer transition ${payload.modalType === "alert" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
            {payload.modalType === "alert" ? "확인" : "취소"}
          </button>
        </div>
      </div>
    </div>
  );
}