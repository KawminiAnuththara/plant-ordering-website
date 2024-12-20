import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {

  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Indoor"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/plant/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Indoor"
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt='' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select onChange={onChangeHandler} name='category'>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Decorative">Decorative</option>
              <option value="Herb">Herb</option>
              <option value="Flowering">Flowering</option>
              <option value="Succulents">Succulents</option> {/* Fixed empty option */}
              <option value="Climbing">Climbing</option>
              <option value="Foliage">Foliage</option>
              <option value="Edible">Edible</option>
              <option value="Aquatic">Aquatic</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='RS20' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add;
