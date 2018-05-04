import  app  from '../../index';
import * as _  from 'lodash';

class BaseController {
    constructor(db) {
        this.db = app.get(db);
    }
    //this is a generic get By Id
    getByid(id) {
        return new Promise((resolve, reject) => {
            let error = 'invalid input';
            return reject(error);

            var result = this.model.findById(id);
            return resolve(result);
        }
        )
    };

    create(data) {
        // howw to use promises over call backs in ecma script and sequelize 
        return new Promise(function (resolve, reject) {
            this.model
                .build(data)
                .save()
                .then(function (data) {
                    resolve(
                        this.getById(data.id).then(function (el) {
                            return el
                        }));
                })
                .catch(function (err) {
                    return reject(callback({
                        code: 400,
                        message: err.message.replace('\n', '')
                    }));
                });

        })
    }

    list(options) {
        return this.model.findAll(_.extend({
            limit: 25,
            offset: 0
        }, options))
    };
}

export default class { BaseController };