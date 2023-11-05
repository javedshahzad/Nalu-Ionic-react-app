export const JOURNAL_ACTION_TYPE = "JOURNAL_ACTION_TYPE";

export const journalAction = (data: any) => {
  // console.log("journal data", journalAction);
  return {
    type: JOURNAL_ACTION_TYPE,
    payload: data,
  };
};
