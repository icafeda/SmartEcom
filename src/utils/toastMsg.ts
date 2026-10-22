import Toast from "react-native-root-toast";
import * as Haptics from "expo-haptics";
import { NotifyType } from "./notify";

export interface ToastOptions {
  message?: string; // ghi đè hoàn toàn
  contextMessage?: string; // thông báo theo ngữ cảnh
  type?: NotifyType;

  position?: "top" | "bottom" | "center";

  backgroundColor?: string;
  opacity?: number;
  textColor?: string;
  shadow?: boolean;
  haptic?: boolean;

  toastStyle?: any; // chỉnh width, height, padding, borderRadius
  toastTextStyle?: any; // chỉnh fontSize, fontWeight, color
}

export function toastMsg(options: ToastOptions) {
  const {
    message,
    contextMessage,
    type = "success",
    position = "bottom",
    backgroundColor,
    opacity = 0.85,
    textColor = "#fff",
    shadow = true,
    haptic = true,
    toastStyle = {},
    toastTextStyle = {},
  } = options;

  const backgroundColorMap: Record<NotifyType, string> = {
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
  };

  const defaultMessageMap: Record<NotifyType, string> = {
    success: "Thành công",
    danger: "Có lỗi xảy ra",
    warning: "Cảnh báo",
    info: "Thông báo",
  };

  // Ưu tiên theo thứ tự:
  // 1. message
  // 2. contextMessage
  // 3. defaultMessageMap[type]
  const finalMessage = message || contextMessage || defaultMessageMap[type];

  const baseColor = backgroundColor || backgroundColorMap[type];
  const finalBgColor = convertHexToRgba(baseColor, opacity);

  if (haptic) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  Toast.show(finalMessage, {
    duration: Toast.durations.SHORT,
    position:
      position === "top"
        ? Toast.positions.TOP
        : position === "center"
          ? Toast.positions.CENTER
          : Toast.positions.BOTTOM,
    backgroundColor: finalBgColor,
    textColor,
    shadow,
    animation: true,
    opacity,
    containerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,

      // ép kích thước cố định
      ...toastStyle,
    },
    textStyle: {
      color: textColor,
      fontSize: 16,
      ...toastTextStyle,
    },
  });
}

function convertHexToRgba(hex: string, opacity: number) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
