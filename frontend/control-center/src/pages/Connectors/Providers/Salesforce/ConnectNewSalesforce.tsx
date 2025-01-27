import React, {useState} from 'react';
import {useCurrentConnectorForSource, useCurrentComponentForSource} from '../../../../selectors';
import {Input} from 'components';
import {ConfigureConnector} from '../../ConfigureConnector';
import {useTranslation} from 'react-i18next';
import styles from './index.module.scss';
import {Source} from 'model';

interface ConnectParams {
  [key: string]: string;
}

type ConnectNewSalesforceProps = {
  createNewConnection: (configValues: ConnectParams) => void;
  isEnabled: boolean;
  isConfigured: boolean;
  isPending: boolean;
};

export const ConnectNewSalesforce = ({
  createNewConnection,
  isEnabled,
  isConfigured,
  isPending,
}: ConnectNewSalesforceProps) => {
  const componentInfo = useCurrentConnectorForSource(Source.salesforce);
  const componentName = useCurrentComponentForSource(Source.salesforce)?.name;

  const [url, setUrl] = useState(componentInfo?.url || '');
  const [username, setUsername] = useState(componentInfo?.username || '');
  const [password, setPassword] = useState(componentInfo?.password || '');
  const [securityToken, setSecurityToken] = useState(componentInfo?.securityToken || '');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const {t} = useTranslation();
  const isUrlValid = url && (url.startsWith('https') || url.startsWith('http'));

  const updateConfig = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEnabled) {
      setIsUpdateModalVisible(true);
    } else {
      enableSubmitConfigData();
    }
  };

  const enableSubmitConfigData = () => {
    createNewConnection({url, username, password, securityToken});
  };

  return (
    <ConfigureConnector
      componentName={componentName}
      isUpdateModalVisible={isUpdateModalVisible}
      setIsUpdateModalVisible={setIsUpdateModalVisible}
      enableSubmitConfigData={enableSubmitConfigData}
      disabled={
        !isUrlValid ||
        !username ||
        !password ||
        !securityToken ||
        (componentInfo?.url === url &&
          componentInfo?.username === username &&
          componentInfo?.password === password &&
          componentInfo?.securityToken === securityToken)
      }
      isConfigured={isConfigured}
      updateConfig={updateConfig}
      isPending={isPending}
    >
      <div className={styles.formRow}>
        <Input
          type="url"
          name="url"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          label={t('salesforceOrgUrl')}
          placeholder={t('yourSalesforceOrgUrl')}
          showLabelIcon
          tooltipText={t('salesforceOrgUrlExample')}
          required
          height={32}
          fontClass="font-base"
        />
      </div>

      <div className={styles.formRow}>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          label={t('Username')}
          placeholder={t('yourSalesforceUsername')}
          showLabelIcon
          tooltipText={t('yourSalesforceUsername')}
          required
          height={32}
          fontClass="font-base"
        />
      </div>
      <div className={styles.formRow}>
        <Input
          type="text"
          name="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          label={t('Password')}
          placeholder={t('yourSalesforcePassword')}
          showLabelIcon
          tooltipText={t('yourSalesforcePassword')}
          required
          height={32}
          fontClass="font-base"
        />
      </div>
      <div className={styles.formRow}>
        <Input
          type="text"
          name="securityToken"
          value={securityToken}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecurityToken(e.target.value)}
          label={t('securityToken')}
          placeholder={t('yourSalesforceSecurityToken')}
          showLabelIcon
          tooltipText={t('yourSalesforceSecurityToken')}
          required
          height={32}
          fontClass="font-base"
        />
      </div>
    </ConfigureConnector>
  );
};
