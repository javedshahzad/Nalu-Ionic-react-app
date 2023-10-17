export const addNotification = (notification: any) => {
  return {
    type: "ADD_NOTIFICATION",
    payload: notification.body,
  };
};
