import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { Button, Menu, Avatar } from "antd";
import { ScheduleFilled, SmileFilled, ApiFilled } from "@ant-design/icons";

import { LOG_OUT } from "../../../../lib/graphql/mutations/LogOut";
import { LOG_OUT as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LOG_OUT";

import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../../lib/utils";

import { Viewer } from "../../../../lib/types";
import { MenuMessages } from "./messages";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification(MenuMessages.LOGOUT_SUCCESS);
      }
    },
    onError: () => {
      displayErrorMessage(MenuMessages.LOGOUT_ERROR);
    },
  });
  const handleLogOut = () => logOut();

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user" icon={<SmileFilled />}>
          <Link to={`/user/${viewer.id}`}>{MenuMessages.PROFILE}</Link>
        </Item>
        <Item key="/logout" icon={<ApiFilled />}>
          <span onClick={handleLogOut}>{MenuMessages.LOGOUT}</span>
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link to="/login">
          <Button type="primary" shape="round" className="menu-cta-button">
            {MenuMessages.SIGN_IN}
          </Button>
        </Link>
      </Item>
    );
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/createevent" icon={<ScheduleFilled />}>
        <Link to="/createevent">{MenuMessages.CREATE_EVENT}</Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
