/* global clearInterval, console, CustomFunctions, setInterval */

import axios from "axios";

/**
 * Combinations
 * @customFunction
 * @param {string[][]} elems Array of elements
 * @returns {string[][]} all combinations of elems
 */
export function combinations(elems: string[][]): string[][] {
  try {
    const elemz = elems.map((row) => row[0]);
    return elemz.flatMap((elem, idx) => elemz.slice(idx + 1).map((el) => [elem, el]));
  } catch {
    return Array(Array("Unable to compute combinations!"));
  }
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
  try {
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

    return data.rates[ccy1];
  } catch (err) {
    return err;
  }
}

interface RandomActivity {
  type: string;
  activity: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

/**
 * RandomActivity
 * @customFunction
 * @param {number} nParticipants Number of participants
 * @returns {Promise<string>} Random activity
 */
export async function randomActivity(nParticipants: number): Promise<string> {
  try {
    const { data } = await axios.request<RandomActivity>({
      url: "https://www.boredapi.com/api/activity",
      method: "get",
      headers: {
        Accept: "application/json",
      },
      params: {
        participants: nParticipants,
      },
    });

    return data.activity;
  } catch (err) {
    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.notAvailable, "Invalid request or service down");
  }
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
