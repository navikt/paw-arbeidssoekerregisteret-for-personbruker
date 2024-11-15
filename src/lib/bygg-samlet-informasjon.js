export function byggSamletInformasjon (samletInformasjon) {
  if (!samletInformasjon) return []

  const gruppertePerioder = samletInformasjon.arbeidssoekerperioder.reduce((perioder, periode) => {
    perioder[periode.periodeId] = {...periode, opplysningerOmArbeidssoeker: [], profilering: [], bekreftelser: []}
    return perioder
  }, {})

  samletInformasjon.bekreftelser.map((bekreftelse) => {
    gruppertePerioder[bekreftelse.periodeId].bekreftelser.push(bekreftelse)
  })


  samletInformasjon.opplysningerOmArbeidssoeker.map((opplysninger) => {
    try {
      gruppertePerioder[opplysninger.periodeId].opplysningerOmArbeidssoeker.push(opplysninger)
    }
    catch (error) {
      console.error(error)
    }
  })

  samletInformasjon.profilering.map((profilering) => {
    gruppertePerioder[profilering.periodeId].profilering.push(profilering)
  })

  return Object.keys(gruppertePerioder).map(key => gruppertePerioder[key])
}