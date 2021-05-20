import './App.css';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { animateScroll as scroll } from 'react-scroll'
import Swal from 'sweetalert2'

function App() {

  const [movies, setMovies] = useState([]);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [score, setScore] = useState('');


  const handleClick = (event) => {
    event.preventDefault();

    // if (title == '') {
    //   alert('Please enter a title!')
    // } else if (text == '') {
    //   alert('Please write a review!')
    // } 

    const movieRef = firebase.database().ref()

    const addReview = movieRef;


    addReview.push({
      title: title,
      text: text,
      score: score,
    })

    setTitle('');
    setText('');
    setScore('');

    scroll.scrollToBottom();

  }

  useEffect(() => {

    const movieRef = firebase.database().ref();

    movieRef.on('value', (response) => {

      const reviews = response.val();
      
      const newState = [];
      
      for (let key in reviews) {
        newState.push({key: key, name: reviews[key]});
        // console.log("test: ", key);
      }
      setMovies(newState);

      // const data = response.val(); 
    })
  }, []);

  const removeReview = (reviewID) => {
    const movieRef = firebase.database().ref();

    Swal.fire({
      title: 'Remove Review',
      text: 'Are you sure you want to remove this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#325ca8",
      cancelButtonColor: "#f25050",
      background: '#fc9d9d',
      iconColor: 'black'
    }).then((result) => {
      if (result.isConfirmed) {
      Swal.fire(
        {
          text: 'Removed',
          background: '#fc9d9d',
          confirmButtonColor: "#325ca8"
        }
        )
        movieRef.child(reviewID).remove();
    } 
  })
  }

  const returnToTop = () => {
    scroll.scrollToTop();
  }

  const about = () => {
    Swal.fire({
      icon: 'info',
      title: 'About MOOvies',
      text: 'Hello there! Welcome to my anonymous movie review board made using react.js and firebase! The app is fairly straightforward, go to the review form and write up a review of a film you love (or hate) following the parameters. Once you submit the review, it will be sent to a firebase database and then pushed onto the review board you see beneath the form.',
      background: '#fceaae',
      iconColor: 'black',
      confirmButtonColor: '#424242'
    })
  }

  return (
    <div className="wrapper">
      <header>
        <h1>MOOvies 🐄 🐄 🐄</h1>
        <button onClick={about} tabIndex="1">About</button>
      </header>
      <main>
        <form action="submit" onSubmit={handleClick}>
          <h2>Anonymous Film Review Form</h2>
          <label htmlFor="reviewTitle">Film Name: </label>
          <input required type="text" id="reviewTitle" onChange={(event) => setTitle(event.target.value)} value={title}></input>

          <label htmlFor="reviewText">Write Review Here:</label>
          <textarea required id="reviewText" onChange={(event) => setText(event.target.value)} value={text}></textarea>

          <label htmlFor="reviewScore">Score out of 10: </label>
          <input required type="number" id="reviewScore" max={10} min={1} onChange={(event) => setScore(event.target.value)} value={score} ></input>
          <button>Publish Review</button>
        </form>

      <div className="reviewBoard">
        <h2>Reviews</h2>
        <ul className="listFlex">
          {movies.map((movie) => {
            return (
              
              <li key={movie.key}>
                <div>
                  <h3 className="title">{movie.name.title}</h3>
                  <button onClick={() => removeReview(movie.key)}>Remove</button>
                </div>
                <p className="text">{movie.name.text}</p>
                <p className="score">{movie.name.score}/10</p>
              </li>
            )
          })}
        </ul>
      </div>
      <p onClick={returnToTop} className="return" tabIndex="0">Return to top</p>
      </main>
      <footer>
        <p>Created by Paul Szadurski at <a href="https://junocollege.com/">Juno College</a></p>
        <p>Background image created by <a href="https://unsplash.com/@jonatanmoerman">Jonatan Moerman</a></p>
      </footer>
    </div>
  );
}

export default App;
