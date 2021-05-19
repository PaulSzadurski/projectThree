import './App.css';
import { useEffect, useState } from 'react';
import firebase from './firebase';

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

  }

  // const handleReply = (event) => {
  //   event.preventDefault();
  //   return (
  //     <p>hello there</p>
  //   )
  // }

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

    movieRef.child(reviewID).remove();
  }

  // console.log('movies: ', movies);

  return (
    <div className="wrapper">
        <nav>
          <label htmlFor="about" tabIndex="0">About</label>
          <input type="checkbox" name="about" id="about"></input>
          <div className="about">
            <h2>About MOOvies</h2>
            <p>Hello there! Welcome to my anonymous movie review board made using react.js and firebase! The app is fairly straightforward, go to the review form and write up a review of a film you love (or hate) following the parameters. Once you submit the review, it will be sent to a firebase database and then pushed onto the review board you see beneath the form.</p>
            <p>Click "About" again to remove this information.</p>
          </div>
        </nav>
      <header>
        <h1>Moovies 🐄 🐄 🐄</h1>
      </header>
      <main>
        <form action="submit" onSubmit={handleClick}>
          <h2>Anonymous Review Form</h2>
          <label htmlFor="reviewTitle">Film Name: </label>
          <input required type="text" id="reviewTitle" onChange={(event) => setTitle(event.target.value)} value={title}></input>

          <label htmlFor="reviewText">Write Review Here:</label>
          <textarea required id="reviewText" onChange={(event) => setText(event.target.value)} value={text}></textarea>

          <label htmlFor="reviewScore">Score out of 10: </label>
          <input required type="number" id="reviewScore" max={10} min={1} onChange={(event) => setScore(event.target.value)} value={score} required></input>
          <button>Publish Review</button>
        </form>
        <ul className="listFlex">
          {movies.map((movie) => {
            return (
              
              <li key={movie.key}>
                <div>
                  <p className="title">{movie.name.title}</p>
                  <button onClick={() => removeReview(movie.key)}>Remove Review </button>
                </div>
                <p className="text">{movie.name.text}</p>
                <p className="score">{movie.name.score}/10</p>
              </li>
            )
          })}
      </ul>
      </main>
      <footer>
        <p>Created by Paul Szadurski at Juno College</p>
      </footer>
    </div>
  );
}

export default App;
