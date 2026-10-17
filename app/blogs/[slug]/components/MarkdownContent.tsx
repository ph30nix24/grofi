import { AlertCircle, Info, Lightbulb } from "lucide-react";
import ContentImage from "./ContentImage";

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
interface BlockImage {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
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
  | BlockHR
  | BlockImage;

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

    // Standalone Markdown Image (![alt](url) or ![alt](url "title"))
    const imgMatch = line.match(/^!\[([\s\S]*?)\]\(([\s\S]*?)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1].trim();
      const rawTarget = imgMatch[2].trim();
      const titleMatch = rawTarget.match(/^(\S+)(?:\s+["']([\s\S]*?)["'])?$/);
      const src = titleMatch ? titleMatch[1] : rawTarget;
      const caption = titleMatch && titleMatch[2] ? titleMatch[2].trim() : alt;

      blocks.push({
        type: "image",
        src,
        alt: alt || "Blog illustration",
        caption: caption || undefined,
      });
      i++;
      continue;
    }

    // Standalone HTML Image (<img ...>)
    const htmlImgMatch = line.match(/^<img\s+([^>]*?)\/?>$/i);
    if (htmlImgMatch) {
      const attrs = htmlImgMatch[1];
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
      if (srcMatch) {
        const src = srcMatch[1].trim();
        const alt = altMatch ? altMatch[1].trim() : "Blog illustration";
        blocks.push({
          type: "image",
          src,
          alt,
          caption: alt && alt !== "Blog illustration" ? alt : undefined,
        });
        i++;
        continue;
      }
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
      !lines[i].trim().startsWith("<img") &&
      !(
        /^\*\*\s*(.+?)\s*\*\*:?$/.test(lines[i].trim()) &&
        lines[i].trim().length < 160
      )
    ) {
      pLines.push(lines[i].trim());
      i++;
    }

    if (pLines.length > 0) {
      blocks.push({
        type: "p",
        text: pLines.join(" "),
      });
    } else {
      // Safety net: if the line failed every previous block check and the paragraph condition,
      // consume it as a plain paragraph to guarantee progress and prevent an infinite loop.
      blocks.push({
        type: "p",
        text: lines[i].trim(),
      });
      i++;
    }
  }

  return blocks;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  // Helper to render inline markdown: **bold**, *italic*, `code`, ![image](url), [link](url)
  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let keyIdx = 0;

    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\))/g;
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
      } else if (match[6] !== undefined) {
        // ![image](url)
        const altText = match[5]?.trim() || "Blog illustration";
        let target = match[6].trim();
        let caption = altText;
        const titleM = target.match(/^(\S+)(?:\s+["']([\s\S]*?)["'])?$/);
        if (titleM) {
          target = titleM[1];
          if (titleM[2]) caption = titleM[2].trim();
        }
        parts.push(
          <ContentImage
            key={keyIdx++}
            src={target}
            alt={altText}
            caption={caption}
            inline
          />
        );
      } else if (match[7] && match[8]) {
        // [link](url)
        parts.push(
          <a
            key={keyIdx++}
            href={match[8]}
            target={match[8].startsWith("http") ? "_blank" : undefined}
            rel={match[8].startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary hover:text-gold underline underline-offset-2 font-semibold transition-colors"
          >
            {match[7]}
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
    <div className="space-y-5 text-gray-700 font-montserrat text-base sm:text-lg leading-relaxed w-full min-w-0 max-w-full wrap-break-word">
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
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold font-bricolage text-[#02282C] pt-6 sm:pt-8 pb-1 tracking-tight border-b border-gray-200/80 mt-8 sm:mt-10 first:mt-0 wrap-break-word"
              >
                {renderInline(block.text)}
              </h2>
            );

          case "h2":
            return (
              <h3
                key={idx}
                id={getSlugId(block.text)}
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold font-bricolage text-[#02282C] pt-5 sm:pt-6 pb-1 tracking-tight mt-6 sm:mt-8 wrap-break-word"
              >
                {renderInline(block.text)}
              </h3>
            );

          case "h3":
            return (
              <h4
                key={idx}
                id={getSlugId(block.text)}
                className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold font-bricolage text-primary pt-4 mt-5 sm:mt-6 wrap-break-word"
              >
                {renderInline(block.text)}
              </h4>
            );

          case "h4":
            return (
              <h5
                key={idx}
                id={getSlugId(block.text)}
                className="text-base xs:text-lg sm:text-xl font-bold font-bricolage text-gray-900 pt-2 mt-4 wrap-break-word"
              >
                {renderInline(block.text)}
              </h5>
            );

          case "subheading":
            return (
              <div
                key={idx}
                className="text-base xs:text-lg sm:text-xl font-bold font-bricolage text-[#02282C] mt-5 sm:mt-6 mb-2 flex items-center gap-2 wrap-break-word"
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
                className={`my-5 sm:my-6 p-4 sm:p-5 rounded-2xl border ${
                  isWarning
                    ? "bg-amber-50/80 border-amber-300 text-amber-950"
                    : isTip
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                    : "bg-[#F4F2EC] border-primary/20 text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2 font-bold font-bricolage text-xs sm:text-sm md:text-base uppercase tracking-wider mb-1.5">
                  {isTip ? (
                    <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isWarning ? (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-primary shrink-0" />
                  )}
                  <span>{block.title}</span>
                </div>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed wrap-break-word">
                  {renderInline(block.text)}
                </div>
              </div>
            );
          }

          case "table":
            return (
              <div key={idx} className="my-6 sm:my-8">
                <div className="overflow-x-auto rounded-2xl border border-gray-200/90 shadow-2xs scrollbar-hidden">
                  <table className="w-full min-w-120 text-left text-xs sm:text-sm md:text-base font-montserrat">
                    <thead className="bg-[#02474D] text-white">
                      <tr>
                        {block.headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            className="px-3.5 sm:px-5 py-3 font-bold font-bricolage tracking-wide whitespace-nowrap text-xs sm:text-sm md:text-base"
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
                              className="px-3.5 sm:px-5 py-2.5 sm:py-3 text-gray-700 leading-normal text-xs sm:text-sm md:text-base"
                            >
                              {renderInline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="sm:hidden text-[11px] text-gray-400 text-right mt-1.5 font-montserrat">
                  Swipe table to view more &rarr;
                </p>
              </div>
            );

          case "ul":
            return (
              <ul
                key={idx}
                className="my-4 space-y-2.5 pl-4 sm:pl-7 list-disc marker:text-gold text-base sm:text-lg text-gray-700 font-normal leading-relaxed wrap-break-word"
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
                className="my-4 space-y-2.5 pl-4 sm:pl-7 list-decimal marker:text-primary font-medium text-base sm:text-lg text-gray-700 leading-relaxed wrap-break-word"
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
                className="border-l-4 border-gold bg-[#FDFBF7] p-4 sm:p-5 rounded-r-2xl my-6 text-gray-800 italic text-base sm:text-lg shadow-2xs wrap-break-word"
              >
                {renderInline(block.text)}
              </blockquote>
            );

          case "image":
            return (
              <ContentImage
                key={idx}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            );

          case "hr":
            return <hr key={idx} className="my-10 border-gray-200" />;

          case "p":
          default:
            return (
              <p
                key={idx}
                className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed my-3 wrap-break-word"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
