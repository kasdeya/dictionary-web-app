import { useState } from 'react';
import './App.css';
import apiClient from './services/api-client';
import playBtn from './assets/images/icon-play.svg';
import searchBtn from './assets/images/icon-search.svg';
import Navbar from './Navbar';
import NotFoundPage from './NotFoundPage';

interface Phonetic {
  text: string;
  audio: string;
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

interface Result {
  word: string;
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrls: string[];
}

function App(): JSX.Element {
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<Result[] | undefined>();
  const [notFound, setNotFound] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    setData(undefined);
    setInvalidInput(false);
    e.preventDefault();
    apiClient
      .get<Result[]>(input)
      .then((res) => {
        setData(res.data);
        setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  };

  const handlePlayAudio = (audioUrl: string): void => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <main className="app">
      <Navbar />
      <form id="search-form" onSubmit={handleSubmit}>
        <div className="searchbar">
          <label htmlFor="searchInput"></label>
          <input
            id="searchInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            style={
              invalidInput
                ? {
                    border: '1px solid red',
                  }
                : {}
            }
            placeholder="Search for any word..."
            onInvalid={(e) => {
              e.preventDefault();
              setInvalidInput(true);
            }}
          />
          <button type="submit">
            <img src={searchBtn} alt="search" />
          </button>
        </div>
        {invalidInput && (
          <span className="warning">Whoops, can't be empty...</span>
        )}
      </form>
      {notFound && <NotFoundPage />}
      {data &&
        data.map((result) => (
          <section key={result.word} className="result">
            <div className="word">
              <h2>{result.word}</h2>
              {result.phonetics.map((phonetic) => {
                if (phonetic.audio) {
                  return (
                    // <div className="phonetic">
                    <>
                      <p className="accent">{phonetic.text}</p>
                      <button onClick={() => handlePlayAudio(phonetic.audio)}>
                        {' '}
                        <img src={playBtn} alt="play audiot" />
                      </button>
                    </>
                    // </div>
                  );
                }
              })}
            </div>
            {result.meanings.map((meaning) => (
              <div key={meaning.partOfSpeech} className="meaning">
                <h3>
                  <span>{meaning.partOfSpeech}</span>
                </h3>
                <p className="muted">Meaning</p>
                {meaning.definitions.map((definition) => (
                  <div key={definition.definition}>
                    <ul>
                      <li>{definition.definition}</li>
                    </ul>
                    {definition.example && (
                      <p className="muted example">"{definition.example}"</p>
                    )}
                  </div>
                ))}
                <div className="synonyms">
                  {meaning.synonyms.length > 0 && (
                    <p className="muted">Synonyms</p>
                  )}
                  {meaning.synonyms.map((synonym) => (
                    <button
                      form="search-form"
                      className="accent synonym"
                      type="submit"
                      onClick={(e) => {
                        setInput(
                          `${e.currentTarget.childNodes[0].textContent}`
                        );
                      }}
                    >
                      {synonym}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {result.sourceUrls.map((source) => (
              <div className="source">
                <p>Source</p>
                <a href={source}>{source}</a>
              </div>
            ))}
          </section>
        ))}
    </main>
  );
}

export default App;
