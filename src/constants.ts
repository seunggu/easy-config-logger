/**
 * constants
 */

const devEnvs: string[] = ['development', 'test'];
const prodEnvs: string[] = ['stage', 'production'];
const envs: string[] = [...devEnvs, ...prodEnvs];
const levels: { [level: string]: number } = { test: 0, error: 1, warn: 2, info: 3, debug: 4 };
const colors: { [level: string]: string } = { test: 'cyan', error: 'red', warn: 'yellow', info: 'cyan', debug: 'blue' };

export { devEnvs, prodEnvs, envs, levels, colors };
