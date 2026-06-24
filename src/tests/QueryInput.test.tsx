import { render, screen, fireEvent } from '@testing-library/react';
import QueryInput from '../components/QueryInput';

describe('QueryInput', () => {
  it('renders editor and button', () => {
    render(<QueryInput onExplain={vi.fn()} loading={false} />);
    expect(screen.getByText('Explain This Query')).toBeInTheDocument();
  });

  it('calls onExplain when button clicked', () => {
    const onExplain = vi.fn();
    render(<QueryInput onExplain={onExplain} loading={false} />);
    fireEvent.click(screen.getByText('Explain This Query'));
    expect(onExplain).toHaveBeenCalled();
  });

  it('disables button while loading', () => {
    render(<QueryInput onExplain={vi.fn()} loading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when daily limit reached', () => {
    render(<QueryInput onExplain={vi.fn()} loading={false} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading label when loading', () => {
    render(<QueryInput onExplain={vi.fn()} loading={true} />);
    expect(screen.getByText('🤔 Analyzing with AI...')).toBeInTheDocument();
  });

  it('shows limit reached label when disabled', () => {
    render(<QueryInput onExplain={vi.fn()} loading={false} disabled={true} />);
    expect(screen.getByText('❌ Daily limit reached')).toBeInTheDocument();
  });
});