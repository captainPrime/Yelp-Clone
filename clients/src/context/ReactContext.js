import React, {useState, createContext} from "react";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props =>{

    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    const [selectedReview, setSelectedReview] = useState([])
    //update our front end while adding new restaurant

    const addRestaurants = (newrestaurant) => {
        setRestaurants([ newrestaurant, ...restaurants])
    }

    const addNewReview = (newreviews) => {
        setSelectedReview([ newreviews, ...selectedReview])
    }

    const UpdateRestaurants = () =>{
        setRestaurants([...restaurants])
    }

    //--------------------------------------------------

    return (
        <RestaurantContext.Provider value={{restaurants, setRestaurants, addRestaurants, UpdateRestaurants, selectedRestaurant, setSelectedRestaurant, selectedReview, setSelectedReview,  addNewReview}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}

//NOTE - IMPORTANT