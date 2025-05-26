import { Button, Col, Row } from "antd";
import LoginForm from "components/Forms/login";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  providerId: string;
};

function Login({ setIsLogin, providerId }: LoginProps) {
  const navigate = useNavigate();

  return (
    <Row className="h-screen">
      <Col className="flex flex-col justify-center items-center" span={12}>
        <div className="w-[70%]">
          <div className="mb-3">
            <h2 className="text-[26px] font-bold">Welcome to BLAST</h2>
            <p className="text-[16px] font-medium">
              Need an account?
              {/* <a
                href="/signup"
                className="text-custom-blue no-underline hover:underline text-[16px] font-medium text-[#1677ff]"
              >
                {" "}
                Signup
              </a> */}
              <Button
                onClick={() => {
                  if (providerId) {
                    setIsLogin(false);
                  } else {
                    navigate("/signup");
                  }
                }}
                className="pl-1 text-custom-blue no-underline hover:underline text-[16px] font-medium text-[#1677ff] bg-transparent border-none cursor-pointer"
              >
                Signup
              </Button>
            </p>
          </div>
          <LoginForm providerId={providerId} />
        </div>

        <div className="flex items-center justify-center w-full text-center my-4">
          <span className="flex-1 border-b w-[50%] border-gray-300 mr-2 ml-[35px]"></span>
          <p className="text-[28px] font-medium p-0 px-5"> OR </p>
          <span className="flex-1 border-b w-[50%] border-gray-300 ml-2 mr-[35px]"></span>
        </div>
        <div className="flex justify-center gap-2.5 mt-2.5">
          <Button className="w-auto h-auto p-0 border-0">
            <img src="/assets/icons/social-google.png" alt="Google Icon" />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img src="/assets/icons/social-fb.png" alt="Facebook Icon" />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img src="/assets/icons/social-linkedin.png" alt="LinkedIn Icon" />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img src="/assets/icons/social-twitter.png" alt="Twitter Icon" />
          </Button>
        </div>
      </Col>
      <Col
        className="h-full bg-[#fafcfe] flex justify-center shadow-[0px_1px_3px_rgba(0,0,0,0.25)]"
        span={12}
      >
        <img
          className="h-full object-contain bg-cover"
          src="/assets/images/login.png"
          alt="Landing Page"
          width={650}
          height={433.2}
        />
      </Col>
    </Row>
  );
}

export default Login;
