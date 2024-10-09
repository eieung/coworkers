import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';
import { useState } from 'react';
import Loader from '../Loader';

interface PasswordResetProps {
  close: () => void;
  onAction: (value: string) => void;
}

interface FormData {
  value: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PasswordReset({ close, onAction }: PasswordResetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      value: '',
    },
    mode: 'onChange',
  });

  const { title, description, inputs, buttons } =
    ModalUserActions[ACTION_TYPE.PASSWORD_RESET];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const trimmedInput = data.value.trim();
    try {
      await onAction(trimmedInput);
    } catch (error) {
      console.error('비밀번호 재설정에 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col">
        {inputs?.[0] && (
          <Controller
            name="value"
            control={control}
            rules={{
              required: inputs[0].placeholder,
              validate: {
                email: (value) =>
                  emailPattern.test(value) ||
                  '유효한 이메일 주소를 입력해주세요.',
              },
            }}
            render={({ field }) => (
              <Input
                {...inputs[0]}
                {...field}
                className={clsx('mt-2 w-full border', inputs[0].height)}
                invalid={!!errors.value}
                validationMessage={errors.value?.message}
                onChange={(e) => {
                  const newValue = e.target.value;
                  field.onChange(newValue.trim());
                  trigger('value');
                }}
                value={field.value}
                disabled={isLoading}
              />
            )}
          />
        )}
        <div className="mt-6 flex items-center gap-2">
          {buttons?.map((button, index) => (
            <Button
              key={index}
              {...button}
              onClick={index === 0 ? close : button.onClick}
              disabled={index === 0 ? false : !isValid || isLoading}
            >
              {isLoading && index !== 0 ? (
                <Loader
                  type="clip"
                  color="white"
                  size={30}
                  className="mx-auto"
                />
              ) : (
                button.children
              )}
            </Button>
          ))}
        </div>
      </form>
    </Modal>
  );
}
