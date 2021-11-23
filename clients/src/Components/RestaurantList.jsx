import React, {useEffect, useContext, useState, lazy} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/ReactContext'
import {useHistory} from "react-router-dom" 
function RestaurantList (props) {

    //this saves the retrieved data in a context from the 
    //context folder
    const {restaurants, setRestaurants} = useContext(RestaurantContext)

    //browser history
    let history = useHistory()
//-------------------------------------------------------------------------------
   useEffect(() => {
        const fetchData = async () =>{
            try {
                //this goes ahead and GETS the 
                //link http://localhost:3001/api/v1/restaurant "/" at the back
                //from Restaurantfinder in API folder
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)

                console.log(response.data.data.restaurants)
            } catch (error) {}
        }

        fetchData()
       
    }, [])

    //====================DELETE============================================----
    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {

            let isExecuted = window.confirm("Are you sure you want to delete this restaurant?")
            if (isExecuted){
            const response = await RestaurantFinder.delete(`/${id}`)
            //to make it populate back immediately, 
            //we will return all the restaurant that doesnt match the ID(parameter)
            setRestaurants(restaurants.filter(restaurant =>{
                return restaurant.id !== id
            }))

        }
            
        } catch (error) {
            
        } 

    }

    const handleUpdate = async (e,id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }
    //---------------------------------------------------------------------------------------
    return (
        <div>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Restaurant</th>
                            <th scope="col">Location</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rendering the restaurant result */}
                        { restaurants && restaurants.map(restaurant =>{
                            return(
                                <tr style={{cursor: "pointer"}} onClick={()=> handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{"$".repeat(restaurant.price_range)}</td>
                                    <td>reviews</td>
                                    <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                                    <td><button onClick={(e) => handleDelete(e, restaurant.id)}  className="btn btn-danger">Delete</button></td>
                                </tr>
                            ) 
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RestaurantList
