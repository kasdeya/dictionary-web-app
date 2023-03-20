import './NotFoundPage.css';
const NotFoundPage = () => {
  return (
    <div className="notFound">
      <h2>😕</h2>
      <h3>No Definitions Found</h3>
      <p className="muted">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </div>
  );
};

export default NotFoundPage;
