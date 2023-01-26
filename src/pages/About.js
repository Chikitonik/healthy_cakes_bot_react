import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <h1>About</h1>
      <br />
      <p>Admins and customers can hang out here.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default About;
