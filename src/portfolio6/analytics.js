// src/analytics.js
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-C08XRV7JE2"; // Replace with your GA4 Measurement ID

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
