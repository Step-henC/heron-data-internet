import Layout from "../Layout/Layout";

export default function ContactSuccess() {
  return (
    <Layout>
      <div className="contact-response-page">
        <h1>Your Email Has Been Sent!</h1>
        <p>One of our representatives will respond to within a week</p>
        <small className="hom-link-small">
        <a href="/" style={{ color: "black" }}>
            <strong style={{ color: "black" }}>
              &larr; Return to Home Page
            </strong>
          </a>
        </small>
      </div>
    </Layout>
  );
}
