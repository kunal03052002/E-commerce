import {React,useState,useEffect} from "react";
import {Link} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () =>{

    const [products,setProduct] = useState([]);
    const user = localStorage.getItem('user');
    const userObject = JSON.parse(user);
    const userId = userObject._id;

    // const token0 = localStorage.getItem('token');
    // const token1 = JSON.parse(token0);
    

    const auth = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        
        // if(auth){
            // collectData();
        // }
        collectData();
        

    },[])

    const collectData = async () =>{

        // const token0 = localStorage.getItem('token');
        // const token1 = JSON.parse(token0);
        
        let result = await fetch(`http://localhost:2000/products/${userId}`,
        {
            headers:{
                // authorization: token1
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        );
        result = await result.json();
        setProduct(result);
    }
   
    const deleteProduct = async (id) =>{
        // console.log(id);
        let result = await fetch(`http://localhost:2000/delete-product/${id}`,{
            method: "Delete",
            headers:{
                // authorization: token1
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        );
        result = await result.json();
        if(result){
            alert("Item is deleted");
            collectData();
        }
        else{
            alert("Problem occured");
        }
    }
    const searchHandle = async (e)=>{
        let key = e.target.value;
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        if(key){
            let result = await fetch(`http://localhost:2000/search/${userId}/${key}`,
            {
                headers:{
                    // authorization: token1
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }
            );
            // let result = await fetch(`http://localhost:2000/search/${key}`);
            result = await result.json();
            setProduct(result);
        }
        else{
            collectData();
        }
        
    }
    return(
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-box" placeholder="Search an item"
            onChange={searchHandle}
            />
            <ul >
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
                
            </ul>
        
            {products.length > 0 ? (
                products.map((item,index) => (
                    <ul key={item._id}>
                        <li>{index}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                        <button onClick={() => deleteProduct(item._id)}>Delete</button>
                        <button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </button>
                        </li>
                    </ul>
                ))
                ) : (
                    <p>Currently no data</p>
                )}
            
            {/* `/update/${item._id}` */}


        </div>
    )
}
export default ProductList;








