import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import axios, { all } from "axios";
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);

    // const fetchInfo = async () => {
    //     await axios.get('http://localhost:8000/product')
    //         .then(response => {
    //             // Data yang diterima dari permintaan
    //             const data = response.data;
    //             this.setAllProducts({ data });
    //             console.log('Data yang diterima:', data);
    //         })
    //         .catch(error => {
    //             console.error('Gagal mengambil data:', error);
    //         });

    //     // console.log('Data yang diterima:', setAllProducts);
    // }

    useEffect(() => {
        const fetchInfo = async () => {
            axios.get("http://localhost:8000/product")
                .then(res => {
                    const categories = res.data.data;
                    setAllProducts(categories);
                    console.log("asjbajsb", categories);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchInfo();
    }, []);

    const remove_product = async (id, useEffect) => {
        await axios.delete(`http://localhost:8000/product/${id}/delete`)
            .then(response => {
                response.data.success ? alert("Delete product success") : alert("Failed")
                window.location.reload(true)
            });
        await useEffect();
    }


    return (

        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts && allProducts.map((product) => (
                    <div key={product.id}>
                        <div className='listproduct-format-main listproduct-format'>
                            <img src={product.image} alt="" className="list-product-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => { remove_product(product.id) }} src={cross_icon} className='listproduct-remove-icon' alt="" />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListProduct
