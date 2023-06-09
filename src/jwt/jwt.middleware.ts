import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		if ('x-jwt' in req.headers) {
			const token = req.headers['x-jwt'];
			try {
				const decoded = this.jwtService.verify(token.toString());
				if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
					const userOutput = await this.userService.findOne(decoded['id']);
					if (userOutput.ok) {
						req['user'] = userOutput.user;
					} else {
						throw Error(userOutput.error);
					}
				}
			} catch (e) {}
		}
		next();
	}
}
