import { NavLink, useParams } from 'react-router-dom';
import { SContainer, SFormWrapper } from './AuthPage.styled';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

const AuthPage = () => {
  const { id: pageId } = useParams('id');

  return (
    <SContainer>
      <SFormWrapper>
        <nav>
          <ul>
            <li>
              <NavLink to="/auth/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/auth/login">Login</NavLink>
            </li>
          </ul>
        </nav>
        {pageId === 'register' && <RegisterForm />}
        {pageId === 'login' && <LoginForm />}
      </SFormWrapper>
    </SContainer>
  );
};

export default AuthPage;
