import {Model} from 'backbone';
import ZSchema from 'z-schema';

Model.prototype.validator = new ZSchema();
