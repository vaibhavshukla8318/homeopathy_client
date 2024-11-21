import style from "./css/loadingPage.module.css"

const LoadingAuth = () => {
  return (
    <div className={style.loadingBlogPage}>
       <div className={style.spin}>
       </div>
       <p>Auth</p>
    </div>
  )
};



export { LoadingAuth };
