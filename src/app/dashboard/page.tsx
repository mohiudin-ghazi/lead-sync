import React from "react";
import { Table, Button, Row, Col, Input, Card } from "antd";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "flux/reducers/auth";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  // Navigation Handler for Campaign Cards
  const handleNavigate = (route: string) => {
    navigate(route);
  };

  // Campaign Statistics as Navigation Buttons
  const campaignStats = [
    {
      title: "New Campaigns",
      value: "Click to add",
      color: "#0096FF",
      route: "/new-campaigns",
    },
    {
      title: "Scheduled Campaigns",
      value: "1000",
      color: "#A89CF1",
      route: "/scheduled-campaigns",
    },
    {
      title: "Opened Campaigns",
      value: "1000",
      color: "#F4A261",
      route: "/opened-campaigns",
    },
    {
      title: "In Progress Campaigns",
      value: "1000",
      color: "#7FD48B",
      route: "/in-progress-campaigns",
    },
    {
      title: "Closed Campaigns",
      value: "1000",
      color: "#E57373",
      route: "/closed-campaigns",
    },
    {
      title: "Total Campaigns",
      value: "100000",
      color: "#A67B5B",
      route: "/total-campaigns",
    },
  ];

  // Table Columns
  const columns = [
    { title: "Group ID", dataIndex: "groupId", key: "groupId" },
    { title: "Group Name", dataIndex: "groupName", key: "groupName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  // Sample Data
  const data = new Array(10).fill(null).map((_, index) => ({
    key: index,
    groupId: `#00${index + 1}`,
    groupName: "Ronald Richards",
    date: "Founder & CEO",
    time: "ronald.richard@gmail.com",
    description: "1234-5478910",
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Campaign Navigation Buttons */}
      <Row gutter={[16, 16]} className="mb-6">
        {campaignStats.map((stat, index) => (
          <Col span={4} key={index}>
            <Button
              className="w-full text-white font-semibold text-lg py-5 rounded-lg border-none hover:opacity-90 transition-all"
              style={{ backgroundColor: stat.color }}
              onClick={() => handleNavigate(stat.route)}
            >
              <p className="text-sm">{stat.title}</p>
              <h3 className="text-xl">{stat.value}</h3>
            </Button>
          </Col>
        ))}
      </Row>

      {/* Campaign Data Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default Dashboard;
