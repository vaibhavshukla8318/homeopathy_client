import style from "./css/loadingPage.module.css"

const LoadingBlog = () => {
  return (
    <div className={style.loadingBlogPage}>
       <div className={style.spin}>
       </div>
       <p>Blog</p>
    </div>
  )
};



export { LoadingBlog };
