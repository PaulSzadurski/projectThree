import './App.css';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { animateScroll as scroll } from 'react-scroll';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';
import Return from './Return';


function App() {

  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [score, setScore] = useState('');

  // pulls data from firebase and places into an array
  useEffect(() => {

    const movieRef = firebase.database().ref();

    movieRef.on('value', (response) => {

      const reviews = response.val();

      const newState = [];

      for (let key in reviews) {
        newState.push({ key: key, name: reviews[key] });
      }
      setMovies(newState);

    })
  }, []);

  // event handler function which occurs once a review is submitted, adds the review to firebase and then it is pushed onto the page
  const handleClick = (event) => {
    event.preventDefault();

    const movieRef = firebase.database().ref()

    const addReview = movieRef;

    addReview.push({
      title: title,
      text: text,
      score: score,
    })

    // form input fields are cleared upon submission
    setTitle('');
    setText('');
    setScore('');

    scroll.scrollToBottom();
  }

  // event handler function which occurs if the "remove" button is clicked on a review
  const removeReview = (reviewID) => {
    const movieRef = firebase.database().ref();

    // SweetAlert2 popup
    Swal.fire({
      title: 'Remove Review',
      text: 'Are you sure you want to remove this?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#325ca8",
      cancelButtonColor: "#f25050",
      background: '#fc9d9d',
      iconColor: 'black',
    }).then((result) => {
      if (result.isConfirmed) {
      Swal.fire({
          text: 'Removed',
          background: '#fc9d9d',
          confirmButtonColor: "#325ca8",
        })
        // review is removed from firebase + from the review board
        movieRef.child(reviewID).remove();
    } 
  })
  }

  // html content
  return (
    <div className="wrapper">
      <Header />

      <main>
        {/* form to submit a review to firebase + webpage */}
        {/* onChanges at each input allows respective values to change based on user inputs */}
        <form action="submit" onSubmit={handleClick}>
          <h2>Film Review Form</h2>
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
            {/* reviews from firebase are mapped out onto the review board */}
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
        <Return />
      </main>
      <Footer />
    </div>
  );
}

export default App;
