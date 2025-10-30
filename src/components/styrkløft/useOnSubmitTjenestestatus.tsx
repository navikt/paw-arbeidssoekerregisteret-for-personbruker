import { Tjenestestatus } from '@/model/brukerprofil';
import { useState } from 'react';

function useOnSubmitTjenestestatus(submitTjenestestatus: (status: Tjenestestatus) => Promise<void>): {
    pendingTjenestestatus: Tjenestestatus | null;
    errorTjenestestatus: string | null;
    submittedTjenestestatus: Tjenestestatus | null;
    onSubmitTjenestestatus: (status: Tjenestestatus) => Promise<void>;
} {
    const [pendingTjenestestatus, setPendingTjenestestatus] = useState<Tjenestestatus | null>(null);
    const [errorTjenestestatus, setErrorTjenestestatus] = useState<string | null>(null);
    const [submittedTjenestestatus, setSubmittedTjenestestatus] = useState<Tjenestestatus | null>(null);

    const onSubmitTjenestestatus = async (status: Tjenestestatus) => {
        try {
            setPendingTjenestestatus(status);
            setErrorTjenestestatus(null);
            await submitTjenestestatus(status);
            setSubmittedTjenestestatus(status);
        } catch (err: any) {
            setErrorTjenestestatus(err.message);
        } finally {
            setPendingTjenestestatus(null);
        }
    };

    return {
        pendingTjenestestatus,
        errorTjenestestatus,
        submittedTjenestestatus,
        onSubmitTjenestestatus,
    };
}

export default useOnSubmitTjenestestatus;
