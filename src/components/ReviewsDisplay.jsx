import React from 'react'

const ReviewsDisplay = () => {

    // get reviews fetch API for a given restaurant or pass down as prop

    // render any reviews from the database above API reviews

    // render reviews from APIs -- limit display to 10-20 reviews for project scope

    // add 'Add Review' button - render ReviewContainer as a modal on click


    // style notes: add overflow property for scroll feature

    // dummy data
    const reviews = [{
        reviewer: 'Janica',
        review: 'this place is lit',
        rating: 4.5,
    }]

    // render logic -- not done
    reviews.map((review) => {
        return (
          <div className='review'>
            <span>{review.reviewer} says...</span>
            <span>{review.review}</span>

          </div>
        );
    })

  return (
    <div>ReviewsDisplay</div>
    
  )
}

export default ReviewsDisplay