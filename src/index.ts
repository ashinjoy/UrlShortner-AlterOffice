
import {app} from './app'
import { secrets } from './constants/secrets';  
import './config/dbconfig'
import { connectRedis } from './config/redis';
connectRedis()
app.listen( secrets.PORT || 3000, () => console.log("server is running"));  