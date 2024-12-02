import style from "./css/Loading.module.css"

const LoadingAdmin = () => {
  return (
    <div className={style.loadingBlogPage}>
       <div className={style.spin}>
       </div>
       <p>Welcome</p>
    </div>
  )
};



export { LoadingAdmin };
