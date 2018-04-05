/**
 * Interfaces
 */

/**
* Option Interface
*/
interface Option {
  level: string;
  env: string;
}

/**
 * Meta Interface
 */
interface Meta {
  [key: string]: any;
}

export { Option, Meta };
