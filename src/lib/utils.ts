export const identity = (i: any) => i;

export const pick = (props: string[], obj: Record<string, any>) => {
    return props.reduce((result, key) => {
        if (typeof obj[key] !== 'undefined') {
            return {
                ...result,
                [key]: obj[key],
            };
        }

        return result;
    }, {});
};
