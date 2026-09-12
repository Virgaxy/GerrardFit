export interface ParsedVideoInfo {
  provider: 'youtube' | 'vimeo' | 'direct' | 'none';
  isEmbed: boolean;
  embedUrl?: string;
  directUrl?: string;
  rawUrl: string;
}

/**
 * Parses any video URL (YouTube, Vimeo, MP4 direct link) into an embeddable format
 */
export function parseVideoLink(url: string): ParsedVideoInfo {
  if (!url || !url.trim()) {
    return {
      provider: 'none',
      isEmbed: false,
      rawUrl: ''
    };
  }

  const trimmed = url.trim();

  // YouTube: https://www.youtube.com/watch?v=XYZ or https://youtu.be/XYZ or https://www.youtube.com/shorts/XYZ
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      provider: 'youtube',
      isEmbed: true,
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      rawUrl: trimmed
    };
  }

  // Vimeo: https://vimeo.com/123456789
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      provider: 'vimeo',
      isEmbed: true,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      rawUrl: trimmed
    };
  }

  // Direct video link (e.g. .mp4, .webm, or cloud storage)
  return {
    provider: 'direct',
    isEmbed: false,
    directUrl: trimmed,
    rawUrl: trimmed
  };
}
