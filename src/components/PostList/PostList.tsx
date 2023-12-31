import { useCallback, useEffect, useRef, useState } from 'react';
import { PostType } from '../../types/postTypes';
import { backendFetch } from '../../utilities/backendFetch';
import useInfoCard from '../../hooks/useInfoCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Post from '../Post/Post';
import { useNavigate } from 'react-router-dom';

type PostListProps = {
  token: string | null;
};

export default function PostList({ token }: PostListProps) {
  const { setInfo } = useInfoCard();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const shouldFetch = useRef(true);

  const handleFetchPosts = useCallback(async () => {
    try {
      if (token) {
        const apiEndpointURL = `/api/v1/admin/posts`;
        const method = 'GET';
        const errorMessage = 'Unable to fetch posts!';
        const response = await backendFetch(
          token,
          setInfo,
          apiEndpointURL,
          method,
          errorMessage
        );

        setPosts(response.posts);
      }
    } catch (error) {
      navigate('/forbidden');
    } finally {
      setLoading(false);
    }
  }, [token, setInfo, navigate]);

  const onPostChange = useCallback(() => {
    setLoading(true);
    handleFetchPosts();
  }, [handleFetchPosts]);

  useEffect(() => {
    if (shouldFetch.current) handleFetchPosts();

    return () => {
      shouldFetch.current = false;
    };
  }, [setInfo, token, handleFetchPosts]);

  const postItemsList = posts?.map((post, index) => (
    <Post
      key={post._id}
      token={token}
      postData={post}
      itemIndex={index}
      onPostChange={onPostChange}
    />
  ));

  const LoadingContent = <LoadingSpinner message="Loading Posts" />;

  const NormalContent = <div className="flex flex-col">{postItemsList}</div>;

  return loading ? LoadingContent : NormalContent;
}
