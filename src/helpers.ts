export const delay = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time));

const FIRST_BLOCK_LENGTH = 31;
const SECOND_BLOCK_LENGTH = 6;
const FULL_CODE_LENGTH = 127;

export const getMarkingCode = (description?: string) => {
  if (!description) {
    return undefined;
  }

  try {
    const SEPARATOR_SYMBOL = '\u001D';
    const mark = description
      ? description.slice(0, FIRST_BLOCK_LENGTH) +
        SEPARATOR_SYMBOL +
        description.slice(
          FIRST_BLOCK_LENGTH,
          FIRST_BLOCK_LENGTH + SECOND_BLOCK_LENGTH,
        ) +
        SEPARATOR_SYMBOL +
        description.slice(
          FIRST_BLOCK_LENGTH + SECOND_BLOCK_LENGTH,
          FULL_CODE_LENGTH,
        )
      : '';
    console.log('mark', mark);
    console.log('btoa mark', btoa(mark));
    return {
      type: 'other' as const,
      mark: btoa(mark),
    };
  } catch (error) {
    return undefined;
  }
};
