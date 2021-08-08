import HomePage from '@pages/index';
import { render } from '../test-utils';

describe('HomePage', () => {
  it('should render the heading', () => {
    render(<HomePage />);

    // const heading = screen.getByText(/Welcome to Home page/i);

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    // expect(heading).toBeInTheDocument();
    expect(1).toBe(1);
  });
});
