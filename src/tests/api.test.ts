import { explainQuery } from '../api';

describe('explainQuery API client', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('successfully returns explanation payload on 200', async () => {
    const mockData = {
      explanation: 'Test explanation',
      performance_issues: [],
      erd_description: 'Test erd',
      optimizations: []
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData
    } as Response);

    const result = await explainQuery('SELECT * FROM users');
    expect(result).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/explain'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'SELECT * FROM users' })
      })
    );
  });

  it('throws custom message when status is 429', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ detail: 'Rate limit' })
    } as Response);

    await expect(explainQuery('SELECT * FROM users')).rejects.toThrow(
      'Daily limit reached. Come back tomorrow!'
    );
  });

  it('throws detail error message on non-ok status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ detail: 'Please paste a valid SQL query only.' })
    } as Response);

    await expect(explainQuery('invalid')).rejects.toThrow(
      'Please paste a valid SQL query only.'
    );
  });
});
