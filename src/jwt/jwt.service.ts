import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
	constructor(
		@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
	) {}

	sign(payload: object): string {
		return jwt.sign(payload, this.options.privateKey);
	}

	verify(token: string) {
		return jwt.verify(token, this.options.privateKey);
	}
}
