import React from 'react';
import {useState, useEffect} from 'react';
import {IMessage} from '@stomp/stompjs';

import WebSocket, {ConnectionState} from '../../websocket';
import MessageProp from '../../components/message';
import InputBarProp from '../../components/inputBar';
import AiryInputBar from '../../airyRenderProps/AiryInputBar';

import style from './index.module.scss';
import HeaderBarProp from '../../components/headerBar';
import AiryHeaderBar from '../../airyRenderProps/AiryHeaderBar';
import {AiryWidgetConfiguration} from '../../config';
import BubbleProp from '../bubble';
import AiryBubble from '../../airyRenderProps/AiryBubble';
import {MessagePayload, SenderType, MessageState, isFromContact, Message} from 'httpclient';
import {SourceMessage, CommandUnion} from 'render';
import {MessageInfoWrapper} from 'render/components/MessageInfoWrapper';
/* eslint-disable @typescript-eslint/no-var-requires */
const camelcaseKeys = require('camelcase-keys');
import {cyBubble} from 'chat-plugin-handles';

let ws: WebSocket;

const defaultWelcomeMessage: Message = {
  id: '19527d24-9b47-4e18-9f79-fd1998b95059',
  content: {text: 'Hello! How can we help you?'},
  deliveryState: MessageState.delivered,
  senderType: SenderType.appUser,
  sentAt: new Date(),
};

type Props = AiryWidgetConfiguration;

const Chat = (props: Props) => {
  if (props.welcomeMessage) {
    defaultWelcomeMessage.content = props.welcomeMessage;
  }

  const [installError, setInstallError] = useState('');
  const [animation, setAnimation] = useState('');
  const [isChatHidden, setIsChatHidden] = useState(true);
  const [messages, setMessages] = useState<Message[]>([defaultWelcomeMessage]);
  const [messageString, setMessageString] = useState('');
  const [connectionState, setConnectionState] = useState(null);

  useEffect(() => {
    ws = new WebSocket(props.channelId, onReceive, setInitialMessages, (state: ConnectionState) => {
      setConnectionState(state);
    });
    ws.start().catch(error => {
      console.error(error);
      setInstallError(error.message);
    });
  }, []);

  useEffect(() => {
    updateScroll();
  }, [messages]);

  const setInitialMessages = (initialMessages: Array<Message>) => {
    setMessages([...messages, ...initialMessages]);
  };

  const ctrl = {
    toggleHideChat: () => {
      const newValue = !isChatHidden;
      if (newValue) {
        setAnimation('close');
        setTimeout(() => {
          setIsChatHidden(newValue);
        }, 500);
      } else {
        setAnimation('open');
        setIsChatHidden(newValue);
        setTimeout(() => {
          updateScroll();
        }, 100);
      }
    },
    sendMessage: (text: string) => {
      ws.onSend({
        type: 'text',
        text,
      });
    },
  };

  const sendMessage = (text: string) => {
    ctrl.sendMessage(text);
  };

  const onReceive = (data: IMessage) => {
    const messagePayload = (JSON.parse(data.body) as any).message as MessagePayload;
    const newMessage = {
      ...camelcaseKeys(messagePayload, {deep: true, stopPaths: ['content']}),
      sentAt: new Date(messagePayload.sent_at),
    };
    setMessages((messages: Message[]) => [...messages, newMessage]);
  };

  const updateScroll = () => {
    const element = document.getElementById('messages');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  const styleFor = (animation: string) => {
    switch (animation) {
      case 'open':
        return style.containerAnimationOpen;
      case 'close':
        return style.containerAnimationClose;
      default:
        return '';
    }
  };

  const headerBar = props.headerBarProp
    ? () => props.headerBarProp(ctrl)
    : () => <AiryHeaderBar toggleHideChat={ctrl.toggleHideChat} />;

  const inputBar = props.inputBarProp
    ? () => props.inputBarProp(ctrl)
    : () => (
        <AiryInputBar sendMessage={sendMessage} messageString={messageString} setMessageString={setMessageString} />
      );

  const bubble = props.bubbleProp
    ? () => props.bubbleProp(ctrl)
    : () => <AiryBubble isChatHidden={isChatHidden} toggleHideChat={ctrl.toggleHideChat} dataCyId={cyBubble} />;

  if (installError) {
    return null;
  }

  const commandCallback = (command: CommandUnion) => {
    if (command.type === 'suggestedReply') {
      ws.onSend({type: 'suggestionResponse', text: command.payload.text, postbackData: command.payload.postbackData});
    }
  };

  return (
    <div className={style.main}>
      {!isChatHidden && (
        <div className={`${style.container} ${styleFor(animation)}`}>
          <HeaderBarProp render={headerBar} />
          <div className={style.connectedContainer}>
            <div className={style.chat}>
              <div id="messages" className={style.messages}>
                {messages.map((message, index: number) => {
                  const nextMessage = messages[index + 1];
                  const lastInGroup = nextMessage ? isFromContact(message) !== isFromContact(nextMessage) : true;

                  return (
                    <MessageProp
                      key={message.id}
                      render={
                        props.airyMessageProp
                          ? () => props.airyMessageProp(ctrl)
                          : () => (
                              <MessageInfoWrapper fromContact={isFromContact(message)} isChatPlugin={true}>
                                <SourceMessage
                                  message={message}
                                  source="chatplugin"
                                  lastInGroup={lastInGroup}
                                  invertSides={true}
                                  commandCallback={commandCallback}
                                />
                              </MessageInfoWrapper>
                            )
                      }
                    />
                  );
                })}
              </div>
              <InputBarProp render={inputBar} />
              {connectionState === ConnectionState.Disconnected && (
                <div className={style.disconnectedOverlay}>Reconnecting...</div>
              )}
            </div>
          </div>
        </div>
      )}
      <BubbleProp render={bubble} />
    </div>
  );
};

export default Chat;
