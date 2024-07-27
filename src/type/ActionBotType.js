export const ActionBotType = {
  PAUSE: "PAUSE",
  RESUME: "RESUME",
  RESTART: "RESTART",
  RESET: "RESET",
  REMOVE: "REMOVE",
  START: "START",
  STOP: "STOP",
  RESET_PNL: "RESET_PNL",
  GENERATE_SHARE_CODE: "GENERATE_SHARE_CODE"
};

export const ActionBotTypeMessageSucces = {
  PAUSE: "Tạm ngưng gói thành công",
  RESUME: "Tiêp tục gói thành công",
  RESTART: "Khởi động lại gói thành công",
  RESET: "Reset gói thành công",
  REMOVE: "Xoá gói thành công",
  START: "Khởi dộng gói thành công",
  STOP: "Ngừng gói thành công",
  RESET_PNL: "Đặt lại Pnl thành công"
};

export const ActionBotTypeStatus = {
  PAUSE: false,
  RESUME: true,
  RESTART: true,
  RESET: true,
  REMOVE: false,
  START: true,
  STOP: false,
  RESET_PNL: false
};