import REGEX from './regex';

function validate(uuid: any) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;
