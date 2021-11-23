import React, { useContext, useEffect, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/ReactContext'
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom" 

function UpdateRestaurant(props) {
    //grabbing the specific restaurant details from the URL
    const {id} = useParams();
    let history = useHistory()
    const [name, setName] =useState("")
    const [location, setLocation] =useState("")
    const [priceRange, setPrice] =useState("Price Range") 

    //getting the restaurant by ID 
    useEffect(() =>{
        const fetchData = async () => {
            let responseData = await RestaurantFinder.get(`/${id}`)
            let response = responseData.data.data.restaurants
            setName(response.name)
            setLocation(response.location)
            setPrice(response.price_range)
        }
        fetchData()
    }, [])

    //===========================================================================

    const handleSubmit = async (e) => {
        e.preventDefault()
        let isExecuted = window.confirm("Are you sure you want to update this restaurant?")
            if (isExecuted){
        const response = await RestaurantFinder.put(`/${id}`, {
            name,
            location, 
            price_range: priceRange
        })
        history.push("/")
    };
        
    }
    return (
        <div className="mb-4">
             <br />
             <form action=""> 
                <div>
                     <div className="form-group">
                         <label htmlFor="name">Name</label>
                         <input id="name"  value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                     </div>
                    
                     <div className="form-group"> 
                     <label htmlFor="location">Location</label>
                         <input id="location" value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" />
                     </div>
                    
                     <div className="form-group">
                     <label htmlFor="price_range">Price Range</label>
                        <select id="price_range" value={priceRange} onChange={e => setPrice(e.target.value)}
                         className="form-control custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                     </div>
                     <div className="form-group">
                     <button type="submit" onClick={handleSubmit} className="btn btn-primary col">Update</button>
                     </div>
                </div> 
            </form> 
        </div>
    )
}

export default UpdateRestaurant
