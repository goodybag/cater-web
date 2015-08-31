import {createServer} from 'http';

import {app, user, restaurant, order, orderItems} from './';

export const server = createServer(app);

Promise.all([
    user.fetch(),
    restaurant.fetch(),
    order.fetch(),
    orderItems.fetch()
]).then(function() {
    server.listen(process.env.PORT || 9000, function() {
        console.log('Listening...');
    });
}).catch(function(err) {
    process.nextTick(function() {
        throw err;
    });
});
