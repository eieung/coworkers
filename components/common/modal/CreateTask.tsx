import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/Modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';

interface CreateTaskProps {
  close: () => void;
}

interface FormData {
  title: string;
  memo: string;
}

export default function CreateTask({ close }: CreateTaskProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      memo: '',
    },
  });

  const { title, description, inputs, buttons } =
    ModalUserActions[ACTION_TYPE.CREATE_TASK];

  const onSubmit = (data: FormData) => {
    const trimmedTitle = data.title.trim();
    const trimmedMemo = data.memo.trim();

    toast(`${trimmedTitle} 목록이 생성되었습니다!`);
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs?.map((input, index) => (
          <div className="mt-4" key={index}>
            <Controller
              name={input.name as keyof FormData}
              control={control}
              rules={{ required: input.placeholder }}
              render={({ field }) => (
                <Input
                  {...input}
                  {...field}
                  className={clsx('w-full border', input.height)}
                  invalid={!!errors[input.name as keyof FormData]}
                  validationMessage={
                    errors[input.name as keyof FormData]?.message
                  }
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        ))}
        {buttons && (
          <Button className="mt-6" {...buttons[0]}>
            {buttons[0].children}
          </Button>
        )}
      </form>
    </Modal>
  );
}
