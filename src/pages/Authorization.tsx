import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import Authorization from "../components/Authorization/Authorization";

const AuthorizationPage = () => {
  return (
    <MainLayout
      header={<Header />}
      main={<Authorization />}
      footer={<Footer />}
    />
  );
};

export default AuthorizationPage;
