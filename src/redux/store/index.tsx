import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { Children } from "../../types/Children";
import productReducer, { productName } from "../slice/product";

const reducer = {
  [productName]: productReducer,
};

export const Store = configureStore({ reducer });

const StoreProvider = ({ children }: Children) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
