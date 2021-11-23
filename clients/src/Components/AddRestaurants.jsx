import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/ReactContext'


const AddRestaurants =() =>{

    const [name, setName] =useState("")
    const [location, setLocation] =useState("")
    const [priceRange, setPrice] =useState("Price Range") 

    
// calling the addrestaurant function from Context folder
const {addRestaurants} = useContext(RestaurantContext)

    //------------------------------------------------------------------------------
        const handleSubmit = async (e) => {
            e.preventDefault() //prevents a page reload
    
            try {
               const response = await RestaurantFinder.post("/", 
                {
                    name,
                    location,
                    price_range: priceRange
                })
                //the parameter "AddedRestaurant" is from server.js
                addRestaurants(response.data.data.AddedRestaurant)
            } catch (err) {
                
            }
        }
    //-------------------------------------------------------------------------------
    
    return (
        <div className="mb-4" style={{padding: "20px"}}>
            <form action=""> 
                <div className="form-row row">
                     <div className="col">
                         <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control"  placeholder="name"/>
                     </div>
                     <div className="col"> 
                         <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
                     </div>
                     <div className="col">
                        <select value={priceRange} onChange={e => setPrice(e.target.value)}
                         className="form-control custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                     </div>
                     <button type="submit" onClick={handleSubmit} className="btn btn-primary col">Add</button>
                </div> 
            </form> 
        </div>
    )
}

export default AddRestaurants
