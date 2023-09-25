import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import FavoriteBookList from "../components/Favorite/FavoriteBookList";

const FavoritePage = () => {
  return (
    <MainLayout
      header={<Header />}
      main={<FavoriteBookList />}
      footer={<Footer />}
    />
  );
};

export default FavoritePage;
