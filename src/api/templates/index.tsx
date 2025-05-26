import API from "../index";

export const getTemplatesNames = (userId: string) =>
  API.get(`/templates/user/${userId}/names`);
export const saveTemplate = (
  userId: string,
  design: any,
  html: string,
  designName: string,
  templateId?: string // optional
) =>
  API.post(
    `/templates/user/${userId}/${designName}${
      templateId ? `/${templateId}` : ""
    }`,
    {
      design: design,
      html: html,
    }
  );

export const getDesign = (id: string) =>
  API.get(`/templates/design?id=${id}`);
