import { ImageBanner } from 'types/others';
import axios from 'axios';
import { IComment } from 'types/Comment';

interface AddCommentPayload {
  title: string;
  content: string;
  rate: number;
  productId: string;
  origin: string;
  images: ImageBanner[] | null;
}

export const fetchProductComments = async (
  productSlug: string,
  userId: string | null,
  text: string | null
) => {
  const { data } = await axios.get<IComment[]>(
    `/comments/list/${productSlug}`,
    { params: { userId, text } }
  );
  return data;
};

export const fetchProductImageComments = async (
  productSlug: string,
  userId: string | null
) => {
  const { data } = await axios.get<IComment[]>(
    `/comments/list/with-images/${productSlug}`,
    { params: { userId } }
  );
  return data;
};

export const fetchOneComment = async (commentId: string) => {
  const { data } = await axios.get<IComment>(
    `/comments/fetch-one/${commentId}`
  );
  return data;
};

export const addComment = (payload: AddCommentPayload) =>
  axios.post<IComment>('/comments/create', { ...payload });

export const addCommentLike = (commentId: string) =>
  axios.post('/comments/vote', { commentId });

export const removeComment = (id: string) =>
  axios.delete(`/comments/delete/${id}`);

export const filterByText = (text: string | null) =>
  axios.get<IComment[]>('/comments/filter/by-text', {
    params: { text },
  });
