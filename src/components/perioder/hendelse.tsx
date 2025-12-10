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
        <article className="border-b border-gray-300 pb-4 mb-4">
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
            {children && <div className=" bg-surface-subtle p-2 rounded mt-2">{children}</div>}
        </article>
    );
};

export { Hendelse };
