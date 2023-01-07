import { Injectable } from '@nestjs/common';
import {CussWordFilter} from 'cuss-word-filter-ko';

@Injectable()
export class CusswordService extends CussWordFilter {
    constructor() {
        super({});
    }
}
