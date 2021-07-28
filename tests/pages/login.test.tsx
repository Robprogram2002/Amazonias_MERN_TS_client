import LoginForm from '@components/Forms/auth/LoginForm';
import LoginPage from '@pages/auth/login';
import {
  fireEvent,
  getByPlaceholderText,
  getByRole,
  queryByPlaceholderText,
  queryByRole,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { render, screen } from '../test-utils';

describe('Login page tests', () => {
  it('page should render login form', () => {
    render(<LoginPage />);

    expect(screen.queryByRole('link')).toHaveTextContent('Register now !');

    expect(screen.queryByRole('heading', { level: 2 })).toHaveTextContent(
      'Welcome Again! New products are waiting for you'
    );

    expect(screen.queryByRole('heading', { level: 1 })).toHaveTextContent(
      /Login/i
    );

    const form = screen.getByRole('form');

    expect(queryByPlaceholderText(form, /Your email/i)).toBeInTheDocument();
    expect(queryByPlaceholderText(form, /Your password/i)).toBeInTheDocument();
  });

  it('if state is changed to false, page should render register form', () => {
    render(<LoginPage />);

    const switchParag = screen.getByRole('link');

    fireEvent.click(switchParag);

    expect(screen.queryByRole('link')).toHaveTextContent('Login now !');
    expect(screen.queryByRole('heading', { level: 2 })).toHaveTextContent(
      'Thousands of products at the best price and quality'
    );

    expect(screen.queryByRole('heading', { level: 1 })).toHaveTextContent(
      /Register/i
    );

    const form = screen.getByRole('form');

    expect(queryByPlaceholderText(form, /Your email/i)).toBeInTheDocument();
    expect(queryByPlaceholderText(form, /Your password/i)).toBeInTheDocument();
    expect(queryByPlaceholderText(form, /Your username/i)).toBeInTheDocument();
    expect(
      queryByPlaceholderText(form, /Confirm password/i)
    ).toBeInTheDocument();
  });

  it('login form is sibmiting with the correct data', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm loading={false} loginRequest={handleSubmit} />);

    const form = screen.getByRole('form');

    userEvent.type(
      getByPlaceholderText(form, /Your password/i),
      'randompassword222'
    );
    userEvent.type(
      getByPlaceholderText(form, /Your email/i),
      'john.dee@someemail.com'
    );

    userEvent.click(getByRole(form, 'button', { name: /Submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'john.dee@someemail.com',
        password: 'randompassword222',
      })
    );
  });

  it('register form is sibmiting and ui is change', async () => {
    render(<LoginPage />);

    const switchParag = screen.getByRole('link');

    fireEvent.click(switchParag);

    const form = screen.getByRole('form');

    const fakeResponse = { message: 'user register' };
    const mockPost = jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse),
      })
    );

    userEvent.type(
      getByPlaceholderText(form, /Your password/i),
      'randompassword222'
    );
    userEvent.type(
      getByPlaceholderText(form, /Your email/i),
      'john.dee@someemail.com'
    );
    userEvent.type(getByPlaceholderText(form, /Your username/i), 'john deep');
    userEvent.type(
      getByPlaceholderText(form, /Confirm password/i),
      'randompassword222'
    );

    userEvent.click(getByRole(form, 'button', { name: /Submit/i }));

    await waitFor(() =>
      expect(
        queryByRole(form, 'button', { name: /Loading/i })
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(mockPost).toHaveBeenCalledWith('/auth/sign-up', {
        email: 'john.dee@someemail.com',
        password: 'randompassword222',
        confirmPassword: 'randompassword222',
        username: 'john deep',
      })
    );

    // check that user is  redirected to the login form
    await waitFor(() =>
      expect(screen.queryByRole('heading', { level: 1 })).toHaveTextContent(
        /Login/i
      )
    );
  });
});
