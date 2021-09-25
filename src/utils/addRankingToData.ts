import { RankingData } from "../types";
import compare from "./compare";

const addRankingToData = (rawData: RankingData[]) => {
  let data: RankingData[] = [];
  for (let id in rawData) {
    data.push(rawData[id]);
  }
  // sort data
  data.sort(compare);

  data.forEach((el, index) => {
    if (index === 0) {
      data[index].ranking = index + 1;
    } else if (el.score === data[index - 1].score) {
      data[index].ranking = data[index - 1].ranking;
    } else {
      data[index].ranking = data[index - 1].ranking + 1;
    }
  });
  return data;
};

export default addRankingToData;
