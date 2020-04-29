export default class Search {
  constructor({
    input,
    results,
    data,
    searchKey,
    resultFormatter,
    dataDisplayed = undefined
  } = {}) {
    this.input = input;
    this.results = results;
    this.data = data;
    this.searchKey = searchKey;
    this.resultFormatter = resultFormatter;
    this.input.addEventListener("keyup", this.displayData.bind(this));
    this.displayData(this.data);
    this.dataDisplayed = dataDisplayed;
  }
  updateData(data) {
    this.data = data;
    this.displayData();
  }
  displayData() {
    this.results.innerHTML = "";
    this.data
      .filter(d => {
        return d[this.searchKey]
          .toLowerCase()
          .includes(this.input.value.toLowerCase());
      })
      .forEach(d => {
        if (this.resultFormatter == undefined) {
          this.results.innerHTML += JSON.stringify(d);
        } else {
          let formatted = this.resultFormatter(d);
          if (typeof formatted == "string") {
            this.results.innerHTML += formatted;
          } else {
            this.results.appendChild(formatted);
          }
        }
      });
    if (this.dataDisplayed != undefined) {
      this.dataDisplayed(this.input.value);
    }
  }
}
