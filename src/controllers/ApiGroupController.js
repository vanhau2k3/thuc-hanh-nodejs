import groupModel from '../model/GroupModel'

const getAllGroups = async (req, res) => {
  try {
    let listGroup = await groupModel.getAllGroups();
    
    return res.status(200).json({
      message: 'Success',
      data: listGroup
    });
  } catch (error) {
    console.log(error);
  }
}

export default { getAllGroups }