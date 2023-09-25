import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import Account from "../components/Authorization/Account/Account";
import { Helmet } from "react-helmet-async";

const AccountPage = () => {
  return (
    <MainLayout header={<Header />} main={<Account />} footer={<Footer />} />
  );
};

export default AccountPage;
