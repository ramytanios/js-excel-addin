/* global clearInterval, console, CustomFunctions, setInterval */

import axios from "axios";

/**
 * Combinations
 * @customFunction
 * @param {string[][]} elems Array of elements
 * @returns {string[][]} all combinations of elems
 */
export function combinations(elems: string[][]): string[][] {
  const elemz = elems.map((row) => row[0]);
  let combsOrError: string[][];
  try {
    elemz.flatMap((elem, idx) => elemz.slice(idx + 1).map((el) => [elem, el]));
  } catch {
    Array(Array("Unable to compute combinations!"));
  }
  return combsOrError;
}

interface FxRateResponse {
  amount: number;
  base: string;
  date: Date;
  rates: Object;
}

/**
 * FxRate
 * @customfunction
 * @param {string} ccy0 Currency
 * @param {string} ccy1 Currency
 * @returns {Promise<number | string>} Fx rate between 2 currencies
 */
export async function fxRate(ccy0: string, ccy1: string): Promise<number | string> {
  const { data } = await axios.request<FxRateResponse>({
    url: "https://api.frankfurter.app/latest",
    method: "get",
    headers: {
      Accept: "application/json",
    },
    params: {
      from: ccy0,
      to: ccy1,
    },
  });

  try {
    return data.rates[ccy1];
  } catch (err) {
    return err;
  }
}

/**
 * Sleep for some time and log
 * @customFunction
 * @param {string} msg Message to log
 * @returns {Promise<string>} Logged message
 */
export async function sleepAndLog(msg: string): Promise<string> {
  await new Promise((f) => this.setTimeout(f, 1500));
  return msg;
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
