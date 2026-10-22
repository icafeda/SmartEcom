import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";
import { s } from "react-native-size-matters";

export type NotifyType = "success" | "danger" | "warning" | "info";

export interface NotifyOptions {
  message?: string; // ghi đè hoàn toàn
  contextMessage?: string; // thông báo theo ngữ cảnh
  type?: NotifyType;

  position?: "top" | "bottom" | "center";

  backgroundColor?: string;
  opacity?: number;
  textColor?: string;
  animation?: "slide" | "fade";
  shadow?: boolean;
  haptic?: boolean;

  flashStyle?: any;
  flashTextStyle?: any;
}

export function notify(options: NotifyOptions) {
  const {
    message,
    contextMessage,
    type = "success",
    position = "top",
    backgroundColor,
    opacity = s(0.7),
    textColor = "#fff",
    animation = "slide",
    shadow = true,
    haptic = true,
    flashStyle = {},
    flashTextStyle = {},
  } = options;

  // Mặc định
  const defaultMessageMap: Record<NotifyType, string> = {
    success: "Thành công",
    danger: "Có lỗi xảy ra",
    warning: "Cảnh báo",
    info: "Thông báo",
  };

  // Ưu tiên theo thứ tự:
  // 1. message (ghi đè hoàn toàn)
  // 2. contextMessage (ngữ cảnh)
  // 3. defaultMessageMap[type] (mặc định)
  const finalMessage = message || contextMessage || defaultMessageMap[type];

  const backgroundColorMap: Record<NotifyType, string> = {
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
  };

  const baseColor = backgroundColor || backgroundColorMap[type];
  const finalBgColor = convertHexToRgba(baseColor, opacity);

  if (haptic) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  showMessage({
    message: finalMessage,
    type,
    position,
    floating: true,
    duration: 2500,
    animationDuration: animation === "fade" ? 150 : 300,
    style: {
      backgroundColor: finalBgColor,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,

      shadowColor: shadow ? "#000" : "transparent",
      shadowOpacity: shadow ? 0.3 : 0,
      shadowRadius: shadow ? 6 : 0,
      elevation: shadow ? 6 : 0,

      ...flashStyle,
    },
    titleStyle: {
      color: textColor,
      fontSize: s(12),
      fontWeight: "400",
      fontFamily: "arial",
      ...flashTextStyle,
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
