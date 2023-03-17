import React, { useEffect, useRef } from "react";
import { marked } from "marked";
import { Box } from "@mui/system";

interface PostContentProps {
  src: string;
}

export default function PostContent({ src }: PostContentProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (iframe) {
      const html = marked.parse(src.replaceAll("\n", "<br />"));
      const iframeDocument = iframe.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(html);
        iframeDocument.close();
      }
    }
  }, [src]);

  return (
    <Box
      component="iframe"
      ref={ref}
      sx={{
        width: "100%",
        border: 0,
        flexGrow: 1,
        height: "100%",
        "& *": {
          fontSize: "1.125rem",
        },
      }}
    />
  );
}
