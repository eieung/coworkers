import { NextApiRequest, NextApiResponse } from 'next';
import Notification, { NotificationModel } from '@/models/Notification';
import dbConnect from '@/services/database/dbConnect';

/*
 * @ notification API 핸들러는 Next.js를 사용하여 CRUD(Create, Read, Update, Delete) 작업을 처리
 * @ MongoDB와 연결하여 공지를 관리하는 기능을 제공
 * @ GET: 공지 목록을 조회합니다.
 * @ POST: 새로운 공지를 생성합니다.
 * @ PATCH: 특정 공지를 업데이트합니다.
 * @ DELETE: 특정 공지를 삭제합니다.
 * @ 오류 발생 시 적절한 상태 코드와 메시지를 반환합니다.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { groupId } = req.query;

        if (!groupId) {
          return res.status(400).json({
            success: false,
            message: 'groupId가 필요합니다.',
          });
        }

        // groupId를 기반으로 필터링하여 해당 그룹의 공지만 가져옴
        const notifications: NotificationModel[] = await Notification.find({
          groupId,
        });

        res.status(200).json({ success: true, data: notifications });
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, message: error.message });
        } else {
          res
            .status(400)
            .json({ success: false, message: '알 수 없는 에러 발생' });
        }
      }
      break;

    case 'POST':
      try {
        const notification: NotificationModel = await Notification.create({
          content: body.content,
          groupId: body.groupId,
        });
        res.status(201).json({ success: true, data: notification });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PATCH':
      try {
        const { id } = req.query;
        const updatedNotification = await Notification.findByIdAndUpdate(
          id,
          req.body,
          { new: true },
        );
        if (!updatedNotification) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedNotification });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedNotification = await Notification.deleteOne({ _id: id });
        if (!deletedNotification) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // 지원하지 않는 메소드에 대한 처리
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`요청한 메서드(${method})는 허용되지 않습니다.`);
      break;
  }
}
