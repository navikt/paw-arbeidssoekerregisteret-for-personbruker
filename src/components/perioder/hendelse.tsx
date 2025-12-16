import { ReactNode } from 'react';
import { prettyPrintDatoOgKlokkeslettKortform } from './helpers';
import { Source } from './source';

type HendelseProps = {
    timestamp?: string;
    title: string;
    kilde: string;
    children?: ReactNode;
};

const Hendelse: React.FC<HendelseProps> = ({ timestamp, title, kilde, children }) => {
    return (
        <article className="p-4 mb-4 rounded bg-surface-subtle">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex gap-4">
                    {timestamp && (
                        <div className="border-r-2 border-gray-300 pr-4">
                            {prettyPrintDatoOgKlokkeslettKortform(timestamp, 'nb', true)}
                        </div>
                    )}
                    <h3>{title}</h3>
                </div>
                <div>
                    <Source source={kilde || 'UVENTET_KILDE'} />
                </div>
            </div>
            {children && <div className="pl-4 mt-2">{children}</div>}
        </article>
    );
};

export { Hendelse };
