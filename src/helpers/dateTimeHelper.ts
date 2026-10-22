import moment from "moment";
import type { Timestamp } from "firebase/firestore";

export const getDateFromFireStoreTimeStampObject = (
  fireStoreDateObject: Timestamp,
): string => {
  return moment(fireStoreDateObject.toDate()).format("MMMM Do, hh:mm A");
};
