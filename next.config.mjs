import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale/criacao-de-sites",
        destination: "/:locale/website-creation",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
