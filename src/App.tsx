import { Routes, Route, Navigate } from "react-router-dom";
import { useAppState } from "hooks";
import Home from "app/page";
import Login from "app/login/page";
import SignUp from "app/signup/page";
import Dashboard from "app/dashboard/page";
import ProviderLayout from "components/Layouts/Provider";
import ClientLayout from "components/Layouts/Client";
import EmailComposer from "app/Provider/EmailComposer";
import LeadsManagement from "app/Provider/LeadsManagement";
import Chat from "app/Provider/Chat";
import ClientAuth from "app/Client/auth";

const App = () => {
  const {
    auth: { user },
  } = useAppState();

  if (user) {
    if(user.role === "provider") {
      return (
        <ProviderLayout>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/campaign" /> : <Navigate to="login" />
              }
            />
            <Route
              path="/campaign"
              element={user ? <Dashboard /> : <Navigate to="../auth" />}
            />
            <Route
              path="/email-composer"
              element={user ? <EmailComposer /> : <Navigate to="../auth" />}
            />
            <Route
              path="/leads-management"
              element={user ? <LeadsManagement /> : <Navigate to="../auth" />}
            />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="../auth" />}
            />
          </Routes>
        </ProviderLayout>
      );
    }

    return (
      <ClientLayout>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/chat" /> : <Navigate to="login" />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../auth" />}
          />
          <Route
            path="*"
            element={user ? <Navigate to="../chat" /> : <Navigate to="login" />}
          />
        </Routes>
      </ClientLayout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/provider/:providerId/chat" element={<ClientAuth />} />
      <Route path="*" element={<Navigate to="../" />} />
    </Routes>
  );
};
export default App;
