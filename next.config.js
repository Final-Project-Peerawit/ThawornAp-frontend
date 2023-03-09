const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
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
