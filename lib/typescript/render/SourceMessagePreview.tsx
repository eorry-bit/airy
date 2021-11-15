import React from 'react';
import {ReactComponent as AttachmentTemplate} from 'assets/images/icons/attachmentTemplate.svg';
import {ReactComponent as AttachmentImage} from 'assets/images/icons/attachmentImage.svg';
import {ReactComponent as AttachmentVideo} from 'assets/images/icons/attachmentVideo.svg';
import {ReactComponent as AttachmentAudio} from 'assets/images/icons/file-audio.svg';
import {ReactComponent as AttachmentFile} from 'assets/images/icons/file-download.svg';
import {ReactComponent as RichCardIcon} from 'assets/images/icons/richCardIcon.svg';
import {Conversation, Message} from 'model';
import {Emoji} from 'components';

interface SourceMessagePreviewProps {
  conversation: Conversation;
}
interface FormattedMessageProps {
  message: Message;
}

const FormattedMessage = ({message}: FormattedMessageProps) => {
  if (message?.content) {
    return <>{message.content.message?.text || message.content.text}</>;
  }
  return <div />;
};

const isImageFromGoogleSource = (messageText: string | undefined) => {
  if (!messageText) return false;

  return (
    messageText.includes('https://storage.googleapis.com') &&
    messageText.toLowerCase().includes('x-goog-algorithm') &&
    messageText.toLowerCase().includes('x-goog-credential')
  );
};

export const SourceMessagePreview = (props: SourceMessagePreviewProps) => {
  const {conversation} = props;

  const lastMessageIsText = (conversation: Conversation) => {
    const lastMessageContent = conversation.lastMessage.content;
    const googleLiveAgentRequest = lastMessageContent?.userStatus?.requestedLiveAgent;
    const googleSurveyResponse = lastMessageContent?.surveyResponse;

    if (googleLiveAgentRequest) {
      return (
        <>
          <Emoji symbol={'👋'} /> Live Agent request
        </>
      );
    }

    if (googleSurveyResponse) {
      return (
        <>
          <Emoji symbol={'📝'} /> Survey response
        </>
      );
    }

    if (typeof lastMessageContent === 'string') {
      if (lastMessageContent.includes('&Body=' && '&FromCountry=')) {
        const startText = lastMessageContent.search('&Body=');
        const endText = lastMessageContent.search('&FromCountry=');
        const textLength = endText - startText;
        const enCodedText = lastMessageContent.substring(startText + 6, startText + textLength);
        const replaced = enCodedText.split('+').join(' ');
        const text = decodeURIComponent(replaced);
        return text;
      } else if (lastMessageContent.includes('&Body=' && '&To=whatsapp')) {
        const startText = lastMessageContent.search('&Body=');
        const endText = lastMessageContent.search('&To=whatsapp');
        const textLength = endText - startText;
        const enCodedText = lastMessageContent.substring(startText + 6, startText + textLength);
        const replaced = enCodedText.split('+').join(' ');
        const text = decodeURIComponent(replaced);
        return text;
      }
    }

    if (
      (lastMessageContent.text || lastMessageContent.message?.text) &&
      !isImageFromGoogleSource(lastMessageContent.message?.text)
    ) {
      return <FormattedMessage message={conversation.lastMessage} />;
    } else if (lastMessageContent.suggestionResponse) {
      return <>{conversation.lastMessage.content.suggestionResponse.text}</>;
    }
  };

  const lastMessageIsIcon = (conversation: Conversation) => {
    const lastMessageContent = conversation.lastMessage.content;

    if (
      lastMessageContent.message?.attachments?.[0].type === 'image' ||
      isImageFromGoogleSource(lastMessageContent.message?.text)
    ) {
      return <AttachmentImage />;
    }

    if (
      lastMessageContent.message?.attachments?.[0].type === 'video' ||
      lastMessageContent.attachment?.type === 'video'
    ) {
      return <AttachmentVideo style={{height: '24px', width: '24px', margin: '0px'}} />;
    }

    if (
      lastMessageContent.message?.attachments?.[0].type === 'audio' ||
      lastMessageContent.attachment?.type === 'audio'
    ) {
      return <AttachmentAudio style={{height: '24px', width: '24px', margin: '0px'}} />;
    }

    if (
      lastMessageContent.message?.attachments?.[0].type === 'file' ||
      lastMessageContent.attachment?.type === 'file'
    ) {
      return <AttachmentFile style={{height: '24px', width: '24px', margin: '0px'}} />;
    }

    if (lastMessageContent.suggestionResponse) {
      return <>{conversation.lastMessage.content.suggestionResponse.text}</>;
    }

    if (lastMessageContent.image) {
      return <AttachmentImage />;
    }

    if (lastMessageContent.richCard) {
      return <RichCardIcon style={{height: '24px', width: '24px', margin: '0px'}} />;
    }

    return <AttachmentTemplate />;
  };

  return <>{lastMessageIsText(conversation) || lastMessageIsIcon(conversation)}</>;
};
