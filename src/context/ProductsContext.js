import axios from 'axios';
import React, { useReducer } from 'react';
import { toast } from 'react-toastify';
import { API } from '../helpers/const';
export const productsContext = React.createContext()

// состояние по умолчанию
const INIT_STATE = {
    products: null,
    productToEdit: null

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'GET_PRODUCT_TO_EDIT':
            return { ...state, productToEdit: action.payload }
        default:
            return { ...state }
    }
}
const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    // добавление 
    const addProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:8005/products', newProduct)

            toast.success('Успешно дабавлено!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            toast.error('Ошибка загрузки', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    //стягивает данные
    const getProducts = async () => {
        const { data } = await axios(API)
        dispatch({
            type: 'GET_PRODUCTS',
            payload: data
        })

    }
    //удаление 
    const deleteProduct = async (id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()
    }
    // редактирование
    // мы тут стянули данные с помощью айдишки чтобы загрузить их в инит стейт , чтобы дальше  их передать в Едит пейдж
    const getProductToEdit = async (id) => {
        const { data } = await axios(`${API}/${id}`)
        dispatch({
            type: 'GET_PRODUCT_TO_EDIT',
            payload: data
        })

    }
    // создали функцию чтобы передать ее в EditPage чтобы на клике save сохранялось 
    const saveEditedProduct = async (editedProduct) => {
        await axios.patch(`${API}/${editedProduct.id}`, editedProduct)
        getProducts()
    }

    return (
        <productsContext.Provider value={{
            products: state.products,
            addProduct,
            getProducts,
            deleteProduct,
            getProductToEdit,
            saveEditedProduct,
            productToEdit: state.productToEdit
        }} >
            {children}

        </productsContext.Provider>

    );
};

export default ProductsContextProvider;