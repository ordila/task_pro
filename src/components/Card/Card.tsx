import EllipsisText from 'react-ellipsis-text';
import { format, isPast, isEqual } from 'date-fns';

import icons from 'assets/sprite.svg';
import { Modal, CardPopup, Loader } from '../../components';
import { PriorityColor } from '../../constants';
import { IUpdateCardRequestBody, Id, Priority } from '../../types';
import { ActionType, IFormData } from '../CardPopup/types';
import { CardStatusPopup } from './CardStatusPopup';
import { FullCardInfo } from './FullCardInfo';
import { ConfirmationPopup } from '../ConfirmationPopup/ConfirmationPopup';
import { useModal, useAppDispatch, useAppSelector } from '../../hooks';
import {
  deleteCardByIdThunk,
  selectIsCardLoading,
  updateCardByIdThunk,
} from '../../redux';
import { formatUnixDate } from '../../helpers';

import * as S from './Card.styled';

interface ICardProps {
  title?: string;
  description?: string;
  priority?: Priority;
  deadline?: string;
  _id: Id;
  columnId: Id;
  boardId: Id;
}

const Card = ({
  title = 'The watch spot design',
  description = "Create a visually stunning and eye-catching watch dial design that embodies our brand's...",
  deadline = formatUnixDate(new Date().getTime()),
  priority = Priority.Low,
  _id,
  columnId,
  boardId,
}: ICardProps) => {
  const [isOpenedModal, toggleModal] = useModal();
  const [isInfoModalOpened, toggleInfoModal] = useModal();
  const [isOpenDeleteModal, toggleDeleteModal] = useModal();

  const isLoading = useAppSelector(selectIsCardLoading);

  const dispatch = useAppDispatch();
  const isOverdue =
    isPast(new Date(Number(deadline))) ||
    isEqual(
      format(new Date(Number(deadline)), 'MM/dd/yyyy'),
      format(new Date(), 'MM/dd/yyyy')
    );

  const handleOnEdit = (updatedCard: IFormData) => {
    toggleModal(false);

    const data: IUpdateCardRequestBody = {
      ...updatedCard,
      columnId,
      boardId,
      deadline: updatedCard.deadline.toString(),
    };

    dispatch(updateCardByIdThunk({ id: _id, newCardBody: data }));
  };

  const handleOnDelete = () => {
    dispatch(deleteCardByIdThunk(_id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        toggleDeleteModal();
      });
  };

  return (
    <>
      <S.card_div $stickerColor={PriorityColor[priority]}>
        <S.title_h4>{title}</S.title_h4>
        <S.description_p onClick={() => toggleInfoModal(true)}>
          <EllipsisText text={description} length={90} />
        </S.description_p>
        <S.bottomPartContainer_div>
          <S.tagsList_ul>
            <S.tagItem_li>
              <S.tagLabel_h5>Priority</S.tagLabel_h5>
              <S.priorityValue_p $priorityColor={PriorityColor[priority]}>
                {priority}
              </S.priorityValue_p>
            </S.tagItem_li>
            <S.tagItem_li>
              <S.tagLabel_h5>Deadline</S.tagLabel_h5>
              <S.deadlineValue_p>
                {format(new Date(Number(deadline)), 'MM/dd/yyyy')}
              </S.deadlineValue_p>
            </S.tagItem_li>
          </S.tagsList_ul>
          <S.bottomRightPartContainer_div>
            <S.actionButtonsList_ul>
              <S.actionItem_li>
                <CardStatusPopup
                  columnId={columnId}
                  boardId={boardId}
                  id={_id}
                  isOverdue={isOverdue}
                />
              </S.actionItem_li>
              <S.actionItem_li>
                <S.actionButton_button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.blur();
                    toggleModal(true);
                  }}
                >
                  <svg width={16} height={16}>
                    <use href={`${icons}#icon-pencil-2`}></use>
                  </svg>
                </S.actionButton_button>
              </S.actionItem_li>
              <S.actionItem_li>
                <S.actionButton_button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.blur();
                    toggleDeleteModal();
                  }}
                >
                  <svg width={16} height={16}>
                    <use href={`${icons}#icon-trash-2`}></use>
                  </svg>
                </S.actionButton_button>
              </S.actionItem_li>
            </S.actionButtonsList_ul>
          </S.bottomRightPartContainer_div>
        </S.bottomPartContainer_div>
      </S.card_div>
      {isOpenedModal && (
        <Modal toggleModal={toggleModal}>
          <CardPopup
            actionType={ActionType.Edit}
            onSave={handleOnEdit}
            cardData={{ title, description, priority, deadline }}
          />
        </Modal>
      )}
      {isInfoModalOpened && (
        <Modal toggleModal={toggleInfoModal} padding="0">
          <FullCardInfo title={title} description={description} />
        </Modal>
      )}
      {isOpenDeleteModal && (
        <Modal toggleModal={toggleDeleteModal}>
          <ConfirmationPopup
            closeModal={toggleDeleteModal}
            approveModal={handleOnDelete}
            action={`remove ${title} card`}
          />
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default Card;
