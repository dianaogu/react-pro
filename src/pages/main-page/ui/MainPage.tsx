import { RegistrationForm } from '@features/registrationForm/ui/RegistrationForm';
import styles from './MainPage.module.css';
import { SubscriptionWizard } from '@features/subscriptionWizard/ui/SubscriptionWizard';

export const MainPage = () => {

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.header}>Регистрация пользователя</h1>
        <RegistrationForm />
        <SubscriptionWizard />
    </div>
  );
};