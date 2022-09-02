import {
  CONNECTORS_ROUTE,
  CATALOG_FACEBOOK_ROUTE,
  CATALOG_CHAT_PLUGIN_ROUTE,
  CATALOG_TWILIO_SMS_ROUTE,
  CATALOG_TWILIO_WHATSAPP_ROUTE,
  CATALOG_WHATSAPP_BUSINESS_CLOUD_ROUTE,
  CATALOG_GOOGLE_ROUTE,
  CATALOG_INSTAGRAM_ROUTE,
  CATALOG_DIALOGFLOW_ROUTE,
  CATALOG_ZENDESK_ROUTE,
  CATALOG_SALESFORCE_ROUTE,
  CATALOG_CONGNIFY_ROUTE,
  CATALOG_AMELIA_ROUTE,
  CATALOG_FRONTEND_INBOX_ROUTE,
  CATALOG_RASA_ROUTE,
  CATALOG_WEBHOOKS_ROUTE,
  CATALOG_MOBILE_ROUTE,
  CATALOG_VIBER_ROUTE,
  WEBHOOKS_ROUTE,
} from '../routes/routes';
import {Source} from 'model';

export const getConnectedRouteForComponent = (source: Source, isChannel: string) => {
  if (source === Source.webhooks) return WEBHOOKS_ROUTE;

  if (isChannel) return `${CONNECTORS_ROUTE}/${source}/connected`;

  return `${CONNECTORS_ROUTE}/${source}/new`;
};

export const getNewChannelRouteForComponent = (source: Source) => {
  return source === Source.webhooks ? WEBHOOKS_ROUTE : `${CONNECTORS_ROUTE}/${source}/new`;
};

export const getCatalogProductRouteForComponent = (displayName: string) => {
  switch (displayName) {
    case 'Airy Chat Plugin':
      return CATALOG_CHAT_PLUGIN_ROUTE;
    case 'Facebook Messenger':
      return CATALOG_FACEBOOK_ROUTE;
    case 'Twilio SMS':
      return CATALOG_TWILIO_SMS_ROUTE;
    case 'Twilio WhatsApp':
      return CATALOG_TWILIO_WHATSAPP_ROUTE;
    case 'WhatsApp Business Cloud':
      return CATALOG_WHATSAPP_BUSINESS_CLOUD_ROUTE;
    case 'Google Business Messages':
      return CATALOG_GOOGLE_ROUTE;
    case 'Instagram':
      return CATALOG_INSTAGRAM_ROUTE;
    case 'Dialogflow':
      return CATALOG_DIALOGFLOW_ROUTE;
    case 'Salesforce':
      return CATALOG_SALESFORCE_ROUTE;
    case 'Zendesk':
      return CATALOG_ZENDESK_ROUTE;
    case 'Congnigy':
      return CATALOG_CONGNIFY_ROUTE;
    case 'Amelia':
      return CATALOG_AMELIA_ROUTE;
    case 'Inbox':
      return CATALOG_FRONTEND_INBOX_ROUTE;
    case 'Rasa':
      return CATALOG_RASA_ROUTE;
    case 'Mobile':
      return CATALOG_MOBILE_ROUTE;
    case 'Webhooks':
      return CATALOG_WEBHOOKS_ROUTE;
    case 'Viber':
      return CATALOG_VIBER_ROUTE;
  }
};