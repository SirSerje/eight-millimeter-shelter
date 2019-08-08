import parseTextFile from './fileParser';

const rawFile = ''
  + 'Title: Тест1\n'
  + 'Release Year: 6666\n'
  + 'Format: VHS\n'
  + 'Stars: Gene Hackman, Barbara Hershey, Dennis Hopper\n'
  + '\n'
  + 'Title: Тест2\n'
  + 'Release Year: 6666\n'
  + 'Format: VHS\n'
  + 'Stars: Matthew Broderick, Ally Sheedy, Dabney Coleman, John Wood, Barry Corbin\n'
  + '\n'
  + 'Title: Тест1\n'
  + 'Release Year: 6666\n'
  + 'Format: VHS\n'
  + 'Stars: Gene Hackman, Barbara Hershey, Dennis Hopper\n'
  + '\n'
  + 'Title: Тест2\n'
  + 'Release Year: 6666\n'
  + 'Format: VHS\n'
  + 'Stars: Matthew Broderick, Ally Sheedy, Dabney Coleman, John Wood, Barry Corbin\n'
  + '\n'
  + '\n';

const result = [
  {
    format: 'VHS',
    stars: ['Gene Hackman', 'Barbara Hershey', 'Dennis Hopper'],
    title: 'Тест1',
    year: '6666',
  },
  {
    format: 'VHS',
    stars: ['Matthew Broderick', 'Ally Sheedy', 'Dabney Coleman', 'John Wood', 'Barry Corbin'],
    title: 'Тест2',
    year: '6666',
  },
  {
    format: 'VHS',
    stars: ['Gene Hackman', 'Barbara Hershey', 'Dennis Hopper'],
    title: 'Тест1',
    year: '6666',
  },
  {
    format: 'VHS',
    stars: ['Matthew Broderick', 'Ally Sheedy', 'Dabney Coleman', 'John Wood', 'Barry Corbin'],
    title: 'Тест2',
    year: '6666',
  },
];

it('check correct file parse with mocked FileReader', () => {
  const reader = new FileReader();
  reader.readAsText = jest.fn(() => rawFile.split('\n'));

  const mockedData = reader.readAsText(undefined);
  const parsedData = parseTextFile(mockedData);
  expect(parsedData).toEqual(result);
});
