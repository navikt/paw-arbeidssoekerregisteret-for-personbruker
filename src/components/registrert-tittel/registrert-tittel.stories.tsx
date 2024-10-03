import { Meta, StoryObj } from "@storybook/react";
import RegistrertTittel from "./registrert-tittel";
import arbeidssokerperioderMock from '../../mocks/arbeidssokerperioder-mock';
import opplysningerOmArbeidssokerMock from '../../mocks/opplysninger-om-arbeidssoker-mock';

const meta = {
  title: "Komponenter/RegistrertTittel",
  component: RegistrertTittel,
  decorators: [
    // (Story, ctx) => (
    //   <SprakContext.Provider value={{ sprak: ctx.parameters.lang ?? "nb" }}>
    //     <ArbeidssokerperioderProvider>
    //       <OpplysningerOmArbeidssokerProvider>
    //         <Story />
    //       </OpplysningerOmArbeidssokerProvider>
    //     </ArbeidssokerperioderProvider>
    //   </SprakContext.Provider>
    // ),
  ],
  args: {},
  tags: ["autodocs"],
} satisfies Meta<typeof RegistrertTittel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegistreringsTittelStory: Story = {
  args: {
    sprak: 'nb',
    arbeidssokerperioder: arbeidssokerperioderMock as any,
    opplysningerOmArbeidssoker: opplysningerOmArbeidssokerMock as any
  },
};

// const defaultHandlers = [
//   http.get(ARBEIDSOKERPERIODER_URL, () => {
//     return HttpResponse.json(arbeidssokerperioderMock);
//   }),
//   http.get(`${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/:periodeId`, () => {
//     return HttpResponse.json(opplysningerOmArbeidssokerMock);
//   }),
// ];
//
// const permittertHandlers = [
//   http.get(ARBEIDSOKERPERIODER_URL, () => {
//     return HttpResponse.json(arbeidssokerperioderMock);
//   }),
//   http.get(`${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/:periodeId`, () => {
//     return HttpResponse.json([
//       {
//         ...opplysningerOmArbeidssokerMock[0],
//         jobbsituasjon: [
//           {
//             beskrivelse: "ER_PERMITTERT",
//           },
//         ],
//       },
//     ]);
//   }),
// ];
//
// export const Arbeidssoker: Story = {
//   parameters: {
//     msw: {
//       handlers: defaultHandlers,
//     },
//   },
// };
//
// export const IkkeArbeidssoker: Story = {
//   parameters: {
//     msw: {
//       handlers: [
//         http.get(ARBEIDSOKERPERIODER_URL, () => {
//           return new HttpResponse(null, { status: 204 });
//         }),
//         http.get(`${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/:periodeId`, () => {
//           return new HttpResponse(null, { status: 204 });
//         }),
//       ],
//     },
//   },
// };
// export const Permittert: Story = {
//   parameters: {
//     msw: {
//       handlers: permittertHandlers,
//     },
//   },
// };
//
// export const ArbeidssokerEngelsk: Story = {
//   parameters: {
//     msw: {
//       handlers: defaultHandlers,
//     },
//     lang: "en",
//   },
// };
//
// export const PermittertEngelsk: Story = {
//   parameters: {
//     msw: {
//       handlers: permittertHandlers,
//     },
//     lang: "en",
//   },
// };
