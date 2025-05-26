import { Col, Row, Menu, Avatar, Space, Dropdown } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import {
  DollarOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { clearUser } from "flux/reducers/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "hooks";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "campaign",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/campaign.svg"
        alt="campaign icon"
      />
    ),
    label: <a href="/campaign">Campaign</a>,
  },
  {
    key: "leads-finder",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/leads-finder.svg"
        alt="leads-finder icon"
      />
    ),
    label: <a href="/leads-finder">Leads Finder</a>,
  },
  {
    key: "leads-management",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/leads-management.svg"
        alt="leads-management icon"
      />
    ),
    label: <a href="/leads-management">Leads Management</a>,
  },
  {
    key: "email-composer",
    icon: (
      <img
        className="w-[11.24px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/email-composer.svg"
        alt="email-composer icon"
      />
    ),
    label: <a href="/email-composer">Email Composer</a>,
  },
  {
    key: "analytics",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/analytics.svg"
        alt="analytics icon"
      />
    ),
    label: <a href="/analytics">Analytics</a>,
  },
  {
    key: "chat",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/chat.svg"
        alt="chat icon"
      />
    ),
    label: <a href="/chat">Chat Box</a>,
  },
];

function ProviderLayout({ children }: LayoutProps) {
  const {
    auth: { user },
  } = useAppState();

  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for window to ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const currentPath = location.pathname.split("/").pop();
      const foundItem = items.find((item) => item?.key === currentPath); // Find item by key
      const key = foundItem?.key || "dashboard";
      setSelectedKey(key as string);
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      extra: "⌘P",
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Billing",
      icon: <DollarOutlined />,
      extra: "⌘B",
    },
    {
      key: "3",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
    {
      key: "4",
      label: "Logout",
      icon: <LogoutOutlined />,
      extra: "⌘L",
      onClick: handleLogout,
    },
  ];

  return (
    <Row className="h-screen">
      <Col className="w-full flex flex-col">
        <Row className="p-[20px]">
          <Col span={18}>
            <Menu
              className="w-full border-0"
              mode="horizontal"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={["sub1"]}
              items={items}
            />
          </Col>
          <Col span={6} className="flex justify-end pr-[10px]">
            <Dropdown menu={{ items: dropdownItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
                  {user?.username}
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Row className="bg-[#f0f3fb] flex-grow shadow-custom flex flex-col p-[30px]">
          {children}
        </Row>
      </Col>
    </Row>
  );
}

export default ProviderLayout;
