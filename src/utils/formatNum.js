export default function formatNumber(number) {
  // Attempt to convert the input to a number. If it fails (e.g., non-numeric string),
  // return the original input as a string.
  const num = Number(number);
  if (isNaN(num)) {
    return String(number);
  }

  const absNum = Math.abs(num);

  // 1. Determine the appropriate suffix and divider.
  let formattedValue;
  let suffix = '';
  let divider = 1;

  if (absNum >= 1000000000) {
    // Billions (B)
    suffix = 'B';
    divider = 1000000000;
  } else if (absNum >= 1000000) {
    // Millions (M)
    suffix = 'M';
    divider = 1000000;
  } else if (absNum >= 1000) {
    // Thousands (K)
    suffix = 'K';
    divider = 1000;
  }

  // 2. Calculate the divided value and round it to one decimal place.
  const dividedValue = num / divider;
  // .toFixed(1) returns a string with exactly one decimal place (e.g., "5.0", "1.2")
  const roundedStr = dividedValue.toFixed(1);

  // 3. Remove the ".0" if the number is a whole number (e.g., 5.0M becomes 5M).
  if (roundedStr.endsWith('.0')) {
    formattedValue = roundedStr.slice(0, -2) + suffix; // Removes the last two chars (".0")
  } else {
    formattedValue = roundedStr + suffix;
  }

  return formattedValue;
}
