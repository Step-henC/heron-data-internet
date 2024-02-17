import Layout from "../Layout/Layout";

export default function ContactError() {
  return (
    <Layout>
      <div className="contact-response-page">
        <h1>We are Sorry!</h1>
        <p>There was an error sending your message</p>
        <p>Please try again later</p>

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
