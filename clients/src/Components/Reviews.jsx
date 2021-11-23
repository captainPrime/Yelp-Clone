import React from 'react'
import Starrating from './Starrating'

function Reviews({reviews}) {
    return (
<div className="container">
        <div className="row">
            {
                reviews.map((review) => {

                    return(
                        <div className="col-4">
                        <div className="card text-white bg-primary mb-3 mr-4" >
                            <div className="card-header d-flex justify-content-between">
                                <span>{review.name}</span>
                                <span><Starrating rating={review.rating}/></span>
                            </div>
                            <div className="card-body">
                                <p style={{textAlign: "left"}} className="card-text">
                                {review.review}
                                </p>
                            </div>
                        </div>
                        </div>
                        
                    )

                })
            }
            
        </div>
        </div>
    )
}

export default Reviews
