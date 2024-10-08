import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import Button from '@/components/common/button';
import clsx from 'clsx';
import Input from '@/components/common/Input';
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
  className?: string;
  childrenClassName?: string;
  showCloseIcon?: boolean;
  bottomDescription?: React.ReactNode;
  inputType?: 'input' | 'textarea';
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
  className,
  childrenClassName,
  showCloseIcon = true,
  bottomDescription = null,
  inputType = 'input',
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
      showCloseIcon={showCloseIcon}
      titleClassName="font-regular-18"
      className={className}
      childrenClassName={childrenClassName}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col">
          <Controller
            name="title"
            control={control}
            rules={{ required: '내용 입력은 필수입니다.' }}
            render={({ field }) =>
              inputType === 'input' ? (
                <Input
                  {...field}
                  label={label}
                  placeholder={placeholder}
                  className={clsx('h-12 w-full border')}
                  invalid={!!errors.title}
                  validationMessage={errors.title?.message}
                  onBlur={(e) => {
                    field.onChange(e.target.value.trim());
                  }}
                />
              ) : (
                <Textarea
                  {...field}
                  label={label}
                  placeholder={placeholder}
                  className={clsx('w-full border')}
                  invalid={!!errors.title}
                  validationMessage={errors.title?.message}
                  onBlur={(e) => {
                    field.onChange(e.target.value.trim());
                  }}
                />
              )
            }
          />
        </div>
        <Button
          className="mt-6"
          disabled={!isValid}
          children={buttonText}
          fullWidth={true}
        />
        {bottomDescription && (
          <div className="flex-center font-regular-16 mt-6 flex text-text-primary">
            {bottomDescription}
          </div>
        )}
      </form>
    </Modal>
  );
}
