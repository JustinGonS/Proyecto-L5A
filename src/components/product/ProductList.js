import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Table, Spinner } from "react-bootstrap";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_PRODUCTS_API_URL}/Products`)
            .then((response) => {
                if (response.status === 200) {
                    const filteredProducts = getFileteredProducts(response.data, search);
                    setProducts(filteredProducts);
                    setError('');
                } else {
                    setProducts(null);
                    setError(response.message);
                }
            }).catch(() => {
                setProducts(null);
                setError('Unexpected error while retrieving products');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [search]);

    const TABLE_HEADERS = ["Id", "Name", "Category", "Price", "Quantity"];

    const getFileteredProducts = (products, search) => {
        if (products?.length && search) {
            return products.filter((product) => {
                const keys = Object.keys(product);
                let isMatchingProduct = false;
                for (const key of keys) {
                    const value = product[key];
                    if (value &&
                        value.toString().toLowerCase().indexOf(search.toLowerCase())
                        !== -1
                    ) {
                        isMatchingProduct = true;
                    }
                }
                return isMatchingProduct;
            })
        }
        return products;
    }

    return (
        <div>
            <Table className="products-table" striped>
                <thead>
                    <tr>
                        {TABLE_HEADERS.map(header => <th
                            key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {(!isLoading && products?.length === 0) &&
                        <tr>
                            <td colSpan={TABLE_HEADERS.length}>
                                <p classname ="product-table-message">There are not products in the
                                    system.</p>
                            </td>
                        </tr>}
                    {(!isLoading && error) && <tr>
                        <td colSpan={TABLE_HEADERS.length}>
                            <p classname ="product-table-message">{error}</p>
                        </td>
                    </tr>}
                    {(!isLoading && products?.length > 0) &&
                        products.map(product =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.categoryId}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        )}
                    {isLoading &&
                        <tr>
                            <td classname="table-spinner-column"
                                colSpan={TABLE_HEADERS.length}>
                                <Spinner animation="border"
                                    role="status">
                                    <span
                                        className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        </div>
    );

}



export default ProductList;