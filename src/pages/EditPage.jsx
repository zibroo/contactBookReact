import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { productsContext } from '../context/ProductsContext';

const EditPage = () => {
    const { getProductToEdit, productToEdit, saveEditedProduct } = useContext(productsContext)
    // используем чтобы получить айдишку
    const { key } = useParams()

    useEffect(() => {
        getProductToEdit(key)
    }, [])

    const [editProduct, setEditProduct] = useState(productToEdit)
    // исползуем хук useEffect для того чтобы дважды отловить productToEdit потому что в первый раз приходит null
    useEffect(() => {
        setEditProduct(productToEdit)
    }, [productToEdit])
    // для того чтобы изменять значение инпутов
    function handleInputs(e) {
        let obj = {
            ...editProduct,
            [e.target.name]: e.target.value

        }
        setEditProduct(obj)
    }
    const history = useHistory()
    return (
        <div>
            <h2>EDIT PAGE</h2><br />
            {
                editProduct ? (
                    <>
                        <Form.Control onChange={handleInputs} name='title' value={editProduct.title} type='text' />
                        <Form.Control onChange={handleInputs} name='price' value={editProduct.price} type='text' />
                        <Form.Control onChange={handleInputs} name='photo' value={editProduct.photo} type='text' />
                        <Form.Control onChange={handleInputs} name='description' value={editProduct.description} type='text' /><br />
                        <Button variant='outline-success' onClick={() => {
                            saveEditedProduct(editProduct)
                            history.push('/')
                        }} >SAVE</Button>
                    </>
                ) : (<h2>Loading...</h2>)
            }

        </div>
    );
};

export default EditPage;