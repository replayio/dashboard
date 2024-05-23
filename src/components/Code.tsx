import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { InputHTMLAttributes, useState } from "react";
import type { BundledLanguage, ThemeRegistration } from "shiki";
import { codeToHtml } from "shiki";

export function Code({
  code,
  className = "",
  lang = "javascript",
  ...rest
}: InputHTMLAttributes<HTMLElement> & {
  code: string;
  lang?: BundledLanguage;
}) {
  const [html, setHTML] = useState(code);

  useIsomorphicLayoutEffect(() => {
    codeToHtml(code, {
      lang,
      cssVariablePrefix: "shiki",
      theme,
    }).then(setHTML);
  });

  return (
    <code
      className={`bg-slate-950 text-white px-2 py-1 rounded whitespace-pre text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}

const theme: ThemeRegistration = {
  name: "replay",
  colors: {
    "editor.foreground": "var(--shiki-foreground)",
    "editor.background": "var(--shiki-background)",
  },
  tokenColors: [
    {
      scope: [
        "keyword.operator.accessor",
        "meta.group.braces.round.function.arguments",
        "meta.template.expression",
        "markup.fenced_code meta.embedded.block",
      ],
      settings: {
        foreground: "var(--shiki-foreground)",
      },
    },
    {
      scope: "emphasis",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: ["strong", "markup.heading.markdown", "markup.bold.markdown"],
      settings: {
        fontStyle: "bold",
      },
    },
    {
      scope: ["markup.italic.markdown"],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: "meta.link.inline.markdown",
      settings: {
        fontStyle: "underline",
        foreground: "var(--shiki-token-link)",
      },
    },
    {
      scope: ["string", "markup.fenced_code", "markup.inline"],
      settings: {
        foreground: "var(--shiki-token-string)",
      },
    },
    {
      scope: ["comment", "string.quoted.docstring.multi"],
      settings: {
        foreground: "var(--shiki-token-comment)",
      },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.other.placeholder",
        "constant.character.format.placeholder",
        "variable.language.this",
        "variable.other.object",
        "variable.other.class",
        "variable.other.constant",
        "meta.property-name",
        "meta.property-value",
        "support",
      ],
      settings: {
        foreground: "var(--shiki-token-constant)",
      },
    },
    {
      scope: [
        "keyword",
        "storage.modifier",
        "storage.type",
        "storage.control.clojure",
        "entity.name.function.clojure",
        "entity.name.tag.yaml",
        "support.function.node",
        "support.type.property-name.json",
        "punctuation.separator.key-value",
        "punctuation.definition.template-expression",
      ],
      settings: {
        foreground: "var(--shiki-token-keyword)",
      },
    },
    {
      scope: "variable.parameter.function",
      settings: {
        foreground: "var(--shiki-token-parameter)",
      },
    },
    {
      scope: [
        "support.function",
        "entity.name.type",
        "entity.other.inherited-class",
        "meta.function-call",
        "meta.instance.constructor",
        "entity.other.attribute-name",
        "entity.name.function",
        "constant.keyword.clojure",
      ],
      settings: {
        foreground: "var(--shiki-token-function)",
      },
    },
    {
      scope: [
        "entity.name.tag",
        "string.quoted",
        "string.regexp",
        "string.interpolated",
        "string.template",
        "string.unquoted.plain.out.yaml",
        "keyword.other.template",
      ],
      settings: {
        foreground: "var(--shiki-token-string-expression)",
      },
    },
    {
      scope: [
        "punctuation.definition.arguments",
        "punctuation.definition.dict",
        "punctuation.separator",
        "meta.function-call.arguments",
      ],
      settings: {
        foreground: "var(--shiki-token-punctuation)",
      },
    },
    {
      // [Custom] Markdown links
      scope: ["markup.underline.link", "punctuation.definition.metadata.markdown"],
      settings: {
        foreground: "var(--shiki-token-link)",
      },
    },
    {
      // [Custom] Markdown list
      scope: ["beginning.punctuation.definition.list.markdown"],
      settings: {
        foreground: "var(--shiki-token-string)",
      },
    },
    {
      // [Custom] Markdown punctuation definition brackets
      scope: [
        "punctuation.definition.string.begin.markdown",
        "punctuation.definition.string.end.markdown",
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
      ],
      settings: {
        foreground: "var(--shiki-token-keyword)",
      },
    },
  ],
};
