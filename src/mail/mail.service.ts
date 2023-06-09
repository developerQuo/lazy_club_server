import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailService {
	constructor(
		@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
	) { }

	private async sendEmail(
		subject: string,
		to: string,
		template: string,
		emailVars: EmailVar[],
	) {
		console.log(this.options.apiKey)
		console.log(this.options.domain)
		const mg = mailgun({
			apiKey: this.options.apiKey,
			domain: this.options.domain,
		});
		const data = {
			from: this.options.fromEmail,
			to,
			subject,
			template,
		};
		emailVars.forEach(({ key, value }) =>
			Object.assign(data, { [`v:${key}`]: value }),
		);
		try {
			console.log(mg)
			await mg.messages().send(data, function (error, body) {
				console.log(body);
			});
		} catch (error) {
			console.log(error);
		}
	}

	sendVerificationEmail(email: string, code: string) {
		this.sendEmail('계정 확인', email, 'confirm_account', [
			{
				key: 'code',
				value: code,
			},
			{
				key: 'host',
				value: process.env.HOST,
			},
		]);
	}

	inviteChannelOperatorEmail(emails: [string], code: string) {
		emails.forEach((email) => {
			this.sendEmail('채널 운영진 초대', email, 'invite_channel_operator', [
				{
					key: 'code',
					value: code,
				},
				{
					key: 'host',
					value: process.env.HOST,
				},
			]);
		});
	}
}
