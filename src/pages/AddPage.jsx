
import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { productsContext } from '../context/ProductsContext';

import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

const AddPage = () => {
    const { addProduct } = useContext(productsContext)
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        photo: '',
        description: ''
    })

    const history = useHistory()

    function handleInputs(e) {
        let obj = {
            ...newProduct,
            [e.target.name]: e.target.value
        }
        setNewProduct(obj)
    }

    function handleClick() {
        if (!newProduct.title.trim() || !newProduct.price.trim() || !newProduct.photo.trim() || !newProduct.description.trim()) { return toast('Заполните все поля') }
        addProduct(newProduct)
        setNewProduct({
            title: '',
            price: '',
            photo: '',
            description: ''
        })


        history.push('/')




    }

    return (
        <div>
            <Form.Control name='title' value={newProduct.title} onChange={handleInputs} type="text" placeholder="Введите название продукта" />
            <Form.Control name='price' value={newProduct.price} onChange={handleInputs} type="text" placeholder="Введите цену продукта" />
            <Form.Control name='photo' value={newProduct.photo} onChange={handleInputs} type="text" placeholder="Введите фото продукта" />
            <Form.Control name='description' value={newProduct.description} onChange={handleInputs} type="text" placeholder="Введите описание продукта" />
            <Button onClick={handleClick} variant='outline-success'>Input</Button>
            <ToastContainer />
            <br />
        </div>
    );
};

export default AddPage;