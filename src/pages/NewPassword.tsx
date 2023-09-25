import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import NewPassword from "../components/Authorization/ResetPassword/NewPassword";

const NewPasswordPage = () => {
  return (
    <MainLayout
      header={<Header />}
      main={<NewPassword />}
      footer={<Footer />}
    />
  );
};

export default NewPasswordPage;
