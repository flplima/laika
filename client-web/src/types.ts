export interface Message {
	_id: string;
	text: string;
	fromUser: boolean;
	createdAt: Date;
}