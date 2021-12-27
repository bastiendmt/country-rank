export default function formatNumber(number: number): String {
  return new Intl.NumberFormat("en-US").format(number);
}
