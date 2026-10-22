import { createSlice } from "@reduxjs/toolkit";

export interface CartItemType {
  id: number | string;
  title: string;
  price: number;
  qty: number;
  sum: number;
  imageURL: string;
  // Các trường khác của sản phẩm (nếu có)
}

// 2. Định nghĩa cấu trúc tổng thể của State trong slice này
interface CartState {
  items: CartItemType[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // addItemToCart

    addItemToCart: (state, action) => {
      const isItemExist = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (isItemExist) {
        ((isItemExist.qty += 1), (isItemExist.sum += action.payload.price));
      } else {
        state.items.push({
          ...action.payload,
          qty: 1,
          sum: action.payload.price,
        });
      }
    },
    // Hàm tăng số lượng khi bấm nút +
    increaseQty: (state, action) => {
      // action.payload ở đây chính là id của sản phẩm cần tăng
      const foundItem = state.items.find((item) => item.id === action.payload);

      if (foundItem) {
        foundItem.qty += 1; // Tăng số lượng lên 1
        foundItem.sum = foundItem.qty * foundItem.price; // Cập nhật lại tổng tiền = số lượng * giá
      }
    },

    // Hàm giảm 1
    decreaseQty: (state, action) => {
      // action.payload chính là id sản phẩm
      const foundItem = state.items.find((item) => item.id === action.payload);

      if (foundItem) {
        if (foundItem.qty > 1) {
          foundItem.qty -= 1;
          foundItem.sum = foundItem.qty * foundItem.price; // Tính lại tổng tiền chuẩn xác
        } else {
          // Nếu số lượng bằng 1 mà bấm trừ thì lọc bỏ sản phẩm khỏi giỏ hàng
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
    },

    // removeProductFromCart
    removeProductFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },

    // emptyCart
    emptyInCart: (state) => {
      state.items = []
    }
  },
});

export const {
  addItemToCart,
  decreaseQty,
  removeProductFromCart,
  increaseQty,
  emptyInCart,
} = cartSlice.actions;

export default cartSlice.reducer;
