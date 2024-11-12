import backgroundImage from "../assets/landingImage.jpg";
import Login from "../components/Login";

function LandingPage() {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    height: "90vh",
    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(3px)",
    paddingLeft: "0px",
  };

  return (
    <>
      <div style={styles} className="container"></div>
      <div className="">
        <Login />
      </div>
    </>
  );
}

export default LandingPage;
