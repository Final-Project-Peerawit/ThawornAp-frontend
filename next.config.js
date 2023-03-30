const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
  env: {
    REACT_APP_URL: "http://localhost:5174",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/thaworn-ap/login",
        permanent: true,
      },
    ];
  },
};
