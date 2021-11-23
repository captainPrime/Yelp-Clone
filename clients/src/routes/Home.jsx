import React from 'react'
import Header from '../Components/Header'
import AddRestaurants from '../Components/AddRestaurants'
import RestaurantList from '../Components/RestaurantList'
const Home = () => {
    return (
        <div>
            <Header title="Restaurant Finder"></Header>
            <AddRestaurants></AddRestaurants>
            <RestaurantList></RestaurantList>
        </div>
    )
}

export default Home
 