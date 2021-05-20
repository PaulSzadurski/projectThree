// header.js
import Swal from 'sweetalert2';

const Header = () => {

  const about = () => {
    // SweetAlert2 popup
    Swal.fire({
      title: 'About Anonymovies',
      text: 'Hello there! Welcome to my anonymous movie review board made using react.js and firebase! The app is fairly straightforward, go to the review form and write up a review of a film you love (or hate), following the parameters. Once you submit the review, it will be sent to a firebase database and then pushed onto the review board you see beneath the form.',
      background: '#fceaae',
      iconColor: 'black',
      confirmButtonColor: '#424242'
    })
  }

  return(
    <header>
      <h1>Anonymovies</h1>
      {/* onClick calls a function which pops out a SweetAlert2 modal containing app info */}
      <button onClick={about} tabIndex="1">About</button>
    </header>
  )
}

export default Header;