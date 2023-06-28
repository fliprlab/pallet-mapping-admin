const fileReader = new FileReader();

const csvFileToArray = (csvString: string) => {
  const array = csvString.toString().split(" ");
  //  console.log(array); here we are getting the first rows which is our header rows to convert it into keys we are logging it here
  const data = [];
  // console.log(data);
  for (const r of array) {
    // console.log(r);
    let row = r.toString().split(",");
    data.push(row);
  }
  console.log(data);
  const heading = data[0];
  // console.log(heading); to get the column headers which will act as key
  const ans_array = [];
  // console.log(ans_array);
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const obj: any = {};
    for (let j = 0; j < heading.length; j++) {
      if (!row[j]) {
        row[j] = "NA";
      }
      // console.log(row[j].toString())
      obj[heading[j].replaceAll(" ", "_")] = row[j]
        .toString()
        .replaceAll(" ", "_");
    }
    ans_array.push(obj);
  }
  console.log({ ans_array });
  return ans_array;
};

export const csvToJson = (file: File) => {
  fileReader.onload = function (event) {
    const text: any = event.target && event.target.result;

    return csvFileToArray(text);
  };

  fileReader.readAsText(file);

  return [];
};
