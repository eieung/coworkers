import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/button';
import clsx from 'clsx';

interface CreateTaskProps {
  close: () => void;
}

interface FormData {
  title: string;
  memo: string;
}

enum FORM_FIELD {
  TITLE = 0,
  MEMO,
}

export default function CreateTask({ close }: CreateTaskProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
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

    toast(`${trimmedTitle} 이(가) 생성되었습니다!`);
    close();
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={false}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs?.[FORM_FIELD.TITLE] && (
          <div className="mt-4">
            <Controller
              name={inputs[FORM_FIELD.TITLE]?.name as keyof FormData}
              control={control}
              rules={{
                required: inputs[FORM_FIELD.TITLE].placeholder,
              }}
              render={({ field }) => (
                <Input
                  {...inputs[FORM_FIELD.TITLE]}
                  {...field}
                  className={clsx(
                    'w-full border',
                    inputs[FORM_FIELD.TITLE].height,
                  )}
                  invalid={!!errors.title}
                  validationMessage={errors.title?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        )}
        {inputs?.[FORM_FIELD.MEMO] && (
          <div className="mt-4">
            <Controller
              name={inputs[FORM_FIELD.MEMO]?.name as keyof FormData}
              control={control}
              rules={{ required: inputs[FORM_FIELD.MEMO].placeholder }}
              render={({ field }) => (
                <Textarea
                  {...inputs[FORM_FIELD.MEMO]}
                  {...field}
                  className={clsx(
                    'w-full border',
                    inputs[FORM_FIELD.MEMO].height,
                  )}
                  invalid={!!errors.memo}
                  validationMessage={errors.memo?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        )}
        {buttons && (
          <Button className="mt-6" {...buttons[0]} disabled={!isValid} />
        )}
      </form>
    </Modal>
  );
}
