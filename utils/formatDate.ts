function formatDateTime(dateTime: Date | string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };

  const currentDate = new Date();
  const targetDate = new Date(dateTime); // Ensure it's parsed correctly

  // Adjust to UTC if needed
  const currentUTCDate = new Date(
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000
  );

  const diffInMs = Math.abs(targetDate.getTime() - currentUTCDate.getTime());
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 10) {
    if (targetDate.getFullYear() !== currentUTCDate.getFullYear()) {
      options.year = "numeric";
    }
    return targetDate.toLocaleDateString("en-US", options);
  } else if (diffInDays <= 10 && diffInDays > 0) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes === 0) {
    return "seconds ago";
  } else {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }
}

export const getYear = (dateTime: Date | string) => {
  const inputDate = new Date(dateTime);

  return inputDate.getFullYear();
};

export const getDiffInMinutes = (dateTime: Date | string) => {
  const currentDate = new Date();
  const targetDate = new Date(dateTime);

  // Adjust to UTC if needed
  const currentUTCDate = new Date(
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000
  );

  const diffInMs = Math.abs(targetDate.getTime() - currentUTCDate.getTime());
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  return diffInMinutes;
};

export default formatDateTime;
