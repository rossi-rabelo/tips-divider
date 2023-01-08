const convertToBRL = (base) => {
  return `
    query ConvertToBRL {
      currencyConversion(baseCurrency: "${base}", convertCurrencies: ["BRL"]) {
        conversions {
          rate
        }
      }
    }
  `
}

export { convertToBRL }
