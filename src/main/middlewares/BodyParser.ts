import BodyParser from 'body-parser';

export const bodyParserJson = BodyParser.json();
export const bodyParserUrlencoded = BodyParser.urlencoded({ extended: false });
