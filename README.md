# AirSwift DeFi Gateway

## directory structure
```
react                         Project Directory
├─public                      
│  └─ ...   
│
├─src                         Application Directory
│  ├─assets                   Static Resource directory (such as img, icon, etc.)
│  ├─components               Component Directory
│  ├─utils                    Tool Library Directory
│  │  ├─redux                 Redux Directory
│  │  ├─request               Request encapsulation Directory (using axios to encapsulate http requests and call Api interfaces)
│  │  ├─function.js           Function Library File
│  │  └─PrivateRoute.jsx      Authentication file (judge whether to sign in or connect)
│  ├─views                    Page Code and Page Style Directory
│  ├─App.js                   App application file
│  ├─config.json              Files of common configuration information
│  └─index.js                 Entry File
│
├─.env.development            Configuration files for development environment variables
├─.env.local                  Configuration files for local test environment variables
├─.env.production             Configuration files for production environment variables
├─craco.config.js             
├─jsconfig.json               
├─package.json
└──README.md
```

## Rewrite the file format in the imported src directory
- For example ( Import src/utils/function.js ):
    - Written before
      ```
      import {getEstimateRate} from "../utils/function";
      or
      import {getEstimateRate} from "../../utils/function";
      ```
    - But Now
      ```
      import {getEstimateRate} from "@@/utils/function";
      ```

## Local development mode
```bash
yarn start
```

## Development version packaging
```bash
yarn build:dev
```

## Production version packaging
```bash
yarn build:production
```

