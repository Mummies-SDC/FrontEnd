import React from 'react';
import * as Styled from './styleSelectorThumbs.styles.js';
import { useOverviewContext } from '../overviewContextWrapper.jsx';

export default function StyleThumbsRender({ image, id }) {
  const { setStyleId, setStyleName, setMainPhoto, setSideScroll } = useOverviewContext();

  const handleStyleClick = () => {
    setMainPhoto('');
    setStyleName('');
    setSideScroll('');
    setStyleId(id);
  };
  return (
    <Styled.ThumbsDetail>
      <Styled.ThumbImage
        src={image}
        alt="cool scene"
        onClick={handleStyleClick}
      />
    </Styled.ThumbsDetail>
  );
}
