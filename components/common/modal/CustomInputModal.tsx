import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import Button from '@/components/common/button';
import clsx from 'clsx';
import Textarea from '@/components/common/Textarea';

interface CreateTaskProps {
  close: () => void;
  title?: React.ReactNode;
  description?: string;
  label?: string;
  buttonText: string;
  onAction: (data: string) => void;
  initialData?: string;
  placeholder?: string;
}

interface FormData {
  title: string;
}

export default function CustomInputModal({
  close,
  title,
  description,
  buttonText,
  label,
  onAction,
  initialData = '',
  placeholder = '내용을 입력해주세요',
}: CreateTaskProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      title: initialData,
    },
  });

  const onSubmit = (data: FormData) => {
    onAction(data.title);
    close();
  };

  return (
    <Modal
      onClose={close}
      title={title}
      description={description}
      showCloseIcon={true}
      titleClassName="font-regular-18"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col">
          <Controller
            name="title"
            control={control}
            rules={{ required: '내용 입력은 필수입니다.' }}
            render={({ field }) => (
              <Textarea
                {...field}
                label={label}
                placeholder={placeholder}
                className={clsx('h-2 w-full border')}
                invalid={!!errors.title}
                validationMessage={errors.title?.message}
                onBlur={(e) => {
                  field.onChange(e.target.value.trim());
                }}
              />
            )}
          />
        </div>
        <Button
          className="mt-6"
          disabled={!isValid}
          children={buttonText}
          fullWidth={true}
        />
      </form>
    </Modal>
  );
}
