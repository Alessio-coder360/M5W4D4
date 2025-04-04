



const MyFooter = () => {



    return (
      <div className="container py-4">
        <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>
  
          {/* Sezione icone */}
          <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <i className="bi bi-twitter fs-4"></i> {/* Twitter */}
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <i className="bi bi-facebook fs-4"></i> {/* Facebook */}
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <i className="bi bi-instagram fs-4"></i> {/* Instagram */}
              </a>
            </li>
          </ul>
  
          {/* Sezione link */}
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Features</a></li>
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Pricing</a></li>
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">FAQs</a></li>
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
      </div>
    );
  };
  
  export default MyFooter;
  