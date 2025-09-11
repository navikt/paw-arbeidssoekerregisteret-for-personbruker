import { Faro, initializeFaro } from '@grafana/faro-web-sdk';

const isBrowser = () => typeof window !== 'undefined';
const isProduction = isBrowser() && window.location.href.includes('www.nav.no');
const isLocal = isBrowser() && window.location.href.includes('localhost');

export const getEnvironment = () => {
    if (isProduction) {
        return 'production';
    }
    return 'development';
};

const TELEMETRY_URL = {
    development: 'https://telemetry.ekstern.dev.nav.no/collect',
    production: 'https://telemetry.nav.no/collect',
};

export const initFaro = (): Faro | null => {
    if (!isBrowser() || isLocal) return null;

    return initializeFaro({
        isolate: true,
        url: TELEMETRY_URL[getEnvironment()],
        app: {
            name: 'arbeidssoekerregisteret-for-personbruker',
            version: getEnvironment(),
        },
    });
};
