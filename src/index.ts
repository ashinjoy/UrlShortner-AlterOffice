
import {app} from './app'
import { secrets } from './constants/secrets';  
import './config/dbconfig'
app.listen( secrets.PORT || 3000, () => console.log("server is running"));  