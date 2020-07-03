import moment from "moment";

export function parseDolarPrices(dolarsArray) {
  return dolarsArray.map(({ Fecha, Valor }) => {
    const amount = parseFloat(Valor.replace(/,/g, "."));
    return { date: moment(Fecha).format('L'), price: amount };
  }); 
}