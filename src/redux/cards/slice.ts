import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  createCardThunk,
  updateCardByIdThunk,
  deleteCardByIdThunk,
  moveCardByIdThunk,
} from './operations';
import { ICardsState, IShortCard, Priority } from '../../types';
import {
  createBoardThunk,
  deleteBoardByIdThunk,
  fetchUserThunk,
  getBoardByIdThunk,
  logoutThunk,
} from '..';

const initialState: ICardsState = {
  items: [],
  isLoading: false,
};

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createCardThunk.fulfilled,
        (state, { payload: { result: card } }) => {
          state.isLoading = false;

          const newCard: IShortCard = {
            _id: card._id,
            boardId: card.boardId,
            columnId: card.columnId,
            title: card.title,
            description: card.description,
            priority: card.priority as Priority,
            deadline: card.deadline,
          };

          state.items.push(newCard);
        }
      )
      .addCase(
        updateCardByIdThunk.fulfilled,
        (state, { payload: { result: newCard } }) => {
          state.isLoading = false;
          state.items = state.items.map((card) =>
            card._id === newCard._id
              ? { ...card, ...newCard, priority: newCard.priority as Priority }
              : card
          );
        }
      )
      .addCase(
        moveCardByIdThunk.fulfilled,
        (state, { payload: { result: newCard } }) => {
          state.isLoading = false;

          state.items = state.items.map((card) =>
            card._id === newCard._id ? { ...card, ...newCard } : card
          );
        }
      )
      .addCase(deleteCardByIdThunk.fulfilled, (state, { payload: id }) => {
        state.items = state.items.filter((card) => card._id !== id);
        state.isLoading = false;
      })
      .addCase(fetchUserThunk.fulfilled, (state, { payload: { result } }) => {
        state.isLoading = false;
        state.items = result.cards;
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, { payload }) => {
        state.items = payload.result.columns.reduce(
          (acc, el: { cards: [] }) => acc.concat(el.cards),
          []
        );
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(deleteBoardByIdThunk.fulfilled, () => initialState)
      .addCase(createBoardThunk.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          createCardThunk.pending,
          updateCardByIdThunk.pending,
          deleteCardByIdThunk.pending,
          moveCardByIdThunk.pending,
          fetchUserThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createCardThunk.rejected,
          updateCardByIdThunk.rejected,
          deleteCardByIdThunk.rejected,
          moveCardByIdThunk.rejected,
          fetchUserThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
  selectors: {
    selectCards: (state) => state.items,
    selectIsCardLoading: (state) => state.isLoading,
  },
});

export const CardsReducer = slice.reducer;

export const { selectCards, selectIsCardLoading } = slice.selectors;
