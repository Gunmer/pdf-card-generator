import {Container} from 'inversify'

import {businessModule} from './business/business.module'
import {serviceModule} from './services/service.module'

const injector = new Container()

injector.load(businessModule, serviceModule)

export default injector
