// 아직 사용하지 않음 (추후에 기능 추가 후 사용 예정)
import * as Yup from 'yup';

const notificationSchema = Yup.object().shape({
  content: Yup.string().required('내용은 필수 항목입니다.'),
});
