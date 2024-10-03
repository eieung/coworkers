import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';
import Textarea from '@/components/common/Textarea';
import TextDropdown from '@/components/common/dropdown/TextDropdown';
import CustomCalendar from '@/components/common/CustomCalendar';
import { useState } from 'react';
import { formatDate } from '@/utils/common';

interface DatePickerProps {
  close: () => void;
}

interface FormData {
  title: string;
  date: string;
  time: string;
  repeat: string;
  memo: string;
}

enum FORM_FIELD {
  TITLE = 0,
  DATE,
  TIME,
  REPEAT,
  MEMO,
}

export default function DatePicker({ close }: DatePickerProps) {
  const today = formatDate(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      date: today,
      time: '',
      repeat: '',
      memo: '',
    },
  });

  const {
    title,
    description,
    inputs = [],
    buttons = [],
  } = ModalUserActions[ACTION_TYPE.DATE_PICKER];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const onSubmit = (data: FormData) => {
    const trimmedTitle = data.title.trim();

    toast(`${trimmedTitle} 이(가) 생성되었습니다!`);
    close();
  };

  const dropdownItems = [
    {
      label: '한 번',
      onClick: () => {},
    },
    {
      label: '매일',
      onClick: () => {},
    },
    {
      label: '주 반복',
      onClick: () => {},
    },
    {
      label: '월 반복',
      onClick: () => {},
    },
  ];

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
      childrenClassName="w-[352px] sm:w-[300px]"
      isCloseOnOutsideClick={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs.length > 0 && (
          <>
            {inputs[FORM_FIELD.TITLE] && (
              <div className="mt-6 flex flex-col">
                <Controller
                  name={inputs[FORM_FIELD.TITLE].name as keyof FormData}
                  control={control}
                  rules={{ required: inputs[FORM_FIELD.TITLE].placeholder }}
                  render={({ field }) => (
                    <Input
                      {...inputs[FORM_FIELD.TITLE]}
                      {...field}
                      className={clsx(
                        'w-full border',
                        inputs[FORM_FIELD.TITLE].height,
                      )}
                      invalid={
                        !!errors[
                          inputs[FORM_FIELD.TITLE].name as keyof FormData
                        ]
                      }
                      validationMessage={
                        errors[inputs[FORM_FIELD.TITLE].name as keyof FormData]
                          ?.message
                      }
                      value={field.value}
                    />
                  )}
                />
              </div>
            )}
            <div className="mt-6 flex w-full items-end gap-2">
              {inputs[FORM_FIELD.DATE] && (
                <Controller
                  name={inputs[FORM_FIELD.DATE].name as keyof FormData}
                  control={control}
                  rules={{ required: inputs[FORM_FIELD.DATE].placeholder }}
                  render={({ field }) => (
                    <div className="flex w-full flex-col">
                      <Input
                        {...inputs[FORM_FIELD.DATE]}
                        {...field}
                        className={clsx(
                          'font-regular-16 w-full',
                          selectedDate
                            ? 'text-text-primary'
                            : 'text-text-default',
                          inputs[FORM_FIELD.DATE].height,
                        )}
                        invalid={
                          !!errors[
                            inputs[FORM_FIELD.DATE].name as keyof FormData
                          ]
                        }
                        validationMessage={
                          errors[inputs[FORM_FIELD.DATE].name as keyof FormData]
                            ?.message
                        }
                        onFocus={() => setShowCalendar(true)}
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          setShowCalendar(false);
                        }}
                      />
                      {showCalendar && (
                        <div className="mt-2 rounded-xl border border-bd-primary shadow-lg hover:border-it-hover">
                          <CustomCalendar
                            onDateSelect={(date) => {
                              if (date) {
                                const formattedDate = formatDate(date);
                                field.onChange(formattedDate);
                                setSelectedDate(date);
                              } else {
                                console.error(
                                  'Selected date is null or undefined.',
                                );
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
              )}
            </div>
            {inputs[FORM_FIELD.REPEAT] && (
              <div className="mt-6">
                <Controller
                  name={inputs[FORM_FIELD.REPEAT].name as keyof FormData}
                  control={control}
                  rules={{ required: inputs[FORM_FIELD.REPEAT].placeholder }}
                  render={({ field }) => (
                    <>
                      <label className="font-medium-16 mb-3 inline-block text-text-primary">
                        {inputs[FORM_FIELD.REPEAT].label}
                      </label>
                      <TextDropdown
                        items={dropdownItems}
                        defaultSelectedItem={'반복 안함'}
                      />
                    </>
                  )}
                />
              </div>
            )}
            {inputs[FORM_FIELD.MEMO] && (
              <div className="mt-6">
                <Controller
                  name={inputs[FORM_FIELD.MEMO].name as keyof FormData}
                  control={control}
                  rules={{ required: inputs[FORM_FIELD.MEMO].placeholder }}
                  render={({ field }) => (
                    <Textarea
                      {...inputs[FORM_FIELD.MEMO]}
                      {...field}
                      className={clsx('w-full border')}
                      height="75px"
                      invalid={
                        !!errors[inputs[FORM_FIELD.MEMO].name as keyof FormData]
                      }
                      validationMessage={
                        errors[inputs[FORM_FIELD.MEMO].name as keyof FormData]
                          ?.message
                      }
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>
            )}
          </>
        )}
        {buttons.length > 0 && <Button className="mt-8" {...buttons[0]} />}
      </form>
    </Modal>
  );
}
