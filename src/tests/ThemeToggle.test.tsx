import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('renders Light button text when dark is true', () => {
    render(<ThemeToggle dark={true} onToggle={vi.fn()} />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toHaveTextContent('☀️ Light');
  });

  it('renders Dark button text when dark is false', () => {
    render(<ThemeToggle dark={false} onToggle={vi.fn()} />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toHaveTextContent('🌙 Dark');
  });

  it('triggers onToggle callback when clicked', () => {
    const handleToggle = vi.fn();
    render(<ThemeToggle dark={false} onToggle={handleToggle} />);
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
