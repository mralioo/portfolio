import { withBase } from './url';

// Tiny inline-Markdown renderer for short editor-managed strings (About
// paragraphs, section leads): **bold**, *italic*, `code`, [text](url).
// Input is HTML-escaped first, so editor text can't inject markup.
export function inlineMd(src: string): string {
  const escaped = src
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) => {
      if (/^javascript:/i.test(url)) return text;
      const external = /^https?:\/\//.test(url);
      const href = url.startsWith('/') ? withBase(url) : url;
      return `<a href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ''}>${text}</a>`;
    });
}
