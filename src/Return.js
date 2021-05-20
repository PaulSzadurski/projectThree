// Return.js
import { animateScroll as scroll } from 'react-scroll';

const Return = () => {

  const returnToTop = () => {
    scroll.scrollToTop();
  }

  // onClick calls a function which scrolls to the top of the page
  return (
    <button onClick = { returnToTop } className = "return" > Write Another Review</button >
  )
}

export default Return;