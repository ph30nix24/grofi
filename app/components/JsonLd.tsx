import React from "react";

export type JsonLdValue = Record<string, any> | Array<Record<string, any>> | string;

export interface JsonLdProps {
  /** The structured data JSON-LD object, array, or pre-serialized JSON string */
  schema?: JsonLdValue | null;
  /** Alias for schema prop for ergonomic flexibility */
  data?: JsonLdValue | null;
  /** Optional element ID for script tag */
  id?: string;
}

/**
 * Shared JsonLd component for injecting Schema.org structured data.
 * Safely serializes data to JSON and escapes '<' characters to prevent script injection.
 */
export default function JsonLd({ schema, data, id }: JsonLdProps) {
  const content = schema ?? data;
  if (!content) return null;

  const rawJson = typeof content === "string" ? content : JSON.stringify(content);

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: rawJson.replace(/</g, "\\u003c"),
      }}
    />
  );
}
