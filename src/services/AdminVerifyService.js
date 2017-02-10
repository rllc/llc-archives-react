class AdminVerifyService {
  static isUserAdmin(adminObject, bucketID, userID) {
    if (adminObject) {
      for (let item of adminObject) {
        //Check if user in base administrators folder
        if (userID === item.key){
          return true;
        }

        //Check if user in current congregation's administrators folder
        if (item.key === bucketID){
          var congregationAdmins = Object.keys(item);
          for (let adminID of congregationAdmins) {
            if (adminID === userID) {
              return true;
            }
          }
        }
      }
    }

    //All checks failed, not admin
    return false;
  }

}
export default AdminVerifyService
