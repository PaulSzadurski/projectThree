// Return.js
import { animateScroll as scroll } from 'react-scroll';

const Return = () => {

  const returnToTop = () => {
    scroll.scrollToTop();
  }

  return (
    <button onClick = { returnToTop } className = "return" tabIndex = "0" > Write Another Review</button >
  )
}

export default Return;