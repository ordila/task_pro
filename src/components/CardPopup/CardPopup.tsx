//installed libraries
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from '@reduxjs/toolkit';

//global folders
import { Priorities, PriorityColor } from '../../constants';
import { Priority } from '../../types';
import icons from 'assets/sprite.svg';

//local folder
import { ICardPopupProps, IFormData } from './types';
import { CardSchema } from './yupSchema';
import { DatePicker } from './DatePicker';

//styles
import * as S from './CardPopup.styled';

const CardPopup = ({
  actionType,
  onSave = () => console.log('You forgot to bring the onSave function'),
  cardData = {
    title: '',
    description: '',
    priority: Priority.Without,
    deadline: new Date().getTime(),
  },
}: ICardPopupProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      ...cardData,
      deadline: new Date(Number(cardData.deadline)),
    },
    mode: 'onChange',
    resolver: yupResolver(CardSchema),
  });

  const onSubmit = (data: IFormData) => {
    onSave({ ...data, deadline: new Date(data.deadline).getTime() });
    reset();
  };

  return (
    <>
      <S.popupName_p>{actionType} card</S.popupName_p>
      <S.cardDataForm_form
        onSubmit={handleSubmit((data) =>
          onSubmit({
            ...data,
            deadline: data.deadline as Date,
            priority: data.priority as Priority,
          })
        )}
      >
        <S.formFieldWrapper_label $marginBottom="14px">
          <S.title_input
            {...register('title')}
            placeholder="Title"
            autoFocus={true}
            $hasError={!!errors.title}
          ></S.title_input>
          {errors.title && dirtyFields && (
            <S.errorMessage_p $position="top : -20px">
              {errors.title.message}
            </S.errorMessage_p>
          )}
        </S.formFieldWrapper_label>
        <S.formFieldWrapper_label $marginBottom="24px">
          <S.description_textarea
            {...register('description')}
            placeholder="Description"
            $hasError={!!errors.description}
          ></S.description_textarea>
          {errors.description && dirtyFields && (
            <S.errorMessage_p $position="bottom: -21px">
              {errors.description.message}
            </S.errorMessage_p>
          )}
        </S.formFieldWrapper_label>
        <S.propertyWrapper_div $marginBottom="14px">
          Label color
          <S.radioGroup_ul>
            {Priorities.map((priority) => (
              <li key={nanoid()}>
                <label>
                  <input
                    type="radio"
                    value={priority}
                    {...register('priority')}
                    hidden
                  />
                  <S.customRadioButton_span
                    $color={PriorityColor[priority as Priority]}
                  ></S.customRadioButton_span>
                </label>
              </li>
            ))}
          </S.radioGroup_ul>
          {errors.priority && (
            <S.errorMessage_p $position="bottom: -18px">
              {errors.priority.message}
            </S.errorMessage_p>
          )}
        </S.propertyWrapper_div>
        <S.propertyWrapper_div $marginBottom="40px">
          Deadline
          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={new Date(value as string)}
                onChange={(date: Date) => {
                  onChange(date);
                }}
              />
            )}
          />
          {errors.deadline && (
            <S.errorMessage_p $position="bottom: -22px">
              {errors.deadline.message}
            </S.errorMessage_p>
          )}
        </S.propertyWrapper_div>
        <S.onSaveButton_button type="submit">
          <S.plusIconContainer_span>
            <svg width={14} height={14}>
              <use href={`${icons}#icon-plus`}></use>
            </svg>
          </S.plusIconContainer_span>
          {actionType}
        </S.onSaveButton_button>
      </S.cardDataForm_form>
    </>
  );
};

export default CardPopup;
