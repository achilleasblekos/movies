import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });

            // Construct the new review object
            const newReview = { body: rev.value };
            // console.log("New Review:", newReview);

            // Update the reviews state by adding the new review body
            const updatedReviews = [...reviews, newReview];
            // console.log("Updated Reviews:", updatedReviews);
            setReviews(updatedReviews);

            // Clear the review input
            rev.value = "";
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                    <hr />
                    {reviews && reviews.map((review, index) => (
                        <React.Fragment key={index}>
                            <Row>
                                <Col>{review.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </React.Fragment>
                    ))}

                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews
