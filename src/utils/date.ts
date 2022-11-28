const getCurDate = (date: Date) => {
  // 年-月-日 时-分
  // YYYY-MM-DD HH:mm
  const year = date.getFullYear();
  const month = dateStandard(date.getMonth() + 1);
  const day = dateStandard(date.getDate());
  const hours = dateStandard(date.getHours());
  const minutes = dateStandard(date.getMinutes());

  const time = `${hours}:${minutes}`;
  const currentDate = `${year}-${month}-${day} ${time}`;
  return {
    time,
    currentDate
  };
}

function dateStandard(date: number): string {
  return (date >= 1 && date < 10) ? `0${date}` : date + '';
}

export {
  getCurDate as default
}