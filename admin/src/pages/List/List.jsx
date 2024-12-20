import React, { useEffect, useState } from 'react' // Added useState
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify'

const List = () => {

  const url = "http://localhost:4000"
  const [list, setList] = useState([]); // Initialize useState for list

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/plant/list`);
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }

  useEffect(() => {
    fetchList(); // Fetch data on component mount
  }, []);

  const removePlant=async(plantId) =>{
     const response =await axios.post(`${url}/api/plant/remove`,{id:plantId});
     await fetchList();

     if(response.data.success){
      toast.success(response.data.message)
     }
     else{
      toast.error("Error");
     }
  }
    
  return (
    <div className='list add flex-col'>
      <p>All Plant List</p>
      <div className="list-table">
        <div className='list-table-format title'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/${item.image}`} alt={item.name} /> {/* Added alt attribute */}
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>RS{item.price}</p>
                <p onChangeCapture={()=>removePlant(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        ) : (
          <p>No plants found</p> // Handle empty list scenario
        )}
      </div>
    </div>
  )
}

export default List;
