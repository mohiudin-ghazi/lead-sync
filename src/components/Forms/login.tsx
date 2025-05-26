import React from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import { EyeInvisibleOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "api/auth"; // Import the login API
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "flux/reducers/auth";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useMessageApi } from "utils";

interface LoginValues {
  email: string;
  password: string;
}
interface LoginProps {
  providerId?: string;
}
function LoginForm({ providerId }: LoginProps) {
  const [form] = Form.useForm();
  const messageApi = useMessageApi(); // Ant Design message context
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values: LoginValues) => {
    try {
      // Simulate API call (replace with your actual API call)
      dispatch(setLoading(true));
      const loginPayload = providerId ? { ...values, providerId } : values;
      const { status, data } = await login(loginPayload);
      const { message, ...payload } = data;

      if (status === 200) {
        messageApi.success(message);
        form.resetFields();
        dispatch(setUser(payload));
        navigate("/campaign");
      } else {
        throw new Error(message || "Login failed");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Handle AxiosError and access the response object
        messageApi.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        // Handle general error
        messageApi.error(error.message);
      } else {
        messageApi.error("An unexpected error occurred.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onFinish = (values: LoginValues) => {
    handleLogin(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{
        borderRadius: "0.35rem",
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
          },
        ]}
      >
        <Input
          suffix={<UserOutlined />}
          type="email"
          placeholder="Email*"
          className="bg-transparent form-control py-2"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password
          suffix={<EyeInvisibleOutlined />}
          placeholder="Password*"
          className="bg-transparent form-control py-2"
        />
      </Form.Item>

      <div className="flex items-center justify-between m-2">
        <Form.Item className="m-0" name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="/">Forgot Password?</a>
      </div>

      <Button
        className="w-full h-[44px] rounded-[10px] font-roboto font-normal text-lg"
        type="primary"
        htmlType="submit"
      >
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
