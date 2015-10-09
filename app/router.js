import {Router} from 'hiroshima';

import {MainComponent} from './components/main';

const router = new Router();

router.use(MainComponent);

export default router;
