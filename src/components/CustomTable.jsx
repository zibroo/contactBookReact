
import React, { useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productsContext } from '../context/ProductsContext';

const CustomTable = () => {
    const { getProducts, products, deleteProduct } = useContext(productsContext)
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            {
                products ? (
                    <Table striped bordered hover variant="dark" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Discription</th>
                                <th>Photo</th>
                                <th>X</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, index) => (

                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.description}</td>
                                        <td><img width="120" height="100" src={item.photo} alt='' /></td>
                                        <td>
                                            <Button variant='outline-danger' onClick={() => { deleteProduct(item.id) }}>DELETE</Button>
                                        </td>
                                        <td>
                                            <Link to={`/edit/${item.id}`}>
                                                <Button variant='outline-info'>Edit</Button>
                                            </Link>
                                        </td>
                                    </tr>




                                ))

                            }
                        </tbody>

                    </Table >) : (<h2>Loading...</h2>)
            }
        </>

    );
};

export default CustomTable;