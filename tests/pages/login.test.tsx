import LoginPage from '@pages/auth/login';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../test-utils';

describe('Login page tests', () => {
  it('page should render login form', () => {
    render(<LoginPage />);

    const switchParag = screen.queryByText(
      'Are you still not have an account ? Register now !'
    );
    const cardHeading = screen.queryByRole('heading', { level: 2 });

    expect(cardHeading).toHaveTextContent(
      'Welcome Again! New products are waiting for you'
    );
    expect(switchParag).toBeInTheDocument();

    const formTitle = screen.queryByRole('heading', { level: 1 });
    expect(formTitle).toHaveTextContent(/Login/i);

    // const form = screen.queryByRole('form');
    // expect(form).toBeInTheDocument();
  });

  it('if state is changed to false, page should render register form', () => {
    render(<LoginPage />);

    const switchParag = screen.getByText(
      'Are you still not have an account ? Register now !'
    );

    fireEvent.click(switchParag);

    const registerParag = screen.getByText(
      'Are you already have an account ? Login now !'
    );
    const cardHeading = screen.queryByRole('heading', { level: 2 });
    expect(cardHeading).toHaveTextContent(
      'Thousands of products at the best price and quality'
    );
    expect(registerParag).toBeInTheDocument();

    const formTitle = screen.queryByRole('heading', { level: 1 });
    expect(formTitle).toHaveTextContent(/Register/i);
  });
});
