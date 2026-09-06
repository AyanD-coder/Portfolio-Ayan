function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
