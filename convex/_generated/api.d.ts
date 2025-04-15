/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as errors from "../errors.js";
import type * as http from "../http.js";
import type * as idioms from "../idioms.js";
import type * as idioms_seed from "../idioms_seed.js";
import type * as progress from "../progress.js";
import type * as texts from "../texts.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  errors: typeof errors;
  http: typeof http;
  idioms: typeof idioms;
  idioms_seed: typeof idioms_seed;
  progress: typeof progress;
  texts: typeof texts;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
