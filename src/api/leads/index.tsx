import API from "../index";

export const saveLeads = (
  userId: any,
  formData: any // optional
) =>
  API.post(`/leads/import/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getLeads = (
  page: number,
  limit: number // optional
) => API.get(`/leads?page=${page}&limit=${limit}`);


export const updateLead = (leadId: string, data: Partial<any>) =>
  API.put(`leads/${leadId}`, data);

export const deleteLead = (leadId: string) =>
  API.delete(`leads/${leadId}`);
