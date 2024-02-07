import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import axios, { all } from "axios";

const ListProduct = () => {

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
        axios.get("http://localhost:8000/product")
            .then(res => {
                const categories = res.data.data;
                setAllProducts(categories);
                console.log("asjbajsb", categories);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


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
                            <img src={cross_icon} className='listproduct-remove-icon' alt="" />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListProduct
