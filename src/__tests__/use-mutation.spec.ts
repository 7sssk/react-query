import { renderHook } from "@testing-library/react-hooks";

import { useMutation } from "../use-mutation";

describe("use-mutation", () => {
  it("isSuccess fetch", async () => {
    const fetchSomeData = () => Promise.resolve("anyresponse");

    const { result, waitForNextUpdate } = renderHook(() =>
      useMutation<string>(() => fetchSomeData(), { isLoading: true })
    );

    expect(result.current[1].isLoading).toBeTruthy();

    const mockedCallback = jest.fn(() => {
      result.current[0]();
    });

    mockedCallback();
    expect(mockedCallback).toBeCalledTimes(1);

    await waitForNextUpdate();

    expect(result.current[1].data).toEqual("anyresponse");
    expect(result.current[1].isError).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
  });

  it("isError fetch", async () => {
    const fetchSomeData = () => Promise.reject();

    const { result, waitForNextUpdate } = renderHook(() =>
      useMutation<string>(() => fetchSomeData(), { isLoading: true })
    );

    const mockedCallback = jest.fn(() => result.current[0]());

    expect(result.current[1].isLoading).toBeTruthy();
    expect(result.current[1].isError).toBeFalsy();

    mockedCallback();
    expect(mockedCallback).toBeCalledTimes(1);

    await waitForNextUpdate();

    expect(result.current[1].isLoading).toBeFalsy();
    expect(result.current[1].data).toBeUndefined();
    expect(result.current[1].isError).toBeTruthy();
  });
});
