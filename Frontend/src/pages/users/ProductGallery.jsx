import React, { useEffect, useState } from 'react'
import API from '../../api/axios';

const ProductGallery = () => {
    const[product,setProduct]=useState([]);
    const[loading,setLoading]=useState(false)
    const[page,setPage]=useState(1)
    const[category,setCategory]=useState('')
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                setLoading(true);
                const res = await API.get(`/product?page=${page}&category=${category}`);
                    setProduct(res.data.data);
                    setLoading(false);
            }
            catch(err){
                console.log(err)
            }
            finally{
               setLoading(false);
            }
        }
        fetchdata()
    },[page,category])
    return (
    <div>

        {/* Category Filter Buttons */}
        <div>
          <button onClick={() => { setCategory(''); setPage(1); }}>All</button>
          <button onClick={() => { setCategory('Clothes'); setPage(1); }}>Clothes</button>
          <button onClick={() => { setCategory('Electronics'); setPage(1); }}>Electronics</button>
            <button onClick={() => { setCategory('Kitchen'); setPage(1); }}>Kitchen</button>
             <button onClick={() => { setCategory('Jewellery'); setPage(1); }}>Jewellery</button>
        </div>
        {/* Product Grid */}
        {loading?<p>Loading...</p>:(<div>
            {product.map(p=>(
                <div key={p._id}>
                    <img src={p.image} alt={p.name}style={{width:"10vw"}} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
                </div>
            ))}
        </div>)
        }

      <div className="Pagination">
        <button disabled={page===1} onClick={()=>setPage(prev=>prev-1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={()=>setPage(prev=>prev+1)}>Next</button>
      </div>
    </div>
  )
}

export default ProductGallery
