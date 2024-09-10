import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';

interface PasswordResetProps {
  close: () => void;
}

interface FormData {
  value: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PasswordReset({ close }: PasswordResetProps) {
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

  const onSubmit = (data: FormData) => {
    const trimmedInput = data.value.trim();
    toast(`${trimmedInput} 해당 이메일로 링크를 보냈습니다!`);
    close();
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
              disabled={index === 0 ? false : !isValid}
            />
          ))}
        </div>
      </form>
    </Modal>
  );
}
