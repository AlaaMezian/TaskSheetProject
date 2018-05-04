//this file is decprected as i was trying to turn the whole app to ecma script 6 
import  BaseController  from '../Bases/BaseController';

class TestUser extends BaseController {
    constructor(modelName, model) {
         super(app.db)
        // this.db=app.db;
        this.modelName = 'user',
        this.model = this.db.set(modelName);
    }

    getUser(data) {
        console.log('i reached here some how' )
        this.model.findOne({

                where: {
                    id: data.id
                }
        }).then((user) => {
           return   this.getByid(user.id)
          })
   }
}
export default class {TestUser};