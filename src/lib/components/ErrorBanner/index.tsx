import { Alert } from "antd";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = "Uh oh! Something went wrong 😔",
  description = "Looks like something went wrong. Please check your connection and/or try again later.",
}: Props) => {
  return (
    <Alert
      message={message}
      description={description}
      type="error"
      closable={true}
      banner
      className="error-banner"
    />
  );
};
