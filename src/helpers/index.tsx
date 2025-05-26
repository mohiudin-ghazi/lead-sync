import moment from "moment";

export const calculateAge = (dateOfBirth: string) => {
  const dob = moment(dateOfBirth);
  const now = moment();

  const age = now.diff(dob, "years");

  return age;
};

export const getTimePassed = (timestamp: any) => {
  const now = new Date();
  const pastTime = new Date(timestamp);

  // @ts-ignore
  const timeDiff = now - pastTime;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} Year${years > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} Day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours} Hour${hours > 1 ? 's' : ''} ${remainingMinutes} Minute${remainingMinutes > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} Minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds > 0) {
    return `${seconds} Second${seconds > 1 ? 's' : ''} ago`;
  } else {
    return `1 Second ago`; // Default to 1 second if no time has passed
  }
};
