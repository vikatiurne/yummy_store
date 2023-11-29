import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

import { fetchResetPassword } from '../../pages/Auth/AuthSlice';

import Button from '../UI/Button/Button';
import AuthModal from '../Modals/AuthModal';

import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const [modalActive, setModalActive] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const msg = useSelector((state) => state.auth.msg);

  const { link } = useParams();

  useEffect(() => {
    if (!!msg) setModalActive(true);
  }, [msg]);

  const passwordHandler = (e) => setPassword(e.target.value);

  const resetPassword = () => {
    dispatch(fetchResetPassword({ newPass: password, resetLink: link }));
  };

  const clickModalHandler = () => {
    setModalActive(false);
    setRedirect(true);
    setPassword('')
  };

  const openEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'password') setInputType('text');
  };
  const closeEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'text') setInputType('password');
  };

  const render = (
    <form className={styles.formWrapper} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.password}>
        <input
          type={inputType}
          placeholder="Новий пароль"
          onChange={passwordHandler}
          value={password}
          autoComplete="on"
        />
        {eye ? (
          <RxEyeClosed onClick={openEyeHandler} className={styles.visible} />
        ) : (
          <RxEyeOpen onClick={closeEyeHandler} className={styles.visible} />
        )}
      </div>
      <Button className={styles.success} onclick={resetPassword}>
        Змінити пароль
      </Button>
    </form>
  );

  return (
    <>
      <AuthModal active={modalActive} setActive={clickModalHandler} />
      {!redirect?render:<Navigate to='/auth'/>}
     
    </>
  );
};

export default ForgotPassword;
