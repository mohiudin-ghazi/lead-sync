import { Button, Col, Row } from "antd";
import SignUpForm from "components/Forms/signUp";

function SignUp() {
  return (
    <Row className="h-screen">
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
      <Col className="flex flex-col justify-center items-center" span={12}>
        <div className="w-[70%]">
          <div className="mb-3">
            <h2 className="text-[26px] font-bold">Sign Up</h2>
            <p className="text-[16px] font-medium">
              Enter details to create account
            </p>
          </div>
          <SignUpForm />
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
    </Row>
  );
}

export default SignUp;
