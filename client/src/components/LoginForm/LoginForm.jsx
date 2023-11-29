import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { Link, Navigate } from 'react-router-dom';

import {
  fetchForgotPassword,
  fetchGetRedirectUrl,
  fetchLogin,
  fetchRegistration,
} from '../../pages/Auth/AuthSlice';
import Button from '../UI/Button/Button';
import AuthModal from '../Modals/AuthModal';
import googleBtn from '../../assets/btn_google_signin.png';
import styles from './LoginForm.module.css';
import { fetchGetBasket } from '../../pages/Basket/BasketSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registr, setRegistr] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [eye, setEye] = useState(true);
  const [inputType, setInputType] = useState('password');
  const [forgotPass, setForgotPass] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [login, setLogin] = useState(true);

  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const err = useSelector((state) => state.auth.error);
  const url = useSelector((state) => state.auth.redirectUrl);
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    dispatch(fetchGetRedirectUrl());
  }, [dispatch]);

  useEffect(() => {
    if (!!err) setModalActive(true);
  }, [err]);

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const nameHandler = (e) => setName(e.target.value);

  const loginHandler = () => {
    dispatch(fetchLogin({ email, password }));
    if (!!userId) dispatch(fetchGetBasket({ userId }));
  };

  const registrationHandler = () =>
    dispatch(fetchRegistration({ email, password, name }));

  const forgotPassHandler = () => {
    dispatch(fetchForgotPassword({ email }));
    setLogin(false);
    setForgotPass(true);
  };

  const registerLinkHandler = () => {
    setRegistr(true);
    setForgotPass(false);
    setLogin(false);
  };
  const loginLinkHandler = () => {
    setRegistr(false);
    setForgotPass(false);
    setLogin(true);
  };

  const forgotHandler = () => {
    setForgotPass(true);
    setResetPass(false);
    setLogin(false);
  };

  const clickModalHandler = () => setModalActive(false);

  const openEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'password') setInputType('text');
  };
  const closeEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'text') setInputType('password');
  };

  const renderForm = (
    <>
      <form className={styles.formWrapper} onSubmit={(e) => e.preventDefault()}>
        {login && <h2>Вхід</h2>}
        {registr && <h2>Реєстрація</h2>}
        {forgotPass && <h2>Відновлення паролю</h2>}
        <div className={styles.formFields}>
          {registr ? (
            <input
              type="text"
              placeholder="Ім'я"
              onChange={nameHandler}
              value={name}
              autoComplete="on"
            />
          ) : null}
          <input
            type="text"
            placeholder="E-mail"
            onChange={emailHandler}
            value={email}
            autoComplete="on"
          />
          {(login || resetPass || registr) && (
            <div className={styles.password}>
              <input
                type={inputType}
                placeholder="Пароль"
                onChange={passwordHandler}
                value={password}
                autoComplete="on"
              />
              {eye ? (
                <RxEyeClosed
                  onClick={openEyeHandler}
                  className={styles.visible}
                />
              ) : (
                <RxEyeOpen
                  onClick={closeEyeHandler}
                  className={styles.visible}
                />
              )}
            </div>
          )}
          {login && (
            <p>
              Забули пароль?{' '}
              <span className={styles.link} onClick={forgotHandler}>
                Відновити
              </span>
            </p>
          )}
          {registr && (
            <p>
              Після реєстрації на вашу поштову скриньку буде відправлено лист з
              посиланням для активації акаунту
            </p>
          )}
        </div>

        <div className={styles.formControl}>
          <Link to={url}>
            <img src={googleBtn} alt="google sing in" />
          </Link>

          {login && (
            <Button className={styles.success} onclick={loginHandler}>
              Увійти
            </Button>
          )}
          {registr && (
            <Button className={styles.primary} onclick={registrationHandler}>
              Зареєструватися
            </Button>
          )}
          {forgotPass && (
            <Button className={styles.success} onclick={forgotPassHandler}>
              Відновити пароль
            </Button>
          )}
        </div>
      </form>
    </>
  );

  const render = (
    <>
      {renderForm}

      {!registr ? (
        <p className={styles.registrLink}>
          Немає акаунту?{' '}
          <span onClick={registerLinkHandler}>Зареєструватися</span>
        </p>
      ) : (
        <p className={styles.registrLink}>
          Маєте акаунт? <span onClick={loginLinkHandler}>Увійти</span>
        </p>
      )}
    </>
  );
  return (
    <>
      <AuthModal active={modalActive} setActive={clickModalHandler} />
      {!isAuth ? render : <Navigate to="/" />}
    </>
  );
};

export default LoginForm;
