import {Suggestion} from '../../components/RichCard';
export interface Content {
  type: 'text' | 'richText' | 'richCard' | 'richCardCarousel';
}

export interface TextContent extends Content {
  type: 'text';
  text: string;
}

export interface RichTextContent extends Content {
  type: 'richText';
  text: string;
  fallback: string;
  containsRichtText: boolean;
}

export enum MediaHeight {
  short = 'SHORT',
  medium = 'MEDIUM',
  tall = 'TALL',
}
export interface RichCardContent extends Content {
  type: 'richCard';
  title?: string;
  description?: string;
  media: {
    height: MediaHeight;
    contentInfo: {
      altText?: string;
      fileUrl: string;
      forceRefresh: boolean;
    };
  };
  suggestions: Suggestion[];
}

export interface RichCardCarouselContent extends Content {
  type: 'richCardCarousel';
  cardWidth: string;
  cardContents: [RichCardContent];
}

export interface SuggestionResponse {
  type: 'suggestionResponse';
  text: string;
  postbackData: string;
}

export type ContentUnion =
  | TextContent
  | RichTextContent
  | RichCardContent
  | RichCardCarouselContent
  | SuggestionResponse;