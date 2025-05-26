import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Input, Tooltip } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMessageApi } from "utils";
import { deleteLead, getLeads, saveLeads, updateLead } from "api/leads";
import { useAppState } from "hooks";
import EditLeadModal from "components/Modals/EditLeadModal";

interface LeadType {
  _id: string;
  groupId: string;
  groupName: string;
  email: string;
  phone: string;
  createdAt: string;
  tags: string[];
  description: string;
}

interface ApiResponse {
  data: LeadType[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const LeadsManagement = () => {
  const {
    auth: { user },
  } = useAppState();

  const messageApi = useMessageApi();

  const [leads, setLeads] = useState<LeadType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadType | null>(null);

  const openEditModal = (lead: LeadType) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const onEditSuccess = () => {
    // Refresh leads list here
  };

  const fetchLeads = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const { data } = await getLeads(page, limit);
      setLeads(data.data);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination?.total,
        current: data.pagination?.currentPage,
        pageSize: limit,
      }));
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      messageApi.error("Error loading leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchLeads(pagination.current!, pagination.pageSize!);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await saveLeads(user?._id, formData);
      messageApi.success(data.message);
      fetchLeads(pagination.current!, pagination.pageSize!); // refresh data
    } catch (err: any) {
      console.error(err);
      messageApi.error("Failed to import leads");
    }
  };

  const handleEdit = async (leadId: string) => {
    // For simplicity, just prompt for new description (you can enhance this with a modal/form)
    const newDescription = prompt("Enter new description:");
    if (newDescription === null) return; // cancel pressed

    try {
      await updateLead(leadId, { description: newDescription });
      messageApi.success("Lead updated successfully");
      fetchLeads(pagination.current!, pagination.pageSize!);
    } catch (err) {
      console.error(err);
      messageApi.error("Failed to update lead");
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await deleteLead(leadId);
      messageApi.success("Lead deleted successfully");
      fetchLeads(pagination.current!, pagination.pageSize!);
    } catch (err) {
      console.error(err);
      messageApi.error("Failed to delete lead");
    }
  };

  const columns: TableColumnsType<LeadType> = [
    { title: "Group Id", dataIndex: "groupId" },
    { title: "Group Name", dataIndex: "groupName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toLocaleString(); // You can customize format here
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags: string) => {
        const tagList = tags?.split(",").map((tag) => tag.trim()) || [];
        return (
          <>
            {tagList.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        );
      },
    },
    { title: "Description", dataIndex: "description" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="w-auto h-auto p-0 border-0"
            onClick={() => openEditModal(record)}
          >
            <img
              src="/assets/icons/edit.svg"
              alt="Edit Icon"
              width={20}
              height={20}
            />
          </Button>
          <Button
            className="w-auto h-auto p-0 border-0"
            onClick={() => handleDelete(record._id)}
          >
            <img
              src="/assets/icons/delete.svg"
              alt="Delete Icon"
              width={20}
              height={20}
            />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between p-[20px] bg-[#DAE1F3]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#5B626B] font-roboto text-base font-medium">
            Leads
          </span>
          <Input
            className="w-[215px] bg-white rounded-[6px]"
            addonBefore={<SearchOutlined style={{ color: "#0000008A" }} />}
            placeholder="Search"
          />
        </div>
        <div className="flex gap-[10px] items-center">
          <Tooltip title="Import Leads">
            <Button
              icon={<UploadOutlined />}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Import Leads
            </Button>
          </Tooltip>
          <input
            type="file"
            id="fileInput"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <Table<LeadType>
        rowSelection={{ type: "checkbox", columnWidth: "50px" }}
        columns={columns}
        dataSource={leads}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="_id"
      />
      <EditLeadModal
        open={editModalOpen}
        setOpen={setEditModalOpen}
        leadData={selectedLead}
        onSuccess={() => {
          fetchLeads(pagination.current!, pagination.pageSize!); // refresh table
          setSelectedLead(null); // clear after edit
        }}
      />
    </div>
  );
};

export default LeadsManagement;
