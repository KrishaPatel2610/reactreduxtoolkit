import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section>
      <h2>post</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
