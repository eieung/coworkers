import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * NotificationModel 인터페이스는 공지사항 모델의 데이터 구조를 정의합니다.
 * @interface NotificationModel
 * @extends Document - Mongoose Document를 확장하여 MongoDB 문서의 메서드와 속성을 포함합니다.
 * @property content - 공지사항의 내용 (string)
 * @property groupId - 그룹 ID (number)
 * @property createdAt - 공지사항 생성 시간 (Date)
 */
export interface NotificationModel extends Document {
  content: string;
  groupId: number;
  createdAt: Date;
}

/**
 * NotificationSchema는 공지사항 문서의 스키마를 정의합니다.
 * @constant NotificationSchema
 * @type {Schema} - Mongoose의 Schema 타입
 */
const NotificationSchema: Schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Notification 모델을 생성하여 내보냅니다.
 * 기존 모델이 있을 경우, 해당 모델을 재사용하고,
 * 없을 경우 새로운 모델을 생성합니다.
 * @constant NotificationModel
 * @type {Model<NotificationModel>} - NotificationModel 인터페이스를 사용하는 Mongoose 모델
 */
export default (mongoose.models.Notification as Model<NotificationModel>) ||
  mongoose.model<NotificationModel>('Notification', NotificationSchema);