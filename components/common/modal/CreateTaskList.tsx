import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';

interface CreateTaskListProps {
  close: () => void;
}

interface FormData {
  value: string;
}

export default function CreateTaskList({ close }: CreateTaskListProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      value: '',
    },
  });

  const { title, description, inputs, buttons } =
    ModalUserActions[ACTION_TYPE.CREATE_TASK_LIST];

  const onSubmit = (data: FormData) => {
    const trimmedInput = data.value.trim();
    toast(`${trimmedInput} 목록이 생성되었습니다!`);
    close();
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {inputs?.[0] && (
          <Controller
            name="value"
            control={control}
            rules={{ required: inputs[0].placeholder }}
            render={({ field }) => (
              <Input
                {...inputs[0]}
                {...field}
                className={clsx('mt-2 w-full border', inputs[0].height)}
                invalid={!!errors.value}
                validationMessage={errors.value?.message}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        )}
        {buttons && (
          <Button className="mt-6" {...buttons[0]} disabled={!isValid} />
        )}
      </form>
    </Modal>
  );
}
