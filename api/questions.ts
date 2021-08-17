import axios from 'axios';
import { IQuestion } from 'types/Question';

interface AddQuestionPayload {
  question: string;
  productId: string;
}

interface AddAnswerPayload {
  content: string;
  questionId: string;
}

interface AddVotePayload {
  value: number;
  questionId: string;
}

export const fetchProductQuestions = async (
  productSlug: string,
  userId: string | null,
  text: string | null
) => {
  const { data } = await axios.get<IQuestion[]>(
    `/questions/list/${productSlug}`,
    { params: { userId, text } }
  );
  return data;
};

export const fetchQuestion = async (questionId: string) => {
  const { data } = await axios.get<IQuestion>(
    `/questions/fetch-one/${questionId}`
  );
  return data;
};

export const addQuestion = (payload: AddQuestionPayload) =>
  axios.post<IQuestion>('/questions/create', { ...payload });

export const addQuestionAnswer = (payload: AddAnswerPayload) =>
  axios.post('/questions/response', { ...payload });

export const addQuestionVote = (payload: AddVotePayload) =>
  axios.post('/questions/vote', { ...payload });

// export const removeQuestion = async (id: string) => {
//   const { data } = await axios.delete(`/vendors/delete/${id}`);
//   return data;
// };

export const filterByText = (text: string | null) =>
  axios.get<IQuestion[]>('/questions/filter/by-text', {
    params: { text },
  });
