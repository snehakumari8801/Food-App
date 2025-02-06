import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFormDetails, setTotalAmount ,setLoading,setCurrentId } from '../../slices/userSlice';
import { getAllProducts } from '../../services/operations/Authapi';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { buyProducts } from '../../services/operations/Authapi';


function ProductsDetails() {
    const [allProducts, setAllProducts] = useState([]);
    // const [foodPrice,setFoodPrice] = useState(0);
    let foodPrice = 0;
    console.log(foodPrice);
    

    const dispatch = useDispatch();
    const { token ,  totalAmount } = useSelector((state) => state.auth);
    const { formDetails } = useSelector((state) => state.auth);
    const { id } = useParams();
    
    // Log to debug
    console.log("id ", id);
    console.log("FormDetails ", formDetails , allProducts);
    
   
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true));
            try {
                const result = await getAllProducts();
                console.log("Fetched products: ", result);
                if (result) {
                    dispatch(setFormDetails(result)); 
                    setAllProducts(result); 
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };
  
        fetchProducts();
    }, [dispatch]); 

   // useEffect(()=>{
       const buyHandler = async(id,price)=>{

        console.log(price);
        
         setLoading(true);
         try{
          let result = await buyProducts(id,token);
          dispatch(setCurrentId(id));
          dispatch(setTotalAmount(price));
         }catch(error){
            console.log(error.message)
         }
        }
   // },[id])
    
   
    const currentProduct = allProducts.find((product) => product._id === id);
    console.log("Curr " , currentProduct)

    return (
        <div className='overflow-x-hidden'>
        <Navbar/>
            <h1 className='flex flex-col justify-center items-center'>Product Details</h1>
                 {currentProduct ? (
                <div className='flex flex-col justify-center items-center m-10 mt-20 
                capitalize '>
                    <h2 className='text-2xl font-semibold'>{currentProduct.name}</h2>
                    <img src={currentProduct.thumbnail} alt='not image found'
                     className='h-[300px] w-[300px] mt-5'/>
                    <p className='line-through mt-5'>Price: Rs.{currentProduct.price}</p>
                    <p>Offered Price: Rs.{currentProduct.newPrice}</p>
                    <p>{totalAmount}</p>

                    <div className='flex gap-10'>
                   
                    <Link to='/cart'>
                    <button className='bg-green-500 w-[120px] p-1 mt-2 text-white font-semibold' 
                    onClick={()=>buyHandler(currentProduct._id,currentProduct.newPrice)}>Buy now</button>
                    </Link>
                    </div>
                </div>
            ) : (
                <div>Loading product details...</div> 
            )}
            
        </div>
    );
}

export default ProductsDetails;
