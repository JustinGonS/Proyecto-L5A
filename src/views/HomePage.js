import ProductList from "../components/product/ProductList";
import ProductSearchBar from "../components/product/ProductSearchBar";
import SortingDropdown from "../components/product/SortingDropdown";

const HomePage = () => {
    return (
        <div className="home-page">
            <ProductSearchBar></ProductSearchBar>
            <SortingDropdown></SortingDropdown>
            <ProductList></ProductList>
        </div>
    );
};
export default HomePage;