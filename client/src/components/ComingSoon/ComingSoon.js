import { Link } from "react-router-dom";

const ComingSoon = () => (
  <section id="error-page">
    <h1>Coming Soon!</h1>
    <p>The history feature is under development (o゜▽゜)o☆.</p>
    <Link to={`/`}>Go to lobby</Link>
  </section>
)

export default ComingSoon;