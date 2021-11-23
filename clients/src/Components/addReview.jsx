import React, { useContext, useState } from 'react'
import ReviewFinder from '../apis/ReviewFinder'
import {useParams} from "react-router-dom";
import { RestaurantContext } from '../context/ReactContext';

function AddReview() {
    const [name, setName] = useState("")
    const [rating, setRating] = useState("Rating")
    const [review, setReview] = useState("")

    const {addNewReview} = useContext(RestaurantContext)
    const {id} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await ReviewFinder.post("/", 
            {
                name,
                rating,
                review,
                restaurant_id: id
            })
            addNewReview(response.data.data.AddedReview)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="mb-4">
                <br />
                <form action="">
                    <div className="form-row row">
                        <div className="form-group col-8">
                            <label style={{float: "left"}} htmlFor="name">Name</label>
                            <input type="text" value={name} onChange = {e => setName(e.target.value)} id="name" className="form-control"/>
                        </div>
                        <div className="form-group col-4">
                            <label style={{float: "left"}} htmlFor="rating">Rating</label>
                            <select
                            value={rating} 
                            onChange = {e => setRating(e.target.value)}
                             id="rating" className="form-control custom-select">
                                <option disabled>Rating</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label style={{float: "left"}} htmlFor="review">Review</label>
                            <textarea 
                            value={review} onChange = {e => setReview(e.target.value)}
                            className="form-control" placeholder="your review"></textarea>
                    </div>
                    <br />
                    
                    <button className="btn btn-primary" onClick={handleSubmit} style={{float: "left"}}>Submit </button>
                   
                </form>
            </div>
        </div>
    )
}

export default AddReview
