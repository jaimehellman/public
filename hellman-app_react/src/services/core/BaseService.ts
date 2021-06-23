import Axios from "axios";
import Api from './Api';
export default class BaseService {

    config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json"
        }
    };
    
    configData = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        }
    };

    Insert = async (model: any, action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, JSON.stringify(model), this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

    Update = async (model: any, action: string) => {
        return this.PostModel(model, action);
    };
    
    Delete = async (id: number, action: string) => {
        return this.PostId(id, action);
    };

    DeleteModel = async (model: any, action: string) => {
        return this.PostModel(model, action);
    };

    FindById = async (id: number, action: string) => {
        return this.PostId(id, action);
    };

    FindAll = async (model: any, action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, model, this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              if(error !== undefined)
              {
                reject(error.data);
              }
             
            });
        });
    };

    GetById = async (id: number, action: string) => {
        return new Promise((resolve, reject) => {
          Api.get(action + "?id=" + id, this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

    GetAllPost = async (action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

    GetAll = (action: string) => {
        return new Promise((resolve, reject) => {
          Api.get(action, this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              if (error !== null && error !== undefined) {
                reject(error.data);
              }
            });
        });
      };

    Upload = async (data: FormData, action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, data, this.configData)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

    Download = async (id: number, action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, id, {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Accept" : "application/octet-stream",
            }
          })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

    PostModel = async (model: any, action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, model, this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

    PostId = async (id: number, action: string) => {
        return new Promise((resolve, reject) => {
          Api.post(action, id, this.config)
            .then(res => {
              resolve(res.data);
            })
            .catch(error => {
              reject(error.data);
            });
        });
    };

}