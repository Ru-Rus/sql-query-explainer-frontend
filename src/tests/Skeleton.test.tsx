import { render } from '@testing-library/react';
import Skeleton from '../components/Skeleton';

describe('Skeleton', () => {
  it('renders skeleton loading placeholders with pulse animation', () => {
    const { container } = render(<Skeleton />);
    const pulseContainer = container.querySelector('.animate-pulse');
    expect(pulseContainer).toBeInTheDocument();
    expect(container.querySelectorAll('.rounded-xl').length).toBeGreaterThanOrEqual(4);
  });
});
