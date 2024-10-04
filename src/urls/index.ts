const isProduction = window.location.href.includes('www.nav.no');
const isDevelopment = window.location.href.includes('.dev.nav.no');

export const getEnvironment = () => {
    if (isProduction) {
        return 'production';
    }

    if (isDevelopment) {
        return 'development';
    }

    return 'local';
};

const AIA_BACKEND_URL = {
    local: 'http://localhost:3000/aia-backend',
    development: 'https://www.intern.dev.nav.no/aia-backend',
    production: 'https://www.nav.no/aia-backend',
};

const INNLOGGINGSSTATUS_URL = {
    local: 'http://localhost:3000/auth',
    development: 'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
    production: 'https://www.nav.no/person/nav-dekoratoren-api/auth',
};

const START_SAMTALE_URL = {
    local: 'https://pto.ekstern.dev.nav.no/arbeid/start-samtale',
    development: 'https://pto.ekstern.dev.nav.no/arbeid/start-samtale',
    production: 'https://nav.no/arbeid/start-samtale',
};

const DIALOG_URL = {
    local: 'https://pto.ekstern.dev.nav.no/arbeid/dialog',
    development: 'https://pto.ekstern.dev.nav.no/arbeid/dialog',
    production: 'https://nav.no/arbeid/dialog',
};

const OPPDATER_OPPLYSNINGER_URL = {
    local: 'https://arbeid.intern.dev.nav.no/arbeid/registrering/oppdater-opplysninger',
    development: 'https://arbeid.intern.dev.nav.no/arbeid/registrering/oppdater-opplysninger',
    production: 'https://www.nav.no/arbeid/registrering/oppdater-opplysninger',
};

export const innloggingsStatusUrl = INNLOGGINGSSTATUS_URL[getEnvironment()];
export const aiaBackendUrl = AIA_BACKEND_URL[getEnvironment()];
export const motestotteLenke = START_SAMTALE_URL[getEnvironment()];
export const dialogLenke = DIALOG_URL[getEnvironment()];
export const oppdaterOpplysningerLenke = OPPDATER_OPPLYSNINGER_URL[getEnvironment()];
