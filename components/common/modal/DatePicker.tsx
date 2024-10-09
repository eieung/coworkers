import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';
import Textarea from '@/components/common/Textarea';
import CustomDropdown from '@/components/common/dropdown/CustomDropdown';
import CustomCalendar from '@/components/common/CustomCalendar';
import { useState } from 'react';
import { formatDate } from '@/utils/common';
import { Frequency, TaskDataType } from '@/types/taskList';
import { useRouter } from 'next/router';
import { useCreateTask } from '@/queries/tasks/useTaskData';

interface DatePickerProps {
  close: () => void;
}

interface FormData {
  name: string;
  description: string;
  startDate: string;
  frequencyType: Frequency;
  weekDays: number[];
}

enum FORM_FIELD {
  NAME = 0,
  STARTDATE,
  FREQUENCYTYPE,
  DESCRIPTION,
}

enum WeekDay {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'] as const;

const dayToNumberMap = Object.fromEntries(
  daysOfWeek.map((day, index) => [day, index]),
) as { [key in (typeof daysOfWeek)[number]]: WeekDay };

export default function DatePicker({ close }: DatePickerProps) {
  const today = formatDate(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      startDate: today,
      frequencyType: 'ONCE',
      description: '',
      weekDays: [],
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

  const router = useRouter();
  const { groupId, listId } = router.query;

  const createTaskMutation = useCreateTask();

  const onSubmit = (data: FormData) => {
    const parsedDate = data.startDate
      .replace(/년\s+/g, '-')
      .replace(/월\s+/g, '-')
      .replace(/일/g, '')
      .trim();
    const dayPart = parsedDate.slice(-2);
    const formattedStartDate = new Date(parsedDate)?.toISOString();

    const taskData: TaskDataType = {
      name: data.name.trim(),
      startDate: formattedStartDate,
      frequencyType: data.frequencyType,
      description: data.description,
    };

    if (data.frequencyType === 'WEEKLY') {
      taskData.weekDays = data.weekDays;
    } else if (data.frequencyType === 'MONTHLY') {
      taskData.monthDay = Number(dayPart);
    }

    createTaskMutation.mutate({
      groupId,
      listId,
      taskData,
    });

    close();
  };

  const selectedFrequencyType = watch('frequencyType');

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
            {inputs[FORM_FIELD.NAME] && (
              <div className="mt-6 flex flex-col">
                <Controller
                  name={inputs[FORM_FIELD.NAME].name as keyof FormData}
                  control={control}
                  rules={{ required: inputs[FORM_FIELD.NAME].placeholder }}
                  render={({ field }) => (
                    <Input
                      {...inputs[FORM_FIELD.NAME]}
                      {...field}
                      className={clsx(
                        'w-full border',
                        inputs[FORM_FIELD.NAME].height,
                      )}
                      invalid={
                        !!errors[inputs[FORM_FIELD.NAME].name as keyof FormData]
                      }
                      validationMessage={
                        errors[inputs[FORM_FIELD.NAME].name as keyof FormData]
                          ?.message
                      }
                      value={field.value as string}
                      onBlur={(e) => {
                        field.onChange(e.target.value.trim());
                      }}
                    />
                  )}
                />
              </div>
            )}

            <div className="mt-6 flex w-full items-end gap-2">
              {inputs[FORM_FIELD.STARTDATE] && (
                <Controller
                  name={inputs[FORM_FIELD.STARTDATE].name as keyof FormData}
                  control={control}
                  rules={{ required: inputs[FORM_FIELD.STARTDATE].placeholder }}
                  render={({ field }) => (
                    <div className="flex w-full flex-col">
                      <Input
                        {...inputs[FORM_FIELD.STARTDATE]}
                        {...field}
                        className={clsx(
                          'font-regular-16 w-full',
                          selectedDate
                            ? 'text-text-primary'
                            : 'text-text-default',
                          inputs[FORM_FIELD.STARTDATE].height,
                        )}
                        invalid={
                          !!errors[
                            inputs[FORM_FIELD.STARTDATE].name as keyof FormData
                          ]
                        }
                        validationMessage={
                          errors[
                            inputs[FORM_FIELD.STARTDATE].name as keyof FormData
                          ]?.message
                        }
                        onFocus={() => setShowCalendar(true)}
                        value={field.value as string}
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
                            disablePastDates={true}
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
              )}
            </div>

            {inputs[FORM_FIELD.FREQUENCYTYPE] && (
              <div className="mt-6">
                <Controller
                  name={inputs[FORM_FIELD.FREQUENCYTYPE].name as keyof FormData}
                  control={control}
                  rules={{
                    required: inputs[FORM_FIELD.FREQUENCYTYPE].placeholder,
                  }}
                  render={({ field }) => (
                    <>
                      <label className="font-medium-16 mb-3 inline-block text-text-primary">
                        {inputs[FORM_FIELD.FREQUENCYTYPE].label}
                      </label>
                      <CustomDropdown
                        items={[
                          {
                            label: '한 번',
                            onClick: () => setValue('frequencyType', 'ONCE'),
                          },
                          {
                            label: '매일',
                            onClick: () => setValue('frequencyType', 'DAILY'),
                          },
                          {
                            label: '주 반복',
                            onClick: () => {
                              setValue('frequencyType', 'WEEKLY');
                              setValue('weekDays', []);
                            },
                          },
                          {
                            label: '월 반복',
                            onClick: () => setValue('frequencyType', 'MONTHLY'),
                          },
                        ]}
                        defaultSelectedItem={'반복 안함'}
                      />
                    </>
                  )}
                />
              </div>
            )}

            {selectedFrequencyType === 'WEEKLY' && (
              <div className="mt-4">
                <label className="font-medium-16 mb-3 inline-block text-text-primary">
                  반복 요일
                </label>
                <Controller
                  name="weekDays"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || '요일을 선택하세요.',
                  }}
                  render={() => (
                    <div className="flex justify-between gap-1">
                      {daysOfWeek.map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          className={clsx(
                            'flex-center font-medium-14 flex h-12 w-11 rounded-xl transition-colors duration-200',
                            watch('weekDays').includes(index)
                              ? 'bg-brand-primary text-text-primary'
                              : 'bg-bg-darkBlue text-text-default',
                          )}
                          onClick={() => {
                            const currentDays = watch('weekDays');
                            if (currentDays.includes(index)) {
                              setValue(
                                'weekDays',
                                currentDays.filter((day) => day !== index),
                              );
                            } else {
                              setValue('weekDays', [...currentDays, index]);
                              clearErrors('weekDays');
                            }
                          }}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.weekDays && (
                  <p className="font-medium-14 mt-2 block text-red-500">
                    {errors.weekDays.message}
                  </p>
                )}
              </div>
            )}

            {inputs[FORM_FIELD.DESCRIPTION] && (
              <div className="mt-6 flex flex-col">
                <Controller
                  name={inputs[FORM_FIELD.DESCRIPTION].name as keyof FormData}
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...inputs[FORM_FIELD.DESCRIPTION]}
                      {...field}
                      className={clsx(
                        'w-full border',
                        inputs[FORM_FIELD.DESCRIPTION].height,
                      )}
                      value={field.value as string}
                      onBlur={(e) => {
                        field.onChange(e.target.value.trim());
                      }}
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
