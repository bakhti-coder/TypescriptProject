import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsType } from "../../types/Products";
import request from "../../server";

interface initialStateTypes {
  products: ProductsType[];
  loading: boolean;
}

const initialState: initialStateTypes = {
  products: [],
  loading: false,
};

export const getProducts = createAsyncThunk(
  "products/fetching",
  async ({ search }: { search: string }) => {
    const { data } = await request.get<ProductsType[]>("products", {
      params: { search },
    });
    return data;
  }
);

export const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: productReducer, name: productName } = productSlice;

const { controlLoading } = productSlice.actions;

export { productReducer as default, productName, controlLoading };
