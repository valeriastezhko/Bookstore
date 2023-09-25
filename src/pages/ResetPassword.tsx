import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import ResetPassword from "../components/Authorization/ResetPassword/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <MainLayout
      header={<Header />}
      main={<ResetPassword />}
      footer={<Footer />}
    />
  );
};

export default ResetPasswordPage;
