import Header from "../components/Header/Header";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer/Footer";
import Cart from "../components/Cart/Cart";

const CartPage = () => {
  return <MainLayout header={<Header />} main={<Cart />} footer={<Footer />} />;
};

export default CartPage;
