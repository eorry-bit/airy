import React from 'react';
import styles from './index.module.scss';
import {getChannelAvatar} from '../../../components/ChannelAvatar';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as ArrowRightIcon} from 'assets/images/icons/arrowRight.svg';
import {CONNECTORS_ROUTE} from '../../../routes/routes';
import {useTranslation} from 'react-i18next';
import {ConfigStatusButton} from '../ConfigStatusButton';
import {ComponentStatus, ConnectorCardComponentInfo} from '..';
import {cyAddChannelButton} from 'handles';

type ChannelCardProps = {
  componentInfo: ConnectorCardComponentInfo;
  channelsToShow?: number;
  componentStatus?: ComponentStatus;
};

export const ChannelCard = (props: ChannelCardProps) => {
  const {componentInfo, channelsToShow, componentStatus} = props;
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      onClick={event => {
        event.stopPropagation(), navigate(CONNECTORS_ROUTE + '/' + componentInfo.source + '/connected');
      }}
      className={styles.container}
      data-cy={cyAddChannelButton}
    >
      <div className={styles.channelCard}>
        <div className={styles.logoTitleContainer}>
          {getChannelAvatar(componentInfo.source)}
          {componentInfo.displayName}
        </div>
        <div className={styles.linkContainer}>
          {componentStatus && <ConfigStatusButton componentStatus={componentStatus} />}
          <span>
            {channelsToShow} {channelsToShow === 1 ? t('channel') : t('channels')}
          </span>
          <ArrowRightIcon className={styles.arrowIcon} />
        </div>
      </div>
    </div>
  );
};
