/**
 * Interfaces
 */

/**
 * Option Interface
 */
interface IOption {
  level: string;
  env: string;
}

/**
 * Meta Interface
 */
interface IMeta {
  [key: string]: number|string|Date|object;
}

export { IOption, IMeta };
