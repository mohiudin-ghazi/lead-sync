import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select } from "antd";
import { getDesign, getTemplatesNames, saveTemplate } from "api/templates";
import axios from "axios";
import { setTemplates } from "flux/reducers/meta";
import { useAppState } from "hooks";
import EmailEditor from "react-email-editor";
import { useDispatch } from "react-redux";
import { useMessageApi } from "utils";

function EmailComposer() {
  const {
    auth: { user },
    meta,
  } = useAppState();
  const dispatch = useDispatch();
  const messageApi = useMessageApi();
  const [templateName, setTemplateName] = useState("New Template");
  const emailEditorRef: any = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDesignSaving, setIsDesignSaving] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  useEffect(() => {
    const getTemplateNames = async () => {
      try {
        const { data } = await getTemplatesNames(user?._id as string);
        // setDesignNames(data.files);
        dispatch(setTemplates(data.files));
      } catch (err) {
        console.log("Error | Composer | getDesigns", err);
      }
    };
    getTemplateNames();
  }, []);

  const handleSelectChange = async (value: string, option: any) => {
    try {
      const { data } = await getDesign(option?.id);
      emailEditorRef.current.editor.loadDesign(data.design);
      setSelectedTemplateId(option.id); // Save the ID
      setSelectedTemplate(value);
      setTemplateName(value);
    } catch (err) {
      console.log("Error | Composer | handleSelectChange", err);
    }
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onLoad = async () => {
    // setIsLoading(true);
    // const { data } = await axios.get(
    //   "http://localhost:8000/api/templates/design"
    // );
    // // @ts-ignore
    // emailEditorRef.current.editor.loadDesign(data.design);
  };

  const loadEmptyDesign = () => {
    const emptyDesign = {
      body: {
        rows: [],
        values: {},
      },
    };
    emailEditorRef.current.editor.loadDesign(emptyDesign);
    setSelectedTemplate(undefined); // Reset the dropdown
    setSelectedTemplateId(null);
    setTemplateName("New Template"); // Optional: reset template name
  };

  const exportHtml = async () => {
    setIsDesignSaving(true);
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      try {
        const saveFn = selectedTemplateId
          ? saveTemplate(
              user?._id as string,
              design,
              html,
              templateName,
              selectedTemplateId
            ) // update
          : saveTemplate(user?._id as string, design, html, templateName); // create

        const { data } = await saveFn;
        setIsDesignSaving(false);
        dispatch(setTemplates(data.files));
        messageApi.success(data.message);
      } catch (err) {
        console.log("Error | Composer | ExportHTML", err);
      }
    });
  };

  const loadDesign = async (event: any, name: string) => {
    event.preventDefault();
    const { data } = await axios.get(
      `http://localhost:8000/api/templates/design?name=${name}`
    );
    emailEditorRef.current.editor.loadDesign(data.design);
  };

  const onReady = async () => {
    // editor is ready
    setIsLoading(false);
    // @ts-ignore
    emailEditorRef.current.editor.registerCallback(
      "image",
      //  @ts-ignore
      async function (file: FileInfo, done: FileUploadDoneCallback) {
        const formData = new FormData();
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        console.log("FILE", file);
        formData.append("single", file.attachments[0]);
        const { data } = await axios.post(
          "http://localhost:8000/api/media/upload",
          formData,
          { headers: config.headers }
        );
        // Do something to upload the image and return the URL of the uploaded image
        done({
          url: `http://localhost:8000/images/` + data.nameList[0],
          progress: 0,
        });
      }
    );
    document.getElementById("btn-export")?.classList.remove("d-none");
    console.log("onReady");
  };

  return (
    <>
      {isLoading && (
        <div className="effect-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          {"  "}
          Loading ...
        </div>
      )}
      <Row className={isLoading ? "d-none" : "composer-parent h-full"}>
        <Col className="w-full flex flex-col">
          <Row className="gap-[10px] p-[10px] justify-between">
            <Col>
              <Input
                className="w-[225px]"
                placeholder="Basic usage"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </Col>
            <Col className="gap-[10px] flex">
              <Select
                className="w-[175px]"
                showSearch
                placeholder="Choose Design"
                value={selectedTemplate}
                onChange={(value, option) => {
                  handleSelectChange(value, option); // Pass both value and option
                }}
                onSearch={onSearch}
                options={meta?.templates?.map((template) => ({
                  label: template.name?.includes("design")
                    ? template.name?.split(".")[0]
                    : template.name?.split(".")[1],
                  value: template.name,
                  id: template._id,
                }))}
              />

              <Button icon={<DeleteOutlined />} onClick={loadEmptyDesign}>
                Empty
              </Button>
              <Button
                icon={<SaveOutlined />}
                onClick={exportHtml}
                loading={isDesignSaving}
              >
                Save
              </Button>
            </Col>
          </Row>
          <Row className="email-editor flex-grow">
            <EmailEditor
              ref={emailEditorRef}
              onLoad={onLoad}
              onReady={onReady}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default EmailComposer;
