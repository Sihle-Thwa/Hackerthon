function Register() {
  return (
    <div className="d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <div className="card-title justify-content-between d-flex">
            <h1>Register Now</h1>
            <p className="text">
              {" "}
              <span>
                {" "}
                <a href="#">Log in to your account</a>
              </span>
            </p>
          </div>
          <form>
            <div className="mb-3 justify-content-between d-block">
              <label htmlFor="InputEmail1" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="InputEmail1" />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
              />
            </div>
            <div>
              <div className="m-3 justify-content-between d-flex">
                <a href="#" className="text "></a>
                <button className="btn btn-primary">Register</button>
              </div>
            </div>
          </form>
          <div className="striped">
            <span className="striped-line"></span>
            <span className="striped-text">Or</span>
            <span className="striped-line"></span>
          </div>
          <div className="btn btn-light">
            <i className="bi bi-google"></i>
            <span>Register with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
