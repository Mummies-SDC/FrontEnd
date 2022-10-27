import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Stars from './Stars.jsx';
import {
  StyledTile,
  TileFlex,
  SummaryDiv,
  StyledButton,
  ReviewImg,
  StyledResponse,
} from './ReviewTile.styles.js';

function ReviewTile({ review }) {
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);
  if (reportClicked) {
    return <div />;
  }
  const photoElements = review.photos.map((photo) => <ReviewImg key={photo.id} src={photo.url} alt="[Review]" />);
  return (
    <StyledTile
      rating={review.rating}
      starSize="28px"
      data-testid="review-tile"
    >
      <TileFlex styleFontSize="14px">
        <Stars />
        <div>
          {review.reviewer_name}
          ,&nbsp;
          {format(new Date(review.date), 'MMMM dd, yyyy')}
        </div>
      </TileFlex>
      <SummaryDiv>{review.summary}</SummaryDiv>
      <div>{review.body}</div>
      <div>
        {photoElements}
      </div>
      {review.recommend && <div>✓ I recommended this product</div>}
      {!!review.response && (
        <StyledResponse>
          <b>
            Response:
          </b>
          {review.response}
        </StyledResponse>
      )}
      <TileFlex
        justify="start"
        styleFontSize="14px"
        gap="20px"
      >
        {helpfulClicked ? (
          <span>
            Helpful?&nbsp;
            <u>Yes</u>
            &nbsp;&#40;
            {review.helpfulness + 1}
            &#41;
          </span>
        ) : (
          <span>
            Helpful?&nbsp;
            <StyledButton
              type="button"
              onClick={() => {
                axios.put(`/fec/reviews/${review.review_id}/helpful`)
                  .then(() => {
                    console.log('success');
                    setHelpfulClicked(true);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Yes
            </StyledButton>
            &nbsp;&#40;
            {review.helpfulness}
            &#41;
          </span>
        )}
        <span>&#124;</span>
        <StyledButton
          type="button"
          onClick={() => {
            axios.put(`/fec/reviews/${review.review_id}/report`)
              .then(() => {
                console.log('success');
                setReportClicked(true);
              })
              .catch((err) => console.log(err));
          }}
        >
          report
        </StyledButton>
      </TileFlex>
    </StyledTile>
  );
}

export default ReviewTile;
