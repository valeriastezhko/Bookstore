import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import BookDetail from "../components/BookDetail/BookDetail";

const BookPage = () => {
  return (
    <MainLayout header={<Header />} main={<BookDetail />} footer={<Footer />} />
  );
};

export default BookPage;
