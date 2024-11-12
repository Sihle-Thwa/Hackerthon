import "../styles/landingPage.css";

function Login() {
  return (
    <div className="d-flex justify-content-center top-50">
      <div className="card w-50">
        <div className="card-body">
          <div className="card-title justify-content-between d-flex">
            <h1>Welcome Back!</h1>
            <p className="text">
              New user?{" "}
              <span>
                {" "}
                <a href="#">Create an account</a>
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
              <div className="m-3 justify-content-between d-flex">
                <a href="#" className="text ">
                  Forgot Password?
                </a>
                <button className="btn btn-primary">Sign In</button>
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
            <span>Sign in with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
