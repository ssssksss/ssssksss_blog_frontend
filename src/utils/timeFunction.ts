function msToTime(duration: number): string {
  const milliseconds = Math.floor((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function secToTime(duration: number): string {
  let seconds = Math.floor(duration % 60);
  let minutes = Math.floor((duration / 60) % 60);
  let hours = Math.floor((duration / (60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

function jsDateTypeAddDays(date: Date, days: number): string {
  let temp = new Date(date);
  temp.setDate(date.getDate() + days);
  temp.setHours(0, 0, 0, 0);
  temp = new Date(temp.getTime() - (temp.getTime() % 86400000));
  return temp.toJSON();
}

function dayIntervalCalc(start: Date, end: Date): number {
  const timeDifference = Math.abs(start.getTime() - end.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

  return start.getTime() - end.getTime() < 0 ? daysDifference : -daysDifference;
}

// Function to display relative time (e.g., "3 hours ago")
export const timeFromToday = (time: string | Date): string => {
