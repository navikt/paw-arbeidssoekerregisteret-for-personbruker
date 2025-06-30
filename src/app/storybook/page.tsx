import { redirect } from 'next/navigation'

export default function StorybookRedirect() {
    /*  Redirect til storybook/index.html i public-mappen.
        Gjelder kun for prod, der vi server bygd storybook i public
        Denne nåes ikke uten redirect, pga dynamisk [lang] rute
     */
    redirect('/storybook/index.html');
}
