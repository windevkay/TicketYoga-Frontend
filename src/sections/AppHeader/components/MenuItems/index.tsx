import { Link } from "react-router-dom";

import { Button, Menu, Avatar } from "antd";
import { ScheduleFilled, SmileFilled, ApiFilled } from "@ant-design/icons";

import { Viewer } from "../../../../lib/types";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key={"/user/"}>
          <SmileFilled />
          My Profile
        </Item>
        <Item key="logout">
          <ApiFilled />
          Log out
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link to="/login">
          <Button type="primary" shape="round" ghost={true}>
            Sign In ⚡
          </Button>
        </Link>
      </Item>
    );
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/createevent">
        <Link to="/createevent">
          <ScheduleFilled /> Create Event
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
