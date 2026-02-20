import React, { useEffect, useState } from 'react'
import API from '../../api/axios';

const AdminProduct = () => {
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category: 'Clothes', image: '', inStock: 1 })
    const [products, setProducts] = useState([])
    const [edit, setEdit] = useState(false) // Stores the ID of the product being edited
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    // 1. Fetch Products
    const fetchProducts = async () => {
        try {
            const response = await API.get('/product')
            setProducts(response.data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // 2. Handle Form Submit (Create OR Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            user: userInfo?.userId || userInfo?._id 
        };

        try {
            if (edit) {
                // UPDATE: If edit state has an ID
                await API.put(`/product/${edit}`, finalData);
                alert('Product Updated Successfully');
                setEdit(false); // Reset edit mode
            } else {
                // CREATE: If edit is false
                await API.post('/product', finalData);
                alert('Product Created');
            }

            // Refresh list and clear form
            fetchProducts(); 
            setFormData({ name: '', description: '', price: '', category: 'Clothes', image: '', inStock: 1 });
        } catch (err) { 
            console.error(err.response?.data);
            alert(`Error: ${err.response?.data?.error || "Check console"}`); 
        }
    };

    // 3. Delete Product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await API.delete(`/product/${id}`)
            setProducts(products.filter((pro) => pro._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    // 4. Fill Form for Update
    const handleUpdate = (p) => {
        setEdit(p._id); // Store ID
        setFormData({
            name: p.name,
            description: p.description,
            price: p.price,
            inStock: p.inStock,
            image: p.image,
            category: p.category
        });
        window.scrollTo(0, 0); // Scroll to top form
    };

    // 5. Clear / Cancel Edit
    const handleCancel = () => {
        setEdit(false);
        setFormData({ name: '', description: '', price: '', category: 'Clothes', image: '', inStock: 1 });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>{edit ? "📝 Edit Product" : "➕ Add New Product"}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '40px' }}>
                <input type='text' placeholder='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <input type='text' placeholder='Description' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                <input type='number' placeholder='Price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                <input type='number' placeholder='Stock' value={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.value })} required />
                <input type='url' placeholder='Image URL' value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />

                <select value={formData.category} onChange={(e) => { setFormData({ ...formData, category: e.target.value }) }} required>
                    <option value="Clothes">Clothes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Kitchen">Kitchen</option>
                </select>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type='submit' style={{ padding: '10px', backgroundColor: edit ? '#ffa500' : '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                        {edit ? "UPDATE PRODUCT" : "ADD PRODUCT"}
                    </button>
                    {edit && (
                        <button type='button' onClick={handleCancel} style={{ padding: '10px' }}>Cancel</button>
                    )}
                </div>
            </form>

            <hr />
            <h2>Current Inventory ({products.length})</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td align="center"><img src={p.image} width="50" alt={p.name} /></td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>${p.price}</td>
                            <td>{p.inStock}</td>
                            <td>
                                <button onClick={() => handleDelete(p._id)} style={{ color: 'red', marginRight: '10px', cursor: 'pointer' }}>Delete</button>
                                <button onClick={() => handleUpdate(p)} style={{ color: 'blue', cursor: 'pointer' }}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProduct;