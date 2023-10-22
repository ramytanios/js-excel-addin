/* global clearInterval, console, CustomFunctions, setInterval */

import axios from "axios";

/**
 * Combinations
 * @customFunction
 * @param {string[][]} elems Array of elements
 * @returns all combinations of elems
 */
export function combinations(elems: string[][]): string[][] {
  const elemz = elems[0];
  return elemz.flatMap((elem, idx) => elemz.slice(idx + 1).map((el) => [elem, el]));
}

interface FxRateResponse {
  amount: number;
  base: string;
  date: Date;
  rates: Map<string, number>;
}

/**
 * FxRate
 * @customfunction
 * @param string Currency ccy0
 * @param string Currency ccy1
 * @returns number Fx rate between 2 currencies
 */
export function fxRate(ccy0: string, ccy1: string): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const req = axios.request<FxRateResponse>({
    url: "https://api.frankfurter.app/latest",
    method: "get",
    params: {
      from: ccy0,
      to: ccy1,
    },
  });

  return (
    req
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((res) => {
        return res.data.rates[ccy1];
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        return 0.0;
      })
  );
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message: string): string {
  console.log(message);

  return message;
}
