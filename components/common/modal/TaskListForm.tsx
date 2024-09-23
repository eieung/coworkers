import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';

interface CreateTaskListProps {
  close: () => void;
  onAction: (value: string) => void;
  isEditMode?: boolean;
  initialValue?: string;
}

interface FormData {
  value: string;
}

export default function TaskListForm({
  close,
  onAction,
  isEditMode = false,
  initialValue = '',
}: CreateTaskListProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      value: initialValue,
    },
  });

  const { title, description, inputs, buttons } =
    ModalUserActions[ACTION_TYPE.CREATE_TASK_LIST];

  const onSubmit = ({ value }: FormData) => {
    onAction(value);
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
                onBlur={(e) => {
                  field.onChange(e.target.value.trim());
                }}
                value={field.value}
              />
            )}
          />
        )}
        {buttons && (
          <Button className="mt-6" {...buttons[0]} disabled={!isValid}>
            {isEditMode ? '수정하기' : '만들기'}
          </Button>
        )}
      </form>
    </Modal>
  );
}
