import { useEffect, useRef } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import { Card, Layout, Typography, Spin } from "antd";

import { AUTH_URL } from "../../lib/graphql/queries/AuthUrl";
import { LOG_IN } from "../../lib/graphql/mutations/LogIn";
import { AUTH_URL as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AUTH_URL";
import {
  LOG_IN as LogInData,
  LOG_INVariables,
} from "../../lib/graphql/mutations/LogIn/__generated__/LOG_IN";

import { ErrorBanner } from "../../lib/components";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../lib/utils";

import { LoadingIcon } from "../../lib/components";

import { Viewer } from "../../lib/types";
import googleLogo from "./assets/google_logo.jpg";

import { LogInMessages } from "./messages";

interface Props {
  setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LOG_INVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
        sessionStorage.setItem("token", data.logIn.token);
        displaySuccessNotification(LogInMessages.LOGIN_SUCCESS);
      }
    },
  });
  // ref and location for use in useEffect hook
  const logInRef = useRef(logIn);

  useEffect(() => {
    //check for code param in URL
    const location = new URL(window.location.href);
    const code = location.searchParams.get("code");

    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({ query: AUTH_URL });
      //redirect to google signin page
      window.location.assign(data.authUrl);
    } catch (error) {
      displayErrorMessage(LogInMessages.LOGIN_ERROR);
    }
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin
          indicator={LoadingIcon}
          size="large"
          tip={LogInMessages.LOGIN_LOADING}
        />
      </Content>
    );
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description={LogInMessages.LOGIN_ERROR} />
  ) : null;

  //if login was successful redirect to user component and pass viewer id
  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="smile">
              😌
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            {LogInMessages.LOGIN_TITLE}
          </Title>
          <Text>{LogInMessages.LOGIN_TEXT}</Text>
        </div>
        <button
          className="log-in-card__google-button"
          onClick={handleAuthorize}
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">
            {LogInMessages.LOGIN_CTA}
          </span>
        </button>
        <Text type="secondary">{LogInMessages.LOGIN_NOTE}</Text>
      </Card>
    </Content>
  );
};
