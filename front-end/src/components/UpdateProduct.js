// import {React,useState,useEffect} from 'react';
// import {useParams} from 'react-router-dom';
// const UpgradeProduct = ()=>{
//     const [name,setName] = useState("");
//     const [price,setPrice] = useState("");
//     const [category,setCategory] = useState("");
//     const [company,setCompany] = useState("");
//     // const [error,setError] = useState(false);
//     const params = useParams();

//     useEffect(()=>{
//         // console.log(params);
//         getProductDetails();
//     },[])

//     const getProductDetails = async ()=>{
//         let result = await fetch(`http://localhost:2000/update-product/${params}`);
//         result = await result.json();
//         console.log(result);
//         setName(result.name);
//         setPrice(result.price);
//         setCategory(result.category);
//         setCompany(result.company);
//     }

//     const upgradeProducts = async ()=>{

//     }

//     return(
//         <div className='product'>
//             <span>Upgrade Details</span><br/><br/>
//             <input className="inputBox" type="text" placeholder="Enter Product name" value ={name} onChange={(e)=>{setName(e.target.value)}} 
//             />

//             <input className="inputBox" type="text" placeholder="Enter Product price" value = {price} onChange={(e)=>{setPrice(e.target.value)}} 
//             />

//             <input className="inputBox" type="text" placeholder="Enter Product category" value = {category} onChange={(e)=>{setCategory(e.target.value)}} 
//             />

//             <input className="inputBox" type="text" placeholder="Enter Product company" value = {company} onChange={(e)=>{setCompany(e.target.value)}} 
//             />
//             <button className="appButton" onClick={upgradeProducts}>Update</button>
//         </div>
//     )
// }

// export default UpgradeProduct;











import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpgradeProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:2000/update-product/${params.id}`,
                {
                    headers:{
                        // authorization: token1
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                }
            );
            result = await result.json();
            console.log(result);
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Error fetching product details');
        } finally {
            setLoading(false);
        }
    };

    const upgradeProducts = async () => {
        // Implement your logic for updating products
        let result = await fetch(`http://localhost:2000/update-product/${params.id}`,{
            method: 'put',
            body: JSON.stringify({name,price,category,company}),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` 
            }

        });
        result = await result.json()
        // alert("data has been updated");
        navigate('/');
        
    };

    return (
        <div className='product'>
            <span>Upgrade Details</span><br /><br />

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <input
                        className="inputBox"
                        type="text"
                        placeholder="Enter Product name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />

                    <input
                        className="inputBox"
                        type="text"
                        placeholder="Enter Product price"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />

                    <input
                        className="inputBox"
                        type="text"
                        placeholder="Enter Product category"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                    />

                    <input
                        className="inputBox"
                        type="text"
                        placeholder="Enter Product company"
                        value={company}
                        onChange={(e) => { setCompany(e.target.value) }}
                    />

                    <button className="appButton" onClick={upgradeProducts}>Update</button>
                </>
            )}
        </div>
    );
}

export default UpgradeProduct;
