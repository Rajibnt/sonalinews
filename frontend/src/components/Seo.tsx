import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
};

export default function Seo({ title, description, url, image }: SeoProps) {
  const finalUrl = url ?? process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const finalImage = image ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": finalUrl,
    ...(finalImage && { image: finalImage }),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {finalUrl && <meta property="og:url" content={finalUrl} />}
      <meta property="og:type" content="website" />
      {finalImage && <meta property="og:image" content={finalImage} />}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {finalImage && <meta name="twitter:image" content={finalImage} />}
      {/* JSON‑LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}
