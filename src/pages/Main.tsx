// import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";

const MainPage = () => {
  return <MainLayout header={<Header />} main={<Main />} footer={<Footer />} />;
};

export default MainPage;
