export interface Attachment {
  type: string;
}
export interface SimpleAttachment {
  type: 'image' | 'video' | 'audio' | 'file' | 'fallback';
  title?: string;
  url?: string;
  payload?: { title?: string; url?: string};
}

export interface URLButton extends Content {
  type: 'web_url';
  url: string;
  title: string;
}

export interface PostbackButton extends Content {
  type: 'postback';
  title: string;
  payload: string;
}

export interface CallButton extends Content {
  type: 'phone_number';
  title: string;
  payload: string;
  }

export interface LoginButton extends Content {
  type: "account_link";
  url: string;
}

export interface LogoutButton extends Content{
  type: "account_unlink";
}

export interface ButtonAttachment extends Attachment {
  type: 'template';
  payload: {
    text: string;
    template_type: 'button';
    buttons: (URLButton | PostbackButton | CallButton | LoginButton | LogoutButton)[];
  };
}
export interface GenericAttachment extends Attachment {
  type: 'template';
  payload: {
    text: string;
    template_type: 'generic';
    elements: Element[];
  };
}


export interface FallbackAttachment extends SimpleAttachment {
  type: 'fallback';
}

export interface MediaTemplate {
  media_type: 'video' | 'image';
  url: string;
  buttons?: (URLButton | PostbackButton | CallButton | LoginButton | LogoutButton)[];
}

export interface MediaAttachment extends Attachment {
  type: 'template';
  payload: {
    template_type: 'media';
    elements: MediaTemplate[];
  };
}

export interface Element {
  title: string;
  subtitle?: string;
  image_url?: string;
  default_action?: {
    type: string;
    url?: string;
  };
  buttons: (URLButton | PostbackButton | CallButton | LoginButton | LogoutButton)[];
}

export interface Content {
  type: string;
}

export interface TextContent extends Content {
  type: 'text';
  text: string;
}

export interface ImageContent extends Content {
  type: 'image';
  text?: string;
  imageUrl: string;
}

export interface VideoContent extends Content {
  type: 'video';
  text?: string;
  videoUrl: string;
}

export interface QuickReply {
  content_type: string;
  title: string;
  payload: string;
  image_url?: string;
}

export interface QuickRepliesContent extends Content {
  type: 'quickReplies';
  text?: string;
  attachment?: AttachmentUnion;
  quickReplies: QuickReply[];
}


export interface ButtonTemplate extends Content {
  type: 'buttonTemplate';
  text: string;
  buttons: (URLButton | PostbackButton | CallButton | LoginButton | LogoutButton)[];
}

export interface GenericTemplate extends Content {
  type: 'genericTemplate';
  text?: string;
  elements: Element[];
}



// Add a new facebook content model here:
export type ContentUnion =
  | TextContent
  | PostbackButton
  | ImageContent
  | VideoContent
  | ButtonTemplate
  | GenericTemplate
  | QuickRepliesContent
  | MediaAttachment
export type AttachmentUnion =
  | TextContent
  | ImageContent
  | VideoContent
  | ButtonTemplate
  | GenericTemplate
  | MediaAttachment;
