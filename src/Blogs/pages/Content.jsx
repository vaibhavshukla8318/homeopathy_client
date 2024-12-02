import { useState, useEffect 
} from 'react';
import {useParams} from 'react-router-dom'
import '../css/Blog.css';
import { FaRegClock, FaRegStar, FaRegThumbsUp, FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {  FaRegThumbsDown } from "react-icons/fa6";
import { useAuth } from '../../store/auth';

const BlogContent = () => {
  const [expandedPostId, setExpandedPostId] = useState(null); 
  const [hoveredElement, setHoveredElement] = useState(null);

  const [data, setData] = useState({
    title: '',
    author: '',
    image: '',
    thumbnailImage: '',
    pdf: [],
    likes: [],
    dislikes: [],
    ratings: [],
    averageRating: 0,
    comments: []
  });
  
  const [userRate, setUserRate] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);

  const {user, API, authorizationToken} = useAuth();
  const params = useParams();


   // fetching data
   const fetchData = async () => {
    try {
      const response = await fetch(`${API}/api/blog/blogs/${params.id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const fetchedData = await response.json();
        console.log("THIS IS COMING FROM CONTENT PAGE" ,fetchedData.blog)
        setData(fetchedData.blog);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error(`Error in frontend service: ${error}`);
    }
  };

  // handle likes
  const handleLike = async () => {
    try {
      const response = await fetch(`${API}/api/blog/blogs/${params.id}/like`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error(`Error in like functionality: ${error}`);
    }
  };

  // handle dislikes

  const handleDislike = async () => {
    try {
      const response = await fetch(`${API}/api/blog/blogs/${params.id}/dislike`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error(`Error in dislike functionality: ${error}`);
    }
  };

  // handle rating
  const handleRating = async (rating) => {
    try {

      localStorage.setItem(`userRate-${params.id}`, rating);
      setUserRate(rating); 
  
      // Send rating to the backend
      const response = await fetch(`${API}/api/blog/blogs/${params.id}/rate`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });
     
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to submit rating:", response.statusText);
      }

    } catch (error) {
      console.error(`Error in rating functionality: ${error}`);
    }
  };
  

  // handle AddComment
  const handleAddComment = async () => {
    try {
      const response = await fetch(`${API}/api/blog/blogs/${params.id}/comment`, {
        method: 'POST',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newComment })
      });
      if (response.ok) {
        setNewComment('');
        fetchData();
      }
    } catch (error) {
      console.error(`Error in adding comment: ${error}`);
    }
  };

  // handle AddReply

  const handleAddReply = async (commentId) => {
    try {
      const response = await fetch(`${API}/api/blog/blogs/${params.id}/comment/${commentId}/reply`, {
        method: 'POST',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: replyContent })
      });
      if (response.ok) {
        setReplyContent('');
        setReplyingToCommentId(null);
        fetchData();
      }
    } catch (error) {
      console.error(`Error in adding reply: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();

    const savedRating = localStorage.getItem(`userRate-${params.id}`);
    if (savedRating) {
      setUserRate(parseInt(savedRating, 10));
    }
  }, [params.id]);

  const tooltipMessage = user ? null : "Hey, you are not logged in";

  const handleMouseEnter = (element) => setHoveredElement(element);
  const handleMouseLeave = () => setHoveredElement(null);

  return (
    <div className="blog-container">
      <div className="mainContainer">
            <div className="blogPostContent">
              <p className='averageRatings'>{data.averageRating} / 5</p>
              <img
                src={
                  data.image
                    ? data.image.startsWith('http://') || data.image.startsWith('https://')
                      ? data.image
                      : `${API}${data.image}`
                    : 'fallback.jpg'
                }
                alt="blog cover"
              />
              <div className="contentDetails">
                <h1>{data.title}</h1>
                <p>{data?.content ? `${data.content.slice(0, 100)}...` : "No content available"}</p>
                <h3>{data.category}</h3>
              </div>
            </div>
            <div className='selectedDetails'>
             <h2>{data.title}</h2>
             <h3>{data.ratings.rating}</h3>
             <div className='users'>
                <div className='username'>
               <img
                src={
                  data.thumbnailImage
                    ? data.thumbnailImage.startsWith('http://') || data.thumbnailImage.startsWith('https://')
                      ? data.thumbnailImage
                      : `${API}${data.thumbnailImage}`
                    : 'fallback.jpg'
                }
                alt="blog cover"
              />
                <h4>{data.author}</h4>
                </div>
                <div className='likesRatingsContainer'>
                  <div className='likes'>
                    <div 
                    onClick={handleLike}  
                    onMouseEnter={() => handleMouseEnter('like')}
                    onMouseLeave={handleMouseLeave}
                    >
                    
                      { user ?
                        data.likes.includes(user._id) ?
                        <>
                          <FaThumbsUp className="icon" />
                        </>
                        :
                        <FaRegThumbsUp className="icon" />
                        :
                        <>
                         <FaRegThumbsUp className="icon" />
                        </>
                        
                      }
                      <span>{data.likes.length || 0}</span>
                      {hoveredElement === 'like' && <div className="tooltip">{tooltipMessage}</div>}
                    </div>
                    <div 
                    onClick={handleDislike}
                    onMouseEnter={() => handleMouseEnter('dislike')}
                    onMouseLeave={handleMouseLeave}
                    >
                      {user ?
                      
                        data.dislikes.includes(user._id) ?
                        <>
                          <FaThumbsDown className="icon" />
                        </>
                        :
                        <FaRegThumbsDown className="icon" />
                      
                      :
                     <>
                      <FaRegThumbsDown className="icon" />
                     </>
                    }
                      <span>{data.dislikes.length || 0}</span>
                      {hoveredElement === 'dislike' && <div className="tooltip">{tooltipMessage}</div>}
                    </div>
                  </div>
                
                  <div className='ratings'>

                  {[1, 2, 3, 4, 5].map((star) => {
                    const userRating = user ? data.ratings.find((curr) => curr.userId === user._id)?.rating || 0 : null;
                    return (
                      <span
                        key={star}
                        onClick={() => {
                          setUserRate(star);
                          handleRating(star);
                        }}
                        onMouseEnter={() => handleMouseEnter(`star-${star}`)}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: 'pointer' }}
                        className="icon"
                      >
                        {userRating >= star ? (
                          <FaStar style={{ color: 'gold' }} />
                        ) : (
                          <FaRegStar />
                        )}
                        {hoveredElement === `star-${star}` && <div className="tooltip">{tooltipMessage}</div>}
                      </span>
                    );
                   })}

                  </div>
         
                </div>
             </div>
            </div>
            <div className='selectedContent'>
              <div className="viewsAndTime">
                  {/* {
                    user ?
                    <div>
                      <FaRegEye className="icon" />
                      <span>{data.views} views</span>
                    </div>
                    :
                    null
                  } */}
                  <div>
                    <FaRegClock className="icon" />
                    <span>
                    {(() => {
                          const now = new Date();
                          const diff = Math.abs(now - new Date(data.timestamp));
                          const seconds = Math.floor(diff / 1000);
                          const minutes = Math.floor(seconds / 60);
                          const hours = Math.floor(minutes / 60);
                          const days = Math.floor(hours / 24);

                          return days > 0
                            ? `${days} day${days > 1 ? 's' : ''} ago`
                            : hours > 0
                            ? `${hours} hour${hours > 1 ? 's' : ''} ago`
                            : minutes > 0
                            ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
                            : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
                        })()}
                    </span>
                  </div>
              </div>
              <div className={`content ${expandedPostId === data.id ? 'expanded' : 'collapsed'}`}>
                <pre>{data.content}</pre>
              </div>
              <button
                className="moreButton"
                onClick={() =>
                  setExpandedPostId((prevId) =>
                    prevId === data.id ? null : data.id
                  )
                }
              >
                {expandedPostId === data.id ? 'Show Less' : 'Read More'}
              </button>
            </div>
            <div className='selectedComments'>
              <div>
                <h3>{data.comments.length} Comments</h3>
              </div>
              <div className='commentInput'>
                <input type="text"  value={newComment}
                 onChange={(e) => setNewComment(e.target.value)} id='comments' placeholder="Write a comment..." />
                <button 
                  onClick={handleAddComment}
                  onMouseEnter={() => handleMouseEnter('addComment')}
                  onMouseLeave={handleMouseLeave}
                >
                Submit
                </button>
                {hoveredElement === 'addComment' && <div className="tooltip">{tooltipMessage}</div>}
              </div>
              {
                data.comments.map((comment, index) => (
                  <div className='commentsContainer' key={index}>
                  <div className='userEmail'>
                    <p>{comment.email}</p>
                    <small>
                    {(() => {
                          const now = new Date();
                          const diff = Math.abs(now - new Date(comment.timestamp));
                          const seconds = Math.floor(diff / 1000);
                          const minutes = Math.floor(seconds / 60);
                          const hours = Math.floor(minutes / 60);
                          const days = Math.floor(hours / 24);

                          return days > 0
                            ? `${days} day${days > 1 ? 's' : ''} ago`
                            : hours > 0
                            ? `${hours} hour${hours > 1 ? 's' : ''} ago`
                            : minutes > 0
                            ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
                            : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
                        })()}
                    </small>
                  </div>
                  <div className='comment'>
                    <p>👉{comment.content}</p>
                  </div>
                  <div className='reply'>
                    <p onClick={() => setReplyingToCommentId(comment._id)}>Reply</p>
                    {replyingToCommentId === comment._id && (
                    <div>
                      <input 
                        type="text" 
                        id='reply' 
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Reply..." 
                      />
                      <button 
                        onClick={() => handleAddReply(comment._id)}
                      >
                        Reply
                      </button>
                    </div>
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                    <>
                     {comment.replies.map((reply, index) => (
                      <div key={index}>
                        <div className='userReplyEmail'>
                          <p>{reply.email}</p>
                          <small>
                            {(() => {
                            const now = new Date();
                            const diff = Math.abs(now - new Date(reply.timestamp));
                            const seconds = Math.floor(diff / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const hours = Math.floor(minutes / 60);
                            const days = Math.floor(hours / 24);

                            return days > 0
                              ? `${days} day${days > 1 ? 's' : ''} ago`
                              : hours > 0
                              ? `${hours} hour${hours > 1 ? 's' : ''} ago`
                              : minutes > 0
                              ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
                              : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
                            })()}
                          </small>
                        </div>
                        <div className='userReply'>
                          <p>🤗{reply.content}</p>
                        </div>
                      </div>
                     ))
                     }
                    </>  
                    )}
                  </div>
                  </div>
                ))
              }
            </div>
      </div>
    </div>
  );
};

export default BlogContent;
