import { Button, Row } from "antd";

export default function Home() {
  return (
    <Row className="flex flex-col">
      {/* Header */}
      <Row className="bg-[#ededed] p-[14px_35px] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/logo.png"
            alt="MainPicture "
            height={50}
            width={50}
          />
          <h1 className="font-ubuntu text-[22px] text-[#545455]">BLAST </h1>
        </div>
        <nav>
          <ul className="list-none flex gap-5">
            <p>
              <a href="#about">About</a>
            </p>
            <p>
              <a href="#features">Features</a>
            </p>
            <p>
              <a href="#contact">Contact Us</a>
            </p>
          </ul>
        </nav>
        <div className="flex gap-2.5">
          <a href="/signup">
            <Button>Create Account</Button>
          </a>
          <a href="/login">
            <Button type="primary">Login</Button>
          </a>
        </div>
      </Row>
      {/* Body */}
      <Row className="p-[30px]">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-3/4">
            <h3 className="text-xl mb-2">
              FINDING IT TOUGH TO LAUNCH YOUR EFFECTIVE EMAIL CAMPAIGNS?
            </h3>
            <h1 className="text-4xl font-extrabold mb-2">
              Elevate Your Email Strategy With Blast
            </h1>
            <p className="mb-4">
              Discover a seamless way to organize, automate and analyze your
              email marketing efforts with blast, powerful tool designed to make
              email marketing simple and effective
            </p>
            <a href="/signUp">
              <Button type="primary">Get Started</Button>
            </a>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <img
            className="h-[450px] w-auto"
            src="/assets/images/MainPicture.jpg"
            alt="MainPicture "
          />
        </div>
      </Row>
      {/* Footer */}
      <Row className="flex justify-evenly gap-10 mx-auto items-center w-[90%]">
        <div className="flex flex-row items-center text-left gap-1">
          <img
            src="/assets/images/tracking.png"
            alt="Email Tracking"
            width={30}
            height={30}
          />
          <span>Real-Time Email Tracking</span>
        </div>
        <div className="flex flex-row items-center text-left gap-1">
          <img
            src="/assets/images/success.png"
            alt="Success Rate"
            width={30}
            height={30}
          />
          <span>100% Success Rate</span>
        </div>
        <div className="flex flex-row items-center text-left gap-1">
          <img
            src="/assets/images/email-delivery.png"
            alt="Guaranteed Delivery "
            width={30}
            height={30}
          />
          <span>Guaranteed Email Delivery</span>
        </div>
        <div className="flex flex-row items-center text-left gap-1">
          <img
            src="/assets/images/personalization.png"
            alt="Personalized Emailing "
            width={30}
            height={30}
          />
          <span>Personalized Emailing</span>
        </div>
      </Row>
    </Row>
  );
}
