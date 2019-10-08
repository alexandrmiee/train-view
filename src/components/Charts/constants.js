const palete = [
  "#845EC2",
  "#FF9671",
  "#F9F871",
  "#00C9A7",
  "#936C00",
  "#008BC9",
  "#BF34B4"
];

export function* generateColor() {
  let index = 0;
  while (true) {
    yield palete[index++ % palete.length];
  }
}
