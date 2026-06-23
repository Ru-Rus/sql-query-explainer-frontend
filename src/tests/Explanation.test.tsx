import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Explanation from '../components/Explanation';

const mockData = {
  explanation: 'Fetches all pending orders.',
  performance_issues: ['Full table scan possible'],
  erd_description: 'Orders table with Status column.',
  optimizations: ['Add index on Status']
};

describe('Explanation', () => {
  it('renders all four sections', () => {
    render(<Explanation data={mockData} />);
    expect(screen.getByText('Fetches all pending orders.')).toBeInTheDocument();
    expect(screen.getByText('Full table scan possible')).toBeInTheDocument();
    expect(screen.getByText('Orders table with Status column.')).toBeInTheDocument();
    expect(screen.getByText('Add index on Status')).toBeInTheDocument();
  });

  it('hides performance issues section when empty', () => {
    render(<Explanation data={{ ...mockData, performance_issues: [] }} />);
    expect(screen.queryByText('⚠️ Performance Issues')).not.toBeInTheDocument();
  });

  it('hides optimizations section when empty', () => {
    render(<Explanation data={{ ...mockData, optimizations: [] }} />);
    expect(screen.queryByText('🚀 Optimizations')).not.toBeInTheDocument();
  });

  it('copy button shows Copied after click', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) }
    });
    render(<Explanation data={mockData} />);
    const copyButtons = screen.getAllByText('📋 Copy');
    fireEvent.click(copyButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('✅ Copied')).toBeInTheDocument();
    });
  });
});