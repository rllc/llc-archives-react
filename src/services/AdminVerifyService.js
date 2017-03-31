class AdminVerifyService {
  static isUserAdmin(adminObject, bucketID, user) {
    if (adminObject) {
      for (let item of adminObject) {
        //Check if user in base administrators folder
        if (user && user.id === item.key){
          return true;
        }

        //Check if user in current congregation's administrators folder
        if (item.key === bucketID){
          var congregationAdmins = Object.keys(item);
          for (let adminID of congregationAdmins) {
            if (user && user.id === adminID) {
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
