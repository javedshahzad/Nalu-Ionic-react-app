export const createGroupAction = (groupData: any) => {
  return {
    type: "CREATE_GROUP",
    payload: groupData,
  };
};
