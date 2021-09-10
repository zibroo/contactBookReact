
import React from 'react';
import CustomTable from '../components/CustomTable';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MainPage = () => {
    return (
        <div>
            <Link to='/add'>
                <Button variant="outline-info" size="lg">Создать новый продукт</Button></Link>
            <CustomTable />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default MainPage;