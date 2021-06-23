import { Status } from "@aggregates/Project/Status/Status";
const ormConfig = {
    "name": "dbconnection",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "sgep",
    "synchronize": false,
    "logging": true,
    "entities":[
        Status
    ]
 }

 export default ormConfig;