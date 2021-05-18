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

    const movieRef = firebase.database().ref()

    const addReview = movieRef;

    addReview.push({
      title: title,
      text: text,
      score: score,
    })
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
      <header>
        <h1>Moovies 🐄 🐄 🐄</h1>
      </header>
      <main>
        <form action="submit">
          <h2>Anonymous Review Form</h2>
          <label htmlFor="reviewTitle">Film Name: </label>
          <input type="text" id="reviewTitle" onChange={(event) => setTitle(event.target.value)} value={title}></input>

          <label htmlFor="reviewText">Write Review Here:</label>
          <textarea id="reviewText" onChange={(event) => setText(event.target.value)} value={text}></textarea>

          <label htmlFor="reviewScore">Score out of 10: </label>
          <input type="number" id="reviewScore" max={10} min={1} onChange={(event) => setScore(event.target.value)} value={score}></input>

          <button onClick={handleClick}>Publish Review</button>
        </form>
        <ul className="listFlex">
          {movies.map((movie) => {
            return (
              
              <li key={movie.key}>
                {/* {console.log(movie.key)} */}
                <div>
                  <p className="title">{movie.name.title}</p>
                  <button onClick={() => removeReview(movie.key)}>Remove Review</button>
                </div>
                <p className="text">{movie.name.text}</p>
                <p className="score">{movie.name.score}/10</p>

                {/* <form action="submit">
                  <label htmlFor="reply">Write a Reply:</label>
                  <textarea id={"reply" + movie.title}></textarea>

                  <button onClick={(event) => {
                    event.preventDefault();
                    console.log(document.getElementById('reply' + movie.title).value);
                    const replyValue = document.getElementById('reply' + movie.title).value;
                    
                    const node = document.createElement("li");
                    const textnode = document.createTextNode(replyValue);
                    console.log(textnode);
                    node.appendChild(textnode);
                    document.getElementById('replies' + movie.title).appendChild(node)
                  } }>Submit Reply</button>
                </form>

                <ul id={'replies' + movie.title}>

                </ul> */}
              </li>
            )
          })}
      </ul>
      </main>
    </div>
  );
}

export default App;
