import moment from "moment";

/**
 * Formats a given date string into a relative time format.
 * Displays seconds, minutes, hours, days, weeks, or months ago.
 *
 * @param {string} date - The date string to format.
 * @returns {string} - The relative time string.
 */
export const formatDate = (date) => {
  if (!date) return "";

  const now = moment();
  const inputDate = moment(date);

  const differenceInMinutes = now.diff(inputDate, "minutes");
  const differenceInHours = now.diff(inputDate, "hours");
  const differenceInDays = now.diff(inputDate, "days");
  const differenceInWeeks = now.diff(inputDate, "weeks");

  if (differenceInMinutes < 60) {
    // Less than an hour old
    return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? "s" : ""
      } ago`;
  } else if (differenceInHours < 24) {
    // Less than a day old
    return `${differenceInHours} hour${differenceInHours !== 1 ? "s" : ""} ago`;
  } else if (differenceInDays < 7) {
    // Less than a week old
    return `${differenceInDays} day${differenceInDays !== 1 ? "s" : ""} ago`;
  } else if (differenceInWeeks < 4) {
    // Less than a month old
    return `${differenceInWeeks} week${differenceInWeeks !== 1 ? "s" : ""} ago`;
  } else {
    // More than a month old, show full date
    return inputDate.format("DD MMM YYYY");
  }
};

/**
 * Constructs a complete image URL.
 *
 * @param {string} url - The image URL path.
 * @returns {string} - The full URL or an empty string if no URL is provided.
 */
export const getImage = (url) => {
  if (url) {
    return `https://api.mobilezmarket.com/images/${url}`;
  } else return "";
};

/**
 * Formats a number with commas as thousand separators.
 *
 * @param {number|string} x - The number to format.
 * @returns {string} - The formatted number with commas.
 */
export const numberWithCommas = (x) => {
  let num = `${x}`;

  // Add thousand separators
  let res = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return res;
};
