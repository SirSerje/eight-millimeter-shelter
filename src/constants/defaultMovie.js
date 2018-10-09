const DEFAULT_MOVIE = () => {
  let randomOneFrom = (arr = []) => {
    let num = Math.round(Math.random(arr.length));
    return arr[num];
  };

  return {
    format: randomOneFrom(['DVD', 'VHS', 'BLUE RAY', 'CD', 'TAPE']),
    release: randomOneFrom([1990, 1991, 1992, 1993, 1994, 1995]),
    stars: [
      'Mel Brooks',
      'Clevon Little',
      'Harvey Korman',
      'Gene Wilder',
      'Slim Pickens',
      'Madeline Kahn',
    ],
    title: `${randomOneFrom([
      'Blazing',
      'Furious',
      'Amazing',
      'Delicious',
      'Sad',
      'Madness',
      'Cool',
    ])} ${randomOneFrom(['Robocop', 'Chicken', 'Beaver', 'Tornado', 'Palm', 'Pineapple'])}`,
  };
};
export default DEFAULT_MOVIE;
