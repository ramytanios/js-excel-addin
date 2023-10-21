﻿/* global clearInterval, console, CustomFunctions, setInterval */

import axios from "axios";

/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function add(first: number, second: number): number {
  return first + second;
}

/**
 * Exponential of a number
 * @customfunction
 * @param number Number
 * @returns The exponential of a number
 */
export function expo(n: number): number {
  return Math.exp(n);
}

interface FxRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: Map<string, number>;
}

/**
 * FxRate
 * @customfunction
 * @param string Currency ccy0
 * @param string Currency ccy1
 * @returns Fx rate between 2 currencies
 */
export function fxRate(ccy0: string, ccy1: string): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise(function (resolve, reject) {
    axios.get<FxRateResponse>(`https://api.frankfurter.app/latest?from=${ccy0}&to=${ccy1}`).then(function (resp) {
      return resolve(resp.data.rates.get(ccy1));
    });
  });
}

/**
 * Combinations
 * @customFunction
 * @param elems array of elements
 * @returns all combinations of elems
 */
export function Combinations(elems: string[]): string[][] {
  return elems.flatMap((elem, idx) => elems.slice(idx + 1).map((el) => [elem, el]));
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
