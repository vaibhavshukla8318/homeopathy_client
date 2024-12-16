import { useState } from "react";
import { toast } from "react-toastify";
import "./css/Blog.css";
import { useAuth } from "../store/auth";

const Admin = () => {
  const [blogs, setblogs] = useState({
    title: "",
    author: "",
    image: "",
    thumbnailImage: "",
    content: "",
  });

const [imagePreview, setImagePreview] = useState("../../public/image/upload.png");
const [thumbnailPreview, setThumbnailPreview] = useState("../../public/image/upload.png");

  const { API, authorizationToken } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "pdf") {
      setblogs((prevblogs) => ({
        ...prevblogs,
        pdf: value.split(",").map((url) => url.trim()),
      }));
    } else {
      setblogs((prevblogs) => ({
        ...prevblogs,
        [name]: value,
      }));
    }
  };

const handleFileInput = (e) => {
  const { name } = e.target;
  const file = e.target.files ? e.target.files[0] : null;

  if (file) {
    const fileUrl = URL.createObjectURL(file);
    if (name === "image") {
      setblogs((prevblogs) => ({
        ...prevblogs,
        image: file,
      }));
      setImagePreview(fileUrl);
    } else if (name === "thumbnailImage") {
      setblogs((prevblogs) => ({
        ...prevblogs,
        thumbnailImage: file,
      }));
      setThumbnailPreview(fileUrl);
    }
  } else {
    setblogs((prevblogs) => ({
      ...prevblogs,
      [name]: e.target.value,
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogs.title);
    formData.append("author", blogs.author);
    formData.append("image", blogs.image);
    formData.append("thumbnailImage", blogs.thumbnailImage);
    formData.append("content", blogs.content);

    try {
      const response = await fetch(`${API}/api/blog/addedblogs`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Added Successfully");
        setblogs({ title: "", author: "", image: "", thumbnailImage: "", content: "" });
        setImagePreview(null); 
        setThumbnailPreview(""); 
      } else {
        toast.error(res_data.message || "Failed to add blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-blog-container">
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="blog-post-content">
          
          <label className="imageLabel" htmlFor="image">
            <span>Upload Main Image</span>
          </label>
          <input
            className="file"
            type="file"
            id="image"
            name="image"
            onChange={handleFileInput}
          />
          <input
            type="text"
            id="imageURL"
            name="image"
            placeholder="Or enter image URL"
            value={typeof blogs.image === "string" ? blogs.image : ""}
            onChange={handleInput}
          />
          {imagePreview && (
            <img src={imagePreview} alt="imagePreview" />
          )}
        </div>
        <div className="selectedDetails">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Your Title Here"
            value={blogs.title}
            onChange={handleInput}
          />
          <div className="users">
            <div className="username">
              {thumbnailPreview && (
                <img src={thumbnailPreview} alt="thumbnailPreview" />
              )}
              <label htmlFor="thumbnailImage" id="thumbnailImageLabel"></label>
              <input
                type="file"
                id="thumbnailImage"
                name="thumbnailImage"
                onChange={handleFileInput}
              />
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Enter Your Name"
                value={blogs.author}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
        <div className="selectedContent">
          <textarea
            id="content"
            name="content"
            placeholder="Enter Your Content Here"
            value={blogs.content}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="submit-btn">Add Blog</button>
      </form>
    </div>
  );
};

export default Admin;