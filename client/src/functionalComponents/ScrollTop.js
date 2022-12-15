//importing main links
import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

//scroll to top function for display use on navlink clicks
function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);