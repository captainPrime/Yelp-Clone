import React, { useContext, useEffect, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/ReactContext'
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom"
import Starrating from '../Components/Starrating';
import Reviews from '../Components/Reviews';
import AddReview from '../Components/addReview';

function RestaurantDetail() {
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext)
    const {selectedReview, setSelectedReview} = useContext(RestaurantContext)
        //grabbing the specific restaurant details from the URL
        const {id} = useParams();
        let history = useHistory()

        //getting the restaurant by ID 
        useEffect(() =>{
            const fetchData = async () => {
                try {
                    let responseData = await RestaurantFinder.get(`/${id}`)
                    setSelectedRestaurant(responseData.data.data)
                    setSelectedReview(responseData.data.data.reviews)

                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }, [])


            return(
                    <div className="container" style={{textAlign: "center", padding: "20px"}}>
                        <h1>{selectedRestaurant && selectedRestaurant.restaurants.name}</h1>
                        <div>{selectedRestaurant && 
                            (
                                <>
                                <div className="mt-3">
                                    <Reviews reviews = {selectedReview}/>
                                </div>

                                <div className="mt-3">
                                    <AddReview />
                                </div>
                                </>
                            )
                        }</div> 
                    </div>
        )
}

export default RestaurantDetail
