import { render, screen, fireEvent } from '@testing-library/react';
import QueryInput from '../components/QueryInput';

describe('QueryInput', () => {
  it('renders textarea and button', () => {
    render(<QueryInput onExplain={vi.fn()} loading={false} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Explain This Query')).toBeInTheDocument();
  });

  it('calls onExplain with query text when button clicked', () => {
    const onExplain = vi.fn();
    render(<QueryInput onExplain={onExplain} loading={false} />);
    fireEvent.click(screen.getByText('Explain This Query'));
    expect(onExplain).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
  });

  it('disables button while loading', () => {
    render(<QueryInput onExplain={vi.fn()} loading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button and textarea when daily limit reached', () => {
    render(<QueryInput onExplain={vi.fn()} loading={false} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('textbox')).toBeDisabled();
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