import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';

const PdfViewer = (props) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#previous"><i className="arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#previous"><i className="arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={() => setPage(page + 1)}><a href="#next">Next <i className="arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#next">Next <i className="arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  const canvasEl = useRef(null);

  const [loading, numPages] = usePdf({
    file: props.file,
    page,
    canvasEl
  });

  useEffect(() => {
    setPages(numPages);
  }, [numPages]);

  return (
    <div>
      {loading && <span>Loading...</span>}
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
  );
}

export default PdfViewer;
