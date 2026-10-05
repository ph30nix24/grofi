import { AlertCircle, Info, Lightbulb } from "lucide-react";

interface MarkdownContentProps {
  content: string;
}

interface BlockH1 {
  type: "h1";
  text: string;
}
interface BlockH2 {
  type: "h2";
  text: string;
}
interface BlockH3 {
  type: "h3";
  text: string;
}
interface BlockH4 {
  type: "h4";
  text: string;
}
interface BlockSubheading {
  type: "subheading";
  text: string;
}
interface BlockP {
  type: "p";
  text: string;
}
interface BlockUL {
  type: "ul";
  items: string[];
}
interface BlockOL {
  type: "ol";
  items: string[];
}
interface BlockTable {
  type: "table";
  headers: string[];
  rows: string[][];
}
interface BlockCallout {
  type: "callout";
  title: string;
  text: string;
}
interface BlockBlockquote {
  type: "blockquote";
  text: string;
}
interface BlockHR {
  type: "hr";
}

type MarkdownBlock =
  | BlockH1
  | BlockH2
  | BlockH3
  | BlockH4
  | BlockSubheading
  | BlockP
  | BlockUL
  | BlockOL
  | BlockTable
  | BlockCallout
  | BlockBlockquote
  | BlockHR;

function parseMarkdownBlocks(rawContent: string): MarkdownBlock[] {
  const lines = rawContent.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // Skip standalone image blocks if they use missing local /uploads/
    if (line.startsWith("![") && line.endsWith(")")) {
      i++;
      continue;
    }

    // Horizontal rule
    if (line === "---" || line === "***" || line === "___") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Heading 1 (# ...)
    if (line.startsWith("# ")) {
      blocks.push({
        type: "h1",
        text: line.replace(/^#\s+/, "").trim(),
      });
      i++;
      continue;
    }

    // Heading 2 (## ...)
    if (line.startsWith("## ")) {
      blocks.push({
        type: "h2",
        text: line.replace(/^##\s+/, "").trim(),
      });
      i++;
      continue;
    }

    // Heading 3 (### ...)
    if (line.startsWith("### ")) {
      blocks.push({
        type: "h3",
        text: line.replace(/^###\s+/, "").trim(),
      });
      i++;
      continue;
    }

    // Heading 4 (#### ...)
    if (line.startsWith("#### ")) {
      blocks.push({
        type: "h4",
        text: line.replace(/^####\s+/, "").trim(),
      });
      i++;
      continue;
    }

    // Blockquote (> ...)
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      blocks.push({
        type: "blockquote",
        text: quoteLines.join(" "),
      });
      continue;
    }

    // Table (| ... |)
    if (line.startsWith("|") && line.includes("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        const bodyRows = tableLines
          .slice(2)
          .map((r) =>
            r
              .split("|")
              .map((c) => c.trim())
              .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          );
        blocks.push({
          type: "table",
          headers: headerRow,
          rows: bodyRows,
        });
      }
      continue;
    }

    // Bullet list (- ... or * ...)
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({
        type: "ul",
        items,
      });
      continue;
    }

    // Numbered list (1. ... or 2. ...)
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({
        type: "ol",
        items,
      });
      continue;
    }

    // Standalone bold subheading / question / callout (e.g. **Myth 1: ...** or ** Question? **)
    const boldMatch = line.match(/^\*\*\s*(.+?)\s*\*\*:?$/);
    if (boldMatch && line.length < 160) {
      const boldText = boldMatch[1].trim();

      // Check if it's a Callout (Tip, Disclaimer, Note)
      if (/^(tip|note|warning|disclaimer|important)/i.test(boldText)) {
        const calloutLines: string[] = [line];
        i++;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !lines[i].trim().startsWith("#") &&
          !lines[i].trim().startsWith("|") &&
          !lines[i].trim().startsWith(">")
        ) {
          calloutLines.push(lines[i].trim());
          i++;
        }
        blocks.push({
          type: "callout",
          title: boldText,
          text: calloutLines.slice(1).join(" ") || boldText,
        });
        continue;
      }

      blocks.push({
        type: "subheading",
        text: boldText,
      });
      i++;
      continue;
    }

    // Regular paragraph: gather consecutive lines until next block element
    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("|") &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      lines[i].trim() !== "---" &&
      !lines[i].trim().startsWith("![") &&
      !/^\*\*\s*(.+?)\s*\*\*:?$/.test(lines[i].trim())
    ) {
      pLines.push(lines[i].trim());
      i++;
    }

    if (pLines.length > 0) {
      blocks.push({
        type: "p",
        text: pLines.join(" "),
      });
    }
  }

  return blocks;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  // Helper to render inline markdown: **bold**, *italic*, `code`, [link](url)
  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let keyIdx = 0;

    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[2]) {
        // **bold**
        parts.push(
          <strong key={keyIdx++} className="font-bold text-gray-950">
            {match[2].trim()}
          </strong>
        );
      } else if (match[3]) {
        // *italic*
        parts.push(
          <em key={keyIdx++} className="italic text-gray-800">
            {match[3]}
          </em>
        );
      } else if (match[4]) {
        // `code`
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded bg-gray-100 text-primary text-xs font-mono"
          >
            {match[4]}
          </code>
        );
      } else if (match[5] && match[6]) {
        // [link](url)
        parts.push(
          <a
            key={keyIdx++}
            href={match[6]}
            target={match[6].startsWith("http") ? "_blank" : undefined}
            rel={match[6].startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary hover:text-gold underline underline-offset-2 font-semibold transition-colors"
          >
            {match[5]}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const getSlugId = (txt: string) =>
    txt.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Determine if first block is an H1 that duplicates the post title
  const shouldSkipFirstH1 =
    blocks.length > 0 &&
    blocks[0].type === "h1" &&
    blocks[0].text.length > 10;

  return (
    <div className="space-y-5 text-gray-700 font-montserrat text-base sm:text-lg leading-relaxed">
      {blocks.map((block, idx) => {
        // Skip duplicate H1 at the very beginning of the post body
        if (idx === 0 && shouldSkipFirstH1) {
          return null;
        }

        switch (block.type) {
          case "h1":
            return (
              <h2
                key={idx}
                id={getSlugId(block.text)}
                className="text-2xl sm:text-3xl font-extrabold font-bricolage text-[#02282C] pt-8 pb-1 tracking-tight border-b border-gray-200/80 mt-10 first:mt-0"
              >
                {renderInline(block.text)}
              </h2>
            );

          case "h2":
            return (
              <h3
                key={idx}
                id={getSlugId(block.text)}
                className="text-xl sm:text-2xl font-bold font-bricolage text-[#02282C] pt-6 pb-1 tracking-tight mt-8"
              >
                {renderInline(block.text)}
              </h3>
            );

          case "h3":
            return (
              <h4
                key={idx}
                id={getSlugId(block.text)}
                className="text-lg sm:text-xl font-bold font-bricolage text-primary pt-4 mt-6"
              >
                {renderInline(block.text)}
              </h4>
            );

          case "h4":
            return (
              <h5
                key={idx}
                id={getSlugId(block.text)}
                className="text-base sm:text-lg font-bold font-bricolage text-gray-900 pt-2 mt-4"
              >
                {renderInline(block.text)}
              </h5>
            );

          case "subheading":
            return (
              <div
                key={idx}
                className="text-base sm:text-lg font-bold font-bricolage text-[#02282C] mt-6 mb-2 flex items-center gap-2"
              >
                <span className="w-1.5 h-4 rounded-full bg-gold shrink-0" />
                <span>{renderInline(block.text)}</span>
              </div>
            );

          case "callout": {
            const isWarning = /warning|alert/i.test(block.title);
            const isTip = /tip|recommend/i.test(block.title);
            return (
              <div
                key={idx}
                className={`my-6 p-4 sm:p-5 rounded-2xl border ${
                  isWarning
                    ? "bg-amber-50/80 border-amber-300 text-amber-950"
                    : isTip
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                    : "bg-[#F4F2EC] border-primary/20 text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2 font-bold font-bricolage text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                  {isTip ? (
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                  ) : isWarning ? (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Info className="w-4 h-4 text-primary" />
                  )}
                  <span>{block.title}</span>
                </div>
                <div className="text-sm sm:text-base leading-relaxed">
                  {renderInline(block.text)}
                </div>
              </div>
            );
          }

          case "table":
            return (
              <div
                key={idx}
                className="my-8 overflow-x-auto rounded-2xl border border-gray-200/90 shadow-2xs"
              >
                <table className="w-full text-left text-xs sm:text-sm font-montserrat">
                  <thead className="bg-[#02474D] text-white">
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 sm:px-5 py-3.5 font-bold font-bricolage tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={
                          rIdx % 2 === 0
                            ? "bg-white hover:bg-gray-50/60"
                            : "bg-[#FDFBF7] hover:bg-gray-50/60"
                        }
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-4 sm:px-5 py-3 text-gray-700 leading-normal"
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "ul":
            return (
              <ul
                key={idx}
                className="my-4 space-y-2.5 pl-5 sm:pl-7 list-disc marker:text-gold text-base sm:text-lg text-gray-700 font-normal leading-relaxed"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol
                key={idx}
                className="my-4 space-y-2.5 pl-5 sm:pl-7 list-decimal marker:text-primary font-medium text-base sm:text-lg text-gray-700 leading-relaxed"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="pl-1 font-normal text-gray-700">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );

          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-gold bg-[#FDFBF7] p-4 sm:p-5 rounded-r-2xl my-6 text-gray-800 italic text-base sm:text-lg shadow-2xs"
              >
                {renderInline(block.text)}
              </blockquote>
            );

          case "hr":
            return <hr key={idx} className="my-10 border-gray-200" />;

          case "p":
          default:
            return (
              <p
                key={idx}
                className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed my-3"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
