// true  : NewsAPI call不要
// false : NewsAPI call要
export const DataCheck = (date) => {
  const currentDate = Date.parse(new Date().toLocaleString('en-US'));
  const prevDate = Date.parse(date);
  // 現在時刻からDataBase登録時刻を引いて
  // 経過時間を確認(ms -> hour)
  const diff = (currentDate - prevDate) / 1000 / 60 / 60;
  // 何時間経過した場合にNewsAPIをcallするか
  const HOUR = 6;

  if (diff >= HOUR) return false;
  else return true;
};
