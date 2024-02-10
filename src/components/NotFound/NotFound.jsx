import Layout from "../Layout/Layout";
import "./notfound.css";
import heron from "./heronLogo.jpg";
import React from 'react';
export default function NotFound() {
  return (
    <Layout>
      <div className="not-found-div">
        <h1 className="not-found-title">404 Not Found</h1>
        <p>
          The page you are looking for either has been moved or does not exist.{" "}
          <a href="/">Please return to the home page here</a>
        </p>
        <img
          id={"heron-not-found-logo"}
          aria-label="heron logo"
          alt="logo"
          src={heron}
        />
      </div>
    </Layout>
  );
}
