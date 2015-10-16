import Backbone, {Model} from 'backbone';
import ZSchema from 'z-schema';
import sync from 'backbone-super-sync';

function editRequest(req) {
    req.withCredentials();
}

sync.editRequest = editRequest;
sync.timeout = 5000;

Backbone.sync = sync;

Model.prototype.validator = new ZSchema();
