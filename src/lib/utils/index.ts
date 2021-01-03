import { message, notification } from "antd";
/**
 * displays a success toast notification to app viewer
 * @param message success message
 * @param description optional notification description
 */
export const displaySuccessNotification = (
  message: string,
  description?: string
) => {
  return notification.success({
    message,
    description,
    placement: "bottomLeft",
    style: {
      marginBottom: 50,
    },
  });
};
/**
 * displays an error message at the top of the page
 * @param error error message to the outputted
 */
export const displayErrorMessage = (error: string) => {
  return message.error(error);
};
