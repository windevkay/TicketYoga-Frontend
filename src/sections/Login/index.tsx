import { useEffect, useRef } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import { AUTH_URL } from "../../lib/graphql/queries/AuthUrl";
import { LOG_IN } from "../../lib/graphql/mutations/LogIn";
import { AUTH_URL as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AUTH_URL";
import {
  LOG_IN as LogInData,
  LOG_INVariables,
} from "../../lib/graphql/mutations/LogIn/__generated__/LOG_IN";

import { Card, Layout, Typography, Spin } from "antd";

import { Viewer } from "../../lib/types";
import googleLogo from "./assets/google_logo.jpg";

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
      if (data && data.logIn) {
        setViewer(data.logIn);
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    // check for code param in URL
    const code = new URL(window.location.href).searchParams.get("code");
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
      window.location.href = data.authUrl;
    } catch (error) {}
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Sit tight while we log you in... ⚡" />
      </Content>
    );
  }

  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="smile">
              😌
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to TicketYoga
          </Title>
          <Text>
            Get started by signing in with Google to begin creating events or
            buying tickets!
          </Text>
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
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account. You will also need to grant
          permission for TicketYoga to access your Calender.
        </Text>
      </Card>
    </Content>
  );
};
