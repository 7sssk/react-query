import { renderHook } from '@testing-library/react-hooks';
import { useQuery } from '../use-query';


describe('use-query', () => {
  it('isSuccess fetch', async () => {
    const fetchSomeData = () => Promise.resolve('anyresponse');

    const { result, waitFor } = renderHook(() =>
      useQuery<string>(() => fetchSomeData(), { initData: '', isLoading: true })
    );

    expect(result.current.data).toBe('');
    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => result.current.data === 'anyresponse');
    expect(result.current.data).toEqual('anyresponse');
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.error).toBeUndefined();
  });

  it('isError fetch', async () => {
    const fetchSomeData = () => Promise.reject('some_error');
    const { result, waitForNextUpdate } = renderHook(() =>
      useQuery(() => fetchSomeData())
    );

    await waitForNextUpdate();

    expect(result.current.error).toEqual('some_error');
    expect(result.current.isError).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
  });
});
