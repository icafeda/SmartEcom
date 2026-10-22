import { collection, getDocs, type DocumentData, type Timestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface UserOrder {
  id: string;
  totalPrice: number;
  totalProductsPricesSum: number;
  createdAt: Timestamp;
}

interface StoredUserOrder extends DocumentData {
  totalPrice: number;
  totalProductsPricesSum: number;
  createdAt: Timestamp;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  imageURL: string;
}

export const getProductsData = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    return querySnapshot.docs.map((document) => ({
      ...(document.data() as Omit<Product, "id">),
      id: document.id,
    }));
  } catch (error) {
    console.error("Error fetching products data", error);
    return [];
  }
};

export const fetchUserOrders = async (): Promise<UserOrder[]> => {
  const userIdFromFirebase = auth.currentUser?.uid;

  if (!userIdFromFirebase) {
    throw new Error("User is not signed in");
  }

  const userOrdersRef = collection(db, "users", userIdFromFirebase, "orders");
  const querySnapshot = await getDocs(userOrdersRef);

  return querySnapshot.docs.map((orderDoc): UserOrder => {
    const data = orderDoc.data() as StoredUserOrder;

    return {
      id: orderDoc.id,
      totalPrice: data.totalPrice,
      totalProductsPricesSum: data.totalProductsPricesSum,
      createdAt: data.createdAt,
    };
  });
};
