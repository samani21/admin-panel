import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import axios from 'axios'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "Women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        // console.log(productDetails.name)
        let responseData;
        let product = productDetails;
        const formData = new FormData();
        formData.append('image', image);

        await axios.post("http://localhost:8000/product/upload", formData,)
            .then(response => {
                responseData = response.data;
                console.log(responseData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        if (responseData.success) {
            product.image = responseData.data.image;
            console.log(product);
            const jsonData = JSON.stringify(product);

            await axios.post("http://localhost:8000/product/add", jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    response.data.success ? alert("Product Added") : alert("Failed")
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input type="text" value={productDetails.name} onChange={changeHandler} name="name" id="" placeholder='Type here' />
            </div>
            <div className='addproduct-peice'>
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" value={productDetails.old_price} onChange={changeHandler} name="old_price" placeholder='type here' id="" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" value={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder='type here' id="" />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select name="category" value={productDetails.category} onChange={changeHandler} className="add-product-selector" id="">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input type="file" value={productDetails.image} onChange={imageHandler} name="image" id='file-input' hidden />
            </div>
            <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
