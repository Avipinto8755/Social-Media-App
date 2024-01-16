import { useContext, useEffect, useState } from "react";
import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      username
        ? await axios
            .get("/posts/profile/" + username)
            .then((res) => {
              setPosts(
                res?.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            })
            .catch((err) => console.log(err))
        : await axios
            .get("posts/timeline/" + user._id)
            .then((res) => {
              setPosts(res?.data);
              setPosts(
                res?.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            })
            .catch((err) => console.log(err));
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
