import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "alert" | "link";

export type AlertModalProps = {
  title?: string;
  message: string;
};

export type LinkModalProps = {
  title?: string;
  message: string;
  link: string;
};

export type ModalPayload = 
  { modalType: "alert"; modalProps: AlertModalProps }
  | { modalType: "link"; modalProps: LinkModalProps }


export type SideBarPayload = {
  isOpen: boolean;
}


interface UIState {
  modal: {
    isOpen: boolean;
    payload: ModalPayload | null;
  };
  sideBar: SideBarPayload;
  globalLoading: boolean;
}

const initialState: UIState = {
  modal: {
    isOpen: false,
    payload: null,
  },
  sideBar: {
    isOpen: false,
  },
  globalLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalPayload>) {
      state.modal.isOpen = true;
      state.modal.payload = action.payload;
    },
    closeModal(state) {
      state.modal.isOpen = false;
      state.modal.payload = null;
    },
    openSideBar(state) {
      state.sideBar.isOpen = true;
    },
    closeSideBar(state) {
      state.sideBar.isOpen = false;
    },
    showLoading(state) {
      state.globalLoading = true;
    },
    hideLoading(state) {
      state.globalLoading = false;
    },
  },
});

export const { openModal, closeModal, showLoading, hideLoading, openSideBar, closeSideBar } = uiSlice.actions;
export default uiSlice.reducer;
