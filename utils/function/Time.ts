function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function secToTime(duration) {
  var seconds = Math.floor(duration % 60),
    minutes = Math.floor((duration / 60) % 60),
    hours = Math.floor((duration / (60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

function jsDateTypeAddDays(date, days) {
  let temp = new Date(date);
  temp.setDate(date.getDate() + days);
  temp.setHours(0, 0, 0, 0);
  temp = new Date(temp.getTime() - (temp.getTime() % 86400000));
  return temp.toJSON();
}

export const Time = {
  msToTime,
  secToTime,
  jsDateTypeAddDays,
};
