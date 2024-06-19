import { Dropdown } from 'react-bootstrap';

const SortingDropdown = () => {
    return (
        <Dropdown className="d-inline mx-4 product-sorting">
            <Dropdown.Toggle id="dropdown-autoclose-true">
                Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>Id (A-Z)</Dropdown.Item>
                <Dropdown.Item>Id (Z-A)</Dropdown.Item>
                <Dropdown.Item>Name (A-Z)</Dropdown.Item>
                <Dropdown.Item>Name (Z-A)</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
export default SortingDropdown;
