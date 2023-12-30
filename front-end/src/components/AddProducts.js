import {React,useState} from 'react';
import { useNavigate } from 'react-router-dom';
const AddProducts = ()=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);

    const navigate = useNavigate();
    const addProducts = async ()=>{
        
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }


        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:2000/add-product",{
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers:{
                "Content-Type" : "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        // alert("Item has been added");
        navigate('/');
    }

    return(
        <div className='product'>
            <span>Add Product Details</span><br/><br/>
            <input className="inputBox" type="text" placeholder="Enter Product name" value ={name} onChange={(e)=>{setName(e.target.value)}} 
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input className="inputBox" type="text" placeholder="Enter Product price" value = {price} onChange={(e)=>{setPrice(e.target.value)}} 
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input className="inputBox" type="text" placeholder="Enter Product category" value = {category} onChange={(e)=>{setCategory(e.target.value)}} 
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input className="inputBox" type="text" placeholder="Enter Product company" value = {company} onChange={(e)=>{setCompany(e.target.value)}} 
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button className="appButton" onClick={addProducts}>Add Product</button>
        </div>
    )
}

export default AddProducts;