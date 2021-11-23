import React from 'react'

function Starrating({rating}) {
    const stars = []

    for (let i =1; i<=5; i++){
        //if rating = 4
        //if i is less than 4, keep pusshing a filled up star till i = 4
        if(i <= rating){
            stars.push(<i class="fas fa-star text-warning"></i>)
        }
        //half a star rating
        //Math.ceil rounds up a decimal number to the highest whole
        else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i class="fas fa-star-half-alt text-warning"></i>)
        }
        //if i is greater than rating keep pushing an empty star
        else{
            stars.push(<i class="far fa-star text-warning"></i>)
        }
    }

    return (
        <>{stars}</>
    )
}

export default Starrating
